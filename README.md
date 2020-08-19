# OpenCore Post-Install

Bienvenido a la OpenCore Post-Install guide! Please note that if you have not installed macOS yet, te recomendamos que sigas nuestra guía de instalación:

* [OpenCore Install Guide](https://inyextciones.github.io/OpenCore-Install-Guide/)

And while the info here can be applied to both OpenCore and Clover, principalmente nos fijamos en las instalaciones de OpenCore. So you will need to research a bit more if you run into any issues.

## Cómo seguir esta guía

Para empezar, not every section in this guide must be complete. It's up to each user whether they feel they want to add the finishing touches or resolve certain issues

Esta guía es dividida entre 6 partes:

* [Universal](#universal)
  * All users are recommended to follow
* [Arreglos para USB](#arreglos-para-usb)
  * All users are recommended to follow as well
* [Laptop Specifics](#laptop-specifics)
  * Laptop users are recommended to follow in addition to the above
* [Cosméticos](#cosméticos)
  * Cosmetics like OpenCore GUI and removing verbose screen output durante el arranque
* [Multiboot](#multiboot)
  * Recomendaciones para users que hacen multiboot
* [Misceláneo](#misceláneo)
  * Otros arreglos misceláneos, not all users will require these fixes

### Universal

* [Seguridad y FileVault](./universal/security.md)
  * Para los a quienes le importen la seguridad y privacidad.
* [Arreglar Audio](./universal/audio.md)
  * Para los que necesiten ayuda en resolver problemas del audio.
* [Arrancar sin USB](./universal/oc2hdd.md)
  * Te deja arrancar OpenCore sin la USB conectada.
* [Actualizar OpenCore, kexts y macOS](./universal/update.md)
  * Comó atualizar tus kexts, OpenCore y macOS seguramente.
* [Arreglar DRM](./universal/drm.md)
  * Para los con problemas de DRM como la reproducción de Netflix.
* [Arreglar iServices](./universal/iservices.md)
  * Información para arreglar los iServices issues como iMessage.
* [Fixing Power Management](./universal/pm.md)
  * Fixes and helps improve both hardware idle and boosting states.
* [Arreglar Suspensión](./universal/sleep.md)
  * Varias cosas que revisar cuando arreglas la suspensión.
* [Arreglar USB](./usb/README.md)
  * Arreglos para problemas de USB como puertos desaparecidos y helping with sleep.

### Arreglos para USB

* [USB Mapping: Introducción](./usb/README.md)
  * Starting point for correcting tu USB

### Laptop Specifics

* [Arreglar los Read-outs de la Batería](./laptop-specific/battery.md)
  * Si tu batería no es compatible out of the box con SMCBatteryManager.

### Cosméticos

* [Add GUI and Boot-chime](./cosmetic/gui.md)
  * Add a fancy GUI to OpenCore and even a boot chime!
* [Fixing Resolution y Verbose](./cosmetic/verbose.md)
  * Helps arreglar la resolución de OpenCore, and allows you to get that sweet Apple logo while booting!

### Multiboot 

* [Configurar Bootstrap.efi](./multiboot/bootstrap.md)
  * Asegura que Windows no elimine OpenCore from nuestro sistema.
* [Instalar BootCamp](./multiboot/bootcamp.md)
  * Nos deja instalar Bootcamp for easy boot switching.

### Misceláneo

* [Arreglar RTC](./misc/rtc.md)
  * Ayuda a resolver problemas de RTC/CMOS/safe-mode reboot.
* [Arreglar CFG Lock](./misc/msr-lock.md)
  * Nos deja desactivar algunos parches del kernel para mejor estabilidad
* [NVRAM Emulada](./misc/nvram.md)
  * Para usarios que tienen NVRAM rota, or need to test it.
