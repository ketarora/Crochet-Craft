# Crochet Craft Studio

Artisanal web storefront for **Crochet Craft Studio** (@crochet.craftstudio) — bespoke handcrafted crochet pieces made in Jodhpur, Rajasthan.

## Overview

Crochet Craft Studio is a responsive, high-performance web storefront designed to showcase handcrafted crochet bags, phone cases, keychains, and gift hampers. Built with an occasion-first approach, it bridges social discovery on Instagram directly to bespoke orders via WhatsApp with zero third-party payment gateways.

## Features

- **Artisanal Design System:** Rich Indian heritage palette (Royal Maroon, Jodhpur Velvet, Haldi Gold, Sand Linen) with subtle paper textures and bespoke typography.
- **Physical "Dhaaga" Pull-Cord:** Interactive pull-cord with spring physics that unrolls the live Jodhpur workshop log and toggles the ambient Studio Lamp (Daylight Linen / Velvet Night).
- **Magic Yarn Colorway Studio:** Real-time yarn swatch selector allowing customers to preview custom cotton palettes (Blush Rose, Royal Maroon, Haldi Gold, Sage Mint, Lilac Bloom) across catalog cards.
- **Bespoke Product Experience:** Multi-angle photo zoom, custom colorway selector, and occasion-based gift recommendations.
- **Seamless WhatsApp Checkout:** Full client-side cart drawer that formats structured order messages directly for WhatsApp.
- **Ultra-Lightweight & Fast:** 100% vanilla HTML5, modern CSS3 variables, and modular ES6 JavaScript with zero external runtime dependencies.

## Architecture & Tech Stack

- **Frontend:** Vanilla HTML5, Modern CSS (Variables, Grid, Flexbox, Keyframes), Vanilla JavaScript (ES6)
- **State Management:** Reactive local state synced across browser tabs via `localStorage` and `BroadcastChannel`
- **Routing:** Multi-page static architecture (`index.html`, `shop.html`, `product.html`, `custom.html`, `gifts.html`, `about.html`)
- **Zero Build Step:** Runs directly in any modern browser without npm build pipelines.

## Project Structure

```
├── assets/
│   ├── css/
│   │   ├── design-tokens.css   # Color palette, spacing, type scale
│   │   ├── site.css            # Base layouts, components, utilities
│   │   ├── v2.css              # Page-specific views & typography
│   │   └── v3.css              # Pull cord, 3D motifs & studio shade
│   ├── js/
│   │   ├── data.js             # Product catalog & pricing dataset
│   │   ├── app.js              # Header/footer injection, cart & drawer logic
│   │   └── craft3d.js          # Interactive pull cord, studio shade & swatches
│   └── img/                    # High-res photography & assets
├── data/
│   └── products.json           # Catalog schema & product metadata
├── index.html                  # Landing page & curated shelf
├── shop.html                   # Full product catalog with filter chips
├── product.html                # Product detail view with zoom
├── custom.html                 # Custom order builder
├── gifts.html                  # Occasion-based gift finder
├── about.html                  # Brand story & sister founders
└── README.md                   # Project documentation
```

## Getting Started

To run the site locally:

```bash
# Clone the repository
git clone https://github.com/ketarora/Crochet-Craft.git
cd Crochet-Craft

# Start a local static server
python -m http.server 4321
```

Open `http://localhost:4321/site/index.html` in your browser.

## License

MIT License. Built for Crochet Craft Studio.
