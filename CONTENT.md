# CONTENT.md

Every string that appears on the Gohil's Group site, with its source.

**Rules for this file**

- Nothing here is invented. Each block carries a `SOURCE`.
- `TODO:CONFIRM` marks anything the client must verify before launch.
- `INFERRED` marks reasoning from market context, never presented as fact on the page without confirmation.
- **Zero em-dashes and zero en-dashes.** Hyphen, comma, colon or full stop only. This applies to every string below, including the address.
- Strings live in `src/data/`. Nothing is hardcoded in JSX.

Source keys: `image-1` (wide banner) · `image-2` (orange panel) · `image-3` (light panel) · `instagram` (their feed) · `indiamart` · `tradeindia` · `inferred` · `client-todo`

---

## 1. Identity

| Field | Value | Source |
|---|---|---|
| Umbrella brand | Gohil's Group | `image-1`, `image-2` |
| Division 1 | Gohil Industrial Co. | `image-1`, `image-2` |
| Division 1 tagline | Joining To Automation | `image-2`, `instagram` |
| Division 2 | Gohil Engitech Co. | `image-1`, `image-2` |
| Division 2 tagline | Engineering to your needs | `image-2` |
| Established | 1994 | `indiamart`, `tradeindia` |
| Legal status | Sole proprietorship | `indiamart` |
| Nature of business | Manufacturer, distributor, supplier | `indiamart`, `tradeindia` |
| Shipment | By road | `indiamart` |
| Payment modes | Cash, cheque, DD, online | `indiamart` |

**Note on the taglines.** The client sets them with inconsistent capitalisation: "Joining To Automation" but "Engineering to your needs". Reproduced exactly as they write them. `TODO:CONFIRM` whether they want this normalised.

**Note on business type.** The distinction matters and must not be blurred. They **manufacture** conveyors, machinery and oil mill equipment. They are an **authorised dealer** for the branded gearboxes. Copy never implies they manufacture Bonfiglioli or SEW units.

---

## 2. People and contact

| Field | Value | Source |
|---|---|---|
| Name 1 | Shailesh Gohil | `image-1`, `image-3` |
| Phone 1 | +91 94269 72346 | `image-1`, `image-3`, `instagram` |
| Role 1 | Proprietor | `indiamart` |
| Name 2 | Kishan Gohil | `image-1`, `image-3` |
| Phone 2 | +91 63543 03742 | `image-1`, `image-3`, `instagram` |
| Role 2 | CEO | `indiamart` |
| Email | gohil.industrial.co@gmail.com | `image-2` |
| Instagram | instagram.com/gohil_industrial_co_ | decoded from the QR in `image-2` |
| Facebook | facebook.com/gohilindustrialco.1994 | prior research |

> **TODO:CONFIRM (roles).** IndiaMART lists Shailesh Gohil as Proprietor and Kishan Gohil as CEO. TradeIndia lists Kishan Gohil as Proprietor. The two directories contradict each other. Until the client confirms, the site shows **names and phone numbers only, with no role titles.**

### 2.1 Address

Canonical string, reconciled from three partial renderings:

```
Shop No. 5-6, V. D. Parekh Andh Mahila Vikas Gruh,
Opp. BJP Office, Nr. Water Tank, Dhebar Road (South),
Rajkot - 360 002, Gujarat, India
```

`SOURCE:` `image-1` gives the V. D. Parekh building. `image-3` gives "Opp. BJP Office, Nr. Water Tank". `tradeindia` carries both in one string, which proves they are the same place described by different landmarks.

> **TODO:CONFIRM.** Only "Shop No. 5" versus "Shop No. 5-6" is genuinely open. `image-1` says 5, `image-3` says 5-6, `tradeindia` says 5. Most likely they took the adjacent shop.

### 2.2 Hours

```
Monday to Sunday
```

`SOURCE:` `tradeindia` states "Working Days: Monday - Sunday".

> **TODO:CONFIRM.** Opening and closing times are unknown. The `LocalBusiness` schema `openingHours` field stays out until the client answers. Do not guess.

### 2.3 GSTIN

```
24ACLPG4254B1Z2
```

`SOURCE:` `tradeindia` publishes it in full. `indiamart` shows it masked as 24**********1Z2, consistent.

> **TODO:CONFIRM.** Recommend showing it in the footer. Indian B2B buyers read a visible GSTIN as a trust signal. Client to approve.

### 2.4 Deliberately excluded

