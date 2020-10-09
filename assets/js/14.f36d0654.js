(window.webpackJsonp=window.webpackJsonp||[]).push([[14],{395:function(e,a,t){e.exports=t.p+"assets/img/usb-mount.bec53b4c.png"},396:function(e,a,t){e.exports=t.p+"assets/img/hdd-mount.3dbb6ca3.png"},397:function(e,a,t){e.exports=t.p+"assets/img/hdd-clean.5072f7a2.png"},500:function(e,a,t){"use strict";t.r(a);var s=t(25),r=Object(s.a)({},(function(){var e=this,a=e.$createElement,s=e._self._c||a;return s("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[s("h1",{attrs:{id:"mover-opencore-desde-la-usb-al-disco-de-macos"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#mover-opencore-desde-la-usb-al-disco-de-macos"}},[e._v("#")]),e._v(" Mover OpenCore desde la USB al disco de macOS")]),e._v(" "),s("h2",{attrs:{id:"abrir-opencore-desde-la-usb"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#abrir-opencore-desde-la-usb"}},[e._v("#")]),e._v(" Abrir OpenCore desde la USB")]),e._v(" "),s("p",[e._v("Entonces para empezar, primero quermos abrir OpenCore desde nuestro instalador. Para hacer esto, vamos a usar una herramienta útil de CorpNewt que es "),s("a",{attrs:{href:"https://github.com/corpnewt/MountEFI",target:"_blank",rel:"noopener noreferrer"}},[e._v("MountEFI"),s("OutboundLink")],1)]),e._v(" "),s("p",[e._v("Para este ejemplo, suponemos que tu USB es "),s("code",[e._v("Install macOS Catalina")]),e._v(":")]),e._v(" "),s("p",[s("img",{attrs:{src:t(395),alt:""}})]),e._v(" "),s("p",[e._v("Con la EFI montada, hacemos un backup de nuestra carpeta EFI. Luego queremos "),s("strong",[e._v("ejectar la EFI del disco USB")]),e._v(" ya que tener varias EFIs montadas puede confundir a macOS, recomendamos que solo tienes 1 EFI montada at the same time(puedes ejectar solamante la EFI, no tienes que desconectar totalmente el disco)")]),e._v(" "),s("p",[s("strong",[e._v("Nota")]),e._v(": Instaladors hecho con MakeInstall.bat de gibMacOS en Windows will default a un Master Boot Record(MBR) partition map, this means there is no dedicated EFI partition instead being the "),s("code",[e._v("BOOT")]),e._v(" partition that mounts by default en macOS.")]),e._v(" "),s("p",[s("img",{attrs:{src:t(396),alt:""}})]),e._v(" "),s("p",[e._v("Now with this done, vamos a montar nuestro disco de macOS. En macOS Catalina, en realidad macOS es partitioned entre 2 volumes: System Partition y User Partition. Esto significa que MountEFI may report multiple drives en su picker pero cada partición aún compartirá la misma EFI(La espec UEFI solamente permite 1 EFI por cada disco). Puedes revisar si es el mismo disco por ver disk"),s("strong",[e._v("X")]),e._v("sY (Y es el número de la partición)")]),e._v(" "),s("p",[s("img",{attrs:{src:t(397),alt:""}})]),e._v(" "),s("p",[e._v("Cuando montas la EFI de tu disco principal, a veces encuentras una carpeta llamada "),s("code",[e._v("APPLE")]),e._v(", esta es usada para actualizar el firmware en Macs reales pero no tiene ningún efecto para nuestro hardware. Puedes eliminar todo de la partición EFI y replace it con la que tienes guardado en tu USB")]),e._v(" "),s("h2",{attrs:{id:"notas-especiales-para-usarios-legacy"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#notas-especiales-para-usarios-legacy"}},[e._v("#")]),e._v(" Notas especiales para usarios legacy")]),e._v(" "),s("p",[e._v("When transferring over your EFI, todavía son sectores de boot que tienen que ser escritos para que tu non-UEFI BIOS lo pueda encontrar. Por lo tanto, no te olvides correr "),s("a",{attrs:{href:"https://inyextciones.github.io/OpenCore-Install-Guide/extras/legacy.html",target:"_blank",rel:"noopener noreferrer"}},[s("code",[e._v("BootInstall.command")]),s("OutboundLink")],1),e._v(" de nuevo en tu disco para macOS")])])}),[],!1,null,null,null);a.default=r.exports}}]);