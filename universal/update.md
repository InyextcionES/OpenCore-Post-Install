# Actualizar OpenCore y macOS





## Actualizar OpenCore

So the main things to note with updating OpenCore:

* [Releases](https://github.com/acidanthera/OpenCorePkg/releases) happen the first Monday of every month
* El [Differences.pdf](https://github.com/acidanthera/OpenCorePkg/blob/master/Docs/Differences/Differences.pdf) will tell you all the things added and removed from this version of OpenCore compared to the previous release
* The OpenCore Installation Guide will have a note in the [header](https://dortania.github.io/OpenCore-Install-Guide/) about what release version it supports

> Cómo actualizo?

So the process goes as follows:

1. **Descarga la versión má reciente de OpenCore**

* [OpenCorePkg](https://github.com/acidanthera/OpenCorePkg/releases)

2. **Monta tu EFI**

* So first, lets mount your hard drive's EFI and make a copy somewhere safe with [MountEFI](https://github.com/corpnewt/MountEFI). We won't be updating the drive's EFI at first, instead we'll be grabbing a spare USB to be our crash dummy. This allows us to keep a working copy of OpenCore in case our update goes south

* El USB tiene que ser formateado como GUID. Reason for this is that GUID will automatically create an EFI partition, though this will be hidden by default so you'll need to mount it with MountEFI.

![](../images/post-install/update-md/usb-erase.png)

* Now you can place your OpenCore EFI on the USB

![](../images/post-install/update-md/usb-folder.png)

3. **Replace the OpenCore files with the ones you just downloaded**

* Los más importantes que actualizar:

  * `EFI/BOOT/BOOTx64.efi`
  * `EFI/OC/OpenCore.efi`
  * `EFI/OC/Drivers/OpenRuntime`(**No olivdes este, OpenCore no va a arrancar con versions diferentes**)

* También es una buena oportunidad para actualizar los otros update other drivers, these are just the ones that **must** be updated para arrancar boot correctamente

![](../images/post-install/update-md/usb-folder-highlight.png)

4. **Compara tu config.plist to that of la nueva Sample.plist**

* With this, there's a couple ways to do this:

  * [OCConfigCompare](https://github.com/corpnewt/OCConfigCompare) to compare between the sample.plist and your config.plist
  * `diff (file input 1) (file input 2)` in terminal
  * [BeyondCompare](https://www.scootersoftware.com)
  * Make a new config based off reading the updated OpenCore Vanilla Guide

* Once you've made the adjustments and made sure you config is compliant with the newest release of OpenCore, make sure to double check your setting with the OpenCore Guide on what to set everything to, otherwise read the [Differences.pdf](https://github.com/acidanthera/OpenCorePkg/blob/master/Docs/Differences/Differences.pdf) if you want to get a bit more technical.

![](../images/post-install/update-md/oc-config-compare.png)

4. **A arrancar!**

* Once everything's working with the dummy USB, you can mount the EFI and move it over to the hard drive's EFI partition. Remember to keep a copy of your old EFI in cases where OpenCore is acting funny down the road

## Actualizar las Kexts

* Actualizar las Kexts es un proceso re similar a actualizar OpenCore, make a copy of everything and update on a dummy USB in case there's issues

* La manera más fácil de actualizar tus kexts es utilizar estas 2 herramientas:

  * [Lilu and Friends](https://github.com/corpnewt/Lilu-and-Friends) para descargar y compilar las kexts
  * [Kext Extractor](https://github.com/corpnewt/KextExtractor) to merge them into your EFI

## Actualizar macOS

* So this is probably one of the most challenging parts, maintaining your system through OS updates. The main things to keep in mind:
  * With OS updates, make sure everything has been updated and you have some form of recovery like TimeMachine or an older macOS installer with a known good EFI on it
  * Do a bit of google-fu to see if others are having issues with the newest update

* I've also provided a bit more of a detailed map of what's changed in macOS versions, see below:

**macOS Catalina**

* 10.15.0
  * [Requires proper EC](https://dortania.github.io/Getting-Started-With-ACPI/)
  * Dual socket and most AMD CPUs need [AppleMCEReporterDisabler.kext](https://github.com/acidanthera/bugtracker/files/3703498/AppleMCEReporterDisabler.kext.zip)
  * MacPro5,1 support has been dropped
* 10.15.1
  * Requires WhateverGreen 1.3.4+
  * Broke DRM for many GPUs(see [DRM Chart](https://github.com/acidanthera/WhateverGreen/blob/master/Manual/FAQ.Chart.md))
  * Requiere todos los arreglos anteriores
* 10.15.2
  * Arregla compatibilidad con Navi en el instalador
  * Requiere todos los arreglos anteriores
* 10.15.3
  * Ningún cambio
  * Requiere todos los arreglos anteriores
* 10.15.4
  * [Usarios de los CPUs de AMD tienen que actualizar el parche `cpuid_set_cpufamily`](https://github.com/AMD-OSX/AMD_Vanilla)
  * Arregla DRM para muchos GPUS de AMD Polaris basados en Ellesmere
  * Requiere todos los arreglos anteriores (excluding `shikigva=80` for Polaris DRM for most users)
* 10.15.5
  * UHD 630's framebuffer broke for many, if you receive black screen you may need to swap from `07009B3E` to `00009B3E`
  * Comet Lake S ya no requiere un spoof del CPU ID
