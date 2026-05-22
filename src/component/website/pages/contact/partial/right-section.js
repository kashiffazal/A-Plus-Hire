
const RightSection = (pr) => {

  const iconLabelWidth = {
    first : 'w-[75px] sm:w-[12%] md:w-[10%] lg:w-[22%]',
    second : 'w-[100%] sm:w-[88%] md:w-[90%] lg:w-[78%]',
  }
  return (
    <div className='[&>*]:mb-4'>
      <h3 className={pr.context.data.h3 + ' mt-[-7px]'}>Other ways to contact</h3>
      <div className="border-divider-left"></div>
      {/* mx-auto md:float-left */}
      <a href={'mailto:' + pr.context.data.app_data.email_support} className='block'>
        <div className='flex'>
          <div className={iconLabelWidth.first}>
            <div className='flex items-center justify-center !w-[45px] !h-[45px] border border-[var(--colorPrimary)] rounded-full mt-2'>
              <i className='las la-envelope text-2xl text-[var(--colorPrimary)]'></i>
            </div>
          </div>
          <div className={iconLabelWidth.second}>
            <strong>Email</strong><br />
            For general enquiries, email the A-Plus Hire team on:<br />
            <span className='font-semibold'>{pr.context.data.app_data.email_support}</span>
          </div>
        </div>
      </a>

      <a href='https://www.infrastructure.gov.au/media-communications-arts/phone/services-people-disability/accesshub/national-relay-service' target="blank" className='block'>
        <div className='flex'>
          <div className={iconLabelWidth.first}>
            <div className='flex items-center justify-center !w-[45px] !h-[45px] border border-[var(--colorPrimary)] rounded-full mt-2'>
              <i className='las la-deaf text-2xl text-[var(--colorPrimary)]'></i>
            </div>
          </div>
          <div className={iconLabelWidth.second}>
            <strong>National Relay Service</strong><br />
            If you are deaf and/or find it hard hearing or speaking with people who use a phone, call us via the
            <span className='font-semibold'> National Relay Service.</span>
          </div>
        </div>
      </a>

      <hr className="mt-[-2px] !mb-[11px]"/>
      <h4 className={pr.context.data.h4}>Our Social Links</h4>
      {/* <div className="border-b-4 border-solid border-[var(--colorPrimary)] w-[50px] mx-auto md:float-left"></div> */}
      <div className="border-divider-left"></div>

      <a href='https://www.facebook.com/' target="blank" className='block mt-4'>
        <div className='flex items-center'>
          <div className={iconLabelWidth.first}>
            <div className='flex items-center justify-center !w-[45px] !h-[45px] border border-[var(--colorPrimary)] rounded-full'>
              <i className='lab la-facebook-f text-2xl text-[var(--colorPrimary)]'></i>
            </div>
          </div>
          <div className={iconLabelWidth.second}>
            <strong>Facebook</strong><br />
            Follow us on our facebook page
            {/* <span className='font-semibold'> National Relay Service.</span> */}
          </div>
        </div>
      </a>

      <a href='https://www.facebook.com/' target="blank" className='block !mb-0'>
        <div className='flex items-center'>
          <div className={iconLabelWidth.first}>
            <div className='flex items-center justify-center !w-[45px] !h-[45px] border border-[var(--colorPrimary)] rounded-full'>
              <i className='lab la-instagram text-2xl text-[var(--colorPrimary)]'></i>
            </div>
          </div>
          <div className={iconLabelWidth.second}>
            <strong>instagram</strong><br />
            Follow us on Instagram
            {/* <span className='font-semibold'> National Relay Service.</span> */}
          </div>
        </div>
      </a>

    </div>
  )//End return
}//End function

export default RightSection;