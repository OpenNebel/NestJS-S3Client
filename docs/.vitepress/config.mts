import {defineConfig} from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
    lang: 'en-US',
    title: "NestJS S3-CLIENT",
    description: "NestJS module for AWS S3 adapted for AWS SDK v3",
    cleanUrls: true,
    themeConfig: {
        lastUpdated: true,
        // https://vitepress.dev/reference/default-theme-config
        nav: [
            {text: 'Home', link: '/'},
            {text: 'Features', link: '/features/available-methods'}
        ],

        search: {
            provider: 'local'
        },

        sidebar: [
            {
                text: 'Guide',
                items: [
                    {text: 'Introduction', link: '/introduction'},
                    {text: 'Getting Started', link: '/getting-started'},
                    {text: 'Configuration', link: '/configuration'},
                ]
            },
            {
                text: 'Features',
                items: [
                    {text: 'Available methods', link: '/features/available-methods'},
                ]
            }
        ],

        footer: {
            message: 'Released under the MIT License.',
            copyright: 'Copyright © 2024 - OpenNebel (Nebel Mass)'
        },

        socialLinks: [
            {icon: 'github', link: 'https://github.com/OpenNebel/NestJS-S3Client'},
            {icon: 'npm', link: 'https://www.npmjs.com/package/@open-nebel/nest-s3'},
        ]
    }
})
