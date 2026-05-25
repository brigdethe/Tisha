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
      <div className="res-step-title">Plan your stay</div>
      <div className="res-step-subtitle">Select your dates and number of guests</div>

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
