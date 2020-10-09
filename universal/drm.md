# Arreglar compatibilidad con DRM y el rendimiento de tu iGPU





Respecto al DRM, hay algunas cosas que tenemos que mencionar:

* El DRM requiere de una dGPU compatible
  * Refiérete a la [Guía de compradores de GPU](https://dortania.github.io/GPU-Buyers-Guide/) para ver las tarjetas compatibles
* El DRM está roto para sitemas que solo tienen iGPU
  * Antes esto podía arreglar con Shiki (ahora WhateverGreen) hasta 10.12.2, pero se rompió en 10.12.3
  * Esto es debido a que nuestras iGPUs no soportan el firmware de Apple y que nuestro [Management Engine](https://www.intel.es/content/www/es/es/support/articles/000008927/software/chipset-software.html) no tiene el certificado de Apple.
* Necesitas aceleración de hardware y decoding funcional

## Probando aceleración de hardware y decoding

Antes de que podamos comenzar a arreglar el DRM, necesitamos verificar que tenemos aceleración de hardware. La mejor manera de hacer esto es corriendo [VDADecoderChecker](https://i.applelife.ru/2019/05/451893_10.12_VDADecoderChecker.zip):

![](../images/post-install/drm-md/vda.png)

Si falla en este punto hay algunas cosas que puedes verificar:

* Asegúrate que tu hardware es soportado
  * Vé a la [guía de compradores de GPUs](https://dortania.github.io/GPU-Buyers-Guide/)
* Asegúrate de que tu SMBIOS se adecúa a tu hardware
  * No uses un SMBIOS de Mac Mini en una computadora de escritorio, por ejemplo, ya que las Mac Minis corren en hardware móvil, por lo que macOS esperará lo mismo. 
* Asegúrate de que tu iGPU está habilitada en tu BIOS y que tiene las propiedades correctas para tu hardware (`AAPL,ig-platform-id` y, si lo necesitas, `device-id`)
  * Puedes verificar ambas en la sección DeviceProperties de la guía o desde el [Manual de WhateverGreen](https://github.com/acidanthera/WhateverGreen/blob/master/Manual/FAQ.IntelHD.en.md)
* Avoid unnecessary ACPI renames, all important ones are handled in WhateverGreen
  * change GFX0 to IGPU
  * change PEG0 to GFX0
  * change HECI to IMEI
  * [etc](https://github.com/dortania/OpenCore-Install-Guide/blob/master/clover-conversion/Clover-config.md)
* Make sure Lilu and WhateverGreen are loaded
  * Make sure not to have any legacy graphics patches present as they've been absorbed into WhateverGreen:
    * IntelGraphicsFixup.kext
    * NvidiaGraphicsFixup.kext
    * Shiki.kext

To check if Lilu and WhateverGreen loaded correctly:

```
kextstat | grep -E "Lilu|WhateverGreen"
```

> Hey one or more of these kexts aren't showing up

Generally the best place to start is by looking through your OpenCore logs and seeing if Lilu and WhateverGreen injected correctly:

```
14:354 00:020 OC: Prelink injection Lilu.kext () - Success
14:367 00:012 OC: Prelink injection WhateverGreen.kext () - Success
```

If it says failed to inject:

```
15:448 00:007 OC: Prelink injection WhateverGreen.kext () - Invalid Parameter
```

Main places you can check as to why:

* **Injection order**: Make sure that Lilu is above WhateverGreen in kext order
* **All kexts are latest release**: Especially important for Lilu plugins, as mismatched kexts can cause issues

Nota: Para configurar file logging, dirígete a [OpenCore Debugging](https://dortania.github.io/OpenCore-Install-Guide/troubleshooting/debug.html).

**Nota**: En macOS 10.15 y posterior, AppleGVA debugging is disabled by default, if you get a generic error while running VDADecoderChecker you can enable debugging with the following:

```
defaults write com.apple.AppleGVA enableSyslog -boolean true
```

And to undo this once done:

```
defaults delete com.apple.AppleGVA enableSyslog
```

## Testing DRM

So before we get too deep, we need to go over some things, mainly the types of DRM you'll see out in the wild:

**FairPlay 1.x**: DRM basado en software, usado para facilitar la compatibilidad con los Macs legacy

* La manera más fácil de test this es reproducir una peli de iTunes: [FairPlay 1.x test](https://drive.google.com/file/d/12pQ5FFpdHdGOVV6jvbqEq2wmkpMKxsOF/view)
  * Trailers de FairPlay 1.x funcionan con cualquier configuraciónn si WhateverGreen está configurada correctamente - including iGPU-only configurations. Sin embargo, *películas* de FairPlay 1.x *movies* se reproducen para solamente 3-5 segundos en configuraciones que solamente usan iGPU, erroring that HDCP is unsupported afterwards.

**FairPlay 2.x/3.x**: DRM basado en hardware, usado por Netflix, Amazon Prime

* There's a couple ways to test:
  * Reprocucir un programa en Netflix o Amazon Prime
  * Reproducir un tráiler de Amazon Prime: [Spider-Man: Far From Home](https://www.amazon.com/Spider-Man-Far-Home-Tom-Holland/dp/B07TP6D1DP)
    * Aunque el tráiler no usa DRM, Amazon lo verifica antes de reproducir
* Nota: Requiere una GPU nueva de AMD para funcionar (Polaris+)

**FairPlay 4.x**: DRM mixta, encontrado en AppleTV+

* Puedes abrir TV.app, selecciona TV+ -> Free Apple TV+ Premieres, y luego cliquear cualquier episodio para test without any trial (aunque necesitas una cuenta de iCloud)
* Apple TV+ también tiene una free trial si la quieres usar
* Nota: Requiere que no haya ninguna iGPU (Xeon) o un GPU nueva de AMD GPU para funcionar (Polaris+)
  * Es posible to force FairPlay 1.x when iGPU is absent

If everything works on these tests, you have no need to continue! Otherwise, proceed on.

## Arreglar DRM

So for fixing DRM we can go down mainly 1 route: patching DRM to use either software or AMD decoding. Vit made a great little chart for different hardware configurations:

* [WhateverGreen's DRM chart](https://github.com/acidanthera/WhateverGreen/blob/master/Manual/FAQ.Chart.md)

So how do you use it? First, identify what configuration you have in the chart (AMD represents GPU, not CPU). The SMBIOS listed (IM = iMac, MM = Mac Mini, IMP = iMac Pro, MP = Mac Pro) is what you should use if you match the hardware configuration. If you don't match any of the configurations in the chart, you're out of luck.

Next, identify what Shiki mode you need to use. If there are two configurations for your setup, they will differ in the Shiki flags used. Generally, you want hardware decoding over software decoding. If the mode column is blank, then you are done. Otherwise, you should add `shikigva` as a property to any GPU, using DeviceProperties > Add. For example, if the mode we need to use is `shikigva=80`:

![Example of shikigva in Devices Properties](../images/post-install/drm-md/dgpu-path.png)

You can also use the boot argument - this is in the mode column.

Here's one example. If we have an Intel i9-9900K and an RX 560, the configuration would be "AMD+IGPU", and we should be using an iMac or Mac Mini SMBIOS (for this specific configuration, iMac19,1). Then we see there are two options for the configuration: one where the mode is `shikigva=16`, and one with `shikigva=80`. We see the difference is in "Prime Trailers" and "Prime/Netflix". We want Netflix to work, so we'll choose the `shikigva=80` option. Then inject `shikigva` with type number/integer and value `80` into our iGPU or dGPU, reboot, and DRM should work.

Here's another example. This time, We have an Ryzen 3700X and an RX 480. Our configuration in this case is just "AMD", and we should be using either an iMac Pro or Mac Pro SMBIOS. Again, there are two options: no shiki arguments, and `shikigva=128`. We prefer hardware decoding over software decoding, so we'll choose the `shikigva=128` option, and again inject `shikigva` into our dGPU, this time with value `128`. A reboot and DRM works.

**Notas:**

* Puedes usar [gfxutil](https://github.com/acidanthera/gfxutil/releases) para encontrar la dirección de tu iGPU/dGPU.
  * `dirección/para/gfxutil -f GFX0`
  * `GFX0`: Para dGPUs, if multiple installed check IORegistryExplorer for what your AMD card is called
  * `IGPU`: Para iGPU
* If you inject `shikigva` using DeviceProperties, ensure you only do so to one GPU, otherwise WhateverGreen will use whatever it finds first and it is not guaranteed to be consistent.
* IQSV stands for Intel Quick Sync Video: this only works if iGPU is present and enabled and it is set up correctly.
* Special configurations (like Haswell + AMD dGPU with an iMac SMBIOS, but iGPU is disabled) are not covered in the chart. You must do research on this yourself.
* [Shiki source](https://github.com/acidanthera/WhateverGreen/blob/master/WhateverGreen/kern_shiki.hpp) is useful in understanding what flags do what and when they should be used, and may help with special configurations.

## Fixing iGPU performance

So how do we fix iGPU performance? Well by loading Apple's GuC (Graphics Micro Code). The main thing to note is that firmware loading is restricted to:

* Skylake and newer CPU with a [supported iGPU](https://dortania.github.io/GPU-Buyers-Guide/modern-gpus/intel-gpu)
* **And** a recent chipset, 300-series or newer: Z390, B360, H370, H310, etc. (***not*** Z370, as it is actually 200-series)
* Do note that even with recent chipsets, firmware loading is not guaranteed to work. If you experience a kernel panic or lots of graphics errors after trying this, it is probably because firmware loading is not supported on your setup.

So how do we apply it?

Under `DeviceProperties -> Add -> PciRoot(0x0)/Pci(0x2,0x0)`, add:

```
igfxfw | Data | <02 00 00 00>
```

To enable firmware loading.

![Example of igfxfw injected into iGPU](../images/post-install/drm-md/igpu-path.png)

The best way to check is to monitor the iGPU's frequency is with either [Intel Power Gadget](https://software.intel.com/en-us/articles/intel-power-gadget) or checking the boot logs for Apple Scheduler references. Make sure you have the `igfxfw` property applied:

```
kernel: (AppleIntelCFLGraphics) [IGPU] Graphics Firmware Version: 2.14.0.0
kernel: (AppleIntelCFLGraphics) [IGPU] Graphics Firmware Version: 2.14.0.0
kernel: (AppleIntelCFLGraphics) [IGPU] Graphics accelerator is using scheduler: Apple Firmware
kernel: (AppleIntelCFLGraphics) [IGPU] Graphics accelerator is using scheduler: Apple Firmware
```

![](../images/post-install/drm-md/igpu-frequency.png)
