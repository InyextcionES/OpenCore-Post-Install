# Mover OpenCore desde la USB al disco de macOS



## Abrir OpenCore desde la USB

Entonces para empezar, primero quermos abrir OpenCore desde nuestro instalador. Para hacer esto, vamos a usar una neat herramienta de CorpNewt llamada [MountEFI](https://github.com/corpnewt/MountEFI)

Para este ejemplo, we'll assume que tu USB es nombrada `Install macOS Catalina`:

![](../images/post-install/oc2hdd-md/usb-mount.png)

Once the EFI's mounted, we'll want to grab our EFI folder on there and keep in a safe place. Luego queremos **ejectar la EFI del disco USB** as having multiple EFIs montadas can confuse macOS sometimes, best practice is to keep only 1 EFI mounted at a time(you can eject just the EFI, the drive itself doesn't need to be removed)

**Nota**: Instaladors hecho con MakeInstall.bat de gibMacOS en Windows will default a un Master Boot Record(MBR) partition map, this means there is no dedicated EFI partition instead being the `BOOT` partition that mounts by default en macOS.

![](../images/post-install/oc2hdd-md/hdd-mount.png)

Now with this done, vamos a montar nuestro disco de macOS. Con macOS Catalina, en realidad macOS es partitioned entre 2 volumes: System Partition y User Partition. Esto significa que MountEFI may report multiple drives en su picker pero cada partición aún compartirá la misma EFI(La espec UEFI solamente permite 1 EFI por cada disco). Puedes revisar si es el mismo disco por ver disk**X**sY (Y es el número de la partición)

![](../images/post-install/oc2hdd-md/hdd-clean.png)

Cuando montas la EFI de tu disco principal, a veces encuentras una carpeta llamada `APPLE`, esta es usada para actualizar el firmware en Macs reales pero no tiene ningún efecto para nuestro hardware. Puedes eliminar todo de la partición EFI y replace it con la que tienes guardado en tu USB

## Notas especiales para usarios legacy

When transferring over your EFI, todavía son sectores de boot que tienen que ser escritos para que tu non-UEFI BIOS lo pueda encontrar. Por lo tanto, no te olvides correr [`BootInstall.command`](https://inyextciones.github.io/OpenCore-Install-Guide/extras/legacy.html) de nuevo en tu disco para macOS
