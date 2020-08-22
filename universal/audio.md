# Arreglar audio con AppleALC





Para empezar, suponemos que ya tienes Lilu y AppleALC instalados, si no estás seguro de que están cargadas correctamente puedes correr lo siguiente en la terminal (Esto también verifica si AppleHDA está cargada, ya que sin esto AppleALC no tiene nada que parchear):

```sh
kextstat | grep -E "AppleHDA|AppleALC|Lilu"
```

Si aparancen las 3, estás listo para continuar. Y asegúrate de que VoodooHDA **no esté presente**. Esta kext causa conflicto con AppleALC.

Si encuentras algún problema, dirígete a la [sección de solución de problemas](../universal/audio.md#troubleshooting)

## Encontrar tu layout ID

Para este ejemplo, elegimos el codec ALC1220. Para verificar el tuyo, tienes varias opciones:

* Revisar las especifaciones o el manual de tu placa madre
* Revisar el administrador de dispositivos en Windows
* Correr `cat` en la terminal en Linux
  * `cat /proc/asound/card0/codec#0 | less`

Ahora que sabes tu codec, queremos referenciarlo con la lista de codecs compatibles de AppleALC:

* [Codecs soportados de AppleALC](https://github.com/acidanthera/AppleALC/wiki/Supported-codecs)

Con el ALC1220, encontramos lo siguiente:

```
0x100003, layout 1, 2, 3, 5, 7, 11, 13, 15, 16, 21, 27, 28, 29, 34
```

Esto nos muestra 2 cosas:

* Qué revisión del hardware es compatible (`0x100003`), esto es relevante solo cuando hay multiples revisiones con layouts diferentes.
* Varios layout IDs compatibles con nuestro codec (`layout 1, 2, 3, 5, 7, 11, 13, 15, 16, 21, 27, 28, 29, 34`)

Ahora con una lista de layout IDs compatibles, estamos listos para probarlos.

**Nota**: Si tu Audio Codec es ALC 3XXX es probable que esto sea falso y que solamente sea un contralador, investiga para averiguar cuál es el controlador en realidad.

* Un ejemplo de esto es el ALC3601, que cuando usamos Linux muestra el nombre verdadero: ALC 671

## Probar tu layout

Para probar nuestros layout IDs, vamos a usar el boot-arg `alcid=xxx` donde xxx es tu layout. Ten en cuenta que hay que probar los layout IDs **uno a uno**. No agregues multiples IDs o boot args alcid, si uno no funciona entonces pueba el próximo ID y así sucesivamente

```
config.plist
├── NVRAM
  ├── Add
    ├── 7C436110-AB2A-4BBB-A880-FE41995C9F82
          ├── boot-args | String | alcid=11
```

## Hacer que el Layout ID sea más permanente

Cuando hayas encontrado un Layout ID que funciona con tu hack, podemos crear una solución más permanente que es más similar que la manera usada por las Macs reales para configurar sus Layout IDs.

Con AppleALC, hay una jerarquía de prioridades, y con esta se priorizan las propiedades:

1. `alcid=xxx` boot-arg, útill para hacer depuración. Este sobreescribe todos los otros valores.
2. `alc-layout-id` en DeviceProperties, **se debería usar solamente en hardware de Apple**
3. `layout-id` en DeviceProperties, **se debería usar en hardware de Apple y no Apple**

Para empezar, tenemos que ver dónde está ubicado nuestro controlador de audio en el mapa de PCI. Para esto, vamos a usar una herramienta muy útil llamada [gfxutil](https://github.com/acidanthera/gfxutil/releases) y correr esto en la terminal de macOS:

```sh
dirección/para/gfxutil -f HDEF
```

![](../images/post-install/audio-md/gfxutil-hdef.png)

Luego agrega este PciRoot con un child llamado `layout-id` a tu config.plist en DeviceProperties -> Add:

![](../images/post-install/audio-md/config-layout-id.png)

Ten en cuenta que AppleALC puede usar Decimal/Number y Hexadecimal/Data, generalmente el mejor método es Hex ya que evita cualquier conversión no necesaria. Puedes usar una [calculadora de decimal a hexadecimal](https://www.rapidtables.com/convert/number/decimal-to-hex.html) para encontrar el tuyo. `printf '%x\n' DECI_VAL`:

![](../images/post-install/audio-md/hex-convert.png)

En este ejemplo, `alcid=11` será alguno de estos:

* `layout-id | Data | <0B000000>`
* `layout-id | Number | <11>`

Ten en cuenta que el valor final de HEX/Data value debe ser 4 bytes en total (es decir `0B 00 00 00` ). Para layout IDs más grandes que 255 (`FF 00 00 00`) tienes que acordarte que los bytes se intercambian. Así que 256 se convierte a `FF 01 00 00`.

* El intercambio de HEX y el tamaño de los datos pueden ser ignorados completamente usando el método Decimal/Number.

**Recordatorio**: **DEBES** eliminar el boot-arg después, dado que siempre tiene más prioridad, por lo que y AppleALC ignorará todas las otras entradas como las de DeviceProperties

## Otros problemas

### No Mic en AMD

* Esto es una problema muy común cuando se usa AppleALC con AMD, específicamente porque no se han hecho ningún parche para soportar input de micrófonos. De momento, la "mejor" solución es comprar un DAC/Micrófono USB o usar el kext VoodooHDA. El problema con VoodooHDA es que es conocida por ser inestable y por tener peor calidad de audio que AppleALC

### El layout ID de Clover no funciona en OpenCore

Es probable que es por causa de conflictos IRQ. Clover tiene un montón de parches ACPI que aplica automáticamente. Arreglar esto es un poquito doloroso pero la opción `FixHPET` de [SSDTTime](https://github.com/corpnewt/SSDTTime) puede arreglar esto en la mayoría de los casos.

Para casos extraños donde RTC y HPET toman IRQs de otros dispositivos como USB y audio, refiérete a [HP Compaq DC7900 ACPI patch](https://github.com/khronokernel/trashOS/blob/master/HP-Compaq-DC7900/README.md#dsdt-edits) en el repo de trashOS

### Kernel Panic en cambios de estados de energía en 10.15

* Activa PowerTimeoutKernelPanic en tu config.plist:
  * `Kernel -> Quirks -> PowerTimeoutKernelPanic -> True`

## Solución de problemas

Para solucionar problemas, tenemos que ir sobre algunas cosas:

* [Revisar si tienes los kexts correctos](#revisar-si-tienes-los-kexts-correctos)
* [Verificar si AppleALC está parcheando correctamente](#verificar-si-applealc-esta-parcheando-correctamente)
* [Verificar si AppleHDA es vanilla](#verificar-si-applehda-es-vanilla)
* [AppleALC funciona inconsistentemente](#applealc-funciona-inconsistentemente)
* [AppleALC no funciona correctamente con múltiples tarjetas de audio](#applealc-no-fucniona-correctamente-con-multiples-tarjetas-de-audio)

### Revisar si tienes los kexts correctos

Para empezar, suponemos que ya tienes Lilu y AppleALC instalados, si no estás seguro de que hayan sido cargados correctamente puedes correr lo siguiente en la terminal (Esto también revisará si AppleHDA está cargado, ya que sin esto AppleALC no tiene nada que parchear):

```sh
kextstat | grep -E "AppleHDA|AppleALC|Lilu"
```

Si aparencen estas 3, estás listo a continuar. Y asegúrate que VoodooHDA **no esté presente**. Esto causa conflictos con AppleALC. Otros kexts que eliminar de tu sistema:

* RealtekALC.kext
* CloverALC.kext
* VoodooHDA.kext
* HDA Blocker.kext
* HDAEnabler#.kext(# puede ser 1, 2, o 3)

> Lilu y/o AppleALC no aparecen

Generalmente el mejor punto de comienzo es buscar los logs de OpenCore y ver si Lilu y AppleALC fueron inyectados correctamente:

```
14:354 00:020 OC: Prelink injection Lilu.kext () - Success
14:367 00:012 OC: Prelink injection AppleALC.kext () - Success
```

Si dice que no se inyectó:

```
15:448 00:007 OC: Prelink injection AppleALC.kext () - Invalid Parameter
```

Lugares que puedes fijarte para averiguar por qué no se inyectó:

* **Orden de inyección**: Asegúrate que Lilu está antes de AppleALC en el orden de los kexts (Kernel->Add)
* **Todas los kexts están en la versión más reciente**: Especialmente importante para los plugins de Lilu, ya que kexts de versiones mixtas pueden causar problemas

Nota: Para configurar file logging, dirígete a [Depuración de OpenCore](https://inyextciones.github.io/OpenCore-Install-Guide/troubleshooting/debug.html).

### Verificar si AppleALC está parcheando correctamente

Con AppleALC, la manera más fácil de verificar si hizo los parches es ver si tu contraldor de audio fue renombrado correctamente. Descarga [IORegistryExplorer](https://github.com/khronokernel/IORegistryClone/blob/master/ioreg-302.zip) y revisa si tienes un dispositivo HDEF:

![](../images/post-install/audio-md/hdef.png)

Se puede ver en la imagen arriba que tenemos lo siguiente:

* HDEF Device signífica que el rename funcionó
* AppleHDAController attached significa que el kext de audio de Apple se adjuntó correctamente.
* `alc-layout-id` es una propiedad que muestra que la inyección de nuestro boot arg/DeviceProperty fue exitosa
  * Nota: `layout-id | Data | 07000000` es el layout por defecto, y `alc-layout-id` lo sobreescribirá y será el layout que AppleHDA usará.

Nota: **No renombres manualmente tu controlador de audio**, esto puede causar problemas dado que AppleALC ya está intentando a parchear. Let AppleALC do it's work.

**Más ejemplos**:

layout-id correcto          |  layout-id incorrecto
:-------------------------:|:-------------------------:
![](../images/post-install/audio-md/right-layout.png)  |  ![](../images/post-install/audio-md/wrong-layout.png)

Como puedes ver arriba, a la imagen de la derecha le faltan muchos dispositivos AppleHDAInput, esto es debido a que AppleALC no puede coincidir tus puertos físicos con algo que pueda entender. Esto significa que debes seguir intentando encontrar el layout ID correcto para tu sistema.

### Verificar que AppleHDA es vanilla

Principalmente esta sección es para ellos que antes reemplazaban la AppleHDA stock con una personalizada, esto va a verificiar si el tuyo es genuino:

```sh
sudo kextcache -i / && sudo kextcache -u /
```

Esto verifica la firma de AppleHDA y que es válida. Si no es válido tienes que conseguir una copia original de AppleHDA para tu sistema y remplazarla, o actualizar macOS (los kexts serán limpiados durante las actualizaciones). Esto sólo ocurre cuando has parcheado AppleHDA manualmente, así que si tienes una instalación nueva es muy improbable que encuentras problemas de la firma.

### AppleALC funciona inconsistentemente

En algunas ocasiones se pueden producir situaciones de "carrera" cuando tu hardware no es inicializado en tiempo para el AppleHDAController, y esto resulta en que no tengas audio. Para solucionar esto, puedes hacer lo siguiente:

Especificar el delay en tus boot args:

```
alcdelay=1000
```

O especificarlo via DeviceProperties (en tu dispositivo HDEF):

```
alc-delay | Number | 1000
```

La propiedad/boot arg de arriba retrasará AppleHDAController por 1000ms (1 segundo). Ten en cuenta que el retraso del ALC no puede ser mayor a [3000 ms](https://github.com/acidanthera/AppleALC/blob/master/AppleALC/kern_alc.cpp#L308L311)

### AppleALC no funciona correctamente con múltiples tarjetas de audio

Para situaciones particulares cuando tienes dos tarjetas de audio (por ejemplo, una tarjeta a bordo y una tarjeta PCIe externa), podrías querer evitar el parcheo de AppleALC a dispositivos que no usas o no necesitan parcheo (como tarjetas PCIe nativas). Esto es especialmente importante si encuentras que AppleALC no parchea tu tarjeta a bordo cuando la externa está presente.

Para solucionar esto, primero tenemos que identificar la ubicación de nuestros 2 controladores de audio. La manera más fácil es correr [gfxutil](https://github.com/acidanthera/gfxutil/releases) y buscar los PCI IDs:


```sh
/dirección/para/gfxutil
```

Ahora con este extenso resultado querrás encontrar la ruta de tu PciRoot. Para este ejemplo, usamos una Creative Sound-Blaster AE-9PE PCIe. Sabemos que la PCI ID es `1102:0010`. Cuando buscamos en el resultado de gfxutil encontramos esto:

```
66:00.0 1102:0010 /PC02@0/BR2A@0/SL05@0 = PciRoot(0x32)/Pci(0x0,0x0)/Pci(0x0,0x0)
```

Aquí, claramente vemos que nuestra PciRoot es:

```
PciRoot(0x32)/Pci(0x0,0x0)/Pci(0x0,0x0)
```


* **Nota**: Esto asumirá que ya sabes la Vendor ID y el Device ID de la tarjeta de audio externa. Aquí hay Vendor IDs comunes para que tengas de referencia:
  * Creative Labs: `1102`
  * AsusTek: `1043`
* **Nota 2**: Tus direcciones ACPI y PciRoot se verán diferentes, así que debes prestar atención a el resultado de **tu** gfxutil


Ahora que sabemos nuestro PciRoot, por fin podemos abrir el config.plist y agregar nuestro parche.

En DeviceProperties -> Add, tienes que agregar tu PciRoot (como un Dictionary) con un child llamado `external-audio`:

```
DeviceProperties
| --- > Add
	| --- > PciRoot(0x32)/Pci(0x0,0x0)/Pci(0x0,0x0)
		| ----> external-audio | Data | 01
```

![](../images/post-install/audio-md/external-audio.png)

Y con todo esto hecho, puedes reiniciar y ahora AppleALC debería ignorar tu controlador de audio externo!
