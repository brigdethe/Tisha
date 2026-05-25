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
