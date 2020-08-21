# Arreglar CFG Lock





Ten en cuenta que solo recomendamos que los usarios que ya han instalado macOS hagan esto. Para usarios que están a instalar por la primera vez, activen `AppleCpuPmCfgLock` y `AppleXcpmCfgLock` en `Kernel -> Quirks`

## ¿Qué es CFG-Lock?

CFG-Lock es un ajuste en tu BIOS que permite cierto registro(en este caso el MSR 0xE2) to be written to. By default, la mayoría de las motherboards bloquean esta variable, hay muchas oculatan esta opcción en la GUI también. Y la razón por la que nos importa esta veriable es que macOS quiere to write to esta variable, and not just one part of macOS. Ambos el Kernel(XNU) y AppleIntelPowerManagement quieren acceder este registro.

Para arreglarlo tenemos 2 opciones:

1. Parchear macOS para que funcione con nuestro hardware

* Esto causa inestabilidad y usa parches que mucha gente no tiene que usar
* Los 2 parches que usamos para esto:
  * `AppleCpuPmCfgLock` para AppleIntelPowerManagement.kext
  * `AppleXcpmCfgLock` para el Kernel(XNU)

2. Parchear nuestro firmware para support MSR E2 write

* La opcción preferida, ya que no parchea el macOS y por la tanto es más flexible con actualizaciones del SO y es más estable
  
Nota: Sistemas basados en Penyrn no tienen que desbloquear este registro

## Desactivar CFG Lock

Entonces, has instalado macOS pero estás usando aquellos parches `CFG-Lock` que queremos eliminar. well to do this is fairly simple. Necesitas lo seguiente:

Dentro tu carpeta de EFI/OC/Tools y config.plist:

* [VerifyMsrE2](https://github.com/acidanthera/OpenCorePkg/releases)
* [Modified GRUB Shell](https://github.com/datasone/grub-mod-setup_var/releases)

Y unas apps para ayudarnos:

* [UEFITool](https://github.com/LongSoft/UEFITool/releases) (Asegúrate que es UEFITool y no es UEFIExtrac)
* [Universal-IFR-Extractor](https://github.com/LongSoft/Universal-IFR-Extractor/releases)

Y no olvides desactivar lo siguiente desde tu config.plist en `Kernel -> Quirks`:

* `AppleCpuPmCfgLock`
* `AppleXcpmCfgLock`

Y el último paso, descargar tu BIOS desde el sitio del vendedor.

¡A empezar!

## Verificar si CFG-Lock puede ser desactivada

Carga OpenCore y selecciona `VerifyMsrE2` en el picker. Esta herramineta te muestra si tu BIOS soporta CFG-Lock y si puede ser desbloqueado.

## Desactivar CFG-Lock manualmente

1. Abre tu firmware con UEFITool y luego buscar `CFG Lock` como un Unicode string. Si no aparace nada, tu firmware no es compatible con `CFG Lock`. Si lo encuentras, sigue leyendo.

![](../images/extras/msr-lock-md/uefi-tool.png)

1. Se puede ver que este string is está en una carpeta Setup, right-click y exportar como `Setup.bin`
2. Abre tu archivo setup usando `ifrextract` y exportar como un archivo .txt con la terminal:

   ```
   dirreción/para/ifrextract dirección/para/Setup.bin dirección/para/Setup.txt
   ```

3. Abre el archivo txt y busca `CFG Lock, VarStoreInfo (VarOffset/VarName):` y apunta el offset right after it(ie: `0x5A4`)

![](../images/extras/msr-lock-md/cfg-find.png)

1. Corre la Modified GRUB Shell y pegar lo siguiente donde `0x5A4` es reemplazaddddo con tu value:

   ```
   setup_var 0x5A4 0x00
   ```

   Ten en cuenta que los variable offsets son unique para las motherboards diferentes y también la versión su firmware. **Nunca usen un offset sin revisar.**

¡Y ahora estás listo! Ahora tienes correct CPU power management

* **Nota**: Cada vez que reseteas tu BIOS tienes que editar este bit de nuevo, recomendamos apuntarlo con la versión del BIOS version para que no pierdas más tiempo.

* **Nota 2**: Algunos OEMs como Lenovo talvez tienen la variable puesta pero no te dejan desbloquearla sin modificar físicamente el BIOS, para estas situationes es posible que tienes que usar una herramineta como [RU](http://ruexe.blogspot.com/): [CFG LOCK/Unlocking - Alternative method](https://www.reddit.com/r/hackintosh/comments/hz2rtm/cfg_lockunlocking_alternative_method/)
