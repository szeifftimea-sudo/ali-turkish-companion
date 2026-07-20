# Ali – The Turkish Travel Companion

## MVP submission package

This document is the single source for the Build Week submission, the three-minute demo and the spoken transcript. It describes only features that are currently implemented and demonstrable.

---

## 1. Submission copy (English)

### Project title

**Ali – The Turkish Travel Companion**

### Tagline

**Discover Istanbul with someone who already feels like a local friend.**

### One-sentence pitch

Ali turns beginner Turkish into a story-driven journey through Istanbul, where useful phrases emerge naturally from places, choices and moments the traveller personally cares about.

### Short description

Most language-learning products begin with lessons. Ali begins with hospitality.

Designed for Hungarian adults preparing for Turkey, Ali is a local companion who welcomes the traveller into Istanbul rather than teaching from the front of a classroom. The working web experience follows ten connected stops across the city. Users greet Ali, order tea, cross the Bosphorus, navigate the bazaar and gradually collect Turkish phrases that have already become meaningful through the journey.

Those phrases can be saved in **Ali’s Pocket**, practised as two-sided flashcards and printed as physical 63 × 88 mm cards. The experience therefore continues after the browser is closed.

Ali is not a chatbot, teacher or mascot. He is a host. The product’s central design question is: **Would a good host do this?**

### The problem

Beginner language learning is often disconnected from the moment in which the learner hopes to use the language. Travellers encounter vocabulary lists and abstract exercises, but still feel unable to speak when a real person is waiting for an answer.

Ali addresses this gap by attaching language to a place, a decision and an emotional memory before asking the learner to recall it.

### The audience

The first audience is Hungarian adult beginners and returning learners who are interested in Turkey because of travel, culture or personal connection. They do not necessarily want a full language course. They want enough confidence to enter a café, ask a question, understand a small ritual and begin a genuine interaction.

### What makes it different

- The organising principle is an Istanbul journey, not a lesson plan.
- The learner is treated as a guest, not as a student or customer.
- Ali behaves as a curious local host, not as an omniscient tutor.
- Cultural knowledge appears inside lived situations instead of as a separate encyclopaedia.
- The phrases a traveller chooses become a personal collection in Ali’s Pocket.
- Printable, reversible cards extend the digital experience into everyday life.
- Mırmır, an Istanbul street cat, adds continuity to the world without becoming a reward mechanic or teaching NPC.

### Working implementation

The MVP is a runnable responsive web application, not a visual concept. It includes:

- a ten-stop interactive Istanbul journey;
- branching choices and contextual Turkish phrases;
- persistent local journey state and continuation;
- Ali’s memory, travel journal and phrase collection;
- a searchable Turkish–Hungarian knowledge map;
- contextual phrase collections organised by real-life situations;
- the ability to save individual phrases from those collections;
- learning-state filters and one-by-one flashcard practice;
- duplex-ready printable cards with mirrored reverse-page ordering;
- an interactive Istanbul map and editorial place stories;
- a Turkish food and hospitality experience;
- responsive desktop and mobile layouts.

### How Codex was used

Codex was used throughout the complete product process rather than only for isolated code generation.

1. **Product definition:** It helped turn an initial language-learning idea into a hospitality-led product philosophy, Character Bible and UX system.
2. **Knowledge architecture:** Ten source learning documents were analysed and reorganised into a structured knowledge map and ten coherent travel situations.
3. **Experience design:** Codex helped design the branching narrative, interaction hierarchy, natural Hungarian dialogue and the relationship between journey, phrase collection and continued learning.
4. **Implementation:** It created and iteratively refactored the HTML, CSS and JavaScript systems behind the journey, maps, search, state persistence, flashcards and printing.
5. **Quality assurance:** It repeatedly tested the ten adventure entry points, navigation, calls to action, mobile layouts, content continuity and browser behaviour, then repaired the issues it found.
6. **Product criticism:** Codex was deliberately asked to review the product as an unfamiliar product manager, UX specialist and first-time Istanbul traveller, not to defend its earlier solutions.

This collaboration produced a non-trivial implementation as well as the product rules that keep Ali’s character and world coherent.

### Potential impact

Ali gives travel-motivated beginners a smaller and more credible first promise than “learn Turkish”: arrive with a few phrases that feel familiar and can be recalled when they are needed.

The printable cards embody that promise:

> **What moves from Ali’s pocket into yours stays with you after the browser is closed.**

They support active recall in both directions—Turkish to Hungarian and Hungarian to Turkish—so personally meaningful phrases can become usable knowledge rather than passive recognition.

