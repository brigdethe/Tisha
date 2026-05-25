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
      <div className="res-step-subtitle">Select the accommodation that suits you best</div>
      <div className="res-rooms-list">
        {ROOMS.map(room => (
          <div
            key={room.id}
            className={`res-room-card${state.selectedRoomId === room.id ? ' res-room-card--selected' : ''}`}
            onClick={() => onChange({ selectedRoomId: room.id })}
          >
            <img src={room.image} alt={room.name} />
            <div className="res-room-info">
              <div className="res-room-name">{room.name}</div>
              <div className="res-room-price">GHS {room.pricePerNight} per night</div>
              <div className="res-room-desc">{room.description}</div>
            </div>
            <div className="res-room-select">
              <div className="res-room-select-ring">
                <div className="res-room-select-dot" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