| Fact | Why it is not on the site |
|---|---|
| Annual turnover, Rs 4 Crores | `tradeindia`. Publicly self-declared, but publishing it works directly against looking like an established supplier. |
| Employee count | `indiamart` says 11 to 25, `tradeindia` says 8. The sources contradict. No headcount is published. |
| Banker, Kotak Mahindra Bank | `indiamart`. Not relevant to a buyer. |
| IndiaMART seller rating, 2.7 from 3 reviews | Never surfaced, never embedded, never linked. |
| All listed prices | See section 5. |

---

## 3. Navigation

| Label | Route |
|---|---|
| Products | `/products` |
| Industrial | `/industrial` |
| Engitech | `/engitech` |
| Brands | `/brands` |
| Industries | `/industries` |
| About | `/about` |
| Contact | `/contact` |

Mobile menu also carries both phone numbers as tap to call, a WhatsApp button, the email and the address.

---

## 4. Home page copy

### 4.1 Hero

```
H1        We stock the drives. We build the machines.

Subline   Authorised dealer for Bonfiglioli, SEW-Eurodrive and ABB.
          Custom conveyors and oil mill machinery, built in Rajkot since 1994.

CTA 1     WhatsApp enquiry          (primary, orange plate, ink label)
CTA 2     Call 94269 72346          (secondary)
```

`SOURCE:` dealer names from `image-1`. "Built in Rajkot since 1994" from `indiamart`. The two-clause headline is the two divisions, stated plainly.

Subline is 19 words, inside the 20 word hero limit. Three hero elements total, inside the limit of four. No eyebrow, no scroll cue, no trust strip.

### 4.2 The two firms

```
H2        Two firms, one counter.

Left      Gohil Industrial Co.
          Joining To Automation
          We supply.
          Authorised dealer for ten drive and motor brands. Helical, planetary,
          worm and cycloidal gearboxes, gear motors and three phase motors.

Right     Gohil Engitech Co.
          Engineering to your needs
          We build.
          Conveyors, blowers, goods lifts and oil mill machinery, fabricated to
          your drawing or ours. Stacker conveyors up to 33 feet.
```

`SOURCE:` product ranges from `image-1` and `image-3`. "33 feet" from `instagram` (Model G3 stacker conveyor).

### 4.3 Capability strip

The ten items exactly as the client lists them in `image-3`, in their order:

```
Goods Lift · Gear Boxes · Gear Motors · Electric Motors · Mig Wires ·
Flux Cored Wires · Welding Electrodes · Pharma Equipment ·
All Type of Conveyors · Oil Mill Machinery & Spares
```

`SOURCE:` `image-3`, verbatim including their capitalisation and the ampersand. Their own typography puts the bullet after each item, which the component reproduces.

### 4.4 What we build

```
Marker    24 in x 33 ft
H2        Built in Rajkot.
Body      Fabricated at the shop on Dhebar Road, to your drawing or ours.
```

Featured product, the only one with published specs because they are the client's own:

```
Stacker Conveyor
Model G3
33 feet · 2 HP · 24 inch belt
For loading, unloading and stacking heavy goods. Available for all customised order.
```

`SOURCE:` `instagram`. The caption text is quoted close to verbatim: "Stacker Conveyor for Loading and Unloading and also for stacking for heavy Goods. Available for all Customized Order."

Other build items: Belt conveyor, Screw conveyor, Bucket conveyor, Telescopic conveyor, Vibro sifter, Centrifugal blower, Axial flow fan, Goods lift, Oil mill machinery and spares, Semi automatic oil pumping machine.

`SOURCE:` `image-1`, `image-3`, `indiamart`, `tradeindia`.

### 4.5 What we supply

```
Marker    i = 1:5 to 1:100
H2        Ex-stock drives.
Body      Four gearbox families, plus gear motors and three phase motors.
          Price on request.
```

> **TODO:CONFIRM.** The ratio span "1:5 to 1:100" is the normal commercial range for these families and is consistent with their listings, but the client must confirm what they actually hold. Marked `INFERRED` in `claims.ts` until then.

The four families from `image-1`:

| Family | Copy |
|---|---|
| Helical Gearbox | Inline, vertical and parallel shaft. Foot and flange mounting. |
| Planetary Gearbox | High torque density for low speed, high load drives. |
| Worm Gear | Aluminium body, cast iron and universal. Compact right angle reduction. |
| Customized Gear | Built or sourced to your ratio, torque and mounting. |

### 4.6 Ratio finder

```
Title     Find your ratio
Body      Enter the motor speed and the output speed you need.
Field 1   Input speed (rpm)
Field 2   Required output speed (rpm)
Result    i = 1:__
Result 2  Families we carry in this range
Button    Send this on WhatsApp
```

Default input speed 1440 rpm, which is a four pole motor at 50 Hz. Real, not a placeholder.

