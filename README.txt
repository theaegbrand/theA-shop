THE A — website files (everything in ONE folder)
================================================

Keep ALL these files together in the same folder. Nothing goes in sub-folders.

index.html      the page — open this file to see the site
style.css       all the design (CSS)
config.js       YOUR SETTINGS: social links, delivery / exchange / payment text, About text,
                products, prices, sizes and photo file names
app.js          how the site works (product windows, ordering, 3D logo, mobile)
logo-data.js    the logo, built in (used by the 3D logo and every logo on the page)
favicon.png     browser-tab icon
logo.png, logo.svg      your logo files (backup copies)
*.jpg           the product photos (offline-white-pink-*, offline-white-navy-*, ash-set-grey-*)

PUT IT ONLINE (GitHub Pages)
1. Open your repository > Add file > Upload files.
2. Drag ALL the files in this folder in at once, then Commit.
3. Settings > Pages > deploy from the main branch, root folder.

EDIT THINGS (all in config.js)
- WhatsApp / Instagram / Facebook links: CONFIG at the top.
- Delivery, exchange, payment text: "policies" in CONFIG.
- Prices: "was" (original) and "now" (sale) inside PRODUCTS.
- Top-only / pants-only prices: "parts" inside a product.
- Photos: replace a .jpg with a new one of the SAME NAME (tall portrait, about 900 px wide).

All three products now have their photos (candy-knit-cardigan-1/2/3.jpg).
To add a new product later: copy one product block in config.js, give it new photos, and upload them next to index.html.
