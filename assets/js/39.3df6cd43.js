(window.webpackJsonp=window.webpackJsonp||[]).push([[39],{504:function(e,t,o){"use strict";o.r(t);var i=o(25),s=Object(i.a)({},(function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[o("h1",{attrs:{id:"filevault"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#filevault"}},[e._v("#")]),e._v(" FileVault")]),e._v(" "),o("p",[e._v("FileVault es la builtin drive encryption de macOS, y su compatibilidad con OpenCore es muchísimo mejor que los drivers legacy de Clover.")]),e._v(" "),o("p",[e._v("Para empezar, necesitas estos drivers .efi:")]),e._v(" "),o("ul",[o("li",[e._v("OpenRuntime.efi\n"),o("ul",[o("li",[o("a",{attrs:{href:"https://github.com/acidanthera/OpenCorePkg/releases",target:"_blank",rel:"noopener noreferrer"}},[e._v("OpenUsbKbDxe.efi"),o("OutboundLink")],1),e._v(" para usarios de DuetPkg(sistemas sin UEFI)")])])])]),e._v(" "),o("p",[o("strong",[e._v("No uses VirtualSMC.efi con OpenCore, ya already baked inside")]),e._v(". Sin embargo necesitas VirtualSMC.kext aún")]),e._v(" "),o("p",[e._v("Ajustes en tu config.plist:")]),e._v(" "),o("ul",[o("li",[e._v("Misc -> Boot\n"),o("ul",[o("li",[o("code",[e._v("PollAppleHotKeys")]),e._v(" set to YES(aunque no es necesario puede ser útil)")])])]),e._v(" "),o("li",[e._v("Misc -> Security\n"),o("ul",[o("li",[o("code",[e._v("AuthRestart")]),e._v(" set to YES(Activa Authenticated restart para FileVault 2 así que no necesitas la contrasenna después de reiniciar. Se trata como un riesgo de seguridad así que es opccional)")])])]),e._v(" "),o("li",[e._v("NVRAM -> Add -> 4D1EDE05-38C7-4A6A-9CC6-4BCCA8B38C14\n"),o("ul",[o("li",[o("code",[e._v("UIScale")]),e._v(" set to "),o("code",[e._v("02")]),e._v(" for high resolution small displays")])])]),e._v(" "),o("li",[e._v("UEFI -> Input\n"),o("ul",[o("li",[o("code",[e._v("KeySupport")]),e._v(" set to YES(Only when using OpenCore's builtin input, usarios de OpenUsbKbDxe lo deben evitar)")])])]),e._v(" "),o("li",[e._v("UEFI -> Output\n"),o("ul",[o("li",[o("code",[e._v("ProvideConsoleGop")]),e._v(" to YES")])])]),e._v(" "),o("li",[e._v("UEFI -> ProtocolOverrides\n"),o("ul",[o("li",[o("code",[e._v("FirmwareVolume")]),e._v(" set to YES")]),e._v(" "),o("li",[o("code",[e._v("HashServices")]),e._v(" set to YES para Broadwell y anterior(esto incluye X99), se necesita para sistemas con SHA-1 hashing roto")]),e._v(" "),o("li",[o("code",[e._v("AppleSmcIo")]),e._v(" set to YES(esto succc VirtualSMC.efi)")])])]),e._v(" "),o("li",[e._v("UEFI -> Quirks\n"),o("ul",[o("li",[o("code",[e._v("RequestBootVarRouting")]),e._v(" set to YES")]),e._v(" "),o("li",[o("code",[e._v("ExitBootServicesDelay")]),e._v(" set to "),o("code",[e._v("3000")]),e._v("-"),o("code",[e._v("5000")]),e._v(" si tienes el error "),o("code",[e._v("Still waiting for root device")]),e._v(" en Aptio IV firmwares(Broadwell y anterior)")])])])]),e._v(" "),o("p",[e._v("Con todo esto, puedes activar FileVault como un mac normal en "),o("code",[e._v("System Preferences -> Security & Privacy -> FileVault")])]),e._v(" "),o("p",[e._v("Para problemas de la UI, dirígete a "),o("RouterLink",{attrs:{to:"/cosmetic/verbose.html"}},[e._v("Fixing Resolution and Verbose")])],1)])}),[],!1,null,null,null);t.default=s.exports}}]);