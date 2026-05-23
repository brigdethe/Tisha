export function SectionRooms(): JSX.Element {
  return (
    <section id="rooms" className="team">
      <div className="w-layout-blockcontainer container w-container">
        <div className="team-top">
          <div className="team-title">Our Affordable Rooms and Packages</div>
        </div>
        <div
          data-delay="4000"
          data-animation="slide"
          className="team-slider w-slider"
          data-autoplay="true"
          data-easing="ease"
          data-hide-arrows="false"
          data-disable-swipe="false"
          data-autoplay-limit="0"
          data-nav-spacing="3"
          data-duration="500"
          data-infinite="true"
        >
          <div className="team-mask w-slider-mask">
            <div className="team-slide w-slide">
              <div className="team-block">
                <div className="team-img">
                  <img src="https://ik.imagekit.io/fqsfbn5ad/tishaimages/junior-room.jpg?updatedAt=1779330481819" loading="lazy" alt="Junior Suite" className="team-image" />
                  <div className="team-tag">
                    <div>Book Now</div>
                    <img src="https://cdn.prod.website-files.com/69c4d31e44bb0ae4ccbe80dc/69cca858002272ce39a512aa_asset%2084.svg" loading="lazy" alt="Plus Icon" className="plus-icon" />
                  </div>
                </div>
                <div className="team-bottom">
                  <div>
                    <div className="team-text">Junior Suite</div>
                    <div>Starting at GHS 300 per night</div>
                  </div>
                  <p className="single-text">Our cozy Junior Suite is perfect for small families with free WiFi, DStv, and minibar.</p>
                </div>
              </div>
            </div>
            <div className="team-slide w-slide">
              <div className="team-block">
                <div className="team-img">
                  <img src="https://ik.imagekit.io/fqsfbn5ad/tishaimages/standard-room.jpg?updatedAt=1779330481779" loading="lazy" alt="Standard Room" className="team-image" />
                  <div className="team-tag">
                    <div>Book Now</div>
                    <img src="https://cdn.prod.website-files.com/69c4d31e44bb0ae4ccbe80dc/69cca858002272ce39a512aa_asset%2084.svg" loading="lazy" alt="Plus Icon" className="plus-icon" />
                  </div>
                </div>
                <div className="team-bottom">
                  <div>
                    <div className="team-text">Standard Room</div>
                    <div>Starting at GHS 350 per night</div>
                  </div>
                  <p className="single-text">Experience complimentary high-speed WiFi, DStv entertainment, and a well-stocked minibar.</p>
                </div>
              </div>
            </div>
            <div className="team-slide w-slide">
              <div className="team-block">
                <div className="team-img">
                  <img src="https://ik.imagekit.io/fqsfbn5ad/tishaimages/master-room.jpg?updatedAt=1779330481747" loading="lazy" alt="Master Room" className="team-image" />
                  <div className="team-tag">
                    <div>Book Now</div>
                    <img src="https://cdn.prod.website-files.com/69c4d31e44bb0ae4ccbe80dc/69cca858002272ce39a512aa_asset%2084.svg" loading="lazy" alt="Plus Icon" className="plus-icon" />
                  </div>
                </div>
                <div className="team-bottom">
                  <div>
                    <div className="team-text">Master Room</div>
                    <div>Starting at GHS 385 per night</div>
                  </div>
                  <p className="single-text">Our luxurious Master Room provides extra space and comfort, complete with all premium amenities for an exceptional stay.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="left-arrow w-slider-arrow-left"></div>
          <div className="right-arrow w-slider-arrow-right"></div>
          <div className="slide-nav w-slider-nav w-slider-nav-invert w-round"></div>
        </div>
      </div>
    </section>
  )
}
