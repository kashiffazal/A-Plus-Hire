import { NavLink } from 'react-router-dom';

const HeroSection = (pr) => {
  const heroBox = [
    { icon: 'las la-search-location', label: 'I\'m looking for support', subLabel: 'Searching', link: 'search' },
    { icon: 'las la-handshake', label: 'I want to provide support', subLabel: 'Support Worker', link: '',  regType : 'sw'},
    { icon: 'las la-city', label: 'I\'m a disability services provider', subLabel: 'NDIS Provider', link: '', regType : 'ndis' },
    { icon: 'las la-user-nurse', label: 'Find a support worker for yourself', subLabel: 'Self-Managed Participants', link: '', regType : 'sm' },
  ];


  return (
    <div className={pr.outletContext.sectionPadding}>
      <div className={`${pr.outletContext.containerWidth} grid grid-cols-1 lg:grid-cols-12 ${pr.outletContext.gridGap} items-center`}>
        <div className="lg:col-span-6">
          <h2 className={`${pr.context.h2} text-center lg:text-left mb-3`}>We provide competent NDIS support personnel with the necessary NDIS certifications or qualifications</h2>
          {pr.dividerBorder}
          <p className="text-center lg:text-left mb-3">A-Plus Hire is working towards becoming the largest NDIS-registered online platform where you can come and find qualified NDIS staff anytime.</p>
          <p className="text-center lg:text-left mb-3">You can hire on the A-Plus platform and manage them easily.</p>
          <p className="text-center lg:text-left mb-4">Our database contains thousands of support workers, cleaners, nurses, etc., who can work anytime and have all the qualifications to qualify for the disability position in any NDIS provider company in Australia.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {heroBox.map((item, i) => {
              return (
                <button key={i} type="button" onClick={() => !item.link ? pr.outletContext.redirectToRegistrationByPackage(item.regType) : {}} className="btn-to-link text-left">
                  <NavLink to={item.link}>
                    <div className="
                     flex items-center justify-between border border-solid border-[var(--borderColor)] py-3 px-3 rounded
                    transition hover:border-[var(--colorPrimary)] hover:bg-[var(--bgColor)] hover:drop-shadow">
                      <div className="flex items-center">
                        <div className="mr-2"><i className={`${item.icon} text-3xl `} /></div>
                        <div>
                          <div className="text-sm tracking-tighter">{item.label}</div>
                          <div className="text-sm">({item.subLabel})</div>
                        </div>
                      </div>
                      <div><i className="las la-angle-double-right" /></div>
                    </div>
                  </NavLink>
                </button>
              )
            })}
          </div>
        </div>
        <div className="lg:col-span-6 relative w-full sm:w-9/12 lg:w-full mx-auto">
          <div className="-mr-108">
            <img src={`${process.env.PUBLIC_URL}/images/hero-main-section-mask.jpg`} alt="" className="hero-img-mask-2 w-auto" />
            <div className="h-full bg-[var(--colorPrimary)] hero-img-mask-square-2 -mr-108"></div>
          </div>
        </div>
      </div>
    </div>
  )//End return
}//End function

export default HeroSection