# Image brief

Every image the site can use, with the exact folder and filename for each, and a prompt to generate it.

## How to use this

1. Paste a prompt into ChatGPT or any image model and generate.
2. Save the result with **exactly** the filename given, in the folder given.
3. `npm run build`.

The code already points at these paths, so a correctly named file just appears on the site with no code change.

**Format.** Save as `.webp` if your tool can. If it only gives you PNG or JPG:

```bash
python -c "from PIL import Image; im=Image.open('FILE.png').convert('RGBA'); im.save('FILE.webp','WEBP',quality=88,method=6)"
```

**Every product prompt must end with this**, or the image will not composite onto the page:

> Studio product photograph on a pure white seamless background, soft even lighting, subtle contact shadow beneath. Three quarter angle view. Sharp focus throughout, high detail on machined surfaces. No text, no labels, no nameplates, no brand logos, no watermark. Photorealistic, catalogue style. 4:3 aspect, at least 1600x1200.

---

## Before you generate anything

Two categories, different risk.

**Environment** is safe. A workshop, a godown, stacked sacks. Nobody is claiming a specific machine.

**Products** need one check. If a generated gearbox does not look like what Gohil actually sells, the site is showing a product they do not stock, which is the exact problem their current Instagram has. So: generate them as generic representative equipment, show them to Shailesh-bhai, and replace them the moment real photographs arrive. A buyer in Rajkot can tell.

**Never generate:** their shopfront with a sign, their staff's faces, a nameplate with a model number, or any brand logo.

---

# 1. Products

`public/products/` · every filename below already has a live detail page at `/products/{category}/{slug}`

### Helical gearboxes

**`helical-inline-gearbox.webp`**
> A blue painted cast iron inline helical gearbox. Foot mounted on an integral base, ribbed housing, a yellow plastic protective cap on the keyed output shaft, hex head bolts around the input flange.

**`helical-gearbox-fan-cooled.webp`**
> A dark blue fan cooled helical gearbox. Ribbed cast iron housing, a black fan cowl on the input end, mounting feet, solid keyed steel output shaft protruding to the left.

**`bevel-helical-gearbox.webp`**
> A teal green heavy duty bevel helical gearbox unit. Rectangular ribbed cast housing with bolted inspection covers on top, two steel output shafts protruding from opposite sides, lifting eyes on the upper corners.

**`heavy-duty-gearbox.webp`**
> A teal green heavy duty industrial gearbox. Large rectangular cast iron housing with cooling ribs, a bronze coloured output shaft, an oil level sight glass and a breather plug on the side.

### Gear motors

**`helical-gear-motor.webp`**
> A blue painted industrial helical gear motor. A cast iron helical gearbox bolted directly to a three phase electric motor with a ribbed cooling body and fan cowl, the whole unit foot mounted on a base plate, keyed steel output shaft protruding to the left.

**`helical-gear-motor-inline.webp`**
> An inline helical gear motor. A grey cylindrical multi stage gearbox barrel coupled to a blue three phase motor on the same axis, foot mounted, output shaft at the far end.

**`worm-gear-motor-aluminium.webp`**
> An aluminium bodied worm gear motor. A small silver right angle worm gearbox with cooling fins coupled to a blue three phase electric motor, compact, hollow output bore facing the camera.

### Planetary

**`planetary-gearbox.webp`**
> A grey and blue industrial planetary gearbox standing vertically. Cylindrical multi stage housing, a splined output shaft pointing upward, a circular bolted mounting flange at the base, hex bolts around the joint faces.

### Worm gearboxes

**`worm-gearbox-cast-iron.webp`**
> A grey cast iron worm reduction gearbox. Square body with cooling fins, a bronze output shaft protruding forward, a round motor mounting flange on the right side, oil filler plug on top.

**`worm-gearbox-flange-mounted.webp`**
> A cyan blue aluminium worm gearbox. Square body with horizontal cooling fins, a round machined input flange face with bolt holes, hollow output bore through the centre.

**`worm-gearbox-foot-mounted.webp`**
> A cyan blue cast worm gearbox, foot mounted on an integral base. Square finned body, a solid keyed steel output shaft protruding to the left, input shaft to the rear.

**`worm-gearbox-aluminium.webp`**
> A small compact aluminium worm gearbox in a natural silver finish. Square flange face with bolt holes, hollow output bore, minimal fins, sized for light duty.

**`worm-gearbox-universal.webp`**
> A blue painted universal worm gearbox. Large square body with machined mounting faces on several sides, right angle output shaft, bronze bushing visible at the output.

### Customised

**`customized-gearbox-flange.webp`**
> A large blue heavy duty industrial gearbox. Rectangular ribbed housing, a big circular bolted output hub with a yellow centre bore, multiple bolt circles, lifting eyes.

### Electric motors

**`vertical-flange-motor.webp`**
> A blue three phase electric motor mounted vertically on a circular flange. Ribbed aluminium cooling body, black terminal box on the side, fan cowl on top, shaft pointing upward.

### Conveyors

