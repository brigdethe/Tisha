import type { WizardState } from '../ReservationModal'

interface StepGuestProps {
  state: WizardState
  onChange: (partial: Partial<WizardState>) => void
}

export function StepGuest({ state, onChange }: StepGuestProps): JSX.Element {
  return (
    <div>
      <div className="res-step-title">Your details</div>
      <div className="res-step-subtitle">We'll use this to confirm your reservation</div>

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
