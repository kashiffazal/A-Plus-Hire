import { NavLink } from 'react-router-dom';

const AvailableSupports = (pr) => {
  const availableServices = [
    { label: 'Assist-Personal Activities', icon: 'las la-universal-access', link: 'about' },
    { label: 'Innov Community Participation', icon: 'las la-users-cog', link: 'about' },
    { label: 'Household Tasks', icon: 'las la-home', link: 'about' },
    { label: 'Participate Community', icon: 'las la-users', link: 'about' },
    { label: 'Group/Centre Activities', icon: 'las la-user-friends', link: 'about' },
    { label: 'Support Coordination', icon: 'las la-wheelchair', link: 'about' },
    { label: 'Accommodation', icon: 'las la-dolly-flatbed', link: 'about' },
    { label: 'Interpret Translate', icon: 'las la-language', link: 'about' },
    { label: 'Gardening', icon: 'las la-seedling', link: 'about' },
    { label: 'Respite', icon: 'las la-mountain', link: 'about' },
    { label: 'Support Independent Living', icon: 'las la-campground', link: 'about' },
    { label: 'Specialist Disability', icon: 'las la-blind', link: 'about' },
  ];
  return (
    <div className={`${pr.outletContext.sectionPadding} bg-[var(--bgPrimary)]`}>
      <div className={pr.outletContext.containerWidth}>

        <div className="text-center md:w-10/12 mx-auto mb-8">
          <h2 className={`${pr.context.h2} mb-3`}>You can use A-Plus hire for the following</h2>
          <div className="border-divider-left-right !my-4 mx-auto !left-0"></div>
          <p>A Plus Hire's objective is to connect the experienced and skilled NDIS support staff and the NDIS participants looking for daily/weekly/fortnightly, or monthly support.</p>
        </div>
        <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2`}>
          {availableServices.map((item, i) => {
            return (
              <NavLink key={i} to={item.link}>
                <div className="
                  flex items-center border border-solid border-[var(--borderColor)] py-3 px-4 leading-3 text-sm bg-white rounded
                  transition hover:bg-[var(--bgColor)] hover:border-[var(--colorPrimary)] hover:shadow-lg
                ">
                  <i className={`${item.icon} text-2xl mr-3`} /><span className='leading-4'>{item.label}</span>
                </div>
              </NavLink>
            );
          })}
          <div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AvailableSupports