# Desactivar GPU





So you need to hide your unsupported GPU? Well with OpenCore things are slightly different, specifically that we need to specify to which exact device we want to spoof. There are 3 ways we can do this:

* Boot Flag
  * Desacitva todos los GPUs sin incluso la iGPU
* DeviceProperties
  * Desactiva GPU on a per-slot basis
* SSDT
  * Desactiva GPU on a per-slot basis

**CSM debe ser desativado en la BIOS para que el spoof funcione correctamente, especially on AMD CPU based systems.**

### Boot Flag

El método más fàcil es agregar este boot-arg:

`-wegnoegpu`

Ten en cuenta que esto va a desactivar todos los GPUs excluding la iGPU.

### Método de DeviceProperties

Este método también es bastante fácil también, Encuentra la ruta PCI con [gfxutil](https://github.com/acidanthera/gfxutil/releases) y luego crea una nueva sección en DeviceProperties con tu spoof:

```
dirección/para/gfxutil -f GFX0
```

El output will result será algo así:

```
DevicePath = PciRoot(0x0)/Pci(0x1,0x0)/Pci(0x0,0x0)/Pci(0x0,0x0)/Pci(0x0,0x0)
```

With this, navigate towards `Root -> DeviceProperties -> Add` and add your PCI route with the following properties:

| Key | Type | Value |
| :--- | :--- | :--- |
| name | data | 23646973706C6179 |
| IOName | string | \#display |
| class-code | data | FFFFFFFF |

![](../images/extras/spoof-md/config-gpu.png)

### Métedo de SSDT

Hay muchas maneras de encontrar la dirección pero generalmente, la manera más fácil es abrir Device Manager en Windows y buscar la dirección PCI.

Ejemplo de dirección device:

`\_SB.PCI0.PEG0.PEGP`

    DefinitionBlock ("", "SSDT", 2, "hack", "spoof", 0x00000000)
    {
       External (_SB_.PCI0.PEG0.PEGP, DeviceObj)    // (from opcode)
    
       Method (_SB.PCI0.PEG0.PEGP._DSM, 4, NotSerialized)  // _DSM: Device-Specific Method
       {
          If (LOr (LNot (Arg2), LEqual (_OSI ("Darwin"), Zero)))
          {
             Return (Buffer (One)
             {
                0x03                                           
             })
          }
    
          Return (Package (0x0A)
          {
             "name", 
             Buffer (0x09)
             {
                "#display"
             }, 
    
             "IOName", 
             "#display", 
             "class-code", 
             Buffer (0x04)
             {
                0xFF, 0xFF, 0xFF, 0xFF                         
             }, 

             "vendor-id", 
             Buffer (0x04)
             {
                0xFF, 0xFF, 0x00, 0x00                         
             }, 
    
             "device-id", 
             Buffer (0x04)
             {
                0xFF, 0xFF, 0x00, 0x00                         
             }
          })
       }
    }

Se encuentra una copia de esta SSDT aquí: [Spoof-SSDT.dsl](https://github.com/inyextciones/OpenCore-Install-Guide/blob/master/extra-files/Spoof-SSDT.dsl) Necesitarás [MaciASL](https://github.com/acidanthera/MaciASL/releases) para compilar esto. Ten en cuenta que `.aml` es assembled y `.dsl` es source code. Puedes compilar con MaciASL by seleccionar File -> Save As -> ACPI Machine Language.

Source: CorpNewt

## Windows GPU Selection

Dependiendo de tu setup, you may find that Windows renders games or applications using an undesired GPU.

Muchos usarios solo tienen dos GPUs. Nvidia y la IGPU Intel HD/UHD. Dado que Nvidia ya no no es compatible con macOS, they may have the monitor plugged into the motherboards HDMI/DP connection for convenience. As a result, Windows will render all games and applications through the IGPU. You can reroute a specific game or application to a different GPU by going to: Settings > System > Display > Graphics settings

![Credit to CorpNewt para la imagen](../images/extras/spoof-md/corp-windows.png)

The rendered game or application will have its buffer copied to the IGPU. Which is then displayed to you. This does come with a few downsides:

- GSync no funcionará.
- No se puede abrir los ajustes de Nvidia.
- Decreased frame rate.
- Increased input latency.
- Refresh rate cap.

Si tu motherboard solo tiene un conector HDMI para la IGPU, the maximum refresh rate for spec 2.1 es [120Hz](https://www.hdmi.org/spec21Sub/EightK60_FourK120). This assumes your board, cable and monitor are of the same spec. This means your 144Hz monitor is only seeing a maximum of 120Hz as determined by the hardware. This limitation *no* apply si tu placa tiene un conector DP para la IGPU.

Si tienes más de dos GPUs (AMD, Nvidia y Intel), este ajuste es limitado. Una pantalla conectada a la GPU AMD tiene el efeito que Windows solo te dejará seleccionar la GPU AMD la IGPU de Intel. La GPU de Nvidia GPU no aparecerá.

Nota: GSync y los ajustes de NV requiere que la pantalla sea conectada a la GPU. Una recomendación, si usas ambas sistemas operativos igualmente, la mejor opción es un switch para HDMI o DP.
