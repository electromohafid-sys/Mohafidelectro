export default function robots() {
  return {
    rules: { userAgent: '*', allow: '/', disallow: ['/admin'] },
    sitemap: 'https://YOUR-DOMAIN.com/sitemap.xml'
  };
}
