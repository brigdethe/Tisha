# Reservation Modal Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a full-screen 4-step reservation wizard overlay to the Tisha Hotel website, triggered by all "Book Now" / "Book Online" buttons.

**Architecture:** A `ReservationModal` component mounted in `App.tsx` owns all wizard state and is controlled via `isOpen` / `preSelectedRoomId` props passed down from App-level state. All "Book Now" buttons across the site call an `onBook(roomId?)` callback that sets that state. Steps are: Dates & Guests → Room Selection → Guest Details → Review Summary.

**Tech Stack:** React 18, TypeScript, Vite, CSS (no external UI library)

---

## File Map

**New files:**
| File | Responsibility |
|---|---|
| `src/components/reservation/rooms.ts` | `Room` interface + `ROOMS` constant (single source of truth for room data) |
| `src/components/reservation/utils.ts` | `calculateNights`, `formatDate` pure helpers |
| `src/components/reservation/reservation.css` | All modal styles, isolated from Webflow CSS |
| `src/components/reservation/StepDates.tsx` | Step 1: date pickers + guest counters |
| `src/components/reservation/StepRooms.tsx` | Step 2: room selection cards |
| `src/components/reservation/StepGuest.tsx` | Step 3: guest info form |
| `src/components/reservation/StepReview.tsx` | Step 4: read-only summary + total price |
| `src/components/ReservationModal.tsx` | Overlay shell, progress bar, step routing, `WizardState` type, validation |

**Modified files:**
| File | Change |
|---|---|
| `src/App.tsx` | Add `isReservationOpen` + `preSelectedRoomId` state; pass `onBook` to sections; render `<ReservationModal>` |
| `src/components/SectionHeader.tsx` | `onBook` prop; "Book Now" nav button calls it |
| `src/components/SectionHero.tsx` | `onBook` prop; "Book A Stay" CTA button calls it |
| `src/components/SectionBooking.tsx` | `onBook` prop; "Book Online" block calls it |
| `src/components/SectionRooms.tsx` | `onBook` prop; each room card's "Book Now" tag calls it with that room's ID |
| `src/components/SectionCta.tsx` | `onBook` prop; "Book Now" CTA button calls it |

---

## Task 1: Room data constant

**Files:**
- Create: `src/components/reservation/rooms.ts`

- [ ] **Step 1: Create the file**

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

## Task 2: Utility helpers

**Files:**
- Create: `src/components/reservation/utils.ts`

- [ ] **Step 1: Create the file**

```ts
export function calculateNights(checkIn: string, checkOut: string): number {
  if (!checkIn || !checkOut) return 0
  const diff = new Date(checkOut).getTime() - new Date(checkIn).getTime()
  return Math.max(0, Math.round(diff / (1000 * 60 * 60 * 24)))
}

export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}
```

---

## Task 3: CSS styles

**Files:**
- Create: `src/components/reservation/reservation.css`

- [ ] **Step 1: Create the file**

