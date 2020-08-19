# NVRAM Emulada





Esta sección es para los que no tienen NVRAM nativo. El hardware más común que tiene NVRAM incompatible con macOS son X99 y ciertos chipsets de la serie X299:

* X99
* X299

Para B360, B365, H310, H370, Z390, usen [SSDT-PMC](https://dortania.github.io/Getting-Started-With-ACPI/) y ponerlo en EFI/OC/ACPI y config.plist -> ACPI -> Add. Para más información about crear y compilar los SSDTs, dirígete a [**Getting started with ACPI**](https://dortania.github.io/Getting-Started-With-ACPI/)

**Note**: CPUs de la 10a generación no necesitan esta SSDT

## Cleaning out the Clover gunk

So some may not have noticed but Clover may have installed RC scripts into macOS for proper NVRAM emulation. Esto es un problema ya que it conflicts con la emulación de OpenCore.

Files to delete:

* `/Volumes/EFI/EFI/CLOVER/drivers64UEFI/EmuVariableUefi-64.efi`
* `/Volumes/EFI/nvram.plist`
* `/etc/rc.clover.lib`
* `/etc/rc.boot.d/10.save_and_rotate_boot_log.local`
* `/etc/rc.boot.d/20.mount_ESP.local`
* `/etc/rc.boot.d/70.disable_sleep_proxy_client.local.disabled`
* `/etc/rc.shutdown.d/80.save_nvram_plist.local​`

If folders are empty then delete them as well:

* `/etc/rc.boot.d`
* `/etc/rc.shutdown.d​`

## Verifying if you have working NVRAM

Para empezar, abre la terminal y corre the following one line at a time:

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

If nothing returns then your NVRAM is not working. If a line containing `myvar test` returns, la NVRAM funciona.

Note: `nvram -c` requires SIP to be off, an alternative is to wipe NVRAM at the boot menu. Reminder you'll need `Misc -> Security -> AllowNvramReset -> YES`

## Activar la NVRAM emulada (con nvram.plist)

Para activar la NVRAM emulada, necesitas puestan estas 3 cosas:

![](../images/post-install/nvram-md/nvram.png)

Dentro de la config.plist:

* **Booter**:
  * `DisableVariableWrite`: set to `NO`
* **Misc -> Security**:
  * `ExposeSensitiveData`: set to `0x3`
* **NVRAM**:
  * `LegacyEnable`: set to `YES`
  * `LegacyOverwrite` set to `YES`
  * `LegacySchema`: NVRAM variables set(OpenCore compares these to the variables present in nvram.plist)
  * `WriteFlash`: set to `YES`

Dentro tu EFI:

* `OpenRuntime.efi` driver(this is needed for proper sleep, shutdown and other services to work correctly

Now grab the ['LogoutHook.command'](https://github.com/acidanthera/OpenCorePkg/releases)(Inside `/Utilities/LogoutHook/`) and place it somewhere safe (e.g. within your user directory, as shown below):

`/Users/(your username)/LogoutHook/LogoutHook.command`

Abre la terminal y corre lo siguiente:

`sudo defaults write com.apple.loginwindow LogoutHook /Users/(your username)/LogoutHook/LogoutHook.command`

And voila! Tienes NVRAM emulada!

Do keep in mind this requires the `nvram` command to support the `-x` flag for this to work correctly which is unavailable on macOS 10.12 and below. If you are installing macOS 10.12 or earlier, you need to copy `nvram.mojave` into the same folder as `LogoutHook.command`, which fixes this by invoking it instead of the system `nvram` command.

Something else to note is that macOS is only able to read nvram.plist but it won't be able to write to nvram.plist unless running the shutdown process. This means running the test above won't work
