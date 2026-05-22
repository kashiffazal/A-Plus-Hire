import { NavLink } from 'react-router-dom';
const DifferentModal = (pr) => {
  const someLinks = [
    { label: 'Registration as', icon: 'las la-user-plus', link: '', regType: 'sw' },
    { label: 'Search For', icon: 'las la-search-location', link: 'search' }
  ];
  return (
    <div className={pr.outletContext.sectionPadding}>
      <div className={`${pr.outletContext.containerWidth} grid grid-cols-1 md:grid-cols-12 ${pr.outletContext.gridGap} items-center`}>
        <div className="md:col-span-6">
          <h2 className={`${pr.context.h2} text-center md:text-left mb-3`}>Some of Our Support Workers</h2>
          {pr.dividerBorder}
          <p className="text-center md:text-left mb-3">There are no contractors here. All of our support workers are employed by A-Plus hire and backed by a range of resources to ensure you receive the best support possible.</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {someLinks.map((item, i) => {
              return (
                <button key={i} type="button" onClick={() => !item.link ? pr.outletContext.redirectToRegistrationByPackage(item.regType) : {}} className="btn-to-link text-left">
                  <NavLink key={i} to={item.link} className="
                    block border border-solid border-[var(--borderColor)] bg-[var(--bgPrimary)] py-4 px-4 rounded
                    transition hover:border-[var(--colorPrimary)] hover:bg-[var(--bgColor)] hover:drop-shadow">
                    <div className="text-center">
                      <i className={`${item.icon} text-4xl`} />
                      <div className="text-sm">
                        {item.label}<br />
                        Support Worker
                      </div>
                    </div>
                  </NavLink>
                </button>)
            })}
          </div>

        </div>
        <div className="md:col-span-6">
          <img src={`${process.env.PUBLIC_URL}/images/hero-main-section-mask-3-2.jpg`} alt="" className="hero-img-mask-3 w-auto" />
        </div>
      </div>
    </div>
  )
}

export default DifferentModal