```css
/* ── Backdrop & card ── */
.res-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
}

.res-card {
  background: #fff;
  border-radius: 12px;
  width: 100%;
  max-width: 780px;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  display: flex;
  flex-direction: column;
}

/* ── Header (sticky) ── */
.res-header {
  padding: 20px 24px 16px;
  position: sticky;
  top: 0;
  background: #fff;
  z-index: 1;
  border-bottom: 1px solid #f0f0f0;
}

.res-close {
  position: absolute;
  top: 14px;
  right: 16px;
  background: none;
  border: none;
  font-size: 26px;
  cursor: pointer;
  color: #555;
  line-height: 1;
  padding: 4px 8px;
}

.res-close:hover { color: #111; }

/* ── Progress steps ── */
.res-steps {
  display: flex;
  align-items: center;
  padding-right: 40px;
}

.res-step {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  color: #aaa;
  white-space: nowrap;
}

.res-step-num {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: 2px solid #ddd;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  font-weight: 700;
  flex-shrink: 0;
}

.res-step--active { color: #2e7d32; font-weight: 600; }
.res-step--active .res-step-num { background: #2e7d32; border-color: #2e7d32; color: #fff; }
.res-step--done { color: #2e7d32; }
.res-step--done .res-step-num { background: #2e7d32; border-color: #2e7d32; color: #fff; }

.res-step-divider {
  flex: 1;
  height: 2px;
  background: #eee;
  margin: 0 6px;
  min-width: 12px;
}
.res-step-divider--done { background: #2e7d32; }

/* ── Body ── */
.res-body { padding: 24px; flex: 1; }

.res-step-title {
  font-size: 22px;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 24px;
}

/* ── Footer (sticky) ── */
.res-footer {
  padding: 16px 24px;
  border-top: 1px solid #f0f0f0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  bottom: 0;
  background: #fff;
}

/* ── Buttons ── */
.res-btn {
  padding: 12px 28px;
  border-radius: 6px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  border: none;
  transition: background 0.2s;
  font-family: inherit;
}

.res-btn--primary { background: #2e7d32; color: #fff; }
.res-btn--primary:hover:not(:disabled) { background: #1b5e20; }
.res-btn--primary:disabled { background: #ccc; cursor: not-allowed; }

.res-btn--secondary { background: transparent; color: #333; border: 1px solid #ddd; }
.res-btn--secondary:hover { background: #f5f5f5; }

/* ── Shared field ── */
.res-label {
  display: block;
  font-size: 12px;
  font-weight: 700;
  color: #555;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 6px;
}

.res-input {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 15px;
  color: #1a1a1a;
  outline: none;
  box-sizing: border-box;
  font-family: inherit;
  transition: border-color 0.2s;
}
.res-input:focus { border-color: #2e7d32; }

/* ── Step 1: Dates & Guests ── */
.res-dates-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-bottom: 16px;
}

.res-nights-badge {
  display: inline-block;
  background: #e8f5e9;
  color: #2e7d32;
  font-size: 14px;
  font-weight: 600;
  padding: 6px 14px;
  border-radius: 20px;
  margin-bottom: 24px;
}

.res-guests-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.res-counter-label {
  font-size: 12px;
  font-weight: 700;
  color: #555;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 10px;
}

.res-counter-controls {
  display: flex;
  align-items: center;
  gap: 16px;
}

.res-counter-btn {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: 1px solid #ddd;
  background: #fff;
  font-size: 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
  transition: border-color 0.2s, color 0.2s;
  font-family: inherit;
}
.res-counter-btn:hover:not(:disabled) { border-color: #2e7d32; color: #2e7d32; }
.res-counter-btn:disabled { color: #ccc; cursor: not-allowed; }

.res-counter-val {
  font-size: 20px;
  font-weight: 700;
  min-width: 28px;
  text-align: center;
}

/* ── Step 2: Room selection ── */
.res-rooms-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}

.res-room-card {
  border: 2px solid #eee;
  border-radius: 10px;
  overflow: hidden;
  cursor: pointer;
  transition: border-color 0.2s, box-shadow 0.2s;
}
.res-room-card:hover { border-color: #2e7d32; }
.res-room-card--selected {
  border-color: #2e7d32;
  box-shadow: 0 0 0 3px rgba(46, 125, 50, 0.15);
}

.res-room-card img {
  width: 100%;
  height: 150px;
  object-fit: cover;
  display: block;
}

.res-room-info { padding: 12px; }
.res-room-name { font-size: 15px; font-weight: 700; color: #1a1a1a; margin-bottom: 4px; }
.res-room-price { font-size: 13px; color: #2e7d32; font-weight: 600; margin-bottom: 6px; }
.res-room-desc { font-size: 12px; color: #777; line-height: 1.4; }

/* ── Step 3: Guest form ── */
.res-form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-bottom: 16px;
}
.res-form-row--full { grid-template-columns: 1fr; }

.res-textarea {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 15px;
  color: #1a1a1a;
  outline: none;
  resize: vertical;
  min-height: 80px;
  font-family: inherit;
  box-sizing: border-box;
  transition: border-color 0.2s;
}
.res-textarea:focus { border-color: #2e7d32; }

.res-optional { font-weight: 400; text-transform: none; font-size: 12px; color: #aaa; }

/* ── Step 4: Review ── */
.res-review-room {
  display: flex;
  gap: 16px;
  align-items: flex-start;
  padding: 16px;
  background: #f9f9f9;
  border-radius: 10px;
  margin-bottom: 20px;
}
.res-review-room img {
  width: 100px;
  height: 70px;
  object-fit: cover;
  border-radius: 6px;
  flex-shrink: 0;
}
.res-review-room-name { font-size: 16px; font-weight: 700; color: #1a1a1a; margin-bottom: 4px; }
.res-review-room-price { font-size: 14px; color: #555; }

.res-review-section { margin-bottom: 16px; }
.res-review-section-label {
  font-size: 12px;
  font-weight: 700;
  color: #999;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 4px;
}
.res-review-section-value { font-size: 15px; color: #1a1a1a; line-height: 1.5; }

.res-review-total {
  background: #e8f5e9;
  border-radius: 10px;
  padding: 16px 20px;
  margin: 20px 0 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.res-review-total-label { font-size: 15px; font-weight: 600; color: #2e7d32; }
.res-review-total-amount { font-size: 26px; font-weight: 800; color: #2e7d32; }

.res-review-note {
  text-align: center;
  color: #888;
  font-size: 14px;
  font-style: italic;
}

/* ── Mobile ── */
@media (max-width: 600px) {
  .res-dates-row,
  .res-guests-row,
  .res-form-row { grid-template-columns: 1fr; }
  .res-rooms-grid { grid-template-columns: 1fr; }
  .res-step span { display: none; }
  .res-card { max-height: 100vh; border-radius: 0; }
  .res-backdrop { padding: 0; align-items: flex-end; }
}
```

