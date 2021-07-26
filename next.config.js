module.exports = {
  i18n: {
    locales: ['pt-br'],
    defaultLocale: 'pt-br',
  },
  images: {
    domains: ['media.graphcms.com'],
    deviceSizes: [375, 768, 1024, 1280, 1920],
  },
  webpack: function (config, options) {
    // console.log(options.webpack.version)
    config.experiments = {}
    return config
  },
}