### 4.7 Authorised dealer

```
H2        Authorised Dealer
```

`SOURCE:` `image-1`, verbatim. This exact wording is used and never upgraded to "Partners", "Trusted by" or anything implying endorsement.

The ten principals on their banner, in banner order:

```
TGPL (Transtech Gears) · Havells · Elecon · Shanthi Gears ·
Radicon PBL Siemens · Bonfiglioli · ABB · SEW-Eurodrive ·
Rotomotive · Crompton Greaves
```

`SOURCE:` `image-1`. An eleventh, **Cosmo Weld**, appears on `tradeindia` (Cosmo Weld MIG Wire) but not on the banner.

> **TODO:CONFIRM (high priority, legal).** The client must confirm every listed dealership is current. A lapsed dealership shown as active is the highest severity risk in this build. Also confirm whether Cosmo Weld belongs on the strip.

Logos are cropped from `image-1` only. Never downloaded from the brands' own sites. Permanently greyscale. No category label under any logo.

### 4.8 Since 1994

```
H2        Since 1994.
Body      Gohil Industrial Co. has traded on Dhebar Road since 1994.
          Sole proprietorship. Manufacturer, distributor and supplier.
          Dispatch by road across India.
          Payment by cash, cheque, DD or online transfer.
```

Every sentence is verifiable. `SOURCE:` `indiamart`, `tradeindia`. **1994 is the only number published anywhere on this site.**

### 4.9 Industries

```
H2        Where our machines work
```

| Industry | Status |
|---|---|
| Groundnut and cottonseed oil mills | **Evidenced.** Their own Instagram posts show the stacker conveyor handling jute sacks in a godown, and they list oil mill machinery and spares. |
| Ceramic tile plants, Morbi | `INFERRED` `TODO:CONFIRM` |
| Pharmaceutical and food processing | Partly evidenced. They list Pharma Equipment in `image-3`. Named plants are `INFERRED`. |
| Foundries and casting units | `INFERRED` `TODO:CONFIRM` |
| Cement and bulk handling | Partly evidenced. `indiamart` About Us lists cement plant machinery. |
| Brass and CNC parts, Jamnagar | `INFERRED` `TODO:CONFIRM` |

> Everything marked `INFERRED` renders with softened language ("suited to", "commonly used in") rather than a claim of existing customers, and appears on `/audit`. Nothing implies a customer relationship that has not been confirmed.

### 4.10 Contact

```
H2        Call the counter.
Body      Both numbers reach the shop. WhatsApp is usually fastest.

Shailesh Gohil    +91 94269 72346
Kishan Gohil      +91 63543 03742
Email             gohil.industrial.co@gmail.com
Hours             Monday to Sunday
```

Address as section 2.1.

---

## 5. Prices: not published

No price appears anywhere on the site. Every product shows **Price on request**.

The argument, for the client conversation:

| Product | IndiaMART | TradeIndia |
|---|---|---|
| Cycloidal gearbox | Rs 5,000 | Rs 25,000 |
| Planetary gearbox | not listed | Rs 4,000 |

Their own two listings price the same cycloidal gearbox five times apart. Published B2B prices go stale, ignore quantity and undercut negotiation. The enquiry path replaces them.

---

## 6. Product catalogue

Real product names only, as the client or their listings write them.

### 6.1 Gearboxes

Helical Gearbox · Helical Gear Box · Helical Vertical Gear Box · Parallel Shaft Helical Gearbox · Bonfiglioli Helical Gear Box · Bonfiglioli Vertical Helical Gear Box · TGPL Helical Gear Boxes · TGPL Vertical Helical Gear Boxes · PBL Helical Gear Boxes · Planetary Gearbox · CT Planetary Gearbox · Worm Gear Box (Aluminium Body) · Casting Worm Gear Box · Universal Worm Gear Box · TGPL Worm Gear Boxes · Cycloidal Gearbox · Cycloidal Vertical Gear Box · Heavy Duty Cycloidal Gearbox · Industrial Gear Box · Reduction Gear Boxes

`SOURCE:` `image-1`, `indiamart`, `tradeindia`

### 6.2 Motors and drives

Gear Motors · Electric Motors · Industrial Electric Motor · Vertical Flange Motor · Speed Reducers

Real spec vocabulary from their listings, safe to reuse: `Three Phase` · `4 Poles` · `Foot and Flange Mounting` · `Helical Gear Tooth Profile`

> Do not reuse `>14000 RPM` from the TradeIndia electric motor listing. It is a dropdown artefact, not a real spec. No 100 kW motor turns at 14,000 rpm.