---

## Task 4: `ReservationModal` shell

**Files:**
- Create: `src/components/ReservationModal.tsx`

- [ ] **Step 1: Create the file**

```tsx
import { useState, useEffect, Fragment } from 'react'
import './reservation/reservation.css'
import { StepDates } from './reservation/StepDates'
import { StepRooms } from './reservation/StepRooms'
import { StepGuest } from './reservation/StepGuest'
import { StepReview } from './reservation/StepReview'

export interface WizardState {
  checkIn: string
  checkOut: string
  adults: number
  children: number
  selectedRoomId: string | null
  firstName: string
  lastName: string
  email: string
  phone: string
  specialRequests: string
}

const INITIAL_STATE: WizardState = {
  checkIn: '',
  checkOut: '',
  adults: 1,
  children: 0,
  selectedRoomId: null,
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  specialRequests: '',
}

const STEP_LABELS = ['Dates & Guests', 'Choose Room', 'Your Details', 'Review']

function isStepValid(step: number, state: WizardState): boolean {
  if (step === 1) {
    if (!state.checkIn || !state.checkOut) return false
    if (new Date(state.checkOut) <= new Date(state.checkIn)) return false
    return state.adults >= 1
  }
  if (step === 2) return state.selectedRoomId !== null
  if (step === 3) {
    if (!state.firstName.trim() || !state.lastName.trim()) return false
    if (!state.phone.trim()) return false
    return /\S+@\S+\.\S+/.test(state.email)
  }
  return true
}

interface ReservationModalProps {
  isOpen: boolean
  preSelectedRoomId: string | null
  onClose: () => void
}

export function ReservationModal({ isOpen, preSelectedRoomId, onClose }: ReservationModalProps): JSX.Element | null {
  const [step, setStep] = useState(1)
  const [state, setState] = useState<WizardState>(INITIAL_STATE)

  useEffect(() => {
    if (isOpen) {
      setState({ ...INITIAL_STATE, selectedRoomId: preSelectedRoomId })
      setStep(1)
    }
  }, [isOpen]) // eslint-disable-line react-hooks/exhaustive-deps

  if (!isOpen) return null

  function handleChange(partial: Partial<WizardState>) {
    setState(prev => ({ ...prev, ...partial }))
  }

  function handleClose() {
    onClose()
  }

  return (
    <div className="res-backdrop" onClick={handleClose}>
      <div className="res-card" onClick={e => e.stopPropagation()}>

        {/* Header */}
        <div className="res-header">
          <button className="res-close" onClick={handleClose} aria-label="Close">×</button>
          <div className="res-steps">
            {STEP_LABELS.map((label, i) => {
              const num = i + 1
              const isDone = num < step
              const isActive = num === step
              return (
                <Fragment key={num}>
                  <div className={`res-step${isActive ? ' res-step--active' : ''}${isDone ? ' res-step--done' : ''}`}>
                    <div className="res-step-num">{isDone ? '✓' : num}</div>
                    <span>{label}</span>
                  </div>
                  {i < STEP_LABELS.length - 1 && (
                    <div className={`res-step-divider${isDone ? ' res-step-divider--done' : ''}`} />
                  )}
                </Fragment>
              )
            })}
          </div>
        </div>

        {/* Body */}
        <div className="res-body">
          {step === 1 && <StepDates state={state} onChange={handleChange} />}
          {step === 2 && <StepRooms state={state} onChange={handleChange} />}
          {step === 3 && <StepGuest state={state} onChange={handleChange} />}
          {step === 4 && <StepReview state={state} />}
        </div>

        {/* Footer */}
        <div className="res-footer">
          <div>
            {step > 1 && (
              <button className="res-btn res-btn--secondary" onClick={() => setStep(s => s - 1)}>
                Back
              </button>
            )}
          </div>
          {step < 4 ? (
            <button
              className="res-btn res-btn--primary"
              disabled={!isStepValid(step, state)}
              onClick={() => setStep(s => s + 1)}
            >
              Next
            </button>
          ) : (
            <button className="res-btn res-btn--primary" onClick={handleClose}>
              Close
            </button>
          )}
        </div>

      </div>
    </div>
  )
}
```

