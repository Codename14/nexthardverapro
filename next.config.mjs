// import withNextIntl from 'next-intl/plugin';

// const nextIntlConfig = withNextIntl();

// /** @type {import('next').NextConfig} */
// const nextConfig = {};

// export default nextIntlConfig(nextConfig);

import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'images.unsplash.com',
            },
            {
                protocol: 'https',
                hostname: 'plus.unsplash.com',
            },
        ],
    },
};

export default withNextIntl(nextConfig);
