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
      <div className="res-step-title">Review</div>
      <div className="res-step-subtitle">Everything looks good? Confirm your reservation.</div>

      <div className="res-review-room">
        <img src={room.image} alt={room.name} />
        <div>
          <div className="res-review-room-name">{room.name}</div>
          <div className="res-review-room-price">GHS {room.pricePerNight} per night</div>
        </div>
      </div>

      <div className="res-review-grid">
        <div className="res-review-section">
          <div className="res-review-section-label">Check-in</div>
          <div className="res-review-section-value">{formatDate(state.checkIn)}</div>
        </div>
        <div className="res-review-section">
          <div className="res-review-section-label">Check-out</div>
          <div className="res-review-section-value">
            {formatDate(state.checkOut)}
            <span style={{ color: '#8a7f72', fontSize: '12px' }}> · {nights} night{nights !== 1 ? 's' : ''}</span>
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
          <div className="res-review-section-label">Contact</div>
          <div className="res-review-section-value">{state.firstName} {state.lastName}</div>
          <div className="res-review-section-value" style={{ fontSize: '12px', color: '#8a7f72' }}>{state.email}</div>
        </div>
      </div>

      {state.specialRequests && (
        <div className="res-review-requests res-review-section">
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
