# Reservation Modal — Design Spec
**Date:** 2026-05-24
**Project:** Tisha Hotel website (Vite + React + TypeScript)

---

## Overview

A full-screen overlay reservation wizard that allows guests to book a room without leaving the main page. Triggered by any "Book Now" or "Book Online" button across the site. Purely frontend — no backend, no form submission. The flow ends with a review summary screen and a note directing guests to await contact confirmation.

---

## Architecture

### New files
```
src/components/ReservationModal.tsx          — overlay shell, step router, all state
src/components/reservation/StepDates.tsx    — step 1: dates & guests
src/components/reservation/StepRooms.tsx    — step 2: room selection
src/components/reservation/StepGuest.tsx    — step 3: guest details
src/components/reservation/StepReview.tsx   — step 4: review summary
src/components/reservation/reservation.css  — all modal styles (isolated from Webflow CSS)
src/components/reservation/rooms.ts         — ROOMS constant and Room interface
```

### Modified files
```
src/App.tsx                          — modal open/close state + preSelectedRoom state
src/components/SectionHeader.tsx     — "Book" nav link opens modal
src/components/SectionHero.tsx       — main CTA button opens modal
src/components/SectionBooking.tsx    — "Book Online" block opens modal
src/components/SectionRooms.tsx      — each room's "Book Now" tag opens modal with pre-selection
src/components/SectionCta.tsx        — CTA button opens modal
```

---

## State

`App.tsx` owns two pieces of state:

| State | Type | Description |
|---|---|---|
| `isReservationOpen` | `boolean` | Controls modal visibility |
| `preSelectedRoom` | `string \| null` | Room ID to pre-select when opening from a room card |

A callback `onOpenReservation(roomId?: string)` is passed as a prop to all trigger sections.

`ReservationModal` owns all wizard state internally:

| State | Type |
|---|---|
| `currentStep` | `1 \| 2 \| 3 \| 4` |
| `checkIn` | `string` (ISO date) |
| `checkOut` | `string` (ISO date) |
| `adults` | `number` |
| `children` | `number` |
| `selectedRoom` | `string \| null` (room id) |
| `firstName` | `string` |
| `lastName` | `string` |
| `email` | `string` |
| `phone` | `string` |
| `specialRequests` | `string` |

---

## Overlay Shell (`ReservationModal.tsx`)

- Fixed full-screen backdrop: semi-transparent dark overlay
- Centered white card, `max-width: 780px`, scrollable on small screens
- Close button (×) top-right corner; clicking the backdrop also closes
- Progress bar at the top: 4 labeled steps; active step highlighted; completed steps show a checkmark
- "Back" and "Next" / "Confirm" buttons at the bottom
- "Back" is hidden on step 1 (no previous step to return to)
- "Next" button is disabled until the current step passes validation
- On close, wizard state resets to step 1

---

## Step 1 — Dates & Guests (`StepDates.tsx`)

**Fields:**
- Check-in date (`<input type="date">`, min = today)
- Check-out date (`<input type="date">`, min = day after check-in)
- Adults counter (default: 1, min: 1, max: 6) — +/− buttons
- Children counter (default: 0, min: 0, max: 6) — +/− buttons

**Live feedback:**
- Number of nights calculated and shown below the date inputs (e.g. "3 nights")

**Validation (blocks Next):**
- Both dates must be selected
- Check-out must be after check-in
- At least 1 adult

---

## Step 2 — Room Selection (`StepRooms.tsx`)

**Rooms (data defined as a constant):**

| ID | Name | Price/night | Image |
|---|---|---|---|
| `junior-suite` | Junior Suite | GHS 300 | `https://ik.imagekit.io/fqsfbn5ad/tishaimages/junior-room.jpg` |
| `standard-room` | Standard Room | GHS 350 | `https://ik.imagekit.io/fqsfbn5ad/tishaimages/standard-room.jpg` |
| `master-room` | Master Room | GHS 385 | `https://ik.imagekit.io/fqsfbn5ad/tishaimages/master-room.jpg` |

**UI:**
- 3 room cards in a responsive grid (1 column on mobile, 3 columns on desktop)
- Each card: room image, name, price per night, short description
- Clicking a card selects it (highlighted border/background); only one can be selected at a time
- If `preSelectedRoom` prop is set when the modal opens, that room starts selected

**Validation (blocks Next):**
- A room must be selected

---

## Step 3 — Guest Details (`StepGuest.tsx`)

**Fields:**
- First name (required)
- Last name (required)
- Email (required, basic format validation)
- Phone number (required)
- Special requests (optional, textarea)

**Validation (blocks Next):**
- First name, last name, email, and phone must be non-empty
- Email must match basic format (`@` and `.`)

---

## Step 4 — Review Summary (`StepReview.tsx`)

**Displays (read-only):**
- Selected room: image, name, price per night
- Dates: check-in, check-out, number of nights
- Guests: adults + children
- Guest info: full name, email, phone
- Special requests (if any)
- **Total price:** `price/night × nights` shown prominently

**End state:**
- No submit button
- A note: *"Our team will contact you shortly to confirm your reservation."*
- A "Close" button that closes the modal

---

## Styling (`reservation.css`)

- Isolated from the Webflow stylesheet — imported only by `ReservationModal.tsx`
- Colors: white card, dark backdrop (`rgba(0,0,0,0.6)`), hotel green accent for active step / selected room / buttons
- Fonts inherit from existing Webflow global styles
- Mobile-first: modal takes full viewport on small screens, centered card on desktop
- Room cards stack to single column below 600px

---

## Rooms Data

Defined as a typed constant in `src/components/reservation/rooms.ts`:

```ts
export interface Room {
  id: string
  name: string
  pricePerNight: number
  description: string
  image: string
}

export const ROOMS: Room[] = [
  {
    id: 'junior-suite',
    name: 'Junior Suite',
    pricePerNight: 300,
    description: 'Our cozy Junior Suite is perfect for small families with free WiFi, DStv, and minibar.',
    image: 'https://ik.imagekit.io/fqsfbn5ad/tishaimages/junior-room.jpg?updatedAt=1779330481819',
  },
  {
    id: 'standard-room',
    name: 'Standard Room',
    pricePerNight: 350,
    description: 'Experience complimentary high-speed WiFi, DStv entertainment, and a well-stocked minibar.',
    image: 'https://ik.imagekit.io/fqsfbn5ad/tishaimages/standard-room.jpg?updatedAt=1779330481779',
  },
  {
    id: 'master-room',
    name: 'Master Room',
    pricePerNight: 385,
    description: 'Our luxurious Master Room provides extra space and comfort, complete with all premium amenities for an exceptional stay.',
    image: 'https://ik.imagekit.io/fqsfbn5ad/tishaimages/master-room.jpg?updatedAt=1779330481747',
  },
]
```

---

## Out of Scope

- Backend / API integration
- Real availability checking
- Payment processing
- Email sending or WhatsApp integration
- Routing (no URL change on modal open)
