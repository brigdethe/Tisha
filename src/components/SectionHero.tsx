import { useHeroMedia } from '../hooks/useHeroMedia'

export function SectionHero(): JSX.Element {
  const { containerRef, mode } = useHeroMedia()

  return (
    <section id="top" className="hero">
      <div className="hero-inner">
        <div
          ref={containerRef}
          data-hero-media=""
          data-video-urls="https://ik.imagekit.io/fqsfbn5ad/usecase%20-%20Trim.mp4?updatedAt=1779331926698"
          data-poster-url="https://ik.imagekit.io/fqsfbn5ad/Tisha.png?updatedAt=1779330502360"
          data-autoplay="true"
          data-loop="true"
          data-wf-ignore="true"
          className={`background-video hero-media w-background-video w-background-video-atom hero-media--${mode}`}
        >
          <img
            className="hero-poster"
            src="https://ik.imagekit.io/fqsfbn5ad/Tisha.png?updatedAt=1779330502360"
            alt=""
            fetchPriority="high"
          />
          <video
            id="aa132e36-f3b9-b4bf-e193-9d4f6a09ec61-video"
            className="hero-video"
            loop
            muted
            playsInline
            preload="auto"
            data-wf-ignore="true"
            data-object-fit="cover"
          >
            <source
              src="https://ik.imagekit.io/fqsfbn5ad/usecase%20-%20Trim.mp4?updatedAt=1779331926698"
              type="video/mp4"
              data-wf-ignore="true"
            />
          </video>
        </div>
        <div className="hero-ovrely">
          <div className="hero-wrapper">
            <div className="hero-top">
              <div>Tisha Hotel</div>
              <div className="hero-tagline">Your Home Away From Home</div>
            </div>
            <div className="hero-text">Experience comfort and luxury in Asuaba</div>
            <div className="heor-button-wrap">
              <a href="#book" className="hero-button w-inline-block">
                <div>Book A Stay</div>
              </a>
              <a href="#contact" className="hero-button w-inline-block">
                <div>Contact Us</div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
