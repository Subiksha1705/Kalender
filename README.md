# Kalender

A polished, interactive wall-calendar web app built with Next.js. Inspired by the aesthetic of a physical wall calendar — a seasonal hero image anchors each month above a clean date grid, with full event and note management built in.

**Live Demo:** [kalender-xi.vercel.app](https://kalender-xi.vercel.app)

---

## Features

### Core
- **Wall Calendar Aesthetic** — Each month is paired with a curated seasonal hero image that sets the visual tone for the grid below
- **Two Views** — Switch between a full **Calendar** view and a focused **Day** view (Today page)
- **Day Range Selection** — Click and drag across dates to select a range; the start, end, and in-between days each have distinct visual states
- **Event Creation** — Add named events to a selected date range, with time and color label options
- **Notes** — Attach free-form notes to specific days alongside events
- **Month & Year Navigation** — Navigate via arrow buttons or jump directly using the month/year dropdown selectors
- **"Today" Button** — Instantly returns to the current date from anywhere in the calendar

### Extra
- **Hero Image Toggle** — A toggle button lets users show or hide the monthly banner image, keeping the interface clean for those who prefer a minimal, distraction-free calendar view

### Design & UX
- Minimal, warm color palette with a cream/off-white base that complements the hero imagery
- Today's date is always visually circled for quick orientation
- Out-of-month dates are subtly muted to keep focus on the current month
- Clean modal dialog for event/note creation with color picker and time input
- Smooth dropdown menus for month and year selection

### Fully Responsive Design
The layout adapts fluidly across all screen sizes:
- **Large Desktop (1280px+)** — Full-width hero image with a spacious calendar grid; generous whitespace and large typography
- **Desktop / Laptop (1024px–1279px)** — Standard wide layout with hero image above the full month grid
- **Tablet Landscape (768px–1023px)** — Hero image scales down; calendar grid remains fully visible with slightly tighter spacing
- **Tablet Portrait (600px–767px)** — Layout begins stacking; hero image becomes a banner strip above the date grid
- **Mobile (< 600px)** — Fully vertical layout; Day view leads with a large date and day-of-week display, followed by events and notes in scrollable sections, all optimized for touch interaction

---

## Tech Stack

- **Framework:** Next.js (React)
- **Styling:** CSS Modules / Tailwind CSS
- **State Management:** React `useState` / `useReducer` (no backend)
- **Data Persistence:** `localStorage` — all events and notes persist across sessions client-side
- **Deployment:** Vercel

---

## Getting Started

### Prerequisites
- Node.js v18+
- yarn

> ⚠️ **Important:** This project uses Yarn as its package manager. Do **not** use `npm install` — mixing package managers will cause dependency conflicts and lockfile errors.

### Installation

```bash
git clone https://github.com/Subiksha1705/kalender.git
cd kalender
yarn
```

### Running Locally

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production

```bash
yarn build
yarn start
```

---

## Project Structure

```
kalender/
├── app/                  # Next.js App Router pages
│   ├── page.tsx          # Today / Day view
│   └── calendar/
│       └── page.tsx      # Full calendar view
├── components/           # Reusable UI components
│   ├── Calendar.tsx      # Main calendar grid
│   ├── DayView.tsx       # Single-day detail view
│   ├── EventModal.tsx    # Event/note creation modal
│   └── HeroImage.tsx     # Monthly hero image display
├── hooks/                # Custom React hooks (state, storage)
├── public/               # Static assets (hero images per month)
└── styles/               # Global styles
```

---

## Design Decisions

**Client-side only** — Per the assessment scope, there is no backend or database. All events and notes are stored in `localStorage`, making the app fully functional offline and without any account.

**Two-view architecture** — The Calendar view gives a monthly overview for planning, while the Day view (the landing page) focuses on what's happening today — surfacing events and notes immediately without any navigation overhead.

**Hero images** — Each month gets a distinct illustration that shifts the mood of the interface, borrowing from the physical wall calendar concept where flipping to a new month feels like a small event in itself.

**Range selection UX** — Selecting a date range works by clicking a start date and dragging or clicking an end date. Intermediate days are highlighted in a lighter shade so the range is always visually clear without being visually heavy.

---

## Deployment

This project is deployed on Vercel. To deploy your own copy:

```bash
yarn global add vercel
vercel
```

Or connect your GitHub repository directly in the [Vercel dashboard](https://vercel.com/dashboard).

---

## License

MIT