---

## Task 5: `StepDates` component

**Files:**
- Create: `src/components/reservation/StepDates.tsx`

- [ ] **Step 1: Create the file**

```tsx
import { calculateNights } from './utils'
import type { WizardState } from '../ReservationModal'

interface StepDatesProps {
  state: WizardState
  onChange: (partial: Partial<WizardState>) => void
}

export function StepDates({ state, onChange }: StepDatesProps): JSX.Element {
  const today = new Date().toISOString().split('T')[0]
  const nights = calculateNights(state.checkIn, state.checkOut)

  return (
    <div>
      <div className="res-step-title">When are you visiting?</div>

      <div className="res-dates-row">
        <div>
          <label className="res-label">Check-in</label>
          <input
            type="date"
            className="res-input"
            min={today}
            value={state.checkIn}
            onChange={e => onChange({ checkIn: e.target.value, checkOut: '' })}
          />
        </div>
        <div>
          <label className="res-label">Check-out</label>
          <input
            type="date"
            className="res-input"
            min={state.checkIn || today}
            value={state.checkOut}
            onChange={e => onChange({ checkOut: e.target.value })}
          />
        </div>
      </div>

      {nights > 0 && (
        <div className="res-nights-badge">
          {nights} night{nights !== 1 ? 's' : ''}
        </div>
      )}

      <div className="res-guests-row">
        <div>
          <div className="res-counter-label">Adults</div>
          <div className="res-counter-controls">
            <button
              className="res-counter-btn"
              onClick={() => onChange({ adults: Math.max(1, state.adults - 1) })}
              disabled={state.adults <= 1}
            >−</button>
            <span className="res-counter-val">{state.adults}</span>
            <button
              className="res-counter-btn"
              onClick={() => onChange({ adults: Math.min(6, state.adults + 1) })}
              disabled={state.adults >= 6}
            >+</button>
          </div>
        </div>
        <div>
          <div className="res-counter-label">Children</div>
          <div className="res-counter-controls">
            <button
              className="res-counter-btn"
              onClick={() => onChange({ children: Math.max(0, state.children - 1) })}
              disabled={state.children <= 0}
            >−</button>
            <span className="res-counter-val">{state.children}</span>
            <button
              className="res-counter-btn"
              onClick={() => onChange({ children: Math.min(6, state.children + 1) })}
              disabled={state.children >= 6}
            >+</button>
          </div>
        </div>
      </div>
    </div>
  )
}
```

---

## Task 6: `StepRooms` component

**Files:**
- Create: `src/components/reservation/StepRooms.tsx`

- [ ] **Step 1: Create the file**

```tsx
import { ROOMS } from './rooms'
import type { WizardState } from '../ReservationModal'

interface StepRoomsProps {
  state: WizardState
  onChange: (partial: Partial<WizardState>) => void
}

export function StepRooms({ state, onChange }: StepRoomsProps): JSX.Element {
  return (
    <div>
      <div className="res-step-title">Choose your room</div>
      <div className="res-rooms-grid">
        {ROOMS.map(room => (
          <div
            key={room.id}
            className={`res-room-card${state.selectedRoomId === room.id ? ' res-room-card--selected' : ''}`}
            onClick={() => onChange({ selectedRoomId: room.id })}
          >
            <img src={room.image} alt={room.name} />
            <div className="res-room-info">
              <div className="res-room-name">{room.name}</div>
              <div className="res-room-price">GHS {room.pricePerNight} / night</div>
              <div className="res-room-desc">{room.description}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
```

---

