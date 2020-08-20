# Arreglar audio con AppleALC





Para empezar, we'll assume que ya tienes Lilu y AppleALC instaladas, si no estés seguro de que hayan cargadas correctamente puedes correr lo siguiente en la terminal(Esto también verifica si AppleHDA está cargada, ya que sin esto AppleALC no tiene nada que parchear):

```sh
kextstat | grep -E "AppleHDA|AppleALC|Lilu"
```

If all 3 show up, you're good to go. Y asegúrate de que VoodooHDA **no sea presente**. Esto conflict con AppleALC otherwise.

Si encuentras algún problema, dirígete a la [sección Troubleshooting](../universal/audio.md#troubleshooting)

## Encontrar tu layout ID

Para este ejemplo, we'll assume que tu codec es ALC1220. Para verificar el tuyo, tienes unas opciones:

* Revisar la especifacione o el manual del motherboard
* Revisar Device Manager en Windows
* Corre `cat` en la terminal en Linux
  * `cat /proc/asound/card0/codec#0 | less`

Ahora con un codec, queremos cross reference it con la lista de codecs compatibles con AppleALC:

* [AppleALC Supported Codecs](https://github.com/acidanthera/AppleALC/wiki/Supported-codecs)

Con el ALC1220, encontramos lo siguiente:

```
0x100003, layout 1, 2, 3, 5, 7, 11, 13, 15, 16, 21, 27, 28, 29, 34
```

Esto nos muestra 2 cosas:

* La revisión del hardware que es compatible(`0x100003`), solo relevant when multiple revisiones are listed con layouts diferentes
* Varias layout IDs compatibles con nuestro codec(`layout 1, 2, 3, 5, 7, 11, 13, 15, 16, 21, 27, 28, 29, 34`)

Ahora con una lista de layout IDs compatibles,  estamos listos a probarlos

**Nota**: Si tu Audio Codec es ALC 3XXX es probable que es falso y solamente es un contraldor, do your research para averiguar cuál es el controlador en realidad.

* Un example de esto es el ALC3601, pero cuando usamos Linux se muestra el nombre verdadero: ALC 671

## Probar tu layout

Para probar nuestros layout IDs, vamos a usar el boot-arg `alcid=xxx` donde xxx es tu layout. Ten en cuenta que hay que probar los layout IDs **uno a uno**. No agregas multiple IDs o alcid boot-args, si uno no funciona entonces probar el próximo ID y etc

```
config.plist
├── NVRAM
  ├── Add
    ├── 7C436110-AB2A-4BBB-A880-FE41995C9F82
          ├── boot-args | String | alcid=11
```

## Hacer más permenante el Layout ID

Cuando has encontrado un Layout ID que funciona con tu hack, podemos crear una solución más permanente que es más similar que la manera usada por las Macs reales para configurar sus Layout IDs.

Con AppleALC, there's a priority hierarchy con la que las properties son prioritizadas:

1. `alcid=xxx` boot-arg, útill para debugging y overrides todos los otros values
2. `alc-layout-id` en DeviceProperties, **se debería usar solamente en hardware de Apple**
3. `layout-id` en DeviceProperties, **se debería usar en Apple and non-Apple hardware**

Para empezar, tenemos que ver dónde nuestro controlador de audio está ubicada en el PCI map. Para esto, vamos a usar una herramienta handy llamada [gfxutil](https://github.com/acidanthera/gfxutil/releases) y correr esto en la terminal de macOS:

```sh
dirección/para/gfxutil -f HDEF
```

![](../images/post-install/audio-md/gfxutil-hdef.png)

Luego agrega esta PciRoot con el child `layout-id` a tu config.plist en DeviceProperties -> Add:

![](../images/post-install/audio-md/config-layout-id.png)

Ten en cuenta que AppleALC puede usar Decimal/Number y Hexadecimal/Data, generalmente el mejor método es Hex ya que evita cualquier conversión no necesarias. Puedes usar una [calculadora de decimal a hexadecimal](https://www.rapidtables.com/convert/number/decimal-to-hex.html) para encontrar el tuyo. `printf '%x\n' DECI_VAL`:

![](../images/post-install/audio-md/hex-convert.png)

En este ejemplo, `alcid=11` será either:

* `layout-id | Data | <0B000000>`
* `layout-id | Number | <11>`

Note that the final HEX/Data value should be 4 bytes en total(ie. `0B 00 00 00` ), para layout IDs más grandes que 255(`FF 00 00 00`) tienes que acordarte que los bytes son swapped. Así que 256 se convierte a `FF 01 00 00`

* HEX Swapping and data size can be completely ignored using the Decimal/Number method

**Reminder**: Tu **DEBES** eliminar el boot-arg después, as it will always have the top priority y así que AppleALC ignorará todas las otras entradas como las en DeviceProperties

## Problemas misceláneos

### No Mic en AMD

* Esto es una problema muy común cuando se usa AppleALC con AMD, específicamente no se han hecho ningunos parches para soportar Mic input. De momento, la "mejor" solución es either comprar un DAC/Mic USB o usar el método de VoodooHDA.kext. El problema con VoodooHDA es que es conocida por ser inestable y tener peor calidad de audio que AppleALC

### Same layout ID from Clover doesn't work on OpenCore

This is likely do to IRQ conflicts, on Clover there's a whole sweep of ACPI hot-patches that are applied automagically. Fixing this is a little bit painful but [SSDTTime](https://github.com/corpnewt/SSDTTime)'s `FixHPET` option can handle most cases.

For odd cases where RTC and HPET take IRQs from other devices like USB and audio, you can reference the [HP Compaq DC7900 ACPI patch](https://github.com/khronokernel/trashOS/blob/master/HP-Compaq-DC7900/README.md#dsdt-edits) example in the trashOS repo

### Kernel Panic on power state changes in 10.15

* Enable PowerTimeoutKernelPanic in your config.plist:
  * `Kernel -> Quirks -> PowerTimeoutKernelPanic -> True`

## Troubleshooting

So for troubleshooting, we'll need to go over a couple things:

* [Revisar si tienes las kexts correctas](#revisar-si-tienes-las-kexts-correctas)
* [Verificar si AppleALC está parcheando correctamente](#verificar-si-applealc-está-parcheando-correctamente)
* [Verificar AppleHDA es vanilla](#verificar-applehda-es-vanilla)
* [AppleALC working inconsistently](#applealc-working-inconsistently)
* [AppleALC not working correctly with multiple sound cards](#applealc-not-working-correctly-with-multiple-sound-cards)

### Revisar si tienes las kexts correctas

Para empezar, we'll assume que ya tienes Lilu y AppleALC instaladas, if you're unsure if it's been loaded correctly puedes correr lo siguiente en la terminal(Esto también revisará si AppleHDA está cargada, ya que sin esto AppleALC no tiene nada que parchear):

```sh
kextstat | grep -E "AppleHDA|AppleALC|Lilu"
```

Si aparencen estas 3, estás listo para continuar. And make sure VoodooHDA **no es presente**. This will conflict with AppleALC otherwise. Otras kexts que eliminar de tu sistema:

* RealtekALC.kext
* CloverALC.kext
* VoodooHDA.kext
* HDA Blocker.kext
* HDAEnabler#.kext(# puede ser 1, 2, o 3)

> Hey Lilu and/or AppleALC aren't showing up

Generalmente el mejor punto de comienzo es busacar los logs de OpenCore y ver si Lilu y AppleALC fueron inyectadas correctamente:

```
14:354 00:020 OC: Prelink injection Lilu.kext () - Success
14:367 00:012 OC: Prelink injection AppleALC.kext () - Success
```

If it says failed to inject:

```
15:448 00:007 OC: Prelink injection AppleALC.kext () - Invalid Parameter
```

Main places you can check as to why:

* **Orden de inyecciónr**: Asegúrate que Lilu es antes de AppleALC en el orden de las kexts
* **Todas las kexts son la versión más reciente**: Especialmente importante para los plugins de Lilu, ya que kexts mixtas pueden causar problemas

Nota: Para configurar file logging, dirígete a [OpenCore Debugging](https://inyextciones.github.io/OpenCore-Install-Guide/troubleshooting/debug.html).

### Verificar si AppleALC está parcheando correctamente

Pues con AppleALC, la manera más fácil de verificar si hizo los parches es ver si tu contraldor de audio fue renombrado correctamente. Descarga [IORegistryExplorer](https://github.com/khronokernel/IORegistryClone/blob/master/ioreg-302.zip) y revisa si tienes un dispositivo HDEF:

![](../images/post-install/audio-md/hdef.png)

Se puede ver en la imagen por encima que tenemos lo siguiente:

* HDEF Device meaning our rename did the job
* AppleHDAController attached meaning Apple's audio kext attached successfully
* `alc-layout-id` is a property showing our boot-arg/DeviceProperty injection was successful
  * Nota: `layout-id | Data | 07000000` es la default layout, y `alc-layout-id` will override it and be the layout AppleHDA will use

Nota: **No renombres manualmente tu controlador de audio**, esto puede causar problemas dado que AppleALC ya está intentando a parchear. Let AppleALC do it's work.

**Más ejemplos**:

Correct layout-id           |  Incorrect layout-id
:-------------------------:|:-------------------------:
![](../images/post-install/audio-md/right-layout.png)  |  ![](../images/post-install/audio-md/wrong-layout.png)

As you can see from the above 2, the right image is missing a lot of AppleHDAInput devices, meaning that AppleALC can't match up your physical ports to something it can understand and output to. This means you've got some work to find the right layout ID for your system.

### Verificar AppleHDA es vanilla

Principalmente esta sección es para ellos que antes reemplazaban la AppleHDA stock con una custom one, esto va a verificiar verify si el tuyo es genuino:

```sh
sudo kextcache -i / && sudo kextcache -u /
```

Esto verifica la signature de AppleHDA y que es válida. Si no es válido tienes que conseguir una copia original de AppleHDA para tu sistema y remplazarla, o actualizar macOS(las kexts serán limpiadas durante las actualizaciones). Esto solo ocurre cuando has parcheado AppleHDA manualmente, así que si tienes una instalación nueva es re improbable que encuentras problemas de la signature.

### AppleALC working inconsistently

Sometimes race conditions can occur where your hardware isn't initialized in time for AppleHDAController resulting in no sound output. To get around this, you can either:

Specify in boot-args the delay:

```
alcdelay=1000
```

Or Specify via DeviceProperties(en tu dispositivo HDEF):

```
alc-delay | Number | 1000
```

The above boot-arg/property will delay AppleHDAController by 1000 ms(1 second), note the ALC delay cannot exceed [3000 ms](https://github.com/acidanthera/AppleALC/blob/master/AppleALC/kern_alc.cpp#L308L311)

### AppleALC not working correctly with multiple sound cards

For rare situations where you have 2 sounds cards(ex. onboard Realtek and an external PCIe card), you may want to avoid AppleALC patching devices you either don't use or don't need patching(like native PCIe cards). This is especially important if you find that AppleALC will not patch you onboard audio controller when the external one is present.

To get around this, primero tenemos que identificar la ubicación de nuestros 2 controladores de audio. La manera más fácil es correr [gfxutil](https://github.com/acidanthera/gfxutil/releases) y buscar las PCI IDs:


```sh
/dirección/para/gfxutil
```

Now with this large output you'll want to find your PciRoot pathing, for this example, usamos una Creative Sound-Blaster AE-9PE PCIe. Para esto, sabemos que la PCI ID es `1102:0010`. Cuando buscamos en el output de gfxutil encontramos esto:

```
66:00.0 1102:0010 /PC02@0/BR2A@0/SL05@0 = PciRoot(0x32)/Pci(0x0,0x0)/Pci(0x0,0x0)
```

Aquí, claramente vemos que nuestra PciRoot es:

```
PciRoot(0x32)/Pci(0x0,0x0)/Pci(0x0,0x0)
```


* **Nota**: This will assume you que sabes la Vendor ID y la Device ID de la external tarjeta de audio. For reference, these are the common Vendor IDs:
  * Creative Labs: `1102`
  * AsusTek: `1043`
* **Nota 2**: Tus direcciones ACPI y PciRoot serán diferentes, así que debes prestar atención a **tu** gfxutil output


Ahora que sabemos nuestra dirección PciRoot, por fin podemos abrir nuestra config.plist y agregar nuestro parche.

En DeviceProperties -> Add, tienes que agregar tu PciRoot(como un Dictionary) con el child llamado `external-audio`:

```
DeviceProperties
| --- > Add
	| --- > PciRoot(0x32)/Pci(0x0,0x0)/Pci(0x0,0x0)
		| ----> external-audio | Data | 01
```

![](../images/post-install/audio-md/external-audio.png)

Y con todo esto hecho, puedes reiniciar y ahora AppleALC debería ignorar tu external controlador de audio!
