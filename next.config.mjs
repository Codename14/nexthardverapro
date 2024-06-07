// import withNextIntl from 'next-intl/plugin';

// const nextIntlConfig = withNextIntl();

// /** @type {import('next').NextConfig} */
// const nextConfig = {};

// export default nextIntlConfig(nextConfig);

import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {};

export default withNextIntl(nextConfig);