## Task 7: `StepGuest` component

**Files:**
- Create: `src/components/reservation/StepGuest.tsx`

- [ ] **Step 1: Create the file**

```tsx
import type { WizardState } from '../ReservationModal'

interface StepGuestProps {
  state: WizardState
  onChange: (partial: Partial<WizardState>) => void
}

export function StepGuest({ state, onChange }: StepGuestProps): JSX.Element {
  return (
    <div>
      <div className="res-step-title">Your details</div>

      <div className="res-form-row">
        <div>
          <label className="res-label">First Name</label>
          <input
            type="text"
            className="res-input"
            value={state.firstName}
            onChange={e => onChange({ firstName: e.target.value })}
            placeholder="Jane"
          />
        </div>
        <div>
          <label className="res-label">Last Name</label>
          <input
            type="text"
            className="res-input"
            value={state.lastName}
            onChange={e => onChange({ lastName: e.target.value })}
            placeholder="Doe"
          />
        </div>
      </div>

      <div className="res-form-row">
        <div>
          <label className="res-label">Email</label>
          <input
            type="email"
            className="res-input"
            value={state.email}
            onChange={e => onChange({ email: e.target.value })}
            placeholder="jane@example.com"
          />
        </div>
        <div>
          <label className="res-label">Phone</label>
          <input
            type="tel"
            className="res-input"
            value={state.phone}
            onChange={e => onChange({ phone: e.target.value })}
            placeholder="+233 24 000 0000"
          />
        </div>
      </div>

      <div className="res-form-row res-form-row--full">
        <div>
          <label className="res-label">
            Special Requests <span className="res-optional">(optional)</span>
          </label>
          <textarea
            className="res-textarea"
            value={state.specialRequests}
            onChange={e => onChange({ specialRequests: e.target.value })}
            placeholder="Any special requirements or requests..."
          />
        </div>
      </div>
    </div>
  )
}
```

---

## Task 8: `StepReview` component

**Files:**
- Create: `src/components/reservation/StepReview.tsx`

- [ ] **Step 1: Create the file**

```tsx
import { ROOMS } from './rooms'
import { calculateNights, formatDate } from './utils'
import type { WizardState } from '../ReservationModal'

interface StepReviewProps {
  state: WizardState
}

export function StepReview({ state }: StepReviewProps): JSX.Element {
  const room = ROOMS.find(r => r.id === state.selectedRoomId)!
  const nights = calculateNights(state.checkIn, state.checkOut)
  const total = room.pricePerNight * nights

  return (
    <div>
      <div className="res-step-title">Review your reservation</div>

      <div className="res-review-room">
        <img src={room.image} alt={room.name} />
        <div>
          <div className="res-review-room-name">{room.name}</div>
          <div className="res-review-room-price">GHS {room.pricePerNight} per night</div>
        </div>
      </div>

      <div className="res-review-section">
        <div className="res-review-section-label">Dates</div>
        <div className="res-review-section-value">
          {formatDate(state.checkIn)} → {formatDate(state.checkOut)}{' '}
          ({nights} night{nights !== 1 ? 's' : ''})
        </div>
      </div>

      <div className="res-review-section">
        <div className="res-review-section-label">Guests</div>
        <div className="res-review-section-value">
          {state.adults} adult{state.adults !== 1 ? 's' : ''}
          {state.children > 0 ? `, ${state.children} child${state.children !== 1 ? 'ren' : ''}` : ''}
        </div>
      </div>

      <div className="res-review-section">
        <div className="res-review-section-label">Guest</div>
        <div className="res-review-section-value">{state.firstName} {state.lastName}</div>
        <div className="res-review-section-value">{state.email} · {state.phone}</div>
      </div>

      {state.specialRequests && (
        <div className="res-review-section">
          <div className="res-review-section-label">Special Requests</div>
          <div className="res-review-section-value">{state.specialRequests}</div>
        </div>
      )}

      <div className="res-review-total">
        <span className="res-review-total-label">Total Estimated Cost</span>
        <span className="res-review-total-amount">GHS {total.toLocaleString()}</span>
      </div>

      <div className="res-review-note">
        Our team will contact you shortly to confirm your reservation.
      </div>
    </div>
  )
}
```

---

## Task 9: Update `App.tsx`

**Files:**
- Modify: `src/App.tsx`

- [ ] **Step 1: Replace the full file content**

