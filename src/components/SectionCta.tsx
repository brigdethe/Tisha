interface SectionCtaProps { onBook: () => void }

export function SectionCta({ onBook }: SectionCtaProps): JSX.Element {
  return (
    <section id="book" className="cta">
      <div className="cta-inner">
        <div className="cta-wrapper">
          <div className="cta-title">
            Come To <br />Tisha Hotel <br /> Today
          </div>
          <div>Experience comfort and luxury in Asuaba</div>
        </div>
        <a href="#" className="primary-button w-inline-block" onClick={e => { e.preventDefault(); onBook() }}>
          <div>Book Now</div>
        </a>
      </div>
    </section>
  )
}
