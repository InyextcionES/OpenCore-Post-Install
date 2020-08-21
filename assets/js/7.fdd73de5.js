(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{370:function(e,a,t){e.exports=t.p+"assets/img/gfxutil-hdef.c0e71f9a.png"},371:function(e,a,t){e.exports=t.p+"assets/img/config-layout-id.54d8ccac.png"},372:function(e,a,t){e.exports=t.p+"assets/img/hex-convert.4e2df6d6.png"},373:function(e,a,t){e.exports=t.p+"assets/img/hdef.0b4a3bf3.png"},374:function(e,a,t){e.exports=t.p+"assets/img/right-layout.b17911f6.png"},375:function(e,a,t){e.exports=t.p+"assets/img/wrong-layout.b0fe7803.png"},376:function(e,a,t){e.exports=t.p+"assets/img/external-audio.b1bb87f0.png"},490:function(e,a,t){"use strict";t.r(a);var r=t(25),s=Object(r.a)({},(function(){var e=this,a=e.$createElement,r=e._self._c||a;return r("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[r("h1",{attrs:{id:"arreglar-audio-con-applealc"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#arreglar-audio-con-applealc"}},[e._v("#")]),e._v(" Arreglar audio con AppleALC")]),e._v(" "),r("p",[e._v("Para empezar, suponemos que ya tienes Lilu y AppleALC instaladas, si no estés seguro de que hayan cargadas correctamente puedes correr lo siguiente en la terminal(Esto también verifica si AppleHDA está cargada, ya que sin esto AppleALC no tiene nada que parchear):")]),e._v(" "),r("div",{staticClass:"language-sh extra-class"},[r("pre",{pre:!0,attrs:{class:"language-sh"}},[r("code",[e._v("kextstat "),r("span",{pre:!0,attrs:{class:"token operator"}},[e._v("|")]),e._v(" "),r("span",{pre:!0,attrs:{class:"token function"}},[e._v("grep")]),e._v(" -E "),r("span",{pre:!0,attrs:{class:"token string"}},[e._v('"AppleHDA|AppleALC|Lilu"')]),e._v("\n")])])]),r("p",[e._v("Si aparancen todas las 3, estás listo a continuar. Y asegúrate de que VoodooHDA "),r("strong",[e._v("no sea presente")]),e._v(". Esta kext causa conflicto con AppleALC.")]),e._v(" "),r("p",[e._v("Si encuentras algún problema, dirígete a la "),r("RouterLink",{attrs:{to:"/universal/audio.html#troubleshooting"}},[e._v("sección Troubleshooting")])],1),e._v(" "),r("h2",{attrs:{id:"encontrar-tu-layout-id"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#encontrar-tu-layout-id"}},[e._v("#")]),e._v(" Encontrar tu layout ID")]),e._v(" "),r("p",[e._v("Para este ejemplo, suponemos que tu codec es ALC1220. Para verificar el tuyo, tienes varias opciones:")]),e._v(" "),r("ul",[r("li",[e._v("Revisar la especifacione o el manual del motherboard")]),e._v(" "),r("li",[e._v("Revisar Device Manager en Windows")]),e._v(" "),r("li",[e._v("Correr "),r("code",[e._v("cat")]),e._v(" en la terminal en Linux\n"),r("ul",[r("li",[r("code",[e._v("cat /proc/asound/card0/codec#0 | less")])])])])]),e._v(" "),r("p",[e._v("Ahora con un codec, queremos cross reference it con la lista de codecs compatibles con AppleALC:")]),e._v(" "),r("ul",[r("li",[r("a",{attrs:{href:"https://github.com/acidanthera/AppleALC/wiki/Supported-codecs",target:"_blank",rel:"noopener noreferrer"}},[e._v("AppleALC Supported Codecs"),r("OutboundLink")],1)])]),e._v(" "),r("p",[e._v("Con el ALC1220, encontramos lo siguiente:")]),e._v(" "),r("div",{staticClass:"language- extra-class"},[r("pre",{pre:!0,attrs:{class:"language-text"}},[r("code",[e._v("0x100003, layout 1, 2, 3, 5, 7, 11, 13, 15, 16, 21, 27, 28, 29, 34\n")])])]),r("p",[e._v("Esto nos muestra 2 cosas:")]),e._v(" "),r("ul",[r("li",[e._v("La revisión del hardware que es compatible("),r("code",[e._v("0x100003")]),e._v("), relevante solamente cuando hay multiples revisiones con layouts diferentes")]),e._v(" "),r("li",[e._v("Varias layout IDs compatibles con nuestro codec("),r("code",[e._v("layout 1, 2, 3, 5, 7, 11, 13, 15, 16, 21, 27, 28, 29, 34")]),e._v(")")])]),e._v(" "),r("p",[e._v("Ahora con una lista de layout IDs compatibles,  estamos listos a probarlos")]),e._v(" "),r("p",[r("strong",[e._v("Nota")]),e._v(": Si tu Audio Codec es ALC 3XXX es probable que es falso y solamente es un contralador, do your research para averiguar cuál es el controlador en realidad.")]),e._v(" "),r("ul",[r("li",[e._v("Un ejemplo de esto es el ALC3601, pero cuando usamos Linux muestra el nombre verdadero: ALC 671")])]),e._v(" "),r("h2",{attrs:{id:"probar-tu-layout"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#probar-tu-layout"}},[e._v("#")]),e._v(" Probar tu layout")]),e._v(" "),r("p",[e._v("Para probar nuestros layout IDs, vamos a usar el boot-arg "),r("code",[e._v("alcid=xxx")]),e._v(" donde xxx es tu layout. Ten en cuenta que hay que probar los layout IDs "),r("strong",[e._v("uno a uno")]),e._v(". No agregas multiples IDs o alcid boot-args, si uno no funciona entonces probar el próximo ID y etc")]),e._v(" "),r("div",{staticClass:"language- extra-class"},[r("pre",{pre:!0,attrs:{class:"language-text"}},[r("code",[e._v("config.plist\n├── NVRAM\n  ├── Add\n    ├── 7C436110-AB2A-4BBB-A880-FE41995C9F82\n          ├── boot-args | String | alcid=11\n")])])]),r("h2",{attrs:{id:"hacer-mas-permenante-el-layout-id"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#hacer-mas-permenante-el-layout-id"}},[e._v("#")]),e._v(" Hacer más permenante el Layout ID")]),e._v(" "),r("p",[e._v("Cuando has encontrado un Layout ID que funciona con tu hack, podemos crear una solución más permanente que es más similar que la manera usada por las Macs reales para configurar sus Layout IDs.")]),e._v(" "),r("p",[e._v("Con AppleALC, there's a priority hierarchy con la que las properties son prioritizadas:")]),e._v(" "),r("ol",[r("li",[r("code",[e._v("alcid=xxx")]),e._v(" boot-arg, útill para debugging y overrides todos los otros values")]),e._v(" "),r("li",[r("code",[e._v("alc-layout-id")]),e._v(" en DeviceProperties, "),r("strong",[e._v("se debería usar solamente en hardware de Apple")])]),e._v(" "),r("li",[r("code",[e._v("layout-id")]),e._v(" en DeviceProperties, "),r("strong",[e._v("se debería usar en Apple and non-Apple hardware")])])]),e._v(" "),r("p",[e._v("Para empezar, tenemos que ver dónde nuestro controlador de audio está ubicada en el PCI map. Para esto, vamos a usar una herramienta re útil llamada "),r("a",{attrs:{href:"https://github.com/acidanthera/gfxutil/releases",target:"_blank",rel:"noopener noreferrer"}},[e._v("gfxutil"),r("OutboundLink")],1),e._v(" y correr esto en la terminal de macOS:")]),e._v(" "),r("div",{staticClass:"language-sh extra-class"},[r("pre",{pre:!0,attrs:{class:"language-sh"}},[r("code",[e._v("dirección/para/gfxutil -f HDEF\n")])])]),r("p",[r("img",{attrs:{src:t(370),alt:""}})]),e._v(" "),r("p",[e._v("Luego agrega esta PciRoot con el child "),r("code",[e._v("layout-id")]),e._v(" a tu config.plist en DeviceProperties -> Add:")]),e._v(" "),r("p",[r("img",{attrs:{src:t(371),alt:""}})]),e._v(" "),r("p",[e._v("Ten en cuenta que AppleALC puede usar Decimal/Number y Hexadecimal/Data, generalmente el mejor método es Hex ya que evita cualquier conversión no necesarias. Puedes usar una "),r("a",{attrs:{href:"https://www.rapidtables.com/convert/number/decimal-to-hex.html",target:"_blank",rel:"noopener noreferrer"}},[e._v("calculadora de decimal a hexadecimal"),r("OutboundLink")],1),e._v(" para encontrar el tuyo. "),r("code",[e._v("printf '%x\\n' DECI_VAL")]),e._v(":")]),e._v(" "),r("p",[r("img",{attrs:{src:t(372),alt:""}})]),e._v(" "),r("p",[e._v("En este ejemplo, "),r("code",[e._v("alcid=11")]),e._v(" será either:")]),e._v(" "),r("ul",[r("li",[r("code",[e._v("layout-id | Data | <0B000000>")])]),e._v(" "),r("li",[r("code",[e._v("layout-id | Number | <11>")])])]),e._v(" "),r("p",[e._v("Ten en cuenta que el final valor de HEX/Data value debe ser 4 bytes en total(ie. "),r("code",[e._v("0B 00 00 00")]),e._v(" ), para layout IDs más grandes que 255("),r("code",[e._v("FF 00 00 00")]),e._v(") tienes que acordarte que los bytes son swapped. Así que 256 se convierte a "),r("code",[e._v("FF 01 00 00")])]),e._v(" "),r("ul",[r("li",[e._v("HEX Swapping and data size can be completely ignored using the Decimal/Number method")])]),e._v(" "),r("p",[r("strong",[e._v("Reminder")]),e._v(": Tu "),r("strong",[e._v("DEBES")]),e._v(" eliminar el boot-arg después, dado que siempre tiene la top priority y así que AppleALC ignorará todas las otras entradas como las en DeviceProperties")]),e._v(" "),r("h2",{attrs:{id:"problemas-miscelaneos"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#problemas-miscelaneos"}},[e._v("#")]),e._v(" Problemas misceláneos")]),e._v(" "),r("h3",{attrs:{id:"no-mic-en-amd"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#no-mic-en-amd"}},[e._v("#")]),e._v(" No Mic en AMD")]),e._v(" "),r("ul",[r("li",[e._v('Esto es una problema muy común cuando se usa AppleALC con AMD, específicamente no se han hecho ningunos parches para soportar Mic input. De momento, la "mejor" solución es either comprar un DAC/Mic USB o usar el método de VoodooHDA.kext. El problema con VoodooHDA es que es conocida por ser inestable y tener peor calidad de audio que AppleALC')])]),e._v(" "),r("h3",{attrs:{id:"la-layout-id-de-clover-no-funciona-en-opencore"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#la-layout-id-de-clover-no-funciona-en-opencore"}},[e._v("#")]),e._v(" La layout ID de Clover no funciona en OpenCore")]),e._v(" "),r("p",[e._v("Es probable que es por causa de conflictos IRQ. Clover tiene un montón de hot-patches ACPI  que aplica automagicamente. Arreglar esto es un poquito doloroso pero la opción "),r("code",[e._v("FixHPET")]),e._v(" de "),r("a",{attrs:{href:"https://github.com/corpnewt/SSDTTime",target:"_blank",rel:"noopener noreferrer"}},[e._v("SSDTTime"),r("OutboundLink")],1),e._v(" puede arreglar la mayoría de estos casos.")]),e._v(" "),r("p",[e._v("Para casos extrannos donde RTC y HPET toman IRQs de otros dispositivos como USB y audio, refiérete a "),r("a",{attrs:{href:"https://github.com/khronokernel/trashOS/blob/master/HP-Compaq-DC7900/README.md#dsdt-edits",target:"_blank",rel:"noopener noreferrer"}},[e._v("HP Compaq DC7900 ACPI patch"),r("OutboundLink")],1),e._v(" en el repo de trashOS")]),e._v(" "),r("h3",{attrs:{id:"kernel-panic-on-power-state-changes-in-10-15"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#kernel-panic-on-power-state-changes-in-10-15"}},[e._v("#")]),e._v(" Kernel Panic on power state changes in 10.15")]),e._v(" "),r("ul",[r("li",[e._v("Activa PowerTimeoutKernelPanic en tu config.plist:\n"),r("ul",[r("li",[r("code",[e._v("Kernel -> Quirks -> PowerTimeoutKernelPanic -> True")])])])])]),e._v(" "),r("h2",{attrs:{id:"troubleshooting"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#troubleshooting"}},[e._v("#")]),e._v(" Troubleshooting")]),e._v(" "),r("p",[e._v("Para hacer troubleshooting, tenemos que go over varias cosas:")]),e._v(" "),r("ul",[r("li",[r("a",{attrs:{href:"#revisar-si-tienes-las-kexts-correctas"}},[e._v("Revisar si tienes las kexts correctas")])]),e._v(" "),r("li",[r("a",{attrs:{href:"#verificar-si-applealc-est%C3%A1-parcheando-correctamente"}},[e._v("Verificar si AppleALC está parcheando correctamente")])]),e._v(" "),r("li",[r("a",{attrs:{href:"#verificar-applehda-es-vanilla"}},[e._v("Verificar AppleHDA es vanilla")])]),e._v(" "),r("li",[r("a",{attrs:{href:"#applealc-working-inconsistently"}},[e._v("AppleALC working inconsistently")])]),e._v(" "),r("li",[r("a",{attrs:{href:"#applealc-not-working-correctly-with-multiple-sound-cards"}},[e._v("AppleALC not working correctly with multiple sound cards")])])]),e._v(" "),r("h3",{attrs:{id:"revisar-si-tienes-las-kexts-correctas"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#revisar-si-tienes-las-kexts-correctas"}},[e._v("#")]),e._v(" Revisar si tienes las kexts correctas")]),e._v(" "),r("p",[e._v("Para empezar, suponemos que ya tienes Lilu y AppleALC instaladas, si no estás seguro de que hayan sido cargadas correctamente puedes correr lo siguiente en la terminal(Esto también revisará si AppleHDA está cargada, ya que sin esto AppleALC no tiene nada que parchear):")]),e._v(" "),r("div",{staticClass:"language-sh extra-class"},[r("pre",{pre:!0,attrs:{class:"language-sh"}},[r("code",[e._v("kextstat "),r("span",{pre:!0,attrs:{class:"token operator"}},[e._v("|")]),e._v(" "),r("span",{pre:!0,attrs:{class:"token function"}},[e._v("grep")]),e._v(" -E "),r("span",{pre:!0,attrs:{class:"token string"}},[e._v('"AppleHDA|AppleALC|Lilu"')]),e._v("\n")])])]),r("p",[e._v("Si aparencen estas 3, estás listo a continuar. Y asegúrate que VoodooHDA "),r("strong",[e._v("no es presente")]),e._v(". Esto causa conflictos con AppleALC. Otras kexts que eliminar de tu sistema:")]),e._v(" "),r("ul",[r("li",[e._v("RealtekALC.kext")]),e._v(" "),r("li",[e._v("CloverALC.kext")]),e._v(" "),r("li",[e._v("VoodooHDA.kext")]),e._v(" "),r("li",[e._v("HDA Blocker.kext")]),e._v(" "),r("li",[e._v("HDAEnabler#.kext(# puede ser 1, 2, o 3)")])]),e._v(" "),r("blockquote",[r("p",[e._v("Hey Lilu and/or AppleALC aren't showing up")])]),e._v(" "),r("p",[e._v("Generalmente el mejor punto de comienzo es busacar los logs de OpenCore y ver si Lilu y AppleALC fueron inyectadas correctamente:")]),e._v(" "),r("div",{staticClass:"language- extra-class"},[r("pre",{pre:!0,attrs:{class:"language-text"}},[r("code",[e._v("14:354 00:020 OC: Prelink injection Lilu.kext () - Success\n14:367 00:012 OC: Prelink injection AppleALC.kext () - Success\n")])])]),r("p",[e._v("Si dice que no inyectó:")]),e._v(" "),r("div",{staticClass:"language- extra-class"},[r("pre",{pre:!0,attrs:{class:"language-text"}},[r("code",[e._v("15:448 00:007 OC: Prelink injection AppleALC.kext () - Invalid Parameter\n")])])]),r("p",[e._v("Main places you can check as to why:")]),e._v(" "),r("ul",[r("li",[r("strong",[e._v("Orden de inyecciónr")]),e._v(": Asegúrate que Lilu es antes de AppleALC en el orden de las kexts")]),e._v(" "),r("li",[r("strong",[e._v("Todas las kexts son la versión más reciente")]),e._v(": Especialmente importante para los plugins de Lilu, ya que kexts mixtas pueden causar problemas")])]),e._v(" "),r("p",[e._v("Nota: Para configurar file logging, dirígete a "),r("a",{attrs:{href:"https://inyextciones.github.io/OpenCore-Install-Guide/troubleshooting/debug.html",target:"_blank",rel:"noopener noreferrer"}},[e._v("OpenCore Debugging"),r("OutboundLink")],1),e._v(".")]),e._v(" "),r("h3",{attrs:{id:"verificar-si-applealc-esta-parcheando-correctamente"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#verificar-si-applealc-esta-parcheando-correctamente"}},[e._v("#")]),e._v(" Verificar si AppleALC está parcheando correctamente")]),e._v(" "),r("p",[e._v("Pues con AppleALC, la manera más fácil de verificar si hizo los parches es ver si tu contraldor de audio fue renombrado correctamente. Descarga "),r("a",{attrs:{href:"https://github.com/khronokernel/IORegistryClone/blob/master/ioreg-302.zip",target:"_blank",rel:"noopener noreferrer"}},[e._v("IORegistryExplorer"),r("OutboundLink")],1),e._v(" y revisa si tienes un dispositivo HDEF:")]),e._v(" "),r("p",[r("img",{attrs:{src:t(373),alt:""}})]),e._v(" "),r("p",[e._v("Se puede ver en la imagen por encima que tenemos lo siguiente:")]),e._v(" "),r("ul",[r("li",[e._v("HDEF Device signífica que el rename funcionó")]),e._v(" "),r("li",[e._v("AppleHDAController attached meaning Apple's audio kext attached successfully")]),e._v(" "),r("li",[r("code",[e._v("alc-layout-id")]),e._v(" is a property showing our boot-arg/DeviceProperty injection was successful\n"),r("ul",[r("li",[e._v("Nota: "),r("code",[e._v("layout-id | Data | 07000000")]),e._v(" es la default layout, y "),r("code",[e._v("alc-layout-id")]),e._v(" will override it and be the layout AppleHDA will use")])])])]),e._v(" "),r("p",[e._v("Nota: "),r("strong",[e._v("No renombres manualmente tu controlador de audio")]),e._v(", esto puede causar problemas dado que AppleALC ya está intentando a parchear. Let AppleALC do it's work.")]),e._v(" "),r("p",[r("strong",[e._v("Más ejemplos")]),e._v(":")]),e._v(" "),r("table",[r("thead",[r("tr",[r("th",{staticStyle:{"text-align":"center"}},[e._v("layout-id correcta")]),e._v(" "),r("th",{staticStyle:{"text-align":"center"}},[e._v("layout-id incorrecta")])])]),e._v(" "),r("tbody",[r("tr",[r("td",{staticStyle:{"text-align":"center"}},[r("img",{attrs:{src:t(374),alt:""}})]),e._v(" "),r("td",{staticStyle:{"text-align":"center"}},[r("img",{attrs:{src:t(375),alt:""}})])])])]),e._v(" "),r("p",[e._v("As you can see from the above 2, the right image is missing a lot of AppleHDAInput devices, meaning that AppleALC can't match up your physical ports to something it can understand and output to. This means you've got some work to find the right layout ID for your system.")]),e._v(" "),r("h3",{attrs:{id:"verificar-applehda-es-vanilla"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#verificar-applehda-es-vanilla"}},[e._v("#")]),e._v(" Verificar AppleHDA es vanilla")]),e._v(" "),r("p",[e._v("Principalmente esta sección es para ellos que antes reemplazaban la AppleHDA stock con una custom one, esto va a verificiar verify si el tuyo es genuino:")]),e._v(" "),r("div",{staticClass:"language-sh extra-class"},[r("pre",{pre:!0,attrs:{class:"language-sh"}},[r("code",[r("span",{pre:!0,attrs:{class:"token function"}},[e._v("sudo")]),e._v(" kextcache -i / "),r("span",{pre:!0,attrs:{class:"token operator"}},[e._v("&&")]),e._v(" "),r("span",{pre:!0,attrs:{class:"token function"}},[e._v("sudo")]),e._v(" kextcache -u /\n")])])]),r("p",[e._v("Esto verifica la signature de AppleHDA y que es válida. Si no es válido tienes que conseguir una copia original de AppleHDA para tu sistema y remplazarla, o actualizar macOS(las kexts serán limpiadas durante las actualizaciones). Esto solo ocurre cuando has parcheado AppleHDA manualmente, así que si tienes una instalación nueva es re improbable que encuentras problemas de la signature.")]),e._v(" "),r("h3",{attrs:{id:"applealc-working-inconsistently"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#applealc-working-inconsistently"}},[e._v("#")]),e._v(" AppleALC working inconsistently")]),e._v(" "),r("p",[e._v("Sometimes race conditions can occur where your hardware isn't initialized in time for AppleHDAController resulting in no sound output. To get around this, you can either:")]),e._v(" "),r("p",[e._v("Specify in boot-args the delay:")]),e._v(" "),r("div",{staticClass:"language- extra-class"},[r("pre",{pre:!0,attrs:{class:"language-text"}},[r("code",[e._v("alcdelay=1000\n")])])]),r("p",[e._v("Or Specify via DeviceProperties(en tu dispositivo HDEF):")]),e._v(" "),r("div",{staticClass:"language- extra-class"},[r("pre",{pre:!0,attrs:{class:"language-text"}},[r("code",[e._v("alc-delay | Number | 1000\n")])])]),r("p",[e._v("The above boot-arg/property will delay AppleHDAController by 1000 ms(1 second), note the ALC delay cannot exceed "),r("a",{attrs:{href:"https://github.com/acidanthera/AppleALC/blob/master/AppleALC/kern_alc.cpp#L308L311",target:"_blank",rel:"noopener noreferrer"}},[e._v("3000 ms"),r("OutboundLink")],1)]),e._v(" "),r("h3",{attrs:{id:"applealc-not-working-correctly-with-multiple-sound-cards"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#applealc-not-working-correctly-with-multiple-sound-cards"}},[e._v("#")]),e._v(" AppleALC not working correctly with multiple sound cards")]),e._v(" "),r("p",[e._v("For rare situations where you have 2 sounds cards(ex. onboard Realtek and an external PCIe card), you may want to avoid AppleALC patching devices you either don't use or don't need patching(like native PCIe cards). This is especially important if you find that AppleALC will not patch you onboard audio controller when the external one is present.")]),e._v(" "),r("p",[e._v("To get around this, primero tenemos que identificar la ubicación de nuestros 2 controladores de audio. La manera más fácil es correr "),r("a",{attrs:{href:"https://github.com/acidanthera/gfxutil/releases",target:"_blank",rel:"noopener noreferrer"}},[e._v("gfxutil"),r("OutboundLink")],1),e._v(" y buscar las PCI IDs:")]),e._v(" "),r("div",{staticClass:"language-sh extra-class"},[r("pre",{pre:!0,attrs:{class:"language-sh"}},[r("code",[e._v("/dirección/para/gfxutil\n")])])]),r("p",[e._v("Now with this large output you'll want to find your PciRoot pathing, for this example, usamos una Creative Sound-Blaster AE-9PE PCIe. Para esto, sabemos que la PCI ID es "),r("code",[e._v("1102:0010")]),e._v(". Cuando buscamos en el output de gfxutil encontramos esto:")]),e._v(" "),r("div",{staticClass:"language- extra-class"},[r("pre",{pre:!0,attrs:{class:"language-text"}},[r("code",[e._v("66:00.0 1102:0010 /PC02@0/BR2A@0/SL05@0 = PciRoot(0x32)/Pci(0x0,0x0)/Pci(0x0,0x0)\n")])])]),r("p",[e._v("Aquí, claramente vemos que nuestra PciRoot es:")]),e._v(" "),r("div",{staticClass:"language- extra-class"},[r("pre",{pre:!0,attrs:{class:"language-text"}},[r("code",[e._v("PciRoot(0x32)/Pci(0x0,0x0)/Pci(0x0,0x0)\n")])])]),r("ul",[r("li",[r("strong",[e._v("Nota")]),e._v(": This will assume you que sabes la Vendor ID y la Device ID de la external tarjeta de audio. For reference, these are the common Vendor IDs:\n"),r("ul",[r("li",[e._v("Creative Labs: "),r("code",[e._v("1102")])]),e._v(" "),r("li",[e._v("AsusTek: "),r("code",[e._v("1043")])])])]),e._v(" "),r("li",[r("strong",[e._v("Nota 2")]),e._v(": Tus direcciones ACPI y PciRoot serán diferentes, así que debes prestar atención a "),r("strong",[e._v("tu")]),e._v(" gfxutil output")])]),e._v(" "),r("p",[e._v("Ahora que sabemos nuestra dirección PciRoot, por fin podemos abrir nuestra config.plist y agregar nuestro parche.")]),e._v(" "),r("p",[e._v("En DeviceProperties -> Add, tienes que agregar tu PciRoot(como un Dictionary) con el child llamado "),r("code",[e._v("external-audio")]),e._v(":")]),e._v(" "),r("div",{staticClass:"language- extra-class"},[r("pre",{pre:!0,attrs:{class:"language-text"}},[r("code",[e._v("DeviceProperties\n| --- > Add\n\t| --- > PciRoot(0x32)/Pci(0x0,0x0)/Pci(0x0,0x0)\n\t\t| ----\x3e external-audio | Data | 01\n")])])]),r("p",[r("img",{attrs:{src:t(376),alt:""}})]),e._v(" "),r("p",[e._v("Y con todo esto hecho, puedes reiniciar y ahora AppleALC debería ignorar tu external controlador de audio!")])])}),[],!1,null,null,null);a.default=s.exports}}]);