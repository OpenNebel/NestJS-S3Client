import {defineConfig} from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
    lang: 'en-US',
    title: "NestJS S3-CLIENT",
    description: "NestJS module for AWS S3 adapted for AWS SDK v3",
    cleanUrls: true,
    themeConfig: {
        // https://vitepress.dev/reference/default-theme-config
        nav: [
            {text: 'Home', link: '/'},
            {text: 'Features', link: '/markdown-examples'}
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
                    {text: 'Markdown Examples', link: '/markdown-examples'},
                    {text: 'Runtime API Examples', link: '/api-examples'}
                ]
            }
        ],

        socialLinks: [
            {icon: 'github', link: 'https://github.com/OpenNebel/Nest-AWS-SDK-V3-S3-CLIENT'},
            {icon: 'npm', link: 'https://www.npmjs.com/package/@open-nebel/nest-s3'},

        ]
    }
})
