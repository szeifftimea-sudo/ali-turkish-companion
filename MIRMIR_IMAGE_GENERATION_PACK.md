# Mırmır Image Generation Pack v1.1

## Státusz

**A Sprint 3 pre-render szakasza lezárva. Első jóváhagyott referencia:** `assets/canon/mirmir/MIRMIR-CANON-001-neutral-portrait.png` (1402 × 1122). A jelenetképek továbbra is csak külön, ember által jóváhagyott cameo-brief alapján készülhetnek.

## A workflow szerepe

Mırmır karakterét az Ali Character Team tervezi meg a Hospitality Manifesto és a Character Philosophy alapján. A vizuális megjelenés ennek a karakternek a megjelenítése, amelyet képgenerálási workflow készít el a jóváhagyott karakterleírás alapján.

> AI nem tervezi Mırmırt. AI megjeleníti Mırmırt.

A generátor nem dönthet fajtáról, színről, korról, személyiségről, kellékről, viselkedésről vagy narratív szerepről. Bizonytalanság esetén a renderelést meg kell állítani, és emberi karakterdöntést kell kérni.

## Kötelező bemenetek minden későbbi renderhez

1. `MIRMIR_CHARACTER_MANIFESTO.md`
2. `MIRMIR_BEHAVIOR_RULES.md`
3. `MIRMIR_VISUAL_CANON.md`
4. `assets/canon/mirmir/MIRMIR-CANON-001-neutral-portrait.png` mint kötelező identitásreferencia;
5. a céljelenet canon Ali-képe és jelenetazonosítója;
6. pontos helyzet, testbeszéd, kamera, fény és képi funkció;
7. negatív szabályok.

## Canon identity block

Mırmır is an adult, medium-sized, lean but healthy Istanbul street cat with short warm stone-gray mackerel-tabby fur, a small off-white chin and narrow irregular chest patch, muted amber-green almond-shaped eyes, a darker final third of the tail with a subtle left-hook resting tip, and a tiny old V-shaped nick on the outer edge of the right ear. Natural adult feline anatomy; no collar, clothing, props, human smile or anthropomorphic gesture.

## World style block

Render in the approved Ali Canon Scene Library visual language: cinematic, warm, tactile high-end 3D storybook illustration; culturally grounded contemporary Istanbul; natural materials, soft atmospheric depth, restrained color, believable contact shadows and consistent scene lighting. Mırmır must share the scene's rendering language and must never look pasted in or more photorealistic than Ali.

## Behavior block sablon

- Physical reason for being there: `[napfény / meleg / árnyék / ételillat / magaslat / ismerős ritmus]`
- Observable action: `[alszik / figyel / átsétál / mosakszik / nyújtózik / közeledik / távozik]`
- Attention direction: `[környezeti hang / Ali / útvonal / nem a kamera]`
- Distance from guest: `[háttér / középtér / közeli, de saját kezdeményezésű]`
- Exit or retreat route: `[konkrét útvonal]`
- Narrative function: `[folytonosság / csend / ismerősség / városi élet]`

## Negatív block

No kitten proportions, oversized eyes, human smile, raised eyebrows, talking, waving, pointing, posing for camera, helper-NPC behavior, magical glow, collar, scarf, fez, bag, token, map, food delivery, reward reaction, forced cuteness, distressed or pity-inducing condition, exaggerated injury, breed-show grooming, long fluffy coat, blue eyes, white facial mask, generic orange cat, or composition that makes the cat the promotional mascot.

## Render pipeline – minden új cameo esetén

1. Human-approved cameo brief és macskalogika-teszt.
2. A kanonikus portré kötelező identitásreferenciaként történő használata.
3. Póz-, méretarány- és fényintegrációs próba a céljelenettel.
4. Human review a manifesto, a viselkedési szabályok, a Visual Canon és a Living World System alapján.
5. Csak a jóváhagyott kép kap cameo-azonosítót; az elutasított variáns soha nem válik referenciává.

A megjelenési ritmus és az engedélyezett termékhelyek autoritatív forrása: `MIRMIR_LIVING_WORLD_SYSTEM.md`.

## Review scorecard

Minden kép külön-külön megfelel / nem felel meg értékelést kap:

- ugyanaz a Mırmır;
- valódi felnőtt macskaként viselkedik;
- jelenlétét macskalogika indokolja;
- nem kér figyelmet és nem NPC;
- megfelel az öt változtathatatlan azonosítónak;
- illeszkedik az Ali-világ fényéhez és anyagkezeléséhez;
- a jelenet Mırmır nélkül is működne;
- megjelenése mégis hozzáadja a kívánt ismerősséget vagy csendet.

Egyetlen „nem felel meg” is kizárja a képet a canonból.
