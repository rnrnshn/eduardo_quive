
---
# AGENTS.md — Project Rules & AI Collaboration

This document defines **how AI agents must behave** when working on this project.

Failure to follow these rules means the output is invalid.

---

## 🧠 Project Identity

This is a **literary & cultural platform**, not a SaaS or startup website.

Agents must:
- Prioritize content flow over UI novelty
- Avoid generic “portfolio” patterns
- Think like editors, not marketers

---

## 🏗️ Architecture Rules

- Feature-based architecture
- Routes define context
- Components must stay under **250 lines**
- Extract logic into hooks when reusable

Preferred structure:
src/
├─ routes/
├─ features/
│ ├─ articles/
│ ├─ books/
│ ├─ events/
├─ components/
│ ├─ typography/
│ ├─ layout/
│ ├─ motion/
├─ lib/
│ ├─ wp/
│ ├─ fetchers/


---

## 🎨 UI & Design Constraints

DO:
- Use whitespace generously
- Use motion sparingly
- Respect typographic scale
- Let images breathe

DO NOT:
- Add decorative gradients
- Add card-based layouts
- Add unnecessary borders
- Add loud hover effects

---

## 🔤 Typography Rules

Typography is structural, not decorative.

- Large headings must feel *editorial*
- Paragraph width should favor reading
- Avoid center-aligned body text
- Use scale to guide attention

---

## 🌐 WordPress Integration Rules

- Treat WordPress as **content-only**
- Never replicate layout logic in WordPress
- ACF fields must be minimal and semantic
- Fetching logic must be isolated in `lib/wp`

---

## ⚙️ Performance & SEO

- Static by default
- Server components only when needed
- Images optimized at build time
- SEO is important, but subtle

---

## 🧪 Agent Behavior Rules

Agents must:
- Ask before introducing new libraries
- Explain architectural decisions
- Prefer simplicity over cleverness
- Respect the author’s voice and tone

Agents must NEVER:
- Add UI kits
- Add dashboards
- Over-engineer state
- Use buzzwords in copy