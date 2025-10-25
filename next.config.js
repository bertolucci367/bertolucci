module.exports = {
  i18n: {
    locales: ['pt-br'],
    defaultLocale: 'pt-br',
  },
  images: {
    domains: ['media.graphcms.com', 'us-west-2.graphassets.com'],
    deviceSizes: [375, 768, 1024, 1280, 1920],
  },
  webpack: function (config, options) {
    // Preserve Next.js defaults. Do NOT overwrite experiments, as Next sets
    // required flags internally (e.g., experiments.layers) for certain entries.
    // If you need to add experiments, merge instead of replacing:
    // config.experiments = { ...(config.experiments || {}), layers: true }
    return config
  },
}
