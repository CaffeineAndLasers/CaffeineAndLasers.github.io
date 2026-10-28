<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0" 
                xmlns:html="http://www.w3.org/TR/REC-html40"
                xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>
  <xsl:template match="/">
    <html xmlns="http://www.w3.org/1999/xhtml">
      <head>
        <title>Caffeine and Lasers XML Sitemap</title>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <style type="text/css">
          :root {
            --color-primary-purple: #5de4ff;
            --color-primary-pink: #e85a82;
            --color-bg-light: #0b223d;
            --color-bg-medium: #102b4c;
            --color-bg-dark: #06152b;
            --color-text-body: #f6f3e8;
            --border-primary: 1px solid #315679;
            --border-radius-standard: 2px;
          }
          
          body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
            color: var(--color-text-body);
            background-color: var(--color-bg-dark);
            background-image:
              repeating-linear-gradient(0deg, rgba(255,255,255,0.025) 0 1px, transparent 1px 4px),
              linear-gradient(145deg, #041020 0%, #08213f 52%, #030b18 100%);
            background-attachment: fixed;
            margin: 0;
            padding: 20px;
          }
          
          a {
            color: var(--color-primary-purple);
            text-decoration-thickness: 1px;
            text-underline-offset: 0.2em;
          }
          
          a:hover {
            text-decoration: underline;
          }
          
          .container {
            max-width: 1200px;
            margin: 0 auto;
            background-color: var(--color-bg-light);
            padding: 20px;
            border: var(--border-primary);
            border-top: 6px solid var(--color-primary-purple);
            border-radius: var(--border-radius-standard);
            box-shadow: 12px 12px 0 rgba(1,7,18,0.4);
          }
          
          h1 {
            color: var(--color-primary-pink);
            font-size: 24px;
            margin-top: 0;
            padding-bottom: 10px;
          }
          
          h2 {
            color: var(--color-primary-purple);
            font-size: 18px;
          }
          
          table {
            border-collapse: collapse;
            width: 100%;
            margin-top: 20px;
          }
          
          th {
            background-color: var(--color-bg-medium);
            text-align: left;
            padding: 12px;
            font-weight: bold;
          }
          
          td {
            padding: 12px;
            border-bottom: 1px solid var(--color-bg-medium);
          }
          
          tr:hover td {
            background-color: var(--color-bg-medium);
          }
          
          .url {
            word-break: break-all;
          }
          
          .priority, .changefreq, .lastmod {
            text-align: center;
          }
          
          .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
          }
          
          .header a {
            font-size: 14px;
            padding: 8px 12px;
            background-color: var(--color-primary-purple);
            color: var(--color-bg-dark);
            border-radius: 2px;
          }
          
          @media (max-width: 768px) {
            .container {
              padding: 10px;
            }
            
            th, td {
              padding: 8px;
            }
            
            .header {
              flex-direction: column;
              align-items: flex-start;
            }
            
            .header a {
              margin-top: 10px;
            }
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Caffeine and Lasers XML Sitemap</h1>
            <a href="/">Back to Homepage</a>
          </div>
          
          <p>This is the XML sitemap for Caffeine and Lasers, automatically generated to help search engines index the site's content.</p>
          
          <h2>URLs (<xsl:value-of select="count(sitemap:urlset/sitemap:url)"/> total)</h2>
          <table>
            <tr>
              <th>URL</th>
              <th>Last Modified</th>
              <th>Change Frequency</th>
              <th>Priority</th>
            </tr>
            <xsl:for-each select="sitemap:urlset/sitemap:url">
              <tr>
                <td class="url"><a href="{sitemap:loc}"><xsl:value-of select="sitemap:loc"/></a></td>
                <td class="lastmod"><xsl:value-of select="substring(sitemap:lastmod, 0, 11)"/></td>
                <td class="changefreq"><xsl:value-of select="sitemap:changefreq"/></td>
                <td class="priority"><xsl:value-of select="sitemap:priority"/></td>
              </tr>
            </xsl:for-each>
          </table>
        </div>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
