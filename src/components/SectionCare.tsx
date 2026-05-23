export function SectionCare(): JSX.Element {
  return (
    <section className="care">
      <div className="w-layout-blockcontainer container w-container">
        <div className="care-top">
          <div className="care-title">
            Thoughtful healthcare that <br />
            <span className="care-title-text">feels personal, not clinical</span>
          </div>
        </div>
        <div
          data-delay="4000"
          data-animation="slide"
          className="care-slider w-slider"
          data-autoplay="true"
          data-easing="ease"
          data-hide-arrows="false"
          data-disable-swipe="false"
          data-autoplay-limit="0"
          data-nav-spacing="3"
          data-duration="500"
          data-infinite="true"
        >
          <div className="care-mask w-slider-mask">
            <div className="care-slide w-slide">
              <div className="care-block">
                <div className="care-wrap">
                  <div className="care-text">Treatment</div>
                  <div>Clinically proven treatments, safely prescribed</div>
                </div>
                <img src="https://cdn.prod.website-files.com/69c4d31e44bb0ae4ccbe80dc/69cca86275cc2d4060860cfa_asset%2047.avif" loading="lazy" alt="Care Image" />
              </div>
              <div className="care-info">Access science-backed treatments and custom formulations, proven to work based on research.</div>
            </div>
            <div className="care-slide w-slide">
              <div className="care-block _02">
                <div className="care-wrap">
                  <div className="care-text">Treatment</div>
                  <div>Clinically proven treatments, safely prescribed</div>
                </div>
                <img src="https://cdn.prod.website-files.com/69c4d31e44bb0ae4ccbe80dc/69cca862898a16f13542d799_asset%2048.avif" loading="lazy" alt="Care Image" />
              </div>
              <div className="care-info">Get human support via our app, phone or email, tailored to your needs.</div>
            </div>
            <div className="care-slide w-slide">
              <div className="care-block _03">
                <div className="care-wrap">
                  <div className="care-text">Treatment</div>
                  <div>Clinically proven treatments, safely prescribed</div>
                </div>
                <img
                  src="https://cdn.prod.website-files.com/69c4d31e44bb0ae4ccbe80dc/69cca8627790a183553f8456_asset%2049.jpeg"
                  loading="lazy"
                  sizes="100vw"
                  srcSet="https://cdn.prod.website-files.com/69c4d31e44bb0ae4ccbe80dc/69cca8627790a183553f8456_asset%2049-p-500.jpeg 500w, https://cdn.prod.website-files.com/69c4d31e44bb0ae4ccbe80dc/69cca8627790a183553f8456_asset%2049.jpeg 788w"
                  alt="Care Image"
                />
              </div>
              <div className="care-info">Track your progress and chat to your team with an app that keeps your journey moving in the right direction.</div>
            </div>
            <div className="care-slide w-slide">
              <div className="care-block _04">
                <div className="care-wrap">
                  <div className="care-text">Treatment</div>
                  <div>Clinically proven treatments, safely prescribed</div>
                </div>
                <img src="https://cdn.prod.website-files.com/69c4d31e44bb0ae4ccbe80dc/69cca8625710adfc97020076_asset%2050.avif" loading="lazy" alt="Care Image" />
              </div>
              <div className="care-info">Get instant help from your dedicated team, day or night. Message AI-powered Joy for answers, fast.</div>
            </div>
            <div className="care-slide w-slide">
              <div className="care-block _05">
                <div className="care-wrap">
                  <div className="care-text">Treatment</div>
                  <div>Clinically proven treatments, safely prescribed</div>
                </div>
                <img src="https://cdn.prod.website-files.com/69c4d31e44bb0ae4ccbe80dc/69cca867ee371855a578e099_asset%2051.avif" loading="lazy" alt="Care Image" />
              </div>
              <div className="care-info">Access a set of at-home and in-clinic blood tests to understand your health and take action.</div>
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
