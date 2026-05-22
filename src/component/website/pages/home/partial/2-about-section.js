const AboutSection = (pr) => {
  return (
    <div className={`${pr.outletContext.sectionPadding} bg-[var(--bgPrimary)]`}>
      <div className={pr.outletContext.containerWidth}>
        <div className={`grid grid-cols-1 lg:grid-cols-12 items-center ${pr.outletContext.gridGap}`}>

          <div className="lg:col-span-6 relative w-full sm:w-9/12 lg:w-full mx-auto">
            <div className="h-full bg-[var(--colorPrimary)] hero-img-mask-square-1-1"></div>
            <img src={`${process.env.PUBLIC_URL}/images/hero-main-section-mask-2.jpg`} alt="" className="hero-img-mask-1 w-auto border-8 border-solid border-[var(--colorPrimary)] drop-shadow-lg" />
            <div className="h-full bg-[var(--colorPrimary)] hero-img-mask-square-1-2"></div>
          </div>

          <div className="lg:col-span-6 lg:pl-10 order-first lg:order-last">
            <h2 className={`${pr.context.h2} text-center lg:text-left mb-3`}>Who Are We?</h2>
            {pr.dividerBorder}
            <div className="text-center lg:text-left">
              <p>A Plus Hire's objective is to connect the experienced and skilled NDIS support staff and the NDIS participants looking for daily/weekly/fortnightly, or monthly support.</p>
              <p>You can search our web portal for the relevant best support worker from the list of available staff.</p>
              <p>We offer Support Workers of the highest calibre throughout Australia. We look for trustworthy employees to join our team as we provide care and support to our customers at home and in the community.</p>
              <p>Enjoy career advancement opportunities, flexible shifts that fit your schedule, and helpful and welcoming staff.</p>
            </div>
          </div>


        </div>
      </div>
    </div>
  )
}

export default AboutSection