
const PageTitle = (pr) => {
  return (
    <div className='md:flex items-center justify-between mb-5'>
      <div className='flex items-center'>
        <div className='hidden md:flex items-center justify-center text-[var(--colorPrimary)] bg-white  border border-solid border-[var(--colorPrimary)] rounded-full mr-3
          text-[26px] w-[45px] h-[45px]
          lg:text-[30px] lg:w-[50px] lg:h-[50px]
          '>
          <i className={pr.icon} />
        </div>
        <div className='w-full md:w-auto text-2xl font-bold text-center md:text-left'>
          <div className="leading-5 lg:leading-7">{pr.title} <span className='font-normal'>{pr.titleSpan}</span></div>
          <div className='leading-5 lg:leading-7 text-[14px] font-normal pt-1 lg:pt-0 lg:text-base '>{pr.desc}</div>
        </div>
      </div>
      <div className="w-full md:w-auto pt-1 md:pt-0">
        {pr.render}
      </div>
    </div>
  )//End return
}//End function

export default PageTitle