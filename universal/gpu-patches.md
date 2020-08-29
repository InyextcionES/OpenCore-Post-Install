# Parches del GPU



Esta sección pequenna es para ellos que tienen más que lo que es provided by simple framebuffer patching y los auto-parches de WhateverGreen:

* [Applying a fakeID for unsupported GPUs](https://dortania.github.io/Getting-Started-With-ACPI/Universal/spoof.html)
* [Parchear BusID de la iGPU para motherboards de la serie 300](#parchear-BusID-del-la-iGPU)

## Convertir un fakeID de Clover para OpenCore

Guía movida aquí: [Renaming GPUs](https://dortania.github.io/Getting-Started-With-ACPI/Universal/spoof.html)

## Parchear BusID de la iGPU

Esta sección es para usarios usando motherboards de la "true" serie 300( B360, B365, H310, H370, Z390) que tienen problemas con usar pantallas conectadas a la iGPU.

Para empezar supongo que ya has hecho unos básicos parches del framebuffer en tu config desde la [sección Coffee Lake de la guía](https://inyextciones.github.io/OpenCore-Install-Guide/config.plist/coffee-lake.html), debería ser algo así:

![](../images/extras/gpu-patches-md/prereq.png)

* **Nota**: En macOS 10.15.5, hay muchas problemas que causan una pantalla negra si usas `07009B3E`, si tienes estos problemas usa `00009B3E`

Now that we're prepped, we can start looking into busID patching. Checking the dumps at the official [WhateverGreen repository](https://github.com/acidanthera/WhateverGreen/blob/master/Manual/FAQ.IntelHD.en.md) shows us this for the `3E9B0007` ID(Desktop UHD 630):

```
ID: 3E9B0007, STOLEN: 57 MB, FBMEM: 0 bytes, VRAM: 1536 MB, Flags: 0x00801302
TOTAL STOLEN: 58 MB, TOTAL CURSOR: 1 MB (1572864 bytes), MAX STOLEN: 172 MB, MAX OVERALL: 173 MB (181940224 bytes)
GPU Name: Intel UHD Graphics 630
Model Name(s):
Camelia: Disabled
Mobile: 0, PipeCount: 3, PortCount: 3, FBMemoryCount: 3
[1] busId: 0x05, pipe: 9, type: 0x00000400, flags: 0x000003C7 - DP
[2] busId: 0x04, pipe: 10, type: 0x00000400, flags: 0x000003C7 - DP
[3] busId: 0x06, pipe: 8, type: 0x00000400, flags: 0x000003C7 - DP
01050900 00040000 C7030000
02040A00 00040000 C7030000
03060800 00040000 C7030000
```

Looking at all this can be quite overwhelming, but we'll break it down to be a bit simpler. For use we care about this:

```
[1] busId: 0x05, pipe: 9, type: 0x00000400, flags: 0x000003C7 - DP
[2] busId: 0x04, pipe: 10, type: 0x00000400, flags: 0x000003C7 - DP
[3] busId: 0x06, pipe: 8, type: 0x00000400, flags: 0x000003C7 - DP
01050900 00040000 C7030000
02040A00 00040000 C7030000
03060800 00040000 C7030000
```

These are your iGPUs ports by default, lets go through port 1 y ver para qué se usa cada sección:

The first port:

```
01050900 00040000 C7030000
```

Port: 01

* **01**050900 00040000 C7030000

busId: 0x05

* 01**05**0900 00040000 C7030000

Pipe Number 9 (little endian):

* 0105**0900** 00040000 C7030000

Connector type: DisplayPort

* 01050900 **00040000** C7030000

Flags - We leave it as default:

* 01050900 00040000 **C7030000**

Things to note:

* No es posible usar la misma busId twice, tener 2 usadas creará conflictos
* Pipe number y flags no tienen que ser cambiados

Lista de connector types:

* `00 04 00 00` - DisplayPort
* `00 08 00 00` - HDMI
* `04 00 00 00` - Digital DVI
* `02 00 00 00` - LVDS (for laptops)
* `01 00 00 00` - Dummy port

### Mapear puertos de vídeo

1. Conecta la pantalla al puerto HDMI

2. Set Port 1 to the HDMI connector type:

   * 01xx0900 **00080000** C7030000

3. Desactiva los puertos 2 y 3 con busid=00:

   * 02**00**0A00 00040000 C7030000
   * 03**00**0800 00040000 C7030000

4. Walk through busids for Port 1 if the previous didn't work(yup you gotta do a shit ton of reboots). The maximum busid on most platforms is 0x06

   * 01**01**0900 00080000 C7030000
   * 01**02**0900 00080000 C7030000
   * 01**03**0900 00080000 C7030000
   * etc

If you still get no output, set port 1's busid to 00 and start going through busids for port 2 and so on

* 01000900 00040000 C7030000
* 02xx0A00 00080000 C7030000
* 03000800 00040000 C7030000

### Agregar a tu config.plist

Es bastante fácil agregar estos parche aunque un montón de entradas son requeridas:

* framebuffer-con0-enable = `01000000`
* framebuffer-con1-enable = `01000000`
* framebuffer-con2-enable = `01000000`
* framebuffer-con0-alldata = port 1
* framebuffer-con1-alldata = port 2
* framebuffer-con2-alldata = port 3

Entonces cuando agregas los parches, port 1 se convertirá a con0 ya que los puertos empiezan desde 0. These are also all data types when entering your values.

Una config completada debería ser algo así:

![](../images/extras/gpu-patches-md/path-done.png)

Source for iGPU BusID patching: [CorpNewt's Brain](https://github.com/corpnewt)
