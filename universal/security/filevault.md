# FileVault

FileVault es la builtin drive encryption de macOS, y su compatibilidad con OpenCore es muchísimo mejor que los drivers legacy de Clover.

Para empezar, necesitas estos drivers .efi:

* OpenRuntime.efi
  * [OpenUsbKbDxe.efi](https://github.com/acidanthera/OpenCorePkg/releases) para usarios de DuetPkg(sistemas sin UEFI)

**No uses VirtualSMC.efi con OpenCore, ya already baked inside**. Sin embargo necesitas VirtualSMC.kext aún

Ajustes en tu config.plist:

* Misc -> Boot
  * `PollAppleHotKeys` set to YES(aunque no es necesario puede ser útil)
* Misc -> Security
  * `AuthRestart` set to YES(Activa Authenticated restart para FileVault 2 así que no necesitas la contrasenna después de reiniciar. Se trata como un riesgo de seguridad así que es opccional)
* NVRAM -> Add -> 4D1EDE05-38C7-4A6A-9CC6-4BCCA8B38C14
  * `UIScale` set to `02` for high resolution small displays
* UEFI -> Input
  * `KeySupport` set to YES(Only when using OpenCore's builtin input, usarios de OpenUsbKbDxe lo deben evitar)
* UEFI -> Output
  * `ProvideConsoleGop` to YES
* UEFI -> ProtocolOverrides
  * `FirmwareVolume` set to YES
  * `HashServices` set to YES para Broadwell y anterior(esto incluye X99), se necesita para sistemas con SHA-1 hashing roto
  * `AppleSmcIo` set to YES(esto succc VirtualSMC.efi)
* UEFI -> Quirks
  * `RequestBootVarRouting` set to YES
  * `ExitBootServicesDelay` set to `3000`-`5000` si tienes el error `Still waiting for root device` en Aptio IV firmwares(Broadwell y anterior)

Con todo esto, puedes activar FileVault como un mac normal en `System Preferences -> Security & Privacy -> FileVault`

Para problemas de la UI, dirígete a [Fixing Resolution and Verbose](../../cosmetic/verbose.md)