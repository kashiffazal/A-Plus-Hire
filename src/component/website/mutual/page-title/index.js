import './styles.css';
const PageTitle = (pr) => {
  return (
    <div className='page-title-container'>
      <div className={`${pr.outletContext.sectionPadding} bg-gradient-to-r from-[var(--colorPrimary)] from-20% to-[var(--colorPrimaryTransparent)] to-100%`}>
        <div className={pr.outletContext.containerWidth}>
          <div className="text-center md:text-left text-white drop-shadow">
            <h2 className={`${pr.context.data.h2} mb-4`}>{pr.title}</h2>
            {/* <div className="border-b-2 border-solid w-[50px] mx-auto md:float-left"></div> */}
            <div className="border-divider-left !border-white before:!text-white before:!bg-white mx-auto md:float-left !left-[13px] md:!left-[27px]"></div>
            <p className="pt-4 text-lg">{pr.sub_title ? pr.sub_title : 'Some Content Here'}</p>
          </div>
        </div>
      </div>
    </div>
  )//End return
}//End function

export default PageTitle;