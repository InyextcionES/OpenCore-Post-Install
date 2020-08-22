# Post Instalación de OpenCore

* **Nota antes de comenzar**: Esta es una traducción no oficial que no está afiliada a [Dortania](https://github.com/dortania), y puede quedar obsoleta fácilmente.

¡Bienvenido a la Guía de Post Instalación de OpenCore! Por favor ten en cuenta de que si no has instalado macOS aún, te recomendamos que sigas nuestra Guía de Instalación:

* [Guía de instalación de OpenCore](https://inyextciones.github.io/OpenCore-Install-Guide/)

Por más que la información mostrada en esta guía puede ser aplicada para ambos OpenCore y Clover, principalmente nos centraremos en las instalaciones de OpenCore. Tendrás que buscar un poco más si te encuentras con problemas.

## Cómo seguir esta guía

Para empezar, no todas las secciones en esta guía deben ser completadas. Está en cada usuario el querer o no agregar los retoques finales o resolver ciertos problemas.

Esta guía está dividida en 6 partes:

* [Universal](#universal)
  * Es recomendado que todos los usuarios sigan esta guía
* [Arreglos para USB](#arreglos-para-usb)
  * De nuevo, es recomendado que todos los usuarios sigan esta guía
* [Específicos de laptops](#laptop-specifics)
  * Es recomendado para los usuarios de laptops además de las guías anteriores. 
* [Cosméticos](#cosméticos)
  * Cosméticos como el GUI de OpenCore y sacar la pantalla verbose durante el arranque
* [Multiboot](#multiboot)
  * Recomendaciones para users que hacen multiboot
* [Misceláneo](#misceláneo)
  * Otros arreglos misceláneos, no todo los usuarios requieren de estos.

### Universal

* [Seguridad y FileVault](./universal/security.md)
  * Para los a quienes les importa la seguridad y privacidad.
* [Arreglar Audio](./universal/audio.md)
  * Para los que necesiten ayuda en resolver problemas del audio.
* [Arrancar sin USB](./universal/oc2hdd.md)
  * Te deja arrancar OpenCore sin tu USB conectado.
* [Actualizar OpenCore, kexts y macOS](./universal/update.md)
  * Comó atualizar tus kexts, OpenCore y macOS.
* [Arreglar el DRM](./universal/drm.md)
  * Para los con problemas de DRM como la reproducción de Netflix.
* [Arreglar iServices](./universal/iservices.md)
  * Información para arreglar los iServices (iMessage, Facetime, etc.)
* [Arreglar la administración de energía](./universal/pm.md)
  * Ayuda a mejorar el rendimiento de tu hardware cuando está/no está siendo siendo estresado.
* [Arreglar Suspensión](./universal/sleep.md)
  * Varias cosas que revisar para arreglar la suspensión de tu sistema.
* [Arreglar USB](./usb/README.md)
  * Arreglos para problemas de USB como puertos que no aparecen. Arreglar esto también puede reparar ciertos aspectos de la suspensión del sistema.

### Arreglos para USB

* [USB Mapping: Introducción](./usb/README.md)
  * Punto de comienzo para corregir tus USBs

### Específicos de laptops

* [Arreglar los Read-outs de la Batería](./laptop-specific/battery.md)
  * Si tu batería no es compatible directamente con SMCBatteryManager.

### Cosméticos

* [Agregar una GUI y el Sonido el Arranque](./cosmetic/gui.md)
  * Agrega una GUI a OpenCore e incluso un chime de arranque
* [Arreglar Resolución y Verbose](./cosmetic/verbose.md)
  * Ayuda a arreglar la resolución de OpenCore, y te permite ver el logo de Apple al arrancar!

### Multiboot 

* [Configurar Bootstrap.efi](./multiboot/bootstrap.md)
  * Asegura que Windows no elimine OpenCore de nuestro sistema.
* [Instalar BootCamp](./multiboot/bootcamp.md)
  * Nos deja instalar Bootcamp para cambiar el SO fácilmente.

### Misceláneo

* [Arreglar RTC](./misc/rtc.md)
  * Ayuda a resolver problemas de reinicio con RTC/CMOS/safe-mode.
* [Arreglar CFG Lock](./misc/msr-lock.md)
  * Nos deja desactivar algunos parches del kernel para mejor estabilidad
* [NVRAM Emulada](./misc/nvram.md)
  * Para usarios que tienen NVRAM rota, o necesitan probarla.
