(window.webpackJsonp=window.webpackJsonp||[]).push([[21],{405:function(e,i,t){e.exports=t.p+"assets/img/sign.194f5ee7.png"},406:function(e,i,t){e.exports=t.p+"assets/img/sign-demo.1f95ff8c.png"},496:function(e,i,t){"use strict";t.r(i);var o=t(25),a=Object(o.a)({},(function(){var e=this,i=e.$createElement,o=e._self._c||i;return o("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[o("h1",{attrs:{id:"seguridad-y-filevault"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#seguridad-y-filevault"}},[e._v("#")]),e._v(" Seguridad y FileVault")]),e._v(" "),o("p",[e._v("Una característica muy espacial de OpenCore es que fue creado con security in mind which is quite rare especially en la comunidad Hackintosh. Well here we'll be going through and setting up some of OpenCore's great Security features:")]),e._v(" "),o("h2",{attrs:{id:"filevault"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#filevault"}},[e._v("#")]),e._v(" FileVault")]),e._v(" "),o("p",[e._v("FileVault is macOS's builtin drive encryption, and with OpenCore support for it has been drastically improved compared to the legacy Clover drivers.")]),e._v(" "),o("p",[e._v("Para empezar, necesitas estos .efi drivers:")]),e._v(" "),o("ul",[o("li",[e._v("OpenRuntime.efi\n"),o("ul",[o("li",[o("a",{attrs:{href:"https://github.com/acidanthera/OpenCorePkg/releases",target:"_blank",rel:"noopener noreferrer"}},[e._v("OpenUsbKbDxe.efi"),o("OutboundLink")],1),e._v(" para usarios de DuetPkg (sistemas incomptible con UEFI)")])])])]),e._v(" "),o("p",[o("strong",[e._v("Do not use VirtualSMC.efi with OpenCore, its already baked inside")]),e._v(". You do however require VirtualSMC.kext still")]),e._v(" "),o("p",[e._v("Setting in your config.plist:")]),e._v(" "),o("ul",[o("li",[e._v("Misc -> Boot\n"),o("ul",[o("li",[o("code",[e._v("PollAppleHotKeys")]),e._v(" set to YES(While not needed can be helpful)")])])]),e._v(" "),o("li",[e._v("Misc -> Security\n"),o("ul",[o("li",[o("code",[e._v("AuthRestart")]),e._v(" set to YES(Enables Authenticated restart for FileVault 2 so password is not required on reboot. Can be considered a security risk so optional)")])])]),e._v(" "),o("li",[e._v("NVRAM -> Add -> 4D1EDE05-38C7-4A6A-9CC6-4BCCA8B38C14\n"),o("ul",[o("li",[o("code",[e._v("UIScale")]),e._v(" set to "),o("code",[e._v("02")]),e._v(" for high resolution small displays")])])]),e._v(" "),o("li",[e._v("UEFI -> Input\n"),o("ul",[o("li",[o("code",[e._v("KeySupport")]),e._v(" set to YES(Only when using OpenCore's builtin input, users of OpenUsbKbDxe should avoid)")])])]),e._v(" "),o("li",[e._v("UEFI -> Output\n"),o("ul",[o("li",[o("code",[e._v("ProvideConsoleGop")]),e._v(" to YES")])])]),e._v(" "),o("li",[e._v("UEFI -> ProtocolOverrides\n"),o("ul",[o("li",[o("code",[e._v("FirmwareVolume")]),e._v(" set to YES")]),e._v(" "),o("li",[o("code",[e._v("HashServices")]),e._v(" set to YES for Broadwell and older(this includes X99), this is needed for systems with broken SHA-1 hashing")]),e._v(" "),o("li",[o("code",[e._v("AppleSmcIo")]),e._v(" set to YES(this replaces VirtualSMC.efi)")])])]),e._v(" "),o("li",[e._v("UEFI -> Quirks\n"),o("ul",[o("li",[o("code",[e._v("RequestBootVarRouting")]),e._v(" set to YES")]),e._v(" "),o("li",[o("code",[e._v("ExitBootServicesDelay")]),e._v(" set to "),o("code",[e._v("3000")]),e._v("-"),o("code",[e._v("5000")]),e._v(" if you receive "),o("code",[e._v("Still waiting for root device")]),e._v(" on Aptio IV firmwares(Broadwell and older)")])])])]),e._v(" "),o("p",[e._v("With all this, you can proceed to enable FileVault like on a normal mac under "),o("code",[e._v("System Preferences -> Security & Privacy -> FileVault")])]),e._v(" "),o("p",[e._v("For UI issues, see "),o("RouterLink",{attrs:{to:"/cosmetic/verbose.html"}},[e._v("Fixing Resolution and Verbose")])],1),e._v(" "),o("h2",{attrs:{id:"vault"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#vault"}},[e._v("#")]),e._v(" Vault")]),e._v(" "),o("p",[o("strong",[e._v("Qué es vaulting?")])]),e._v(" "),o("p",[e._v("Well vaulting is based around 2 things, vault.plist and vault.sig:")]),e._v(" "),o("ul",[o("li",[e._v('vault.plist: a "snapshot" of your EFI')]),e._v(" "),o("li",[e._v("vault.sig: validation of vault.plist")])]),e._v(" "),o("p",[e._v("This can be seen as secure boot for OpenCore, so no one can modify it and get in without your permission.")]),e._v(" "),o("p",[e._v("The specifics of vaulting is that a 256 byte RSA-2048 signature of vault.plist will be shoved into our OpenCore.efi. This key can either be shoved into "),o("a",{attrs:{href:"https://github.com/acidanthera/OpenCorePkg/blob/master/Platform/OpenCore/OpenCoreVault.c",target:"_blank",rel:"noopener noreferrer"}},[e._v("OpenCoreVault.c"),o("OutboundLink")],1),e._v(" before compiling or with "),o("code",[e._v("sign.command")]),e._v(" if you already have OpenCore.efi compiled.")]),e._v(" "),o("p",[e._v("Do note that nvram.plist won't be vaulted so users with emulated NVRAM still have risk of someone adding/removing certain NVRAM variables")]),e._v(" "),o("p",[o("strong",[e._v("Ajustes en tu config.plist")]),e._v(":")]),e._v(" "),o("ul",[o("li",[o("code",[e._v("Misc -> Security -> Vault")]),e._v(":\n"),o("ul",[o("li",[o("code",[e._v("Basic")]),e._v(": Requires just vault.plist to be present, mainly used for filesystem integrity verification")]),e._v(" "),o("li",[o("code",[e._v("Secure")]),e._v(": Requires both vault.plist and vault.sig, used for best security as vault.plist changes require a new signature")])])]),e._v(" "),o("li",[o("code",[e._v("Booter -> ProtectSecureBoot:")]),e._v(" "),o("code",[e._v("YES")]),e._v(" "),o("ul",[o("li",[e._v("Needed with Insyde firmwares for fixing secure boot keys and reporting violations")])])])]),e._v(" "),o("p",[o("strong",[e._v("Configurar vault")]),e._v(":")]),e._v(" "),o("p",[e._v("Descarga OpenCorePkg y abre la carpeta "),o("code",[e._v("CreateVault")]),e._v(", dentro de esta carpeta encontramos lo siguiente:")]),e._v(" "),o("ul",[o("li",[o("code",[e._v("create_vault.sh")])]),e._v(" "),o("li",[o("code",[e._v("RsaTool")])]),e._v(" "),o("li",[o("code",[e._v("sign.command")])])]),e._v(" "),o("p",[e._v("The last one is what we care about: "),o("code",[e._v("sign.command")])]),e._v(" "),o("p",[e._v("So when we run this command, it'll look for the EFI folder located beside our Utilities folder, so we want to bring either our personal EFI into the OpenCorePkg folder or bring Utilities into our EFI folder:")]),e._v(" "),o("p",[o("img",{attrs:{src:t(405),alt:""}})]),e._v(" "),o("p",[e._v("Now we're ready to run "),o("code",[e._v("sign.command")]),e._v(":")]),e._v(" "),o("p",[o("img",{attrs:{src:t(406),alt:""}})]),e._v(" "),o("p",[o("strong",[e._v("Disabling Vault after setup")]),e._v(":")]),e._v(" "),o("p",[e._v("If you're doing heavy troubleshooting or have the need to disable Vault, the main things to change:")]),e._v(" "),o("ul",[o("li",[e._v("Descarga una nueva copia de OpenCore.efi")]),e._v(" "),o("li",[o("code",[e._v("Misc -> Security -> Vault")]),e._v(" set to Optional")])]),e._v(" "),o("h2",{attrs:{id:"scanpolicy"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#scanpolicy"}},[e._v("#")]),e._v(" ScanPolicy")]),e._v(" "),o("p",[e._v("What this quirk allows to prevent scanning and booting from untrusted sources. Setting to "),o("code",[e._v("0")]),e._v(" will allow all sources present to be bootable but calculating a specific ScanPolicy value will allow you a greater range of flexibility and security.")]),e._v(" "),o("p",[e._v("To calculate the ScanPolicy value, you simply add up all the hexadecimal values(with a hexadecimal calculator, you can access this from the built-in macOS calculator app with "),o("code",[e._v("⌘+3")]),e._v("). Once it's all added up, you would add this hexadecimal value to ScanPolicy(you will need to convert it to a decimal value first, Xcode will automatically convert it when you paste it)")]),e._v(" "),o("p",[o("code",[e._v("0x00000001 (bit 0)")]),e._v(" — OC_SCAN_FILE_SYSTEM_LOCK")]),e._v(" "),o("ul",[o("li",[e._v("restricts scanning to only known file systems defined as a part of this policy. File system drivers may not be aware of this policy, and to avoid mounting of undesired file systems it is best not to load its driver. This bit does not affect dmg mounting, which may have any file system. Known file systems are prefixed with OC_SCAN_ALLOW_FS_.")])]),e._v(" "),o("p",[o("code",[e._v("0x00000002 (bit 1)")]),e._v(" — OC_SCAN_DEVICE_LOCK")]),e._v(" "),o("ul",[o("li",[e._v("restricts scanning to only known device types defined as a part of this policy. This is not always possible to detect protocol tunneling, so be aware that on some systems it may be possible for e.g. USB HDDs to be recognized as SATA. Cases like this must be reported. Known device types are prefixed with OC_SCAN_ALLOW_DEVICE_.")])]),e._v(" "),o("p",[o("code",[e._v("0x00000100 (bit 8)")]),e._v(" — OC_SCAN_ALLOW_FS_APFS")]),e._v(" "),o("ul",[o("li",[e._v("allows scanning of APFS file system.")])]),e._v(" "),o("p",[o("code",[e._v("0x00000200 (bit 9)")]),e._v(" — OC_SCAN_ALLOW_FS_HFS")]),e._v(" "),o("ul",[o("li",[e._v("allows scanning of HFS file system.")])]),e._v(" "),o("p",[o("code",[e._v("0x00000400 (bit 10)")]),e._v(" — OC_SCAN_ALLOW_FS_ESP")]),e._v(" "),o("ul",[o("li",[e._v("allows scanning of EFI System Partition file system.")])]),e._v(" "),o("p",[o("code",[e._v("0x00010000 (bit 16)")]),e._v(" — OC_SCAN_ALLOW_DEVICE_SATA")]),e._v(" "),o("ul",[o("li",[e._v("allow scanning SATA devices.")])]),e._v(" "),o("p",[o("code",[e._v("0x00020000 (bit 17)")]),e._v(" — OC_SCAN_ALLOW_DEVICE_SASEX")]),e._v(" "),o("ul",[o("li",[e._v("allow scanning SAS and Mac NVMe devices.")])]),e._v(" "),o("p",[o("code",[e._v("0x00040000 (bit 18)")]),e._v(" — OC_SCAN_ALLOW_DEVICE_SCSI")]),e._v(" "),o("ul",[o("li",[e._v("allow scanning SCSI devices.")])]),e._v(" "),o("p",[o("code",[e._v("0x00080000 (bit 19)")]),e._v(" — OC_SCAN_ALLOW_DEVICE_NVME")]),e._v(" "),o("ul",[o("li",[e._v("allow scanning NVMe devices.")])]),e._v(" "),o("p",[o("code",[e._v("0x00100000 (bit 20)")]),e._v(" — OC_SCAN_ALLOW_DEVICE_ATAPI")]),e._v(" "),o("ul",[o("li",[e._v("allow scanning CD/DVD devices.")])]),e._v(" "),o("p",[o("code",[e._v("0x00200000 (bit 21)")]),e._v(" — OC_SCAN_ALLOW_DEVICE_USB")]),e._v(" "),o("ul",[o("li",[e._v("allow scanning USB devices.")])]),e._v(" "),o("p",[o("code",[e._v("0x00400000 (bit 22)")]),e._v(" - OC_SCAN_ALLOW_DEVICE_FIREWIRE")]),e._v(" "),o("ul",[o("li",[e._v("allow scanning FireWire devices.")])]),e._v(" "),o("p",[o("code",[e._v("0x00800000 (bit 23)")]),e._v(" — OC_SCAN_ALLOW_DEVICE_SDCARD")]),e._v(" "),o("ul",[o("li",[e._v("allow scanning card reader devices.")])]),e._v(" "),o("p",[o("code",[e._v("0x01000000 (bit 24)")]),e._v(" — OC_SCAN_ALLOW_DEVICE_PCI")]),e._v(" "),o("ul",[o("li",[e._v("allow scanning devices directly connected to PCI bus (e.g. VIRTIO).")])]),e._v(" "),o("p",[e._v("By default, ScanPolicy is given a value of "),o("code",[e._v("0x10F0103")]),e._v("(17,760,515) which is the combination of the following:")]),e._v(" "),o("ul",[o("li",[e._v("OC_SCAN_FILE_SYSTEM_LOCK")]),e._v(" "),o("li",[e._v("OC_SCAN_DEVICE_LOCK")]),e._v(" "),o("li",[e._v("OC_SCAN_ALLOW_FS_APFS")]),e._v(" "),o("li",[e._v("OC_SCAN_ALLOW_DEVICE_SATA")]),e._v(" "),o("li",[e._v("OC_SCAN_ALLOW_DEVICE_SASEX")]),e._v(" "),o("li",[e._v("OC_SCAN_ALLOW_DEVICE_SCSI")]),e._v(" "),o("li",[e._v("OC_SCAN_ALLOW_DEVICE_NVME")]),e._v(" "),o("li",[e._v("OC_SCAN_ALLOW_DEVICE_PCI")])]),e._v(" "),o("p",[e._v("And lets just say for this example that you want to add OC_SCAN_ALLOW_DEVICE_USB:")]),e._v(" "),o("p",[o("code",[e._v("0x00200000")]),e._v(" + "),o("code",[e._v("0x10F0103")]),e._v(" = "),o("code",[e._v("0x12F0103")])]),e._v(" "),o("p",[e._v("And converting this to decimal gives us "),o("code",[e._v("19,857,667")])])])}),[],!1,null,null,null);i.default=a.exports}}]);