---

## 2. Three-minute demo plan

### Before recording

- Run the project at `http://localhost:8080/index.html`.
- Use a clean browser profile or clear the site data so the hero CTA begins at the first stop rather than resuming an earlier test.
- Use a desktop viewport around 1440 × 900.
- Close unrelated browser tabs and notifications.
- Do not show unfinished roadmap material.
- Record the screen first; add the voice-over afterwards if live narration makes the interaction rushed.

### Demo route

| Time | Screen action | What this proves |
|---|---|---|
| 0:00–0:20 | Show the hero, Ali and “Sétáljunk egyet”. Click the CTA. | Complete product identity and immediate invitation. |
| 0:20–0:55 | Show the first meeting and one personalised Turkish sentence. | The journey teaches through a situation rather than a lesson. |
| 0:55–1:15 | Close the scene and sweep across the ten adventure cards. Open one later stop briefly. | Breadth, coherent world and non-trivial interaction engine. |
| 1:15–1:35 | Open “Mit szeretnél elmondani?”, choose a situation and save one phrase to Ali’s Pocket. | The knowledge base continues beyond the first journey. |
| 1:35–2:05 | Open “Saját szavaim”. Show the saved phrase, filters and reversible practice card. | Persistence and active learning. |
| 2:05–2:25 | Show the two-sided printable card option and explain the physical cards. | Distinctive product value beyond the browser. |
| 2:25–2:42 | Briefly show Istanbul Places or Turkish Kitchen. | Cultural depth and coherent visual system. |
| 2:42–3:00 | Return to Ali or end on a card close-up and deliver the closing line. | Emotional conclusion and memorable promise. |

---

## 3. Spoken demo transcript (English, approximately three minutes)

Most language apps begin by asking you to complete a lesson.

Ali begins by welcoming you to Istanbul.

Ali is not a teacher, a chatbot or a tour guide. He is a local host. And the person using the product is not treated as a student or a user, but as his guest.

The experience follows ten connected stops through the city. Here, on the Galata Bridge, I meet Ali and create my first personal Turkish introduction. The language is not presented as an abstract exercise. It belongs to a moment in the journey and to something I actually want to say.

From there, the day continues through a Karaköy tea house, a Bosphorus ferry, the bazaar, a tram, a mosque courtyard and the waterfront. Each stop has its own choices, visual scene and practical Turkish language. The application remembers where I stopped, the phrases I encountered and selected details that allow Ali to respond more thoughtfully later.

The first journey is intentionally selective. Its job is to create confidence and curiosity, not to place an entire course inside one flow.

When I want to continue, I can open this situation-based knowledge map. I can search in Hungarian or Turkish, choose what I want to communicate and save an important expression directly into Ali’s Pocket.

Ali’s Pocket connects the emotional journey with continued learning. My chosen phrases persist here, I can filter what I am still practising, and I can actively recall each card in both directions.

But the learning does not end when the browser is closed.

The selected phrases can be printed as physical, two-sided 63 by 88 millimetre cards. Turkish appears on one side and Hungarian on the other. The reverse pages are automatically mirrored for duplex printing.

What moves from Ali’s pocket into yours stays with you after the browser is closed.

The wider product world also includes Istanbul place stories and Turkish food culture, all presented through the same hospitality-led design system.

Codex helped build the product end to end: from the Character Bible and knowledge architecture to the branching narrative, responsive implementation, persistent phrase system, printable card engine and repeated browser-based quality assurance.

Ali does not exist to make people finish Turkish lessons.

He exists to make Turkey feel familiar enough that they naturally begin to speak.

---

## 4. Recording checklist

- [ ] The local server is running.
- [ ] The browser has a clean journey state.
- [ ] The first CTA opens stop 01.
- [ ] The selected phrase is successfully saved to Ali’s Pocket.
- [ ] The saved phrase appears under “Saját szavaim”.
- [ ] The flashcard reverses correctly.
- [ ] The print action is visible and contains four 63 × 88 mm cards per A4 page when enough cards are selected.
- [ ] No “coming soon” menu item appears.
- [ ] The video stays under the submission time limit.
- [ ] English captions are added if the voice-over is not in English.
- [ ] The final frame contains Ali, the product name or the pocket-to-pocket closing line.

## 5. Do not add before submission

- Runtime AI dictionary integration.
- Currency conversion.
- A separate history section.
- New canonical scenes.
- Final pronunciation integration.
- Additional gamification.

These may be valid later, but none is necessary to prove the current product idea.
