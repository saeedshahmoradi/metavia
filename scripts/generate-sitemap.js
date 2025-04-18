const fs = require('fs');
const path = require('path');
const axios = require('axios');

const baseSiteUrl = 'https://www.metavia.ir'; // اینو حتما تغییر بده
const apiBase = 'https://ourresume.pythonanywhere.com';
const staticRoutes = ['', 'members', 'portfolio', 'contactUs', 'blogs'];
const languages = ['en', 'fa'];

async function fetchDynamicRoutes() {
  const [blogsRes, membersRes] = await Promise.all([
    axios.get(`${apiBase}/blogs/?lang=en`),
    axios.get(`${apiBase}/members/?lang=en`)
  ]);

  const blogSlugs = blogsRes.data.map(blog => blog.slug);
  const memberSlugs = membersRes.data.map(member => member.slug);

  return {
    blogs: blogSlugs,
    members: memberSlugs
  };
}

function buildUrl(path) {
  return `${baseSiteUrl}${path}`;
}

async function generateSitemap() {
  const { blogs, members } = await fetchDynamicRoutes();

  let urls = [];

  // استاتیک‌ها برای هر زبان
  languages.forEach(lang => {
    staticRoutes.forEach(route => {
      urls.push(`/${lang}/${route}`);
    });
  });

  // داینامیک‌ها برای هر زبان
  languages.forEach(lang => {
    blogs.forEach(slug => {
      urls.push(`/${lang}/blog/${slug}`);
    });

    members.forEach(slug => {
      urls.push(`/${lang}/resume/${slug}`);
    });
  });

  // تولید XML
  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(url => `
  <url>
    <loc>${buildUrl(url)}</loc>
  </url>`).join('')}
</urlset>`;

  // ذخیره فایل
  const sitemapPath = path.join(__dirname, '../public/sitemap.xml');
  fs.writeFileSync(sitemapPath, sitemapXml, 'utf8');
  console.log('✅ sitemap.xml generated!');
}

generateSitemap().catch(console.error);
