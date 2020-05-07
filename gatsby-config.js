let siteConfig;
let ghostConfig;

try {
  siteConfig = require(`./siteConfig`);
} catch (e) {
  siteConfig = null;
}

try {
  ghostConfig = require(`./.ghost`);
} catch (e) {
  ghostConfig = {
    development: {
      apiUrl: process.env.GHOST_API_URL,
      contentApiKey: process.env.GHOST_CONTENT_API_KEY,
      version: process.env.GHOST_VERSION
    },
    production: {
      apiUrl: process.env.GHOST_API_URL,
      contentApiKey: process.env.GHOST_CONTENT_API_KEY,
      version: process.env.GHOST_VERSION
    }
  };
} finally {
  const { apiUrl, contentApiKey } =
    process.env.NODE_ENV === `development`
      ? ghostConfig.development
      : ghostConfig.production;

  if (!apiUrl || !contentApiKey || contentApiKey.match(/<key>/)) {
    ghostConfig = null; //allow default config to take over
  }
}

let gatsbyPlugins = [
  {
    resolve: `@draftbox-co/gatsby-ghost-balsa-theme`,
    options: {
      ghostConfig: ghostConfig,
      siteConfig: siteConfig
    }
  }
]

if(process.env.SEGMENT_KEY) {
  gatsbyPlugins.push({
    resolve: `gatsby-plugin-segment-js`,
    options: {
      prodKey: process.env.SEGMENT_KEY,
      devKey: process.env.SEGMENT_KEY,
      trackPage: true,
      delayLoad: true,
      delayLoadTime: 1000
    }
  });
}

if(process.env.GA) {
  gatsbyPlugins.unshift({
    resolve: `gatsby-plugin-google-analytics`,
    options: {
      trackingId: process.env.GA,
      head: true
    }
  });
}

module.exports = {
  plugins: gatsbyPlugins
};
// gatsby-config.js
module.exports = {
plugins: [
    {
    resolve: `@draftbox-co/gatsby-ghost-balsa-ghost`,
    options: {
        siteConfig: {
        siteUrl: `https://your-bog.com`,
        postsPerPage: 12,
        siteTitleMeta: `Gatsby Frontend powered by headless Ghost CMS`,
        siteDescriptionMeta: `Turn your Ghost blog into a lightning fast static website with Gatsby`, 
        shareImageWidth: 1000,
        shareImageHeight: 523,
        shortTitle: `Ghost`,
        siteIcon: `favicon.png`,
        backgroundColor: `#e9e9e9`,
        themeColor: `#15171A`,
        },
        ghostConfig: {
            "development": {
                "apiUrl": "http://localhost:2368",
                "contentApiKey": "9fcfdb1e5ea5b472e2e5b92942",
            },
            "production": {
                "apiUrl": "https://your-ghost-cms.com",
                "contentApiKey": "9fcfdb1e5ea5b472e2e5b92942",
            },
        },
      },
   },
],  
}
