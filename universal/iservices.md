# Arreglar iMessage y otros servicios con OpenCore





Esta página es para ellos que tienen problemas con iMessage y otros iServices, esta es una guía muy básica así que no will go as in-depth into the issues as some other guides. This specific guide is a translation and reinterpretation of the AppleLife Guide on fixing iServices: [Как завести сервисы Apple - iMessage, FaceTime, iCloud](https://applelife.ru/posts/727913)

**Nota**: Tú y solamente tú sos responsable para tu AppleID, lee la guía con mucho cuidado and take toda la responsibilidad if you screw up. Dortania y otras guías no son responsables por lo que haces **tu**.

## Generar un nuevo Serial

Descarga [GenSMBIOS](https://github.com/corpnewt/GenSMBIOS) y selcciona opcíon 1 para descargar MacSerial y despues la 3a opción 3 to para generar unos nuevos serials. Lo que buscamos es un serial válido que actualmente no tiene una registered purchase date.

Tip: `iMacPro1,1 10` will print 10 serials, this will save you some time on generating

![](../images/post-install/iservices-md/serial-list.png)

Ahora digita el serial en la [Apple Check Coverage page](https://checkcoverage.apple.com/), vas a conseguir 1 de 3 respuestas:

We’re sorry, but this serial number isn’t valid |  Valid Purchase date | Purchase Date not Validated
:-------------------------:|:-------------------------:|:-------------------------:
![](../images/post-install/iservices-md/not-valid.png) | ![](../images/post-install/iservices-md/valid.png) |  ![](../images/post-install/iservices-md/no-purchase.png)

La última es la que queremos, ya que queremos un serial verdadero que actualmente no le pertence a nadie. Ahora podemos agregar los otros valores a nuestra config.plist -> PlatformInfo -> Generic:

* Type = SystemProductName
* Serial = SystemSerialNumber
* Board Serial = MLB
* SmUUID = SystemUUID

**Nota**:  "We’re sorry, but this serial number isn’t valid. Please check your information and try again." funciona para muchos usarios también, pero ten en cuenta que si you've had a bad track record with Apple/iServices es probable que necesitas una serie con "Purchase Date not Validated". Otherwise there may be suspicion

**Nota 2**: Usar un serial con "Purchase Date not Validated:" puede causar problemas más adelante si otra sistema del misma serial ever sea activada, for initial setup it can help alleviate issues with your account but in the long run un serial inválido puede ser la opción más segura.

**Nota 3**: Digitar demasiados serials may result in your access being denied to Apple Check Coverage page, para evitar esta limitación it's advised to use a VPN o [tor browser](https://www.torproject.org/download/) o cualquier servicio que te deja cambiar/esconder tu dirección IP.

## Arreglar En0

Para empezar, descarga [Hackintool](https://www.tonymacx86.com/threads/release-hackintool-v3-x-x.254559/) ([Github link](https://github.com/headkaze/Hackintool)) y vete para System -> Peripherals (Info -> Misc en versiones más antiguas de Hackintool)

Aquí en Network Interfaces (ícono de una tarjeta NIC), busca `en0` en `BSD` y check si el dispostivo tiene un check mark under Builtin. If there is a check mark, salta a la sección Arreglar ROM otherwise continue reading.

* **Nota**: en0 puede ser either Wifi, ethernet or even Thunderbolt.

> ¿!¿!Y si yo no tengo En0?!?

Entonces, queremos resetear macOS así que puede reconstruir las interfaces, abre la terminal y corre lo siguiente:

```
sudo rm /Library/Preferences/SystemConfiguration/NetworkInterfaces.plist
sudo rm /Library/Preferences/SystemConfiguration/preferences.plist
```

Cuando lo hayas hecho, reinicia la compu y revísalo de nuevo.

Si esto no funciona, agrega [NullEthernet.kext](https://bitbucket.org/RehabMan/os-x-null-ethernet/downloads/) y [ssdt-rmne.aml](https://github.com/RehabMan/OS-X-Null-Ethernet/blob/master/ssdt-rmne.aml) a tu EFI y config.plist en Kernel -> Add and ACPI -> Add respectively. La SSDT ya esta compilada así que no tienes que hacer nada más, reminder que los archivos compilados tienen la extensión .aml y los con .dsl son source code.

![Find if set as Built-in](../images/post-install/iservices-md/en0-built-in-info.png)

Ahora vete a la pestaña PCI de Hackintool y exportar tus PCI DeviceProperties, esto creará una pcidevices.plist en tu escritorio

![Exporta PCI address](../images/post-install/iservices-md/hackintool-export.png)

Ahora buscar en la pcidevices.plist y encontrar la PciRoot de tu controlador de ethernet. Para nosotros, esto sería `PciRoot(0x0)/Pci(0x1f,0x6)`

![Copia PciRoot](../images/post-install/iservices-md/find-en0.png)

Ahora con la PciRoot, en tu config.plist -> DeviceProperties -> Add y apply the property `built-in` con el type `Data` y value `01`

![Agrega a config.plist](../images/post-install/iservices-md/config-built-in.png)

## Arreglar ROM

Esta es una sección que se les han olvidado a muchos, pero se encuentra en tu config.plist en PlatformInfo -> generic -> ROM

Para encontrar tu real MAC Address/ROM value, puedes buscarlo en varios lugares:

* BIOS
* macOS: System Preferences -> Network -> Ethernet -> Advanced -> MAC Address
* Windows: Settings -> Network & Internet -> Ethernet -> Ethernet -> Physical MAC Address

* **Nota**: en0 puede ser either Wifi, ethernet or even Thunderbolt, adapt the above example to your situation.

Algunos usarios have even gone as far as using real Apple MAC Address dumps para sus configs, para esta guía vamos a usar nuestra MAC Address verdadera pero ten en cuenta que esta es otra opción disponible.

Cuando la agregas a la config, `c0:7e:bf:c3:af:ff` tiene que ser escrita como `c07ebfc3afff` ya que el tipo `Data` cannot accept colons(`:`).

![](../images/post-install/iservices-md/config-rom.png)

## Verificar NVRAM

Algo más que se les olviden a muchos usarios de los iServices es que la NVRAM es crucial para su función, la razón por la que es que la llaves/claves de iMessage etc son guardadas en la NVRAM. Sin NVRAM, iMessage no puede ver ni guardar las claves.

Entonces tenemos que verificar si la NVRAM funciona, regardless if "it should work" as some firmwares can be more of a pain than others.

Por favor refiérete a la sección [NVRAM Emulada](../misc/nvram.md) de la guía de OpenCore para verificar si tienes NVRAM funcionando y cóno emularla si está rota.

## Limpiar intentos anteriores

Esto es importante para ellos que ya intentaron a configurar iMessage but failed, para empezar make sure your NVRAM has been cleared. Puedes activar esta opción en el bootpicker en tu config en config.plist -> Misc -> Security -> AllowNvramReset.

Luego abre la terminal y corre lo siguiente:

```
sudo rm -rf ~/Library/Caches/com.apple.iCloudHelper*
sudo rm -rf ~/Library/Caches/com.apple.Messages*
sudo rm -rf ~/Library/Caches/com.apple.imfoundation.IMRemoteURLConnectionAgent*
sudo rm -rf ~/Library/Preferences/com.apple.iChat*
sudo rm -rf ~/Library/Preferences/com.apple.icloud*
sudo rm -rf ~/Library/Preferences/com.apple.imagent*
sudo rm -rf ~/Library/Preferences/com.apple.imessage*
sudo rm -rf ~/Library/Preferences/com.apple.imservice*
sudo rm -rf ~/Library/Preferences/com.apple.ids.service*
sudo rm -rf ~/Library/Preferences/com.apple.madrid.plist*
sudo rm -rf ~/Library/Preferences/com.apple.imessage.bag.plist*
sudo rm -rf ~/Library/Preferences/com.apple.identityserviced*
sudo rm -rf ~/Library/Preferences/com.apple.ids.service*
sudo rm -rf ~/Library/Preferences/com.apple.security*
sudo rm -rf ~/Library/Messages
```

## Verifying your work one last time

Descarga [macserial](https://github.com/acidanthera/MacInfoPkg/releases) y corre lo siguiente:

```
dirección/para/macserial -s
```

This will provide us with a full rundown of our system, verify that what is presented matches up with your work.

## Limpiar tu AppleID

* Remove all devices from your AppleID: [Manage your devices](https://appleid.apple.com/account/manage)
* Enable 2 Factor-Auth
* Eliminar todos los iServices desde Keychain, por ejemplo:

```
ids: identity-rsa-key-pair-signature-v1
ids: identity-rsa-private-key
ids: identity-rsa-public-key
ids: message-protection-key
ids: message-protection-public-data-registered
ids: personal-public-key-cache
iMessage Encryption Key
iMessage Signing Key
com.apple.facetime: registrationV1
etc ...
```

And a final layer of precaution is to make a new AppleID to play with, this makes sure that if you do end up blacklisting your account that it's not your main.

**Tip**:  Adding a payment card to the account and having a decent amount of purchases can also help. While not concrete, you can think of an AppleID as a credit score where the better an Apple customer you are the more likely they won't have activation issues or get an easier pass with AppleSupport

## Customer Code error

Well mate, you've done it. You blacklisted your AppleID. The fix is simple but not pretty, **you MUST call Apple**. Otherwise, there is no proceeding besides using a new account. Adding a payment card before calling can help legitimize the account so it doesn't seem as much like a bot.

![](../images/post-install/iservices-md/blacklist.png)
