const InfoSection = (pr) => {
  return (
    <div className='text-center w-full'>
      <div className='text-center md:w-4/5 md:mx-auto pb-5'>
        <h2 className={pr.context.data.h2}>Personal Protective Equipment (PPE) reminder</h2>
        <p>We encourage our support workers and clients to were masks on {pr.context.data.app_data.company_name} shifts when practical and possible.</p>
      </div>
      <div className='mx-auto relative'>
        {/* <img src={`${process.env.PUBLIC_URL}/images/hero-main-section-mask-3-3.jpg`} alt="" className="hero-img-mask-3 w-auto inline-block" /> */}

        <div className="h-full bg-[var(--colorPrimary)] hero-img-mask-square-1-1"></div>
        <img src={`${process.env.PUBLIC_URL}/images/hero-main-section-mask-2.jpg`} alt="" className="hero-img-mask-1 w-auto border-8 border-solid border-[var(--colorPrimary)] drop-shadow-lg" />
        <div className="h-full bg-[var(--colorPrimary)] hero-img-mask-square-1-2"></div>

        {/* <div className="w-9/12 mx-auto relative">
          <img src={`${process.env.PUBLIC_URL}/images/hero-main-section-mask.jpg`} alt="" className="hero-img-mask-2 w-auto relative z-[2]" />
          <div className="h-full bg-[var(--colorPrimary)] hero-img-mask-square-2 !z-[1]"></div>
        </div> */}

      </div>
    </div>
  )//End return
}//End function

export default InfoSection;