# NVRAM Emulada





Esta sección es para los que no tienen NVRAM nativa. El hardware más común que tiene NVRAM incompatible con macOS es X99 y ciertos chipsets de la serie X299:

* X99
* X299

Para B360, B365, H310, H370, Z390, usa [SSDT-PMC](https://dortania.github.io/Getting-Started-With-ACPI/) y ponlo en EFI/OC/ACPI y config.plist -> ACPI -> Add. Para más información de crear y compilar las SSDTs, dirígete a [**Getting started with ACPI**](https://dortania.github.io/Getting-Started-With-ACPI/)

**Nota**: CPUs de la 10a generación no necesitan esta SSDT

## Eliminar la basura de Clover

So some may not have noticed pero Clover ha instalado scripts RC en macOS para emulación de NVRAM. Esto es un problema ya que crea conflicto con la emulación de OpenCore.

Archivos que eliminar:

* `/Volumes/EFI/EFI/CLOVER/drivers64UEFI/EmuVariableUefi-64.efi`
* `/Volumes/EFI/nvram.plist`
* `/etc/rc.clover.lib`
* `/etc/rc.boot.d/10.save_and_rotate_boot_log.local`
* `/etc/rc.boot.d/20.mount_ESP.local`
* `/etc/rc.boot.d/70.disable_sleep_proxy_client.local.disabled`
* `/etc/rc.shutdown.d/80.save_nvram_plist.local​`

Si estas carpetas son vacias, elimínalas también:

* `/etc/rc.boot.d`
* `/etc/rc.shutdown.d​`

## Verificar si la NVRAM funciona

Para empezar, abre la terminal y corre estás líneas una a una:

```sh
sudo -s
sudo nvram -c
sudo nvram myvar=test
exit
```

Ahora reinicía y corre esto:

```sh
nvram -p | grep -i myvar
```

Si no returns nada, tu NVRAM no funciona. Si una línea con `myvar test` returns, la NVRAM funciona.

Nota: `nvram -c` requiere la SIP desactivada, un alternativo resetear la NVRAM en el menú de boot. Para esto necesitas `Misc -> Security -> AllowNvramReset -> YES`

## Activar la NVRAM emulada (con nvram.plist)

Para activar la NVRAM emulada, necesitas puestan estas 3 cosas:

![](../images/post-install/nvram-md/nvram.png)

Dentro de la config.plist:

* **Booter**:
  * `DisableVariableWrite`: `NO`
* **Misc -> Security**:
  * `ExposeSensitiveData`: `0x3`
* **NVRAM**:
  * `LegacyEnable`: `YES`
  * `LegacyOverwrite`: `YES`
  * `LegacySchema`: variables de NVRAM puestas(OpenCore compara esta a las variables presente en nvram.plist)
  * `WriteFlash`: `YES`

Dentro tu EFI:

* `OpenRuntime.efi` driver(necesario para que suspensión, shutdown y otros servicios funcionen correctamente

Ahora descarga la ['LogoutHook.command'](https://github.com/acidanthera/OpenCorePkg/releases)(Dentro `/Utilities/LogoutHook/`) y guardarla somewhere safe (p.ej. en tu user directory, as shown below):

`/Users/(tu username)/LogoutHook/LogoutHook.command`

Abre la terminal y corre lo siguiente:

`sudo defaults write com.apple.loginwindow LogoutHook /Users/(your username)/LogoutHook/LogoutHook.command`

¡Y voila! Tienes NVRAM emulada!

Ten en cuentra que esto requiere que la command `nvram` command sea compatible con el parámetro `-x` para funcionar correctamente, y no es disponible en y macOS 10.12 y anterior. Si vas a instalar macOS 10.12 o anterior, tienes que copiar `nvram.mojave` a la misma carpeta que `LogoutHook.command`, que arregla esto por correr esta sin la command `nvram` del sistema.

Otra cosa que notar es que macOS solo puede read nvram.plist pero no puede write to nvram.plist unless running the shutdown process. Esto significa que correr el test de arriba no funciona
