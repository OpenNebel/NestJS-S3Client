import {defineConfig} from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
    title: "NestJS S3-CLIENT",
    description: "NestJS module for AWS S3 adapted for AWS SDK v3",
    cleanUrls: true,
    themeConfig: {
        lastUpdated: true,
        // https://vitepress.dev/reference/default-theme-config
        nav: [
            {text: 'Home', link: '/'},
            {text: 'Guide', link: '/introduction'},
            {text: 'Features', link: '/features/available-methods'},
            {text: 'Issues', link: 'https://github.com/OpenNebel/NestJS-S3Client/issues'},

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
                    {text: 'Get Client', link: '/features/get-client'},
                    {text: 'Create Bucket', link: '/features/create-bucket'},
                    {text: 'Upload Object', link: '/features/upload-object'},
                    {text: 'Get Object', link: '/features/get-object'},
                    {text: 'Delete One Object', link: '/features/delete-one-object'},
                    {text: 'Delete All Objects', link: '/features/delete-all-objects'},
                    {text: 'Delete Bucket', link: '/features/delete-bucket'},
                    {text: 'Create Presigned URL', link: '/features/presigned-url'},
                    {text: 'List Buckets [NEW]', link: '/features/list-buckets'},
                    {text: 'Copy Object [NEW]', link: '/features/copy-object'},
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