### 6.3 Material handling

Stacker Conveyor · Belt Conveyor · Screw Conveyor · Bucket Conveyor · Telescopic Conveyor · Conveyor Belts · Goods Lift · Vibro Shifter · Vibro Sifter

### 6.4 Blowers and fans

Centrifugal Blower · Axial Flow Fan

`SOURCE:` `image-1`, "Customized Machinery & Blowers" row.

### 6.5 Welding and joining consumables

Mig Wires · Cosmo Weld Mig Wire (Copper alloy, 1.2 mm, 15 kg roll) · Flux Cored Wires · Atlas Welding Electrode

`SOURCE:` `image-3`, `indiamart`, `tradeindia`. This is the "Joining" in "Joining To Automation".

### 6.6 Process and plant machinery

Oil Mill Machinery & Spares · Semi Automatic Oil Pumping Machine · Oil Filling Machine · Pharma Equipment · Cement Plant Machinery · Customized Machinery

---

## 7. WhatsApp message templates

The whole conversion path. Composed client side, URL encoded into `https://wa.me/{number}?text=...`.

### 7.1 General enquiry

```
Enquiry via gohilgroup.com

Name:
Company:
City:
Product:
Application:
Quantity:
```

### 7.2 From the enquiry form

```
Enquiry via gohilgroup.com

Name:        {name}
Company:     {company}
City:        {city}
Product:     {category}
Application: {application}
Ratio:       {ratio}
Power:       {power}
Input RPM:   {inputRpm}
Mounting:    {mounting}
Quantity:    {quantity}
Required by: {requiredBy}
```

### 7.3 From the ratio finder

```
Ratio enquiry via gohilgroup.com

Input speed:   {input} rpm
Output speed:  {output} rpm
Reduction:     i = 1:{ratio}
Looking at:    {families}
```

### 7.4 Product page

```
Enquiry via gohilgroup.com

Product: {productName}
Page:    {url}
```

**Drawing attachments.** A `wa.me` deep link cannot carry a file. Rather than shipping a file input that silently fails, the confirmation step reads:

```
Attach your drawing in the WhatsApp chat that opens.
```

Desktop users without WhatsApp Web get a **Copy enquiry** button instead.

---

## 8. SEO strings

### 8.1 Titles and descriptions

| Route | Title | Description |
|---|---|---|
| `/` | Gohil's Group, Gearbox and Conveyor Supplier in Rajkot | Authorised dealer for Bonfiglioli, SEW-Eurodrive, ABB and Elecon gearboxes. Custom conveyors, blowers and oil mill machinery built in Rajkot since 1994. |
| `/products` | Industrial Gearboxes, Conveyors and Motors, Rajkot | Helical, planetary, worm and cycloidal gearboxes, gear motors, conveyors, blowers and vibro sifters. Price on request. |
| `/industrial` | Gohil Industrial Co., Authorised Gearbox Dealer, Rajkot | Ex-stock helical, planetary, worm and cycloidal drives from ten authorised principals. |
| `/engitech` | Gohil Engitech Co., Custom Machinery, Rajkot | Stacker conveyors, screw conveyors, blowers, goods lifts and oil mill machinery, built to your specification. |
| `/brands` | Authorised Dealer Network, Gohil's Group Rajkot | Bonfiglioli, SEW-Eurodrive, ABB, Elecon, Shanthi Gears, TGPL, Radicon PBL Siemens, Havells, Rotomotive and Crompton Greaves. |
| `/contact` | Contact Gohil's Group, Dhebar Road, Rajkot | Call or WhatsApp Shailesh Gohil or Kishan Gohil. Shop No. 5-6, Dhebar Road South, Rajkot 360 002. |

### 8.2 Local search targets

```
gearbox dealer in Rajkot · helical gearbox Rajkot · worm gearbox supplier Gujarat ·
Bonfiglioli dealer Rajkot · SEW Eurodrive Rajkot · conveyor manufacturer Rajkot ·
vibro sifter Rajkot · oil mill machinery Rajkot · stacker conveyor Rajkot ·
planetary gearbox Rajkot · gear motor supplier Rajkot
```

### 8.3 FAQ blocks

Real questions a buyer types, answered plainly. One block per category page. Feeds `FAQPage` schema and AI answer engines.

Examples:

```
Q  What ratio worm gearbox do I need for a 1.5 kW conveyor?
Q  What is the difference between a helical and a cycloidal gearbox?
Q  Do you supply Bonfiglioli gearboxes in Rajkot?
Q  What size stacker conveyor do I need for a godown?
Q  Can you build a conveyor to my drawing?
Q  Do you dispatch outside Gujarat?
```