```tsx
import { useEffect, useState } from 'react'
import { SectionHeader } from './components/SectionHeader'
import { SectionHero } from './components/SectionHero'
import { SectionMarquee } from './components/SectionMarquee'
import { SectionBooking } from './components/SectionBooking'
import { SectionRooms } from './components/SectionRooms'
import { SectionAmenities } from './components/SectionAmenities'
import { SectionFacts } from './components/SectionFacts'
import { SectionCta } from './components/SectionCta'
import { SectionFooter } from './components/SectionFooter'
import { ReservationModal } from './components/ReservationModal'

const WEBFLOW_SCRIPTS = [
  {
    src: '/external/js/script-d3e54v103j8qbb-cloudfront-net.js',
    integrity: 'sha384-I9nvsY534/cx2CBx9qnDDuNkP4tBw4Va7eW8+2CXSaiPmfhB42fq032++kvT8woz',
  },
  {
    src: '/external/js/script-69c4d31e44bb0ae4ccbe80dc.js',
    integrity: 'sha384-4abIlA5/v7XaW1HMXKBgnUuhnjBYJ/Z9C1OSg4OhmVw9O3QeHJ/qJqFBERCDPv7G',
  },
  {
    src: '/external/js/script-69c4d31e44bb0ae4ccbe80dc-1.js',
    integrity: 'sha384-3/kfdDuFbNlKPM1Rl0mGRn8FslhIic8bU7o8wwXDu/ulVeVq4VW8ZYSdCCw3pXUs',
  },
]

export function App(): JSX.Element {
  const [isReservationOpen, setIsReservationOpen] = useState(false)
  const [preSelectedRoomId, setPreSelectedRoomId] = useState<string | null>(null)

  function openReservation(roomId?: string) {
    setPreSelectedRoomId(roomId ?? null)
    setIsReservationOpen(true)
  }

  useEffect(() => {
    WEBFLOW_SCRIPTS.forEach(({ src, integrity }) => {
      if (document.querySelector(`script[src="${src}"]`)) return
      const script = document.createElement('script')
      script.src = src
      script.type = 'text/javascript'
      script.integrity = integrity
      script.crossOrigin = 'anonymous'
      document.body.appendChild(script)
    })
  }, [])

  return (
    <>
      <SectionHeader onBook={() => openReservation()} />
      <SectionHero onBook={() => openReservation()} />
      <SectionMarquee />
      <SectionBooking onBook={() => openReservation()} />
      <SectionRooms onBook={openReservation} />
      <SectionAmenities />
      <SectionFacts />
      <SectionCta onBook={() => openReservation()} />
      <SectionFooter />
      <ReservationModal
        isOpen={isReservationOpen}
        preSelectedRoomId={preSelectedRoomId}
        onClose={() => setIsReservationOpen(false)}
      />
    </>
  )
}
```

---

## Task 10: Update `SectionHeader`

**Files:**
- Modify: `src/components/SectionHeader.tsx`

- [ ] **Step 1: Add `onBook` prop and replace the "Book Now" nav button**

Add the prop interface before the function:

```tsx
interface SectionHeaderProps {
  onBook: () => void
}

export function SectionHeader({ onBook }: SectionHeaderProps): JSX.Element {
```

Replace:
```tsx
<a href="#book" className="nav-button w-inline-block">
  <div>Book Now</div>
</a>
```

With:
```tsx
<a href="#" className="nav-button w-inline-block" onClick={e => { e.preventDefault(); onBook() }}>
  <div>Book Now</div>
</a>
```

---

## Task 11: Update `SectionHero`

**Files:**
- Modify: `src/components/SectionHero.tsx`

- [ ] **Step 1: Add `onBook` prop and replace the "Book A Stay" button**

Add the prop interface:
```tsx
interface SectionHeroProps {
  onBook: () => void
}

export function SectionHero({ onBook }: SectionHeroProps): JSX.Element {
  const { containerRef, mode } = useHeroMedia()
```

Replace:
```tsx
<a href="#book" className="hero-button w-inline-block">
  <div>Book A Stay</div>
</a>
```

With:
```tsx
<a href="#" className="hero-button w-inline-block" onClick={e => { e.preventDefault(); onBook() }}>
  <div>Book A Stay</div>
</a>
```

---

## Task 12: Update `SectionBooking`

**Files:**
- Modify: `src/components/SectionBooking.tsx`

- [ ] **Step 1: Add `onBook` prop and replace the "Book Online" block**