**`stacker-conveyor.webp`** — **highest value, this is their flagship**
> A mobile orange painted stacker conveyor on rubber tyred wheels. A long inclined belt boom on a steel trestle frame angled upward at about 30 degrees, black rubber belt, an electric drive motor and gearbox at the base, adjustable support legs. Industrial, functional, workshop built rather than showroom finished.

**`belt-conveyor.webp`**
> A section of steel belt conveyor. Troughing idler rollers on a welded mild steel support frame, black rubber belt, drive pulley at one end.

**`belt-conveyor-inclined.webp`**
> An inclined cleated belt conveyor. Black rubber belt with raised transverse cleats, raised side skirts, steel support frame holding it at about a 30 degree angle, drive motor at the base.

**`screw-conveyor.webp`** *(file name is `screw-conveyor-auger.webp`)*
> A steel screw conveyor auger flight. A continuous helical steel spiral welded to a central shaft, standing alone, showing the pitch clearly.

### Vibro sifter

**`vibro-sifter.webp`**
> A stainless steel vibro sifter separator machine. Three stacked circular screen decks clamped together with orange rubber bands, a domed lid on top, side discharge chutes, mounted on a conical orange painted base with a vibratory motor beneath.

### Blowers

**`centrifugal-blower.webp`**
> A blue painted centrifugal blower. Spiral volute housing, rectangular discharge outlet pointing upward, a direct coupled electric motor mounted on the side, bolted inspection plate.

**`axial-flow-fan.webp`**
> A blue painted axial flow fan in a cylindrical steel duct housing. Cast aluminium blades visible through the intake, mounting flange around the rim, motor visible at the hub.

---

# 2. Environment

`public/photos/` · these have held slots in the design

**`workshop-wide.webp`** · 16:9, at least 1920x1080
> A wide, brightly lit industrial workshop interior in India. Grey concrete floor, corrugated metal roof with skylights, natural daylight. Steel fabrication in progress in the middle distance, out of focus. Orange painted steel frames stacked against one wall. Clean and organised, not cluttered. Muted grey and steel palette with a single orange accent. Shot on a 35mm lens, shallow depth of field. No people, no text, no logos, no signage. Photorealistic documentary photography, not a render.

**`godown-sacks.webp`** · 4:3, at least 1600x1200
> Interior of an Indian agricultural warehouse. Jute sacks of groundnut stacked in a tall neat pile reaching toward a corrugated metal roof. Grey concrete floor, soft daylight from high windows, dust visible in the light. An orange painted steel belt conveyor stands beside the stack, angled upward. Wide shot, natural colour. No people, no text, no logos. Photorealistic documentary photography.

**`stock-shelves.webp`** · 4:3, at least 1600x1200
> An industrial supplier's storeroom in India. Heavy duty steel shelving racks holding cast iron and aluminium gearbox housings in grey and blue, arranged in rows by size. Cardboard boxes on the upper shelves. Concrete floor, fluorescent lighting, organised and clean. Medium wide shot. No people, no readable labels, no brand logos. Photorealistic documentary photography.

**`fabrication-detail.webp`** · 4:3, at least 1600x1200
> Close up of steel fabrication work in a small Indian engineering workshop. A partly built orange painted conveyor frame on trestles, weld seams visible, an angle grinder and clamps on the bench beside it. Work paused, no sparks. Warm workshop light, shallow depth of field. Hands may appear but no faces. No text, no logos. Photorealistic documentary photography.

**`shop-counter.webp`** · 3:2, at least 1800x1200
> Interior of a small industrial parts shop in Gujarat, India, seen from just inside the entrance. A wooden and steel service counter, shelves of gearboxes and motor parts behind it, a ledger and a calculator on the counter. Daylight from the shopfront. Warm and lived in, a working premises rather than a showroom. No people, no readable text, no signage. Photorealistic documentary photography.

---

# 3. What clicking an image does

Every product image on the site is now a link to its own detail page:

```
/products/worm/worm-gearbox-cast-iron/
/products/conveyors/stacker-conveyor/
/products/helical/helical-inline-gearbox/
```

21 detail pages, each with a large image, a plain description, a specification table, typical applications, and a WhatsApp button that opens a chat already naming the product. Each carries its own `Product` and `BreadcrumbList` schema.

**The specifications are placeholders.** They are typical commercial figures for each category, added so the demo has something real-looking to show. They are **not** a statement of what Gohil stocks. All of it sits in `src/data/product-details.ts`, every entry is flagged `demo: true`, each page shows a visible note saying the figures are typical and to confirm before ordering, and the whole thing is listed on `/audit` under "Needs client confirmation".

Deleting that one file removes every invented figure from the site. The stacker conveyor is the exception: its Model G3, 33 feet, 2 HP and 24 inch belt come from the client's own Instagram post and are marked `demo: false`.

Before this goes live properly, either get Shailesh-bhai to correct the numbers or delete the file.

---

# 4. What still wants a real photograph

Generated imagery is fine for a pitch. These four are worth twenty minutes with a phone before launch, and each will outperform anything generated:

1. The actual shop and counter on Dhebar Road
2. The real stacker conveyor in the workshop
3. Shailesh-bhai and Kishan-bhai at work, the strongest trust signal a family firm has
4. Any machinery installed at a customer's plant
