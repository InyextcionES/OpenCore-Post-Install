# Apple Secure Boot

* Nota: DmgLoading, SecureBootModel y ApECID requieren [OpenCore 0.6.1](https://github.com/acidanthera/OpenCorePkg/releases) o posterior


## DmgLoading

Un ajuste muy simple que es bastante importante para la configuración de Apple Secure Boot. Este ajuste nos permite set load policy with DMGs en OpenCore. By default recomendamos que uses `Signed` pero se debe usar `Disabled` para la mejor seguridad.

Opciones posibes para `Misc -> Security -> DmgLoading`:

| Value | Comment |
| :--- | :--- |
| Any      | Allows all DMGs to load in OpenCore, however this option will cause a boot failure Apple Secure Boot is enabled |
| Signed   | Allows only Apple-signed DMGs like macOS installers to load |
| Disabled | Disables all external DMG loading, however internal recovery is still allowed with this option |

## SecureBootModel

SecureBootModel is used set the Apple Secure Boot hardware model and policy, y nos permite activar Apple Secure Boot usando cualquier SMBIOS even if el SMBIOS original no es compatible(ie. no T2 en SMBIOSes pre-2017). Activar SecureBootModel es igual que ["Medium Security"](https://support.apple.com/HT208330), para Full Security dirígete a [ApECID](#apecid)

Actualmente estas siguintes opciones son compatibles para `Misc -> Security -> SecureBootModel`:

| Value    | SMBIOS                                  | Minimum macOS Version |
| :---     | :---                                    | :---                  |
| Disabled | No model, Secure Boot will be disabled. | N/A                   |
| Default  | Currently set to j137, iMacPro1,1       | 10.13.2 (17C2111)     |
| j137     | iMacPro1,1 (December 2017)              | 10.13.2 (17C2111)     |
| j680     | MacBookPro15,1 (July 2018)              | 10.13.6 (17G2112)     |
| j132     | MacBookPro15,2 (July 2018)              | 10.13.6 (17G2112)     |
| j174     | Macmini8,1 (October 2018)               | 10.14 (18A2063)       |
| j140k    | MacBookAir8,1 (October 2018)            | 10.14.1 (18B2084)     |
| j780     | MacBookPro15,3 (May 2019)               | 10.14.5 (18F132)      |
| j213     | MacBookPro15,4 (July 2019)              | 10.14.5 (18F2058)     |
| j140a    | MacBookAir8,2 (July 2019)               | 10.14.5 (18F2058)     |
| j152f    | MacBookPro16,1 (November 2019)          | 10.15.1 (19B2093)     |
| j160     | MacPro7,1 (December 2019)               | 10.15.1 (19B88)       |
| j230k    | MacBookAir9,1 (March 2020)              | 10.15.3 (19D2064)     |
| j214k    | MacBookPro16,2 (May 2020)               | 10.15.4 (19E2269)     |
| j223     | MacBookPro16,3 (May 2020)               | 10.15.4 (19E2265)     |
| j215     | MacBookPro16,4 (June 2020)              | 10.15.5 (19F96)       |
| j185     | iMac20,1 (August 2020)                  | 10.15.6 (19G2005)     |
| j185f    | iMac20,2 (August 2020)                  | 10.15.6 (19G2005)     |

### Notas Especiales para SecureBootModel

* Generalmente `Default` is more than adequate to use however if you plan to have use this with ApECID para full security, recomendamos que uses a proper value(ie. más similar a tu SMBIOS o las versiones de macOS que tengas la intencion de usar) dado que es posible que el `Default` value va a ser cambiado en el futuro.
* La lista de cached drivers may be diferente, resulting in the need to change the list of Added or Forced kernel drivers. 
  * ie. IO80211Family cannot be injected in this case.
* Unsigned and several signed kernel drivers cannot be used
  * This includes Nvidia's Web Drivers in 10.13
* System volume alterations on operating systems with sealing, como macOS 11, may result in the operating system being unbootable. 
  * Si tienes la intención de desactivar los snapshots APFS de macOS, ten en cuenta que tienes que desactivar SecureBootModel también
* Certain boot errors are more likely to be triggered with Secure Boot enabled that were previously not required
  * Commonly seen with certain APTIO IV systems where they may not require IgnoreInvalidFlexRatio and HashServices initially however Secure Boot does.
* On older CPUs (ie. antes de Sandy Bridge) activar Apple Secure Boot might cause slightly slower loading by up to 1 second
* Sistemas operativos lanzado antes de Apple Secure Boot (ie. macOS 10.12 o anteriorer) todavía arrancará hasta que el UEFI Secure Boot sea activado. Esto es para que, 
  * Esto es porque Apple Secure Boot supone que el SO es incompatible y así el firmware le tratará como si fuese Microsoft Windows

## ApECID

ApECID es usado como Apple Enclave Identifier, y lo qué significa es que nos deja usar nuestros Apple Secure Boot identifiers personalizados y conseguir ["Full Security"](https://support.apple.com/HT208330) as per Apple's secure boot page(cuando se usa con SecureBootModel).

Para generar tu propio valor ApECID, necesitas un tipo de cryptographically secure random number generator that will output a 64-bit integer. Por debajo se encuentra un ejemplo que puedes correr su tienes [Python 3](https://www.python.org/downloads/) instalado en tu sistema:

```py
python3 -c 'import secrets; print(secrets.randbits(64))'
```

With this unique 64-bit int, lo puedes poner en Misc -> ApECID en tu config.plist


However before setting ApECID, there's a few things we need to note:

* Instalaciones nuevas con ApECID set to a non-zero value will require a network connection at install time para verificación
* SecureBootModel should have a defined value instead of `Default` to avoid issues if the value were to change in later OpenCore versions.
* Pre-existing installs will need to use bless, for this you'll need to first reboot into recovery and run the following command(Replace Macintosh HD with your system's volume name):


```sh
 bless bless --folder "/Volumes/Macintosh HD/System/Library/CoreServices" \
    --bootefi --personalize
```

And something to note when reinstalling the OS is that you may receive "Unable to verify macOS" error message. To work around his issue, you'll want to allocate a dedicated RAM disk of 2 MBs for macOS personalization by entering the following commands in the macOS recovery terminal before starting the installation:

```sh
disk=$(hdiutil attach -nomount ram://4096) 
diskutil erasevolume HFS+ SecureBoot $disk 
diskutil unmount $disk 
mkdir /var/tmp/OSPersonalizationTemp 
diskutil mount -mountpoint /var/tmp/OSPersonalizationTemp $disk
```