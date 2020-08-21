# Usar Bootstrap.efi



Con OpenCore 0.5.8 y posterior, tenemos un archivo re útil dentro de nuestra carpeta EFI/OC/Bootstrap que es Bootstrap.efi. Lo que nos deja acer es agregar OpenCore al menú de arranque de nuestra motherboard y evitar problemas cuando ya sea Windows o Linux intentan a sobreescribir el archivo BOOTx64.efi que puede ocurrir durante las actualizaciones y completamente eliminar cualquier manera de arrancar OpenCore.

## Preparación

Entonces para empezar necesitamos lo siguiente:

* [OpenCore 0.5.8 o posterior](https://github.com/acidanthera/OpenCorePkg/releases)
  * Verifica que tienes EFI/OC/Bootstrap/Bootstrap.efi
* Ajustes en config.plist:
  * Misc -> Security -> BootProtect -> Bootstrap
  * UEFI -> Quirks -> RequestBootVarRouting -> True
* [OpenShell](https://github.com/acidanthera/OpenCorePkg/releases)
  * Incluído con OpenCore
  * Acordá agregar esta a ambas EFI/OC/Tools y config.plist -> Misc -> Tools
  * Esto es principalmente para ayudar en troubleshooting
  
## Arranque

So once you've got the prerequisites out of the way, estamaos listo a bootear! Lo que pasa durante el primer arranque con estos ajustes activados es la creación de una nueva opción de boot en nuestra BIOS(Boot9696) y cada siguiente arrangle actualizarán esta entrada, verificando que es correcta. Lo que nos deja hacer es eliminar BOOTx64.efi (o no preocuparnos cuando otros SOs sobreescriben este archivo.

Si niguna nueva opción de boot es creada, puedes seguir los pasos debajo sobre troubleshooting y agregarlo manualmente. But triple check que los ajustes de arriba son correctos en tu sistema.
  
## Troubleshooting

Esta es principalmente una mini-guía en caso de que BootProtect no funcione o si quiserias hacerlo manualmente.

* [Verificar que la entrada de Bootstrap fue aplicada](#verifcar-que-la-entrada-de-bootstrap-fue-aplicada)
* [Eliminar la entrada de Bootstrap desde el BIOS](#eliminar-la-entrada-de-bootstrap-desde-el-bios)

### Verificar que la entrada de Bootstrap fue aplicada

Para ellos que quieren verifcar que la entrada fue aplicada por OpenCore, activen logging(diríjanse a [OpenCore Debugging](https://dortania.github.io/OpenCore-Install-Guide/troubleshooting/debug.html)) y busquen entradas como estas:

```
OCB: Have existing option 1, valid 1
OCB: Boot order has first option as the default option
```

### Elimar la entrada de Bootstrap desde el BIOS

Ya que la entrada de Bootstrap es protegida cuando reseteas la NVRAM, tienes que editar estos ajustes:

* Misc -> Security -> AllowNvramReset -> true
* Misc -> Security -> BootProtect -> None

Cuando has puesto estos 2 ajustes en tu config.plist, luego puedes reiniciar en el picker de OpenCore y seleccionar `Reset NVRAM`
