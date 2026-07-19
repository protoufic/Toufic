# Toufic Abou Ali — Six Continents

Production-ready static campaign website built with semantic HTML, modern CSS, and vanilla JavaScript. No build command is required.

## Deploy to Vercel

1. Push the contents of this folder to the root of the connected GitHub repository.
2. In Vercel, import the repository or use the existing connected project.
3. Framework preset: **Other**.
4. Root directory: `./`.
5. Leave Build Command, Output Directory, and Install Command empty.
6. Deploy.

## Contact configuration

Edit `assets/js/config.js`. The public email is configured. `whatsappUrl` and `calendlyUrl` intentionally remain empty because no approved public WhatsApp or Calendly URL was supplied. When valid URLs are added, the contact flow reveals those options automatically.

## Main public pages

- `index.html` — Home / mission
- `record.html` — Journey & Proof
- `story.html` — Founder
- `partners.html` — Partners
- `warsaw.html` — Detailed IRONMAN 70.3 Warsaw page
- `media.html` — Utility media kit page

## Media

The three mission scenes are served locally from `assets/media/` with frequent keyframes and separate mobile encodes. Keep their filenames unchanged unless the HTML references are updated.

## Legal wording

The website consistently uses “world-record attempt.” It does not claim Guinness World Records approval or IRONMAN endorsement. Third-party graphic logos are not rendered because usage permission was not confirmed; restrained text references and naturally visible race branding in authentic Warsaw photography are used instead.