```tsx
interface SectionBookingProps {
  onBook: () => void
}

export function SectionBooking({ onBook }: SectionBookingProps): JSX.Element {
```

Replace:
```tsx
<a href="#book" className="wh-block w-inline-block">
```

With:
```tsx
<a href="#" className="wh-block w-inline-block" onClick={e => { e.preventDefault(); onBook() }}>
```

The closing `</a>` stays unchanged.

---

## Task 13: Update `SectionRooms`

**Files:**
- Modify: `src/components/SectionRooms.tsx`

- [ ] **Step 1: Add `onBook` prop and wire each room's "Book Now" tag**

Add the prop:
```tsx
interface SectionRoomsProps {
  onBook: (roomId: string) => void
}

export function SectionRooms({ onBook }: SectionRoomsProps): JSX.Element {
```

Replace each room's `<div className="team-tag">` with a button. There are 3 rooms — repeat this pattern for each, using the correct room ID (`'junior-suite'`, `'standard-room'`, `'master-room'`):

Replace each `<div className="team-tag">` with a clickable `<div>` that calls `onBook` with the correct room ID. The existing `.team-tag` Webflow styles are preserved.

For the Junior Suite — replace:
```tsx
<div className="team-tag">
  <div>Book Now</div>
  <img src="https://cdn.prod.website-files.com/69c4d31e44bb0ae4ccbe80dc/69cca858002272ce39a512aa_asset%2084.svg" loading="lazy" alt="Plus Icon" className="plus-icon" />
</div>
```
With:
```tsx
<div className="team-tag" onClick={() => onBook('junior-suite')} style={{ cursor: 'pointer' }}>
  <div>Book Now</div>
  <img src="https://cdn.prod.website-files.com/69c4d31e44bb0ae4ccbe80dc/69cca858002272ce39a512aa_asset%2084.svg" loading="lazy" alt="Plus Icon" className="plus-icon" />
</div>
```

For the Standard Room — same pattern with `onBook('standard-room')`.

For the Master Room — same pattern with `onBook('master-room')`.

---

## Task 14: Update `SectionCta`

**Files:**
- Modify: `src/components/SectionCta.tsx`

- [ ] **Step 1: Add `onBook` prop and replace the "Book Now" CTA button**

```tsx
interface SectionCtaProps {
  onBook: () => void
}

export function SectionCta({ onBook }: SectionCtaProps): JSX.Element {
```

Replace:
```tsx
<a href="#book" className="primary-button w-inline-block">
  <div>Book Now</div>
</a>
```

With:
```tsx
<a href="#" className="primary-button w-inline-block" onClick={e => { e.preventDefault(); onBook() }}>
  <div>Book Now</div>
</a>
```

---

## Task 15: Verify TypeScript compiles

- [ ] **Step 1: Run the TypeScript compiler**

```bash
npx tsc --noEmit
```

Expected: No errors. If there are errors, they will point to type mismatches in the prop interfaces — fix those before continuing.

- [ ] **Step 2: Run the dev server and manually test the flow**

```bash
npm run dev
```

Test checklist:
- [ ] Clicking "Book Now" in the nav header opens the modal
- [ ] Clicking "Book A Stay" in the hero opens the modal
- [ ] Clicking "Book Online" in the booking section opens the modal
- [ ] Clicking "Book Now" on a room card opens the modal with that room pre-selected on step 2
- [ ] Clicking "Book Now" in the CTA section opens the modal
- [ ] Clicking the × or the backdrop closes the modal
- [ ] Step 1: Next is disabled until both dates are set and check-out > check-in
- [ ] Step 1: Night count badge appears when dates are valid
- [ ] Step 1: Adult +/− counters work (min 1, max 6)
- [ ] Step 1: Children +/− counters work (min 0, max 6)
- [ ] Step 2: Room cards are highlighted when selected; Next enabled once one is selected
- [ ] Step 3: Next is disabled until first name, last name, valid email, and phone are filled
- [ ] Step 4: Room image, dates, nights, guests, contact info, and total price all display correctly
- [ ] Step 4: Total = room price × nights
- [ ] Progress bar shows correct active/done state for each step
- [ ] Back button is hidden on step 1, visible on steps 2–4
- [ ] On step 4, the footer shows "Close" instead of "Next"
- [ ] Mobile (resize to <600px): room cards stack, date fields stack, step labels hide
