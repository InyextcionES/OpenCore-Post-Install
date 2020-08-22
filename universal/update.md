# Actualizar OpenCore y macOS





## Actualizar OpenCore

Las cosas importantes sobre actualizar OpenCore:

* [Releases](https://github.com/acidanthera/OpenCorePkg/releases) happen the first Monday of every month
* El [Differences.pdf](https://github.com/acidanthera/OpenCorePkg/blob/master/Docs/Differences/Differences.pdf) muestra todas las cosas adicionadas y eliminadas de esta versión de OpenCore comparada a la versión anterior
* La Guía de la Instalación de OpenCore tiene una nota en el [header](https://inyextciones.github.io/OpenCore-Install-Guide/) que muestra la versión con la que es compatible

> ¿Cómo actualizo?

El proceso que seguir es así:

1. **Descarga la versión más reciente de OpenCore**

* [OpenCorePkg](https://github.com/acidanthera/OpenCorePkg/releases)

2. **Montar la EFI**

* Primero, vamos a montar la EFI de tu disco y hacer una copia somewhere safe usando [MountEFI](https://github.com/corpnewt/MountEFI). De momento no vamos a actualizar la EFI de este disco, porque vamos a usar un USB libre para experimentar. Nos deja mantener una copia de OpenCore que funciona si nuestra actualización se rompe

* El USB tiene que ser formateado como GUID. Reason for this es que GUID crea una partición EFI automáticamente, aunque será oculta by default así que tienes que montarla usando MountEFI.

![](../images/post-install/update-md/usb-erase.png)

* Ahora puedes copiar tu EFI de OpenCore al USB

![](../images/post-install/update-md/usb-folder.png)

3. **Reemplazar los archivos de OpenCore con las que acabas de descargar**

* Los archivos más importantes que actualizar:

  * `EFI/BOOT/BOOTx64.efi`
  * `EFI/OC/OpenCore.efi`
  * `EFI/OC/Drivers/OpenRuntime`(**No olivdes este, OpenCore no va a arrancar con versions diferentes**)

* También es una buena oportunidad para actualizar los otros drivers, estos solamente son los que **deben** ser actualizados para arrancar correctamente

![](../images/post-install/update-md/usb-folder-highlight.png)

4. **Compara tu config.plist a la nueva Sample.plist**

* Hay varias maneras de hacer esto:

  * [OCConfigCompare](https://github.com/corpnewt/OCConfigCompare) para comparar la sample.plist y tu config.plist
  * `diff (file input 1) (file input 2)` en terminal
  * [BeyondCompare](https://www.scootersoftware.com)
  * Hacer una config nueva basada en seguir OpenCore Vanilla Guide actualizada

* Once you've made the adjustments and made sure you config is compliant with the newest release of OpenCore, make sure to double check your setting with the OpenCore Guide on what to set everything to, otherwise read the [Differences.pdf](https://github.com/acidanthera/OpenCorePkg/blob/master/Docs/Differences/Differences.pdf) if you want to get a bit more technical.

![](../images/post-install/update-md/oc-config-compare.png)

4. **A arrancar!**

* Once everything's working with the dummy USB, monta la EFI y moverla a la partición EFI del disco. Remember mantener una copia de tu EFI antigua in cases where OpenCore is acting funny down the road

## Actualizar las Kexts

* Actualizar las Kexts es un proceso re similar a actualizar OpenCore, make a copy of everything and update on a dummy USB in case there's issues

* La manera más fácil de actualizar tus kexts es utilizar estas 2 herramientas:

  * [Lilu and Friends](https://github.com/corpnewt/Lilu-and-Friends) para descargar y compilar las kexts
  * [Kext Extractor](https://github.com/corpnewt/KextExtractor) to merge them into your EFI

## Actualizar macOS

* Esto es probablemente el paso más difícil, mantener tu sistema through actualizaciones del SO. Lo importante que tener en cuenta:
  * Para las actulaizaciones del SO, asegúrate que todo ha sido actualizado y que tienes algun forma de recovery como TimeMachine o un instalador de macOS más antigua con una EFI que tu sabes funciona correctamante
  * Hacer un poquito de google-fu para ver si otros encuentran problemas con la actualizacion más nueva

* I've also provided a bit more of a detailed map of what's changed in macOS versions, see below:

**macOS Catalina**

* 10.15.0
  * [Requiere un EC compatible](https://dortania.github.io/Getting-Started-With-ACPI/)
  * Sistemas de 2 sockets y muchos CPUs de AMD necesitan [AppleMCEReporterDisabler.kext](https://github.com/acidanthera/bugtracker/files/3703498/AppleMCEReporterDisabler.kext.zip)
  * MacPro5,1 ya no es compatible
* 10.15.1
  * Requiere WhateverGreen 1.3.4+
  * Se rompió el DRM para muchas GPUs(ve [Tabla de Chart](https://github.com/acidanthera/WhateverGreen/blob/master/Manual/FAQ.Chart.md))
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
  * Requiere todos los arreglos anteriores (sin incluír `shikigva=80` para DRM de Polaris)
* 10.15.5
  * Se les rompió el frambebuffer de UHD 630 a muchos usarios, si encuentras una pantalla negra you may need to swap de `07009B3E` a `00009B3E`
  * Comet Lake S ya no requiere un spoof del CPU ID
