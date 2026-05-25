import { useState, useEffect } from 'react'
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

const STEPS = [
  { label: 'Choose Room',    sub: 'Your accommodation' },
  { label: 'Dates & Guests', sub: 'When & who' },
  { label: 'Your Details',  sub: 'Contact info' },
  { label: 'Review',        sub: 'Confirm booking' },
]

function isStepValid(step: number, state: WizardState): boolean {
  if (step === 1) return state.selectedRoomId !== null
  if (step === 2) {
    if (!state.checkIn || !state.checkOut) return false
    if (new Date(state.checkOut) <= new Date(state.checkIn)) return false
    return state.adults >= 1
  }
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
      setStep(preSelectedRoomId ? 2 : 1)
    }
  }, [isOpen]) // eslint-disable-line react-hooks/exhaustive-deps

  if (!isOpen) return null

  function handleChange(partial: Partial<WizardState>) {
    setState(prev => ({ ...prev, ...partial }))
  }

  return (
    <div className="res-backdrop" onClick={onClose}>
      <div className="res-shell" onClick={e => e.stopPropagation()}>

        {/* Left panel */}
        <div className="res-panel">
          <div className="res-panel-brand">
            <div className="res-panel-monogram">T</div>
            <div className="res-panel-name">Tisha Hotel</div>
          </div>

          <div className="res-panel-steps">
            {STEPS.map((s, i) => {
              const num = i + 1
              const isDone = num < step
              const isActive = num === step
              const isLast = i === STEPS.length - 1
              return (
                <div
                  key={num}
                  className={`res-panel-step${isActive ? ' res-panel-step--active' : ''}${isDone ? ' res-panel-step--done' : ''}`}
                >
                  <div className="res-panel-step-dot">
                    {isDone ? '✓' : num}
                  </div>
                  {!isLast && <div className="res-panel-step-line" />}
                  <div className="res-panel-step-label">
                    <div className="res-panel-step-sub">{s.sub}</div>
                    <div className="res-panel-step-name">{s.label}</div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Right content */}
        <div className="res-content">
          <button className="res-close" onClick={onClose} aria-label="Close">×</button>

          <div className="res-body" key={step}>
            {step === 1 && <StepRooms state={state} onChange={handleChange} />}
            {step === 2 && <StepDates state={state} onChange={handleChange} />}
            {step === 3 && <StepGuest state={state} onChange={handleChange} />}
            {step === 4 && <StepReview state={state} />}
          </div>

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
                Continue
              </button>
            ) : (
              <button className="res-btn res-btn--primary" onClick={onClose}>
                Done
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  )
}
