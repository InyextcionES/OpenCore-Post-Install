# OpenCore beauty treatment



Principlamente esta guiía cubre:

* [Configuarar la GUI de OpenCore](#configurar-la-gui-de-opencore)
* [Configurar el sonido del arranque](#configurar-el-sonido-del-arranque-usando-audiodxe)

## Configurar la GUI de OpenCore

Para empezar, necesitamos OpenCore 0.5.7 o posterior dado que estas versiones tienen la GUI incluida con el resto de los archivos. Si aún usas una versión antigua, recomendamos que actualices: [Actualizar OpenCore](../universal/update.md)

Cuando lo hayas hecho, necestiaremos lo siguiente:

* [Binary Resources](https://github.com/acidanthera/OcBinaryData)
* [OpenCanopy.efi](https://github.com/acidanthera/OpenCorePkg/releases)
  * Nota: OpenCanopy.efi tiene que ser de la misma version que tus archivos de OpenCore, ya que versiones incompatibles pueden casuar problemas con el arranque

Cuando hayas conseguido estos, los agregaremos a nuestra partición EFI:

* Agrega la [carpeta Resources](https://github.com/acidanthera/OcBinaryData) a EFI/OC
* Agrega OpenCanopy.efi a EFI/OC/Drivers

![](../images/extras/gui-md/folder-gui.png)

Ahora en nuestra config.plist, tenemos 2 cosas que arreglar:

* `Misc -> Boot -> PickerMode`: `External`
* `Misc -> Boot -> PickerAttributes`:`1`
  * Esto activa .VolumeIcon.icns reading off the drive, this is how macOS installer icons work
    * 0x0008: This is another value which allows for alternative icons, such as the legacy GUI found on legacy Macs. This can be combined with `1` for both legacy GUI and custom drive icons(PickerAttributes: `9`)
    * Se encuentran otros ajustes de PickerAttributes en [Configuration.pdf](https://github.com/acidanthera/OpenCorePkg/blob/master/Docs/Configuration.pdf)
* `UEFI -> Drivers` y agrega OpenCanopy.efi

Cuando guardes estos cambios, puedes reinicar la compu y encontrar una GUI re similar con la de los Macs:

![Credit to vit9696](../images/extras/gui-md/gui.png)

## Configurar el sonido del arranque usando AudioDxe

Para empezar, necesitamos unas cosas:

* Onboard audio output
  * USB DACs no son compatibles
  * GPU audio out is a hit or miss
* [AudioDxe](https://github.com/acidanthera/OpenCorePkg/releases) en EFI/OC/Drivers y UEFI -> Drivers
* [Binary Resources](https://github.com/acidanthera/OcBinaryData)
  * Agrega la carpeta de Resources a EFI/OC, just like we did with the OpenCore GUI section
  * Para los que no tengan tanto espacio, `OCEFIAudio_VoiceOver_Boot.wav` es el único que se requiere para el  Boot-Chime
* Debug versión de OpenCore con logging activado
  * Dirígete a [OpenCore Debugging](https://inyextciones.github.io/OpenCore-Install-Guide/troubleshooting/debug.html) para más información

**Configurar NVRAM**:

* NVRAM -> Add -> 7C436110-AB2A-4BBB-A880-FE41995C9F82:
  * `SystemAudioVolume | Data | 0x46`
  * Esto es el volumen del sonido del arranque y el lector de pantalla, ten en cuenta que es hexadecimal así que es igual que `70` en decimal

**Configurar UEFI -> Audio:**

* **AudioCodec:**
  * Codec address de tu controlador de audio
  * Para encontrar la tuya:
    * Abre [IORegistryExplorer](https://github.com/khronokernel/IORegistryClone/blob/master/ioreg-302.zip) -> HDEF -> AppleHDAController -> IOHDACodecDevice y busca `IOHDACodecAddress`
    * ex: `0x0`
      * También lo puedes encontrar usando la terminal(Note if multiple show up, usa el vendor ID para encontrar el dispositivo correcto)l:

 ```sh
 ioreg -rxn IOHDACodecDevice | grep VendorID   // List all possible devices
 ```

 ```sh
 ioreg -rxn IOHDACodecDevice | grep IOHDACodecAddress // Grab the codec address
 ```

* **Audio Device:**
  * PciRoot del controlador de audio
  * Corre [gfxutil](https://github.com/acidanthera/gfxutil/releases) para encontrar la dirreción:
    * `/dirección/para/gfxutil -f HDEF`
    * ex: `PciRoot(0x0)/Pci(0x1f,0x3)`

* **AudioOut:**
  * The specific output of your Audio controller, easiest way to find the right one is to go through each one(from 0 to N - 1)
  * ex: `2`
    * You can find all the ones for your codec in the OpenCore debug logs:

```
06:065 00:004 OCAU: Matching PciRoot(0x0)/Pci(0x1F,0x3)/VenMsg(A9003FEB-D806-41DB-A491-5405FEEF46C3,00000000)...
06:070 00:005 OCAU: 1/2 PciRoot(0x0)/Pci(0x1F,0x3)/VenMsg(A9003FEB-D806-41DB-A491-5405FEEF46C3,00000000) (5 outputs) - Success
```

* **AudioSupport:**
  * Set this to `True`

* **MinimumVolume:**
  * Volume level from `0` to `100`
  * To not blow the speakers, set it to `70`
  * Note boot-chime will not play if MinimumVolume is higher than `SystemAudioVolume` that we set back in the `NVRAM` section

* **PlayChime:**
  * Set this to `True`

* **VolumeAmplifier:**
  * The Volume amplification, value will differ depending on your codec
  * Formula is as follows:
    * (SystemAudioVolume * VolumeAmplifier)/100 = Raw Volume(but cannot exceed 100)
    * ex: (`70` x `VolumeAmplifier`)/`100` = `100`  -> (`100` x `100`) / `70` = VolumeAmplifier = `142.9`(we'll round it to `143` for simplicity)

Once done, you should get something like this:

![](../images/extras/gui-md/audio-config.png)

**Note for visually impaired**:

* ¿OpenCore no los ha olvidado! Con AudioDxe configurado, puedes activar audio en el picker y FileVault VoiceOver con estos 2 ajustes:
  * `Misc -> Boot -> PickerAudioAssist -> True` para activar audio en el picker
  * `UEFI -> ProtocolOverrides -> AppleAudio -> True` para activar FileVault VoiceOver
    * Diríjanse a [Seguridad y FileVault](../universal/security.md) para configurar y activar FileVault
