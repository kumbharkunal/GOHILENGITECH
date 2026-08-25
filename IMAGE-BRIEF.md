# Image brief

Prompts for generating the site's imagery, with the exact folder and filename for each.

## How to use this

1. Paste a prompt into ChatGPT (or any image model) and generate.
2. Save the result with **exactly** the filename given. The code already points at these paths, so a correctly named file just appears on the site with no code change.
3. Put it in the folder named. Re-run `npm run build`.

**Format:** save as `.webp` if your tool can, otherwise save `.png` and run:

```bash
python -c "from PIL import Image; im=Image.open('FILE.png'); im.save('FILE.webp','WEBP',quality=88,method=6)"
```

**Aspect ratio matters.** Each slot below gives the ratio the layout expects. A wrongly proportioned image gets cropped.

---

## Read this before you generate anything

Two categories below, and they carry different risk.

**Category A, environment and atmosphere.** Safe. A workshop, a godown, stacked sacks, a welding bench. These set the scene and nobody is claiming a specific machine is theirs.

**Category B, products.** Higher risk, and worth being deliberate about. If you generate "a cast iron worm gearbox" and it does not look like the one Gohil actually sells, the site is showing a product they do not stock. That is the exact failure their current Instagram has, where one post carries another company's logo. So:

- Generate product images as **generic, representative equipment**, which is what the prompts below do.
- Show them to Shailesh-bhai before launch and ask "does this look like what you sell?"
- The moment real photographs arrive, replace them. Real beats generated every time on a supplier site, because a buyer can tell.

**Never generate:** their shopfront with a sign on it, their staff's faces, a nameplate with a model number, or any brand logo. Those cross from atmosphere into misrepresentation.

---

## Category A. Environment

These have held slots in the design and will appear as soon as the files exist.

### 1. Hero background texture

- **Folder:** `public/photos/`
- **Filename:** `workshop-wide.webp`
- **Ratio:** 16:9, at least 1920x1080

> A wide, brightly lit industrial workshop interior in India. Grey concrete floor, corrugated metal roof with skylights, natural daylight. Steel fabrication in progress in the middle distance, out of focus. Orange painted steel frames stacked against one wall. Clean, organised, not cluttered. Muted colour palette of grey, steel and a single orange accent. Shot on a 35mm lens, shallow depth of field, no people, no text, no logos, no signage. Photorealistic, documentary style, not a render.

### 2. Godown with stacked sacks

- **Folder:** `public/photos/`
- **Filename:** `godown-sacks.webp`
- **Ratio:** 4:3, at least 1600x1200

> Interior of an Indian agricultural warehouse. Jute sacks of groundnut stacked in a tall neat pile reaching towards a corrugated metal roof. Grey concrete floor. Soft daylight from high windows. An orange painted steel belt conveyor stands beside the stack, angled upward. Wide shot, natural colour, dust in the light. No people, no text, no logos, no branding of any kind. Photorealistic documentary photography, not a render or illustration.

### 3. Stock on shelves

- **Folder:** `public/photos/`
- **Filename:** `stock-shelves.webp`
- **Ratio:** 4:3, at least 1600x1200

> Industrial supplier's storeroom in India. Heavy duty steel shelving racks holding cast iron and aluminium gearbox housings in grey and blue, arranged in rows by size. Cardboard boxes on upper shelves. Concrete floor, fluorescent lighting, organised and clean. Medium wide shot. No people, no text, no readable labels, no brand logos. Photorealistic documentary photography.

### 4. Fabrication detail

- **Folder:** `public/photos/`
- **Filename:** `fabrication-detail.webp`
- **Ratio:** 4:3, at least 1600x1200

> Close up of steel fabrication work in a small Indian engineering workshop. A partly built orange painted conveyor frame on trestles, weld seams visible, angle grinder and clamps on the bench beside it. Sparks not visible, work paused. Warm workshop light. Hands may appear but no faces. No text, no logos, no signage. Photorealistic documentary photography, shallow depth of field.

### 5. Counter and shopfront interior

- **Folder:** `public/photos/`
- **Filename:** `shop-counter.webp`
- **Ratio:** 3:2, at least 1800x1200

> Interior of a small industrial parts shop in Gujarat, India, viewed from just inside the entrance. A wooden and steel service counter, shelves of gearboxes and motor parts behind it, a ledger and a calculator on the counter. Daylight from the shopfront. Warm, lived in, working premises rather than a showroom. No people, no readable text, no signage, no brand logos. Photorealistic documentary photography.

---

## Category B. Products

These replace the existing cut-outs. **Same filenames, so they drop straight in.**

Every one of these must sit on a **plain white background with a soft shadow**, three quarter view, product photography lighting. That is what the existing layout expects and it is why they composite cleanly onto the page.

Append this to every product prompt:

