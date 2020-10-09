# OpenCore beauty treatment



Principlamente esta guía cubre:

* [Configuarar la GUI de OpenCore](#configurar-la-gui-de-opencore)
* [Configurar el sonido del arranque](#configurar-el-sonido-del-arranque-usando-audiodxe)

## Configurar la GUI de OpenCore

Para empezar, necesitamos OpenCore 0.5.7 o posterior dado que estas versiones tienen la GUI incluida con el resto de los archivos. Si aún usas una versión antigua, recomendamos que actualices: [Actualizar OpenCore](../universal/update.md)

Cuando lo hayas hecho, necestiamos lo siguiente:

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
  * Esto activa el escaneo de .VolumeIcon.icns del disco, y es cómo los íconos del instalador de macOS installer funcionan
    * 0x0008: Esto es otro value que permite el uso de íconos alternativos, como la GUI legacy usada por las legacy Macs. Se puede usar esto combinado con `1` para usar la GUI legacy GUI con custom íconos(PickerAttributes: `9`)
    * Se encuentran otros ajustes de PickerAttributes en [Configuration.pdf](https://github.com/acidanthera/OpenCorePkg/blob/master/Docs/Configuration.pdf)
* `UEFI -> Drivers` y agrega OpenCanopy.efi

Cuando guardes estos cambios, puedes reinicar la compu y encontrar una GUI re similar con la de los Macs:

![Crédito a vit9696](../images/extras/gui-md/gui.png)

## Configurar el sonido del arranque usando AudioDxe

Para empezar, necesitamos unas cosas:

* Salidas de audio en la motherboard
  * DACs USB son compatibles
  * Audio del GPU es re imprediciible
* [AudioDxe](https://github.com/acidanthera/OpenCorePkg/releases) en EFI/OC/Drivers y UEFI -> Drivers
* [Binary Resources](https://github.com/acidanthera/OcBinaryData)
  * Agrega la carpeta de Resources a EFI/OC, como lo que acabamos de hacer para agregar la GUI
  * Para ellos que no tengan tanto espacio, `OCEFIAudio_VoiceOver_Boot.wav` es el único archivo que es necesario para el Boot-Chime
* Versión debug de OpenCore con logging activado
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
    * p.ej.: `0x0`
      * También la puedes encontrar usando la terminal(Ten en cuenta que si hay múliplos resultados, usa el vendor ID para encontrar el dispositivo correcto)l:

 ```sh
 ioreg -rxn IOHDACodecDevice | grep VendorID   // Muestra todos los dispositivos posibles
 ```

 ```sh
 ioreg -rxn IOHDACodecDevice | grep IOHDACodecAddress // Muestra la codec address
 ```

* **Audio Device:**
  * PciRoot del controlador de audio
  * Corre [gfxutil](https://github.com/acidanthera/gfxutil/releases) para encontrar la dirreción:
    * `/dirección/para/gfxutil -f HDEF`
    * p.ej.: `PciRoot(0x0)/Pci(0x1f,0x3)`

* **AudioOut:**
  * The specific output of your Audio controller, easiest way to find the right one is to go through each one(from 0 to N - 1, where N is the number of outputs listed in your log)
  * ex: 5 outputs would translate to 0-4 as possible values
    * You can find all the ones for your codec in the OpenCore debug logs:

```
06:065 00:004 OCAU: Matching PciRoot(0x0)/Pci(0x1F,0x3)/VenMsg(A9003FEB-D806-41DB-A491-5405FEEF46C3,00000000)...
06:070 00:005 OCAU: 1/2 PciRoot(0x0)/Pci(0x1F,0x3)/VenMsg(A9003FEB-D806-41DB-A491-5405FEEF46C3,00000000) (5 outputs) - Success
```

* **AudioSupport:**
  * Pon `True`

* **MinimumVolume:**
  * Volumen de `0` a `100`
  * Para no quebrar la la altavoz, pon `70`
  * Ten en cuenta que el boot-chime no reproduce si MinimumVolume es más alto que `SystemAudioVolume` en la sección `NVRAM`

* **PlayChime:**
  * Pon `True`

* **VolumeAmplifier:**
  * La amplifición, el valor es diferente y depende de tu codec
  * La fórmula es:
    * (SystemAudioVolume * VolumeAmplifier)/100 = Raw Volume(but cannot exceed 100)
    * p.ej.: (`70` x `VolumeAmplifier`)/`100` = `100`  -> (`100` x `100`) / `70` = VolumeAmplifier = `142.9`(lo rodondeamos a `143`)

Tus ajustes deberían ser así:

![](../images/extras/gui-md/audio-config.png)

**Nota para la gente con discapacidad visual**:

* ¡OpenCore no los ha olvidado! Con AudioDxe configurado, puedes activar audio en el picker y FileVault VoiceOver con estos 2 ajustes:
  * `Misc -> Boot -> PickerAudioAssist -> True` para activar audio en el picker
  * `UEFI -> ProtocolOverrides -> AppleAudio -> True` para activar FileVault VoiceOver
    * Diríjanse a [Seguridad y FileVault](../universal/security.md) para configurar y activar FileVault
