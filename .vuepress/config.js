const {
    description
} = require('../package')

module.exports = {
    /**
     * Ref：https://v1.vuepress.vuejs.org/config/#title
     */
    title: 'OpenCore Post-Install',
    /**
     * Ref：https://v1.vuepress.vuejs.org/config/#description
     */
    description: description,

    /**
     * Extra tags to be injected to the page HTML `<head>`
     *
     * ref：https://v1.vuepress.vuejs.org/config/#head
     */
    head: [
        ['meta', {
            name: 'theme-color',
            content: '#3eaf7c'
        }],
        ['meta', {
            name: 'apple-mobile-web-app-capable',
            content: 'yes'
        }],
        ['meta', {
            name: 'apple-mobile-web-app-status-bar-style',
            content: 'black'
        }],
        ["link", {
            rel: "'stylesheet",
            href: "/styles/website.css"
        },]
    ],
    base: '/OpenCore-Post-Install/',


    /**
     * Theme configuration, here is the default theme configuration for VuePress.
     *
     * ref：https://v1.vuepress.vuejs.org/theme/default-theme-config.html
     */
    theme: 'vuepress-theme-succinct',
    globalUIComponents: [
        'ThemeManager'
    ],

    themeConfig: {
        lastUpdated: true,
        repo: 'https://github.com/inyextciones/OpenCore-Post-Install',
        editLinks: false,
        docsDir: 'OpenCore-Post-Install',
        editLinkText: '',
        logo: '/homepage.png',
        nav: [{
            text: 'Dortania Guides',
            items: [{
                text: 'Home Site',
                link: 'https://dortania.github.io/'
            },
            {
                text: 'OpenCore Install Guide',
                link: 'https://dortania.github.io/OpenCore-Install-Guide/'
            },
			{
                text: 'Getting Started With ACPI',
                link: 'https://dortania.github.io/Getting-Started-With-ACPI/'
            },
            {
                text: 'GPU Buyers Guide',
                link: 'https://dortania.github.io/GPU-Buyers-Guide/'
            },
            {
                text: 'Wireless Buyers Guide',
                link: 'https://dortania.github.io/Wireless-Buyers-Guide/'
            },
            {
                text: 'Anti Buyers Guide',
                link: 'https://dortania.github.io/Anti-Hackintosh-Buyers-Guide/'
            },
            ]
        },],
        sidebar: [{
            title: 'Introducción',
            collapsable: false,
            sidebarDepth: 1,
            children: [
                '',
            ]

        },
        {
            title: 'Universal',
            collapsable: false,
            sidebarDepth: 2,
            children: [
                ['/universal/security', 'Seguridad y FileVault'],
                ['/universal/audio', 'Arreglar Audio'],
                ['/universal/oc2hdd', 'Arrancar sin USB'],
                ['/universal/update', 'Actualizar OpenCore, kexts y macOS'],
                ['/universal/drm', 'Arreglar el DRM'],
                ['/universal/iservices', 'Arreglar iServices'],
                ['/universal/pm', 'Arreglar la administración de energía'],
                ['/universal/sleep', 'Arreglar Suspensión'],
            ]
        },
		{
            title: 'Arreglos para USB',
            collapsable: false,
            sidebarDepth: 1,
            children: [
            	['/usb/', 'USB Mapping: Introducción'],
				['/usb/system-preparation', 'Preparación del Sistema'],
				{
	            title: 'USB Mapping',
	            collapsable: true,
	            sidebarDepth: 2,
	            children: [
	            	['/usb/intel-mapping/intel', 'Intel USB mapping'],
					['/usb/manual/manual', 'Manual Mapping'],
	            ]
				},
				{
	            title: 'Arreglos Misceláneos',
	            collapsable: true,
	            sidebarDepth: 1,
	            children: [
	            	['/usb/misc/power', 'Fixing USB Power'],
					['/usb/misc/shutdown', 'Fixing Shutdown/Restart'],
					['/usb/misc/instant-wake', 'Fixing Instant Wake'],
					['/usb/misc/keyboard', 'Fixing Keyboard Wake Issues'],
	            ]
				},
            ]
		},
        {
            title: 'Específicos de Laptops',
            collapsable: false,
            children: [
                ['/laptop-specific/battery', 'Fixing Battery Read-outs'],

            ]
        },
        {
            title: 'Cosméticos',
            collapsable: false,
            children: [
                ['/cosmetic/verbose', 'Fixing Resolution and Verbose'],
                ['/cosmetic/gui', 'Agregar una GUI y el Boot-chime'],
            ]
        },
        {
            title: 'Multiboot',
            collapsable: false,
            children: [
                ['/multiboot/bootstrap', 'Configurar Bootstrap.efi'],
                ['/multiboot/bootcamp', 'Instalar BootCamp'],
            ]
        },
        {
            title: 'Misceláneo',
            collapsable: false,
            children: [
                ['/misc/rtc', 'Arreglar RTC'],
                ['/misc/msr-lock', 'Arreglar CFG Lock'],
                ['/misc/nvram', 'NVRAM Emulada'],
            ]
        },

        ],
    },

    /**
     * Apply plugins，ref：https://v1.vuepress.vuejs.org/zh/plugin/
     */
    plugins: [
        '@vuepress/plugin-back-to-top',
        'vuepress-plugin-smooth-scroll',
        ['vuepress-plugin-medium-zoom',
            {
                selector: "img",
                options: {
                    background: 'var(--bodyBgColor)'
                }
            }],
    ]
}
