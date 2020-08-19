# Parchear la Batería

De momento esta guía no cubre los parches para la batería, pero aquí puedes encontrar unos recursos útiles y consejos para usarlos con OpenCore.

## Parchear la DSDT

Aunque se deberíá evitar custom DSDT injection para evitar problemas con Windows y actualizaciones del, puede ser bastante fácil como un punto de comiezo ya que es más dacil de comprender y hacer por ti mismo:

**[How to patch DSDT for working battery status de Rehabman](https://www.tonymacx86.com/threads/guide-how-to-patch-dsdt-for-working-battery-status.116102/)**

* Nota: Cuando re-inyectas tu DSDT, tiene que ser la primera en la lista de ACPI -> Add en la config.plist. Además ten en cuenta que la DSDT parcheada también se pone en EFI/OC/ACPI

* Nota 2: Evita el uso de MaciASL y iASL provided por Rehabman, they have been long neglected así que se recomienda descargar una versión más nueva de Acidanthera: [MaciASL](https://github.com/acidanthera/MaciASL/releases)

## Hot-patching de la Batería

Por fin cuando tengas tu DSDT parcheado y la batería funcionando con macOS, es la hora de crear nustros propios hot-patches. Estos son diferentes a lo regulares parches del DSDT ya que son hechos on-the-fly con la DSDT y por lo tanto tiene mejor flexibilidad con las actualizaciones del firmware:

**[Guide to Using Clover to "hotpatch" ACPI de Rehabman](https://www.tonymacx86.com/threads/guide-using-clover-to-hotpatch-acpi.200137/)**

* Nota: Específicamente la post #2 es la que se trata del hot-patching de la batería
