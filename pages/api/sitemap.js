const { SitemapStream, streamToPromise } = require("sitemap");
const { Readable } = require("stream");

export default async (req, res) => {
  // An array with your links
  const links = [
    { url: "/", changefreq: "never", priority: 0.4 },
    { url: "/about", changefreq: "never", priority: 0.3 },
    { url: "/contact", changefreq: "never", priority: 0.3 },
    { url: "/FAQ", changefreq: "never", priority: 0.3 },
    { url: "/privacy", changefreq: "never", priority: 0.3 },
    { url: "/terms", changefreq: "never", priority: 0.3 },
    { url: "/landing/baniya", changefreq: "never", priority: 0.3 },
    { url: "/landing/jain", changefreq: "never", priority: 0.3 },
    { url: "/landing/muslim", changefreq: "never", priority: 0.3 },
    { url: "/landing/punjabi", changefreq: "never", priority: 0.3 },
    { url: "/landing/christian", changefreq: "never", priority: 0.3 },
    { url: "/landing/marathi", changefreq: "never", priority: 0.3 },
    { url: "/landing/south", changefreq: "never", priority: 0.3 },
  ];

  // Create a stream to write to
  const stream = new SitemapStream({ hostname: `https://${req.headers.host}` });

  res.writeHead(200, {
    "Content-Type": "application/xml",
  });

  const xmlString = await streamToPromise(
    Readable.from(links).pipe(stream)
  ).then((data) => data.toString());

  res.end(xmlString);
};