> Studio product photograph on a pure white seamless background, soft even lighting, subtle contact shadow beneath. Three quarter angle view. Sharp focus throughout, high detail on machined surfaces. No text, no labels, no nameplates, no brand logos, no watermark. Photorealistic, catalogue style.

| Filename (in `public/products/`) | Prompt subject |
|---|---|
| `helical-gear-motor.webp` | A blue painted industrial helical gear motor: a cast iron helical gearbox bolted to a three phase electric motor with a ribbed cooling body and fan cowl, foot mounted on a base plate, keyed steel output shaft protruding left |
| `helical-inline-gearbox.webp` | A blue painted cast iron inline helical gearbox, foot mounted, with a yellow plastic protective cap on the keyed output shaft and hex head bolts around the flange |
| `helical-gearbox-fan-cooled.webp` | A dark blue fan cooled helical gearbox with a ribbed cast housing, mounting feet and a solid steel output shaft |
| `planetary-gearbox.webp` | A grey and blue industrial planetary gearbox standing vertically, splined output shaft pointing up, circular bolted mounting flange at the base, cylindrical multi stage housing |
| `worm-gearbox-cast-iron.webp` | A grey cast iron worm reduction gearbox with cooling fins, a bronze output shaft protruding forward and a round motor mounting flange on the right side |
| `worm-gearbox-flange-mounted.webp` | A cyan blue aluminium worm gearbox, square body with cooling fins, hollow output bore, round input flange face |
| `worm-gearbox-foot-mounted.webp` | A cyan blue cast worm gearbox, foot mounted, solid steel output shaft protruding to the left |
| `worm-gearbox-aluminium.webp` | A small compact aluminium worm gearbox with a natural silver finish, square flange face with bolt holes, hollow output bore |
| `worm-gear-motor-aluminium.webp` | An aluminium bodied worm gear motor: a small silver right angle worm gearbox coupled to a blue three phase electric motor |
| `worm-gearbox-universal.webp` | A blue painted universal worm gearbox with a large square body, right angle output shaft and multiple mounting faces |
| `bevel-helical-gearbox.webp` | A teal green heavy duty bevel helical gearbox unit, rectangular ribbed cast housing with inspection covers on top and twin steel output shafts on opposite sides |
| `customized-gearbox-flange.webp` | A large blue heavy duty industrial gearbox with a rectangular ribbed housing and a big circular bolted output hub with a yellow centre bore |
| `heavy-duty-gearbox.webp` | A teal green heavy duty industrial gearbox, rectangular cast housing with lifting eyes and a bronze output shaft |
| `vibro-sifter.webp` | A stainless steel vibro sifter separator machine: three stacked circular screen decks clamped with orange rubber bands, a domed lid on top, discharge chutes at the sides, mounted on a conical orange base |
| `belt-conveyor.webp` | A short section of steel belt conveyor with troughing idler rollers and a welded support frame |
| `belt-conveyor-inclined.webp` | An inclined cleated belt conveyor with a black rubber belt, raised side skirts and a steel support frame at an angle |
| `screw-conveyor-auger.webp` | A steel screw conveyor auger flight: a continuous helical steel spiral welded to a central shaft, standing alone |
| `centrifugal-blower.webp` | A blue painted centrifugal blower with a spiral volute housing, rectangular discharge outlet and a direct coupled electric motor on the side |
| `axial-flow-fan.webp` | A blue painted axial flow fan in a cylindrical steel duct housing, aluminium blades visible through the intake, mounting flange around the rim |
| `vertical-flange-motor.webp` | A blue three phase electric motor mounted vertically on a circular flange, ribbed aluminium cooling body, terminal box on the side, shaft pointing up |
| `stacker-conveyor.webp` | A mobile orange painted stacker conveyor on rubber tyred wheels: a long inclined belt boom on a steel trestle frame, electric drive motor and gearbox at the base, black rubber belt, angled upward at about 30 degrees |

> `stacker-conveyor.webp` does not exist yet. It is currently shown as a specification plate instead, which is honest but a real image would be better. This is their flagship product, so it is the highest value one to get right, and the one most worth photographing for real.

---

## After you add the images

```bash
npm run build
```

The product chips pick them up automatically. The environment photos need their slots switched on: search for `photos/` in `src/` and uncomment the block in the page you want it on. If you would rather I wire them in, say which ones you generated and I will.

## What still wants real photography

Generated imagery is fine for a pitch. Before this goes live properly, these are worth twenty minutes with a phone:

1. The actual shop and counter on Dhebar Road
2. The real stacker conveyor in the workshop
3. Shailesh-bhai and Kishan-bhai at work, which is the strongest trust signal a family firm has
4. Any machinery installed at a customer's plant

A slightly imperfect real photograph of their own shop will outperform a flawless generated one, because a buyer in Rajkot can tell the difference and the whole point of this site is being trusted.
