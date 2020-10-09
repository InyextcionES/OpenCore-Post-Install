(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{379:function(e,a,r){e.exports=r.p+"assets/img/vda.c3501622.png"},380:function(e,a,r){e.exports=r.p+"assets/img/dgpu-path.ee8b884a.png"},381:function(e,a,r){e.exports=r.p+"assets/img/igpu-path.bb07c93f.png"},382:function(e,a,r){e.exports=r.p+"assets/img/igpu-frequency.caba7ac8.png"},497:function(e,a,r){"use strict";r.r(a);var t=r(25),i=Object(t.a)({},(function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[t("h1",{attrs:{id:"arreglar-compatibilidad-con-drm-y-el-rendimiento-de-tu-igpu"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#arreglar-compatibilidad-con-drm-y-el-rendimiento-de-tu-igpu"}},[e._v("#")]),e._v(" Arreglar compatibilidad con DRM y el rendimiento de tu iGPU")]),e._v(" "),t("p",[e._v("Respecto al DRM, hay algunas cosas que tenemos que mencionar:")]),e._v(" "),t("ul",[t("li",[e._v("El DRM requiere de una dGPU compatible\n"),t("ul",[t("li",[e._v("Refiérete a la "),t("a",{attrs:{href:"https://dortania.github.io/GPU-Buyers-Guide/",target:"_blank",rel:"noopener noreferrer"}},[e._v("Guía de compradores de GPU"),t("OutboundLink")],1),e._v(" para ver las tarjetas compatibles")])])]),e._v(" "),t("li",[e._v("El DRM está roto para sitemas que solo tienen iGPU\n"),t("ul",[t("li",[e._v("Antes esto podía arreglar con Shiki (ahora WhateverGreen) hasta 10.12.2, pero se rompió en 10.12.3")]),e._v(" "),t("li",[e._v("Esto es debido a que nuestras iGPUs no soportan el firmware de Apple y que nuestro "),t("a",{attrs:{href:"https://www.intel.es/content/www/es/es/support/articles/000008927/software/chipset-software.html",target:"_blank",rel:"noopener noreferrer"}},[e._v("Management Engine"),t("OutboundLink")],1),e._v(" no tiene el certificado de Apple.")])])]),e._v(" "),t("li",[e._v("Necesitas aceleración de hardware y decoding funcional")])]),e._v(" "),t("h2",{attrs:{id:"probando-aceleracion-de-hardware-y-decoding"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#probando-aceleracion-de-hardware-y-decoding"}},[e._v("#")]),e._v(" Probando aceleración de hardware y decoding")]),e._v(" "),t("p",[e._v("Antes de que podamos comenzar a arreglar el DRM, necesitamos verificar que tenemos aceleración de hardware. La mejor manera de hacer esto es corriendo "),t("a",{attrs:{href:"https://i.applelife.ru/2019/05/451893_10.12_VDADecoderChecker.zip",target:"_blank",rel:"noopener noreferrer"}},[e._v("VDADecoderChecker"),t("OutboundLink")],1),e._v(":")]),e._v(" "),t("p",[t("img",{attrs:{src:r(379),alt:""}})]),e._v(" "),t("p",[e._v("Si falla en este punto hay algunas cosas que puedes verificar:")]),e._v(" "),t("ul",[t("li",[e._v("Asegúrate que tu hardware es soportado\n"),t("ul",[t("li",[e._v("Vé a la "),t("a",{attrs:{href:"https://dortania.github.io/GPU-Buyers-Guide/",target:"_blank",rel:"noopener noreferrer"}},[e._v("guía de compradores de GPUs"),t("OutboundLink")],1)])])]),e._v(" "),t("li",[e._v("Asegúrate de que tu SMBIOS se adecúa a tu hardware\n"),t("ul",[t("li",[e._v("No uses un SMBIOS de Mac Mini en una computadora de escritorio, por ejemplo, ya que las Mac Minis corren en hardware móvil, por lo que macOS esperará lo mismo.")])])]),e._v(" "),t("li",[e._v("Asegúrate de que tu iGPU está habilitada en tu BIOS y que tiene las propiedades correctas para tu hardware ("),t("code",[e._v("AAPL,ig-platform-id")]),e._v(" y, si lo necesitas, "),t("code",[e._v("device-id")]),e._v(")\n"),t("ul",[t("li",[e._v("Puedes verificar ambas en la sección DeviceProperties de la guía o desde el "),t("a",{attrs:{href:"https://github.com/acidanthera/WhateverGreen/blob/master/Manual/FAQ.IntelHD.en.md",target:"_blank",rel:"noopener noreferrer"}},[e._v("Manual de WhateverGreen"),t("OutboundLink")],1)])])]),e._v(" "),t("li",[e._v("Avoid unnecessary ACPI renames, all important ones are handled in WhateverGreen\n"),t("ul",[t("li",[e._v("change GFX0 to IGPU")]),e._v(" "),t("li",[e._v("change PEG0 to GFX0")]),e._v(" "),t("li",[e._v("change HECI to IMEI")]),e._v(" "),t("li",[t("a",{attrs:{href:"https://github.com/dortania/OpenCore-Install-Guide/blob/master/clover-conversion/Clover-config.md",target:"_blank",rel:"noopener noreferrer"}},[e._v("etc"),t("OutboundLink")],1)])])]),e._v(" "),t("li",[e._v("Make sure Lilu and WhateverGreen are loaded\n"),t("ul",[t("li",[e._v("Make sure not to have any legacy graphics patches present as they've been absorbed into WhateverGreen:\n"),t("ul",[t("li",[e._v("IntelGraphicsFixup.kext")]),e._v(" "),t("li",[e._v("NvidiaGraphicsFixup.kext")]),e._v(" "),t("li",[e._v("Shiki.kext")])])])])])]),e._v(" "),t("p",[e._v("To check if Lilu and WhateverGreen loaded correctly:")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v('kextstat | grep -E "Lilu|WhateverGreen"\n')])])]),t("blockquote",[t("p",[e._v("Hey one or more of these kexts aren't showing up")])]),e._v(" "),t("p",[e._v("Generally the best place to start is by looking through your OpenCore logs and seeing if Lilu and WhateverGreen injected correctly:")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("14:354 00:020 OC: Prelink injection Lilu.kext () - Success\n14:367 00:012 OC: Prelink injection WhateverGreen.kext () - Success\n")])])]),t("p",[e._v("If it says failed to inject:")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("15:448 00:007 OC: Prelink injection WhateverGreen.kext () - Invalid Parameter\n")])])]),t("p",[e._v("Main places you can check as to why:")]),e._v(" "),t("ul",[t("li",[t("strong",[e._v("Injection order")]),e._v(": Make sure that Lilu is above WhateverGreen in kext order")]),e._v(" "),t("li",[t("strong",[e._v("All kexts are latest release")]),e._v(": Especially important for Lilu plugins, as mismatched kexts can cause issues")])]),e._v(" "),t("p",[e._v("Nota: Para configurar file logging, dirígete a "),t("a",{attrs:{href:"https://dortania.github.io/OpenCore-Install-Guide/troubleshooting/debug.html",target:"_blank",rel:"noopener noreferrer"}},[e._v("OpenCore Debugging"),t("OutboundLink")],1),e._v(".")]),e._v(" "),t("p",[t("strong",[e._v("Nota")]),e._v(": En macOS 10.15 y posterior, AppleGVA debugging is disabled by default, if you get a generic error while running VDADecoderChecker you can enable debugging with the following:")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("defaults write com.apple.AppleGVA enableSyslog -boolean true\n")])])]),t("p",[e._v("And to undo this once done:")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("defaults delete com.apple.AppleGVA enableSyslog\n")])])]),t("h2",{attrs:{id:"testing-drm"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#testing-drm"}},[e._v("#")]),e._v(" Testing DRM")]),e._v(" "),t("p",[e._v("So before we get too deep, we need to go over some things, mainly the types of DRM you'll see out in the wild:")]),e._v(" "),t("p",[t("strong",[e._v("FairPlay 1.x")]),e._v(": DRM basado en software, usado para facilitar la compatibilidad con los Macs legacy")]),e._v(" "),t("ul",[t("li",[e._v("La manera más fácil de test this es reproducir una peli de iTunes: "),t("a",{attrs:{href:"https://drive.google.com/file/d/12pQ5FFpdHdGOVV6jvbqEq2wmkpMKxsOF/view",target:"_blank",rel:"noopener noreferrer"}},[e._v("FairPlay 1.x test"),t("OutboundLink")],1),e._v(" "),t("ul",[t("li",[e._v("Trailers de FairPlay 1.x funcionan con cualquier configuraciónn si WhateverGreen está configurada correctamente - including iGPU-only configurations. Sin embargo, "),t("em",[e._v("películas")]),e._v(" de FairPlay 1.x "),t("em",[e._v("movies")]),e._v(" se reproducen para solamente 3-5 segundos en configuraciones que solamente usan iGPU, erroring that HDCP is unsupported afterwards.")])])])]),e._v(" "),t("p",[t("strong",[e._v("FairPlay 2.x/3.x")]),e._v(": DRM basado en hardware, usado por Netflix, Amazon Prime")]),e._v(" "),t("ul",[t("li",[e._v("There's a couple ways to test:\n"),t("ul",[t("li",[e._v("Reprocucir un programa en Netflix o Amazon Prime")]),e._v(" "),t("li",[e._v("Reproducir un tráiler de Amazon Prime: "),t("a",{attrs:{href:"https://www.amazon.com/Spider-Man-Far-Home-Tom-Holland/dp/B07TP6D1DP",target:"_blank",rel:"noopener noreferrer"}},[e._v("Spider-Man: Far From Home"),t("OutboundLink")],1),e._v(" "),t("ul",[t("li",[e._v("Aunque el tráiler no usa DRM, Amazon lo verifica antes de reproducir")])])])])]),e._v(" "),t("li",[e._v("Nota: Requiere una GPU nueva de AMD para funcionar (Polaris+)")])]),e._v(" "),t("p",[t("strong",[e._v("FairPlay 4.x")]),e._v(": DRM mixta, encontrado en AppleTV+")]),e._v(" "),t("ul",[t("li",[e._v("Puedes abrir TV.app, selecciona TV+ -> Free Apple TV+ Premieres, y luego cliquear cualquier episodio para test without any trial (aunque necesitas una cuenta de iCloud)")]),e._v(" "),t("li",[e._v("Apple TV+ también tiene una free trial si la quieres usar")]),e._v(" "),t("li",[e._v("Nota: Requiere que no haya ninguna iGPU (Xeon) o un GPU nueva de AMD GPU para funcionar (Polaris+)\n"),t("ul",[t("li",[e._v("Es posible to force FairPlay 1.x when iGPU is absent")])])])]),e._v(" "),t("p",[e._v("If everything works on these tests, you have no need to continue! Otherwise, proceed on.")]),e._v(" "),t("h2",{attrs:{id:"arreglar-drm"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#arreglar-drm"}},[e._v("#")]),e._v(" Arreglar DRM")]),e._v(" "),t("p",[e._v("So for fixing DRM we can go down mainly 1 route: patching DRM to use either software or AMD decoding. Vit made a great little chart for different hardware configurations:")]),e._v(" "),t("ul",[t("li",[t("a",{attrs:{href:"https://github.com/acidanthera/WhateverGreen/blob/master/Manual/FAQ.Chart.md",target:"_blank",rel:"noopener noreferrer"}},[e._v("WhateverGreen's DRM chart"),t("OutboundLink")],1)])]),e._v(" "),t("p",[e._v("So how do you use it? First, identify what configuration you have in the chart (AMD represents GPU, not CPU). The SMBIOS listed (IM = iMac, MM = Mac Mini, IMP = iMac Pro, MP = Mac Pro) is what you should use if you match the hardware configuration. If you don't match any of the configurations in the chart, you're out of luck.")]),e._v(" "),t("p",[e._v("Next, identify what Shiki mode you need to use. If there are two configurations for your setup, they will differ in the Shiki flags used. Generally, you want hardware decoding over software decoding. If the mode column is blank, then you are done. Otherwise, you should add "),t("code",[e._v("shikigva")]),e._v(" as a property to any GPU, using DeviceProperties > Add. For example, if the mode we need to use is "),t("code",[e._v("shikigva=80")]),e._v(":")]),e._v(" "),t("p",[t("img",{attrs:{src:r(380),alt:"Example of shikigva in Devices Properties"}})]),e._v(" "),t("p",[e._v("You can also use the boot argument - this is in the mode column.")]),e._v(" "),t("p",[e._v('Here\'s one example. If we have an Intel i9-9900K and an RX 560, the configuration would be "AMD+IGPU", and we should be using an iMac or Mac Mini SMBIOS (for this specific configuration, iMac19,1). Then we see there are two options for the configuration: one where the mode is '),t("code",[e._v("shikigva=16")]),e._v(", and one with "),t("code",[e._v("shikigva=80")]),e._v('. We see the difference is in "Prime Trailers" and "Prime/Netflix". We want Netflix to work, so we\'ll choose the '),t("code",[e._v("shikigva=80")]),e._v(" option. Then inject "),t("code",[e._v("shikigva")]),e._v(" with type number/integer and value "),t("code",[e._v("80")]),e._v(" into our iGPU or dGPU, reboot, and DRM should work.")]),e._v(" "),t("p",[e._v('Here\'s another example. This time, We have an Ryzen 3700X and an RX 480. Our configuration in this case is just "AMD", and we should be using either an iMac Pro or Mac Pro SMBIOS. Again, there are two options: no shiki arguments, and '),t("code",[e._v("shikigva=128")]),e._v(". We prefer hardware decoding over software decoding, so we'll choose the "),t("code",[e._v("shikigva=128")]),e._v(" option, and again inject "),t("code",[e._v("shikigva")]),e._v(" into our dGPU, this time with value "),t("code",[e._v("128")]),e._v(". A reboot and DRM works.")]),e._v(" "),t("p",[t("strong",[e._v("Notas:")])]),e._v(" "),t("ul",[t("li",[e._v("Puedes usar "),t("a",{attrs:{href:"https://github.com/acidanthera/gfxutil/releases",target:"_blank",rel:"noopener noreferrer"}},[e._v("gfxutil"),t("OutboundLink")],1),e._v(" para encontrar la dirección de tu iGPU/dGPU.\n"),t("ul",[t("li",[t("code",[e._v("dirección/para/gfxutil -f GFX0")])]),e._v(" "),t("li",[t("code",[e._v("GFX0")]),e._v(": Para dGPUs, if multiple installed check IORegistryExplorer for what your AMD card is called")]),e._v(" "),t("li",[t("code",[e._v("IGPU")]),e._v(": Para iGPU")])])]),e._v(" "),t("li",[e._v("If you inject "),t("code",[e._v("shikigva")]),e._v(" using DeviceProperties, ensure you only do so to one GPU, otherwise WhateverGreen will use whatever it finds first and it is not guaranteed to be consistent.")]),e._v(" "),t("li",[e._v("IQSV stands for Intel Quick Sync Video: this only works if iGPU is present and enabled and it is set up correctly.")]),e._v(" "),t("li",[e._v("Special configurations (like Haswell + AMD dGPU with an iMac SMBIOS, but iGPU is disabled) are not covered in the chart. You must do research on this yourself.")]),e._v(" "),t("li",[t("a",{attrs:{href:"https://github.com/acidanthera/WhateverGreen/blob/master/WhateverGreen/kern_shiki.hpp",target:"_blank",rel:"noopener noreferrer"}},[e._v("Shiki source"),t("OutboundLink")],1),e._v(" is useful in understanding what flags do what and when they should be used, and may help with special configurations.")])]),e._v(" "),t("h2",{attrs:{id:"fixing-igpu-performance"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#fixing-igpu-performance"}},[e._v("#")]),e._v(" Fixing iGPU performance")]),e._v(" "),t("p",[e._v("So how do we fix iGPU performance? Well by loading Apple's GuC (Graphics Micro Code). The main thing to note is that firmware loading is restricted to:")]),e._v(" "),t("ul",[t("li",[e._v("Skylake and newer CPU with a "),t("a",{attrs:{href:"https://dortania.github.io/GPU-Buyers-Guide/modern-gpus/intel-gpu",target:"_blank",rel:"noopener noreferrer"}},[e._v("supported iGPU"),t("OutboundLink")],1)]),e._v(" "),t("li",[t("strong",[e._v("And")]),e._v(" a recent chipset, 300-series or newer: Z390, B360, H370, H310, etc. ("),t("em",[t("strong",[e._v("not")])]),e._v(" Z370, as it is actually 200-series)")]),e._v(" "),t("li",[e._v("Do note that even with recent chipsets, firmware loading is not guaranteed to work. If you experience a kernel panic or lots of graphics errors after trying this, it is probably because firmware loading is not supported on your setup.")])]),e._v(" "),t("p",[e._v("So how do we apply it?")]),e._v(" "),t("p",[e._v("Under "),t("code",[e._v("DeviceProperties -> Add -> PciRoot(0x0)/Pci(0x2,0x0)")]),e._v(", add:")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("igfxfw | Data | <02 00 00 00>\n")])])]),t("p",[e._v("To enable firmware loading.")]),e._v(" "),t("p",[t("img",{attrs:{src:r(381),alt:"Example of igfxfw injected into iGPU"}})]),e._v(" "),t("p",[e._v("The best way to check is to monitor the iGPU's frequency is with either "),t("a",{attrs:{href:"https://software.intel.com/en-us/articles/intel-power-gadget",target:"_blank",rel:"noopener noreferrer"}},[e._v("Intel Power Gadget"),t("OutboundLink")],1),e._v(" or checking the boot logs for Apple Scheduler references. Make sure you have the "),t("code",[e._v("igfxfw")]),e._v(" property applied:")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("kernel: (AppleIntelCFLGraphics) [IGPU] Graphics Firmware Version: 2.14.0.0\nkernel: (AppleIntelCFLGraphics) [IGPU] Graphics Firmware Version: 2.14.0.0\nkernel: (AppleIntelCFLGraphics) [IGPU] Graphics accelerator is using scheduler: Apple Firmware\nkernel: (AppleIntelCFLGraphics) [IGPU] Graphics accelerator is using scheduler: Apple Firmware\n")])])]),t("p",[t("img",{attrs:{src:r(382),alt:""}})])])}),[],!1,null,null,null);a.default=i.exports}}]);