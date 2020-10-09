# Vault

**¿Qué es vaulting?**

Vaulting se trata de 2 archivos, vault.plist y vault.sig:

* vault.plist: una "snapshot" de tu EFI
* vault.sig: validación de vault.plist

Se puede ver esto como secure boot para OpenCore, así que nadie lo puede modificar si tu permisión.

Los detalles específicos de vaulting es que se pone una 256 byte RSA-2048 signature de vault.plist en el OpenCore.efi. Esta clave puede ser puesta en [OpenCoreVault.c](https://github.com/acidanthera/OpenCorePkg/blob/master/Platform/OpenCore/OpenCoreVault.c) antes de compilar, o usando `sign.command` si ya tienes compilado OpenCore.efi.

Ten en cuenta que no se haré vault de nvram.plist así que usarios con NVRAM emulada ya tienen el riesgo de alqguien agregando/eliminado cieros variables de la NVRAM

**Ajustes en tu config.plist**:

* `Misc -> Security -> Vault`:
  * `Basic`: Solo require vault.plist, principlamente usado para filesystem integrity verification
  * `Secure`: Requiere ambos vault.plist y vault.sig, usado para mejor seguridad ya que cambios de vault.plist requiere una signature nueva
* `Booter -> ProtectSecureBoot:` `YES`
  * Necesario para los firmwares Insyde para arreglar secure boot keys y denunciar violations

**Configurar vault**:

Descarga OpenCorePkg y abre la carpeta `CreateVault`, adentro encontramos lo siguiente:

* `create_vault.sh`
* `RsaTool`
* `sign.command`

El último es el que nos importa: `sign.command`

Cuando corremos esto, busca la carpeta EFI ubicada beside nuestra carpeta Utilities, así que queremos mover nuesta EFI adentro la carpeta OpenCorePkg, o mover Utilities adentro nuesta carpeta EFI:

![](../../images/post-install/security-md/sign.png)

Ahora estamos listos para correr `sign.command`:

![](../../images/post-install/security-md/sign-demo.png)

**Desactivar Vault después de configurarlo**:

If you're doing heavy troubleshooting o si tengas que desactivar Vault, las cosas principales que cambiar:

* Grab a new copy of OpenCore.efi
* `Misc -> Security -> Vault` set to Optional
* Remove `vault.plist` and `vault.sig`
