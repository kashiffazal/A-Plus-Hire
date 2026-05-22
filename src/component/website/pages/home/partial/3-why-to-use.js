import { Button } from 'antd';
// import { NavLink } from 'react-router-dom';

const WhyToUse = (pr) => {
  const cardBox = [{
    image: 'home-t-1.jpg',
    heading: 'Hiring a qualified support worker (For NDIS Provider Business)',
    content: 'You can hire as many qualified support workers for your disability provider business.',
    // link: 'app/ndis-provider',
    linkLabel: 'NDIS Provider',
    icon: 'las la-angle-double-right',
    regType: 'ndis'
  }, {
    image: 'home-t-2.jpg',
    heading: 'Free job alerts from various NDIS providers (For Disability Support Staff)',
    content: 'Make a free account in just a few minutes and get thousands of free job alerts.',
    // link: 'app/support-worker',
    linkLabel: 'Support Worker',
    icon: 'las la-angle-double-right',
    regType: 'sw'
  }, {
    image: 'home-t-3.jpg',
    heading: 'Find a qualified NDIS support worker for yourself (For Self-Managed Participants)',
    content: 'You can make your account on A-Plus and search for qualified disability support staff.',
    // link: 'app/self-managed-participant',
    linkLabel: 'Self Manage Participant',
    icon: 'las la-angle-double-right',
    regType: 'sm'
  }];
  return (
    <div className={pr.outletContext.sectionPadding}>
      <div className={pr.outletContext.containerWidth}>
        <div className="text-center md:w-10/12 mx-auto mb-8">
          <h2 className={`${pr.context.h2} mb-3`}>You can use A-Plus hire for the following</h2>
          <div className="border-divider-left-right !my-4 mx-auto !left-0"></div>
          <p>A Plus Hire's objective is to connect the experienced and skilled NDIS support staff and the NDIS participants looking for daily/weekly/fortnightly, or monthly support.</p>
        </div>
        <div className={`grid grid-cols-1 lg:grid-cols-3 items-center ${pr.outletContext.gridGap}`}>
          {cardBox.map((item, i) => {
            return (
              <div key={i}>
                <img className="hero-img-mask-4 w-96 lg:w-full mx-auto" src={`${process.env.PUBLIC_URL}/images/${item.image}`} alt="" />
                <div className="lg:p-5 text-center">
                  <h5 className="mb-3 text-[17px]/[24px] font-bold tracking-tight">{item.heading}</h5>
                  <p className="mb-4 font-normal">{item.content}</p>
                  <Button size="large" type="primary" onClick={() => pr.outletContext.redirectToRegistrationByPackage(item.regType)} className="w-full hover:shadow-lg [&>*]:text-sm">
                    <span className='leading-1'>Registration As {item.linkLabel}</span>
                    {/* &nbsp;<i className={`${item.icon} relative top-px`} /> */}
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  )
}

export default WhyToUse