# Arreglar CFG Lock





Ten en cuenta que solo se recomienda hacer esto para usarios que ya han instalado macOS. Para usarios que están a instalar por la primera vez, activen `AppleCpuPmCfgLock` y `AppleXcpmCfgLock` en `Kernel -> Quirks`

## ¿Qué es CFG-Lock?

CFG-Lock es un ajuste en tu BIOS que allows for a specific register(en este caso el MSR 0xE2) to be written to. By default, most motherboards lock this variable with many even hiding the option outright en la GUI. Y la razón por la que nos importa esto es que macOS actually wants to write to this variable, and not just one part of macOS. Instead both el Kernel(XNU) y AppleIntelPowerManagement quieren acceder este registro.

Para arreglarlo tenemos 2 opciones:

1. Parchear macOS para que funcione con nuestro hardware

* Esto crea inestabilidad y unnecessary patching for many
* Los 2 parches que usamos para esto:
  * `AppleCpuPmCfgLock` para AppleIntelPowerManagement.kext
  * `AppleXcpmCfgLock` para el Kernel(XNU)

2. Parchear nuestro firmware para support MSR E2 write

* Very much preferred, as avoids patching allowing for greater flexibility regarding stability and OS upgrades
  
Note: Sistemas basados en Penyrn actually don't need to worry about desbloquear este registro

## Desactivar CFG Lock

So you've installed macOS but you're using those pesky `CFG-Lock` patches that we want to get rid of, well to do this is fairly simple. Necesitarás lo seguiente:

Dentro tu carpeta de EFI/OC/Tools y config.plist:

* [VerifyMsrE2](https://github.com/acidanthera/OpenCorePkg/releases)
* [Modified GRUB Shell](https://github.com/datasone/grub-mod-setup_var/releases)

Y unas apps para ayudarnos:

* [UEFITool](https://github.com/LongSoft/UEFITool/releases) (Make sure it's UEFITool and not UEFIExtrac)
* [Universal-IFR-Extractor](https://github.com/LongSoft/Universal-IFR-Extractor/releases)

Y no olvides desactivar lo siguiente desde tu config.plist en `Kernel -> Quirks`:

* `AppleCpuPmCfgLock`
* `AppleXcpmCfgLock`

And the final part, descargar tu BIOS desde el sitio del vendedor.

Now the fun part!

## Checking si se puede desactivar CFG-Lock

Boot OpenCore y selecciona `VerifyMsrE2` en el picker. Esta herraminete te contrará si tu BIOS supports CFG-Lock y si puede ser desbloqueado.

## Desactivar CFG-Lock manualmente

1. Abre tu firmware con UEFITool y luego buscar `CFG Lock` como a Unicode string. If nothing pops up then your firmware doesn't support `CFG Lock`, otherwise continue on.

![](../images/extras/msr-lock-md/uefi-tool.png)

1. You'll find that this string is found within a Setup folder, right-click and export as `Setup.bin`
2. Open your setup file with `ifrextract` y exportar como un archivo .txt con la terminal:

   ```
   dirreción/para/ifrextract dirección/para/Setup.bin dirección/para/Setup.txt
   ```

3. Abre el archivo txt y busca `CFG Lock, VarStoreInfo (VarOffset/VarName):` y apunta el offset right after it(ie: `0x5A4`)

![](../images/extras/msr-lock-md/cfg-find.png)

1. Corre la Modified GRUB Shell y pegar lo siguiente donde `0x5A4` es reemplazaddddo con tu value:

   ```
   setup_var 0x5A4 0x00
   ```

   Do note that variable offsets are unique not just to each motherboard but even to its firmware version. **Nunca usen un offset sin revisar.**

And you're done! Now you'll have correct CPU power management

* **Note**: Cada vez que reseteas tu BIOS you will need to flip this bit again, make sure to write it down with the BIOS version so you know which.

* **Note 2**: Algunos OEMs como Lenovo talvez tienen el variable pusta pero no te dejan desbloquearlo sin modificar físicamente el BIOS, for these situations you may need to use una herramineta como [RU](http://ruexe.blogspot.com/): [CFG LOCK/Unlocking - Alternative method](https://www.reddit.com/r/hackintosh/comments/hz2rtm/cfg_lockunlocking_alternative_method/)
