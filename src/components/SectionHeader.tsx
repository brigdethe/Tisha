interface SectionHeaderProps { onBook: (roomId?: string) => void }

export function SectionHeader({ onBook }: SectionHeaderProps): JSX.Element {
  return (
    <section className="header">
      <div
        data-animation="default"
        data-collapse="medium"
        data-duration="400"
        data-easing="ease"
        data-easing2="ease"
        role="banner"
        className="navbar w-nav"
      >
        <div className="nav-container w-container">
          <div className="nav-inner">
            <div className="nav-brand">
              <a href="#top" className="w-nav-brand">
                <img
                  src="https://ik.imagekit.io/fqsfbn5ad/create_svg_of_the_logo_without_the_green_backgroun_019e4860-fb30-7a87-abca-c7e71c2ea9ff.svg?updatedAt=1779330938207"
                  loading="lazy"
                  alt="Tisha Hotel"
                />
              </a>
            </div>
            <div className="nav-block">
              <div data-w-id="ed6552d0-6733-cfb5-50d7-eccc75ca9caf" className="nav-left">
                <div>
                  <div className="top-line"></div>
                  <div className="center-line"></div>
                  <div className="bottom-line"></div>
                </div>
                <div className="mobile-none">Tisha Hotel</div>
              </div>
              <a href="#" className="nav-button w-inline-block" onClick={e => { e.preventDefault(); onBook() }}>
                <div>Book Now</div>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div
        style={{
          display: 'none',
          WebkitTransform: 'translate3d(-100%, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)',
          MozTransform: 'translate3d(-100%, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)',
          msTransform: 'translate3d(-100%, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)',
          transform: 'translate3d(-100%, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)',
        }}
        className="open-menu"
      >
        <div className="menu-top">
          <div data-w-id="78be8864-f865-ad70-e47a-8dd341b6b5b6" className="close-button">
            <img src="https://cdn.prod.website-files.com/69c4d31e44bb0ae4ccbe80dc/69cca85857e933df6e2ff532_asset%202.svg" loading="lazy" alt="Close Icon" />
          </div>
        </div>
        <div className="open-menu-wrap">
          <div className="om-title">Tisha Hotel Rooms</div>
          <div>
            <a href="#" className="om-info w-inline-block" onClick={e => { e.preventDefault(); onBook('junior-suite') }}>
              <div className="om-inner">
                <div className="om-bg"></div>
                <div>Junior Suite</div>
              </div>
              <img src="https://cdn.prod.website-files.com/69c4d31e44bb0ae4ccbe80dc/69cca85955311a5774399b0e_asset%204.svg" loading="lazy" alt="Arrow" />
            </a>
            <a href="#" className="om-info w-inline-block" onClick={e => { e.preventDefault(); onBook('standard-room') }}>
              <div className="om-inner">
                <div className="om-bg _02"></div>
                <div>Standard Room</div>
              </div>
              <img src="https://cdn.prod.website-files.com/69c4d31e44bb0ae4ccbe80dc/69cca85955311a5774399b0e_asset%204.svg" loading="lazy" alt="Arrow" />
            </a>
            <a href="#" className="om-info w-inline-block" onClick={e => { e.preventDefault(); onBook('master-room') }}>
              <div className="om-inner">
                <div className="om-bg _03"></div>
                <div>Master Room</div>
              </div>
              <img src="https://cdn.prod.website-files.com/69c4d31e44bb0ae4ccbe80dc/69cca85955311a5774399b0e_asset%204.svg" loading="lazy" alt="Arrow" />
            </a>
          </div>
        </div>
        <div className="open-menu-data">
          <div className="om-title">ATTRACTIONS</div>
          <div className="om-data">
            <img src="https://cdn.prod.website-files.com/69c4d31e44bb0ae4ccbe80dc/69cca9d50354a390eb323130_asset%203.svg" loading="lazy" alt="Menu Icon" />
            <div>
              <div className="health-text">Come to Tisha</div>
              <p className="health-info">Min Bars, 24/7 Security and More</p>
            </div>
          </div>
        </div>
        <div className="open-menu-data">
          <div className="om-title">ABOUT</div>
          <a href="#about" className="voy-links w-inline-block">
            <div>About Us</div>
            <img src="https://cdn.prod.website-files.com/69c4d31e44bb0ae4ccbe80dc/69cca85955311a5774399b0e_asset%204.svg" loading="lazy" alt="Arrow" />
          </a>
          <a href="#amenities" className="voy-links w-inline-block">
            <div>Amenities</div>
            <img src="https://cdn.prod.website-files.com/69c4d31e44bb0ae4ccbe80dc/69cca85955311a5774399b0e_asset%204.svg" loading="lazy" alt="Arrow" />
          </a>
        </div>
        <div className="open-menu-data">
          <div className="om-title">Contact</div>
          <a href="tel:+233241703838" className="voy-links w-inline-block">
            <div>Call Us</div>
            <img src="https://cdn.prod.website-files.com/69c4d31e44bb0ae4ccbe80dc/69cca85955311a5774399b0e_asset%204.svg" loading="lazy" alt="Arrow" />
          </a>
        </div>
      </div>
    </section>
  )
}