> Answers must be written from confirmed facts only. Anything requiring a claim about stock, lead time or capability gets `TODO:CONFIRM` before it goes live.

---

## 9. Alt text

Describes the product, never the file.

| Image | Alt text |
|---|---|
| Helical inline gearbox | Blue inline helical gearbox with foot mounting |
| Helical gear motor | Blue helical gear motor with flange mounted three phase motor |
| Planetary gearbox | Grey planetary gearbox with splined output shaft and mounting flange |
| Worm gearbox, cast iron | Cast iron worm reduction gearbox with bronze output shaft |
| Worm gearbox, aluminium | Compact aluminium body worm gearbox with right angle output |
| Bevel helical unit | Teal bevel helical gearbox unit with twin output shafts |
| Vibro sifter | Vibro sifter separator with three orange clamped screen decks |
| Screw conveyor | Screw conveyor auger flight |
| Belt conveyor | Inclined belt conveyor with support frame |
| Centrifugal blower | Blue centrifugal blower with direct coupled motor |
| Axial flow fan | Blue axial flow fan in a cylindrical housing |
| Vertical flange motor | Blue vertical flange mounted three phase electric motor |
| Dealer logos | The brand name only, for example `Bonfiglioli` |

---

## 10. Photography gap and client request list

### 10.1 What we actually have

Measured, not estimated. In the 1280x853 banner the largest product image is **251x276px**. The machinery row runs **101px to 201px** wide. Image 3's four photographs are similar.

Total usable library: roughly **22 product cut-outs between 101px and 276px, and nothing larger.**

**A photo led site is not buildable from these assets.** Cut-outs are used at native size as product chips. None is stretched to hero size. The following slots are held open for real client photography:

```
TODO: hero, shop counter or godown interior, 1600x1200
TODO: about page, Shailesh and Kishan at work, 1200x900
TODO: engitech page, stacker conveyor in the workshop, 1600x1200
TODO: industrial page, stock on shelves, 1200x900
TODO: contact page, shopfront on Dhebar Road, 1200x800
```

### 10.2 Images that must not be used

`client-assets/WhatsApp Image 2026-08-24 at 11.18.52 PM*.jpeg` are all three AI generated illustrations, not photographs of a real machine.

One of them, `(1).jpeg`, carries the logo **"GC, Grain Conveyors Inc."**, which is another company's mark on a Gohil post.

None of these three goes on the site. They were useful only for extracting the real Model G3 specifications.

### 10.3 WhatsApp ready request list

> Namaste Shailesh-bhai / Kishan-bhai,
> To build the website properly I need a few things from your side. Photos from your phone are perfectly fine, no studio needed.
>
> 1. 8 to 10 photos of the shop and godown. Stock on the shelves, gearboxes in their boxes, the counter.
> 2. 3 or 4 photos of you both at work. A family firm's strongest asset is its people, this matters more than any other photo.
> 3. Any site photos of conveyors or machinery you have installed at a customer's plant.
> 4. Photos of the stacker conveyor, the real one in your workshop. The pictures currently on your Instagram are computer generated, and one of them has another company's logo on it. Worth taking down.
> 5. Your logo file if you have one. AI, CDR, EPS or PSD from whoever made your banner.
> 6. Confirm the address. Is it Shop No. 5 or Shop No. 5-6?
> 7. Your working hours. I have Monday to Sunday, what time do you open and close?
> 8. Confirm the dealership list is current: TGPL, Havells, Elecon, Shanthi Gears, Radicon PBL Siemens, Bonfiglioli, ABB, SEW-Eurodrive, Rotomotive, Crompton Greaves. Should Cosmo Weld be added?
> 9. Any brochure or product PDF you already have.
> 10. Can we show your GST number on the site? Many buyers look for it.

---

## 11. Open items summary

| # | Item | Blocks | Priority |
|---|---|---|---|
| 1 | Dealership list current? | `/brands`, home dealer strip | **Legal, highest** |
| 2 | Shop No. 5 or 5-6 | address everywhere, `LocalBusiness` schema | High |
| 3 | Opening and closing times | `openingHours` schema | High |
| 4 | Proprietor versus CEO titles | `/about`, `/contact` | Medium |
| 5 | Publish GSTIN | footer | Medium |
| 6 | Real photography | five held slots above | **On the critical path** |
| 7 | Ratio span actually stocked | `/products` copy | Medium |
| 8 | Industries served, confirm the inferred four | `/industries` | Medium |
| 9 | Normalise tagline capitalisation | global | Low |
| 10 | Cosmo Weld an eleventh principal? | `/brands` | Low |
