# Usar Bootstrap.efi



So con OpenCore 0.5.8 y posterior, tenemos un neat little archivo dentro nuestra carpeta EFI/OC/Bootstrap que es Bootstrap.efi. Lo que nos deja acer es agregar OpenCore al menú de arranque de nuestra motherboard y evitar problemas cuando sea Windows o Linux intentan a sobreescribir el archivo BOOTx64.efi que puede ocurrir durante las actualizaciones y completamente eliminar any manera de arrancar OpenCore.

## Preparación

So para empezar necesitamos lo siguiente:

* [OpenCore 0.5.8 o posterior](https://github.com/acidanthera/OpenCorePkg/releases)
  * Verifica que tienes EFI/OC/Bootstrap/Bootstrap.efi
* Ajustes en config.plist:
  * Misc -> Security -> BootProtect -> Bootstrap
  * UEFI -> Quirks -> RequestBootVarRouting -> True
* [OpenShell](https://github.com/acidanthera/OpenCorePkg/releases)
  * Bundled con OpenCore
  * Remember to add this to both EFI/OC/Tools y config.plist -> Misc -> Tools
  * Esto es principalmente para hacer troubleshooting
  
## Booting

So once you've got the prerequisites out of the way, we're ready to boot! So what the first boot with these settings enabled is create a new boot option in our BIOS(Boot9696) and every boot after this will update the entry making sure it's correct. This now allows us to either remove BOOTx64.efi or not worry about it when other OSes overwrite this file.

Si niguna nueva opción de boot es creada, puedes can go down y seguir los pasos de troubleshooting y agregarlo manualmente. But triple check the above settings are correct en tu sistema.
  
## Troubleshooting

Esta es principalmente una mini-guía en caso de que BootProtect no funcuone o si quiserias hacerlo manualmente.

* [Verificar que la entrada de Bootstrap fue aplicada](#verifcar-que-la-entrada-de-bootstrap-fue-aplicada)
* [Eliminar la entrada de Bootstrap desde el BIOS](#eliminar-la-entrada-de-bootstrap-desde-el-bios)

### Verificar que la entrada de Bootstrap fue aplicada

For those wanting to verify that the entry was applied in OpenCore, activen logging(dirígense a [OpenCore Debugging](https://dortania.github.io/OpenCore-Install-Guide/troubleshooting/debug.html)) and check for entries similar to these:

```
OCB: Have existing option 1, valid 1
OCB: Boot order has first option as the default option
```

### Elimar la entrada de Bootstrap desde el BIOS

Because the Bootstrap entry is a protected entry when resetting NVRAM, you'll need to set certain settings:

* Misc -> Security -> AllowNvramReset -> true
* Misc -> Security -> BootProtect -> None

Cuando has puesto estos 2 ajustes en tu config.plist, luego puedes reiniciar en el picker de OpenCore y seleccionar `Reset NVRAM`
