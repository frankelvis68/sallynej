# CLIENT_TODO: Confirmation & Asset Checklist

This checklist documents every fact, asset, and configuration item required from the client (**Sally-Nej Dynamic Company Limited**) before full public launch.

All business facts currently stored in `/src/config/site.ts` originate from a blurry logo photo and a single third-party listing profile. None has been confirmed by the client yet.

---

## 1. Legal & Corporate Identity
- [ ] **Exact Legal Name**: Confirm exact spelling and hyphenation. (Currently configured as: `"Sally-Nej Dynamic Company Limited"`)
- [ ] **RC Number**: Confirm exact registration digits. (Currently configured as: `"17551415"`)
- [ ] **Official Master Logo**: Provide high-resolution vector logo (`.svg`) or transparent PNG asset (`≥ 1024px`). (The circular logo mark with curved text is illegible at navbar scale; a crisp text wordmark "Sally-Nej" with "Dynamic Company Limited" is currently active).

---

## 2. Contact Details & Official Communications
Please provide official values to populate in environment variables (`.env`):
- [ ] **Official Phone Number(s)** (`NEXT_PUBLIC_PHONE`): e.g. `+234 800 000 0000`
- [ ] **Official WhatsApp Business Line** (`NEXT_PUBLIC_WHATSAPP`): e.g. `08000000000`
- [ ] **Official Public Email Address** (`NEXT_PUBLIC_EMAIL`): e.g. `info@sallynejdynamic.com`
- [ ] **Official Office / Physical Address** (`NEXT_PUBLIC_ADDRESS`): e.g. `Abuja, FCT, Nigeria`
- [ ] **Official Social Media Profiles**:
  - `NEXT_PUBLIC_FACEBOOK`: Facebook page URL
  - `NEXT_PUBLIC_INSTAGRAM`: Instagram handle / URL
  - `NEXT_PUBLIC_LINKEDIN`: LinkedIn company page URL

---

## 3. Services & Geographic Scope
- [ ] **Confirmed Services**: Inferred services are:
  - Property Sales
  - Rentals
  - Short Lets
  - Land Sales  
  *(Note: Unconfirmed services like "Estate Development" and "Property Management" have been strictly omitted from production).*
- [ ] **Coverage Areas**: Inferred districts in Abuja:
  - Karu, Kuje, Kubwa, Lugbe, Katampe, Galadimawa, Airport Road. Confirm if other districts (e.g. Maitama, Guzape, Jabi, Wuse) should be included.

---

## 4. Property Listings & Photography
- [ ] **Real Property Photography**: Replace placeholder/sample images in `/public/images/properties/` with authentic high-resolution photos of active client properties.
- [ ] **Real Property Inventory**: Populate `/src/data/properties.ts` with authentic property titles, prices, descriptions, and verified AGIS title documentation types (C of O, R of O).
  *(Currently ships empty in production by default, displaying a professional "Listings coming soon" state until populated).*

---

## 5. Metrics & Social Proof (Optional)
- [ ] **Company Statistics**: If verified, provide real numbers for properties sold, active clients, and years in operation to populate `/src/data/stats.ts`.
- [ ] **Client Testimonials**: Provide authentic quotes and client consent to populate `/src/data/testimonials.ts`.

---

## 6. Legal & Infrastructure
- [ ] **Privacy Notice Review**: Have company legal counsel review `/src/app/privacy/page.tsx` for formal compliance under the Nigeria Data Protection Act (NDPA).
- [ ] **Production Domain**: Configure `NEXT_PUBLIC_SITE_URL` (e.g. `https://sallynejdynamic.com`).
- [ ] **Form Submission Endpoint**: Provide a Formspree, Basin, or custom webhook URL for `NEXT_PUBLIC_FORM_ENDPOINT`.
