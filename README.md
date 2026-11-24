# Sally-Nej Dynamic Company Limited — Website Documentation

Production-ready Next.js web application built for **Sally-Nej Dynamic Company Limited (RC: 17551415)**, real estate developers and advisors in Abuja, Nigeria.

---

## 1. Quick Start & Setup

### Prerequisites
- Node.js 20+ installed
- npm

### Installation
```bash
# Install dependencies
npm install

# Run development server
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 2. Environment Variables Configuration

Copy `.env.example` to `.env.local` and configure your channels:

```env
# Contact Details (Leave blank to hide UI element completely)
NEXT_PUBLIC_PHONE="+234 800 000 0000"
NEXT_PUBLIC_WHATSAPP="08000000000"
NEXT_PUBLIC_EMAIL="info@sallynejdynamic.com"
NEXT_PUBLIC_ADDRESS="Abuja, FCT, Nigeria"

# Social Links
NEXT_PUBLIC_FACEBOOK=""
NEXT_PUBLIC_INSTAGRAM=""
NEXT_PUBLIC_LINKEDIN=""

# Production Domain & Formspree Endpoint
NEXT_PUBLIC_SITE_URL="https://sallynejdynamic.com"
NEXT_PUBLIC_FORM_ENDPOINT=""

# Sample Data Preview Toggle (default false)
NEXT_PUBLIC_USE_SAMPLE_DATA="false"
```

> **Note on Strict Content Rules:** If any contact variable is empty, its corresponding link, icon, and footer entry will gracefully hide without placeholder text.

---

## 3. How to Add a Real Property Listing

1. Place property photos in `/public/images/properties/<slug>-1.jpg`.
2. Edit `/src/data/properties.ts` and add your property entry to the exported `PROPERTIES` array:

```typescript
{
  id: "prop-unique-id",
  slug: "4-bedroom-terrace-duplex-katampe",
  title: "4-Bedroom Terrace Duplex",
  type: "house", // "house" | "flat" | "land" | "commercial"
  listingType: "sale", // "sale" | "rent" | "short-let"
  price: 550000000,
  currency: "NGN",
  pricePeriod: "total", // "total" | "year" | "night"
  location: "Katampe Extension, Abuja",
  area: "katampe",
  bedrooms: 4,
  bathrooms: 5,
  sizeSqm: 420,
  description: "Description of the property...",
  images: [
    { src: "/images/properties/katampe-1.jpg", alt: "Katampe Duplex exterior" }
  ],
  featured: true
}
```

---

## 4. Testing & Verification

```bash
# Run unit tests (Vitest)
npm test

# Build production bundle
npm run build

# Start production server
npm run start
```

---

## 5. Deploying to Vercel

1. Push your repository to GitHub / GitLab / Bitbucket.
2. In the Vercel Dashboard, click **Add New Project** and select this repository.
3. In **Environment Variables**, add the keys defined in `.env.example`.
4. Click **Deploy**.
