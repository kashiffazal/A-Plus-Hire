import { useNavigate } from "react-router-dom";
import ScreenLoader from '../../../../../../mutualComponents/screen-loader';
const UserCountWidget = (pr) => {
  const navigate = useNavigate();
  return (
    <ScreenLoader active={pr.loading} inline={true} tip={<span className="!text-[12px]">Loading, Please wait...</span>}>
      <div className="portal-container !px-[30px] !overflow-hidden">
        <div className="flex items-center justify-between">
          <h3 className="md:text-xl lg:text-base xl:text-xl font-semibold">{pr.title}</h3>
          <button className="btn-to-link-color lg:text-[12px] xl:text-[16px]" type="button" onClick={() => navigate(pr.link)}>View List</button>
        </div>
        <div className="relative">
          <div className='h-2 !my-4'>
            <div className="border-divider-right "></div>
          </div>
          {pr.dataObj && pr.dataObj.map((item, i) => {
            return (
              <div key={i} className={`
              flex items-center justify-between
              ${item.total ?
                  'font-semibold border-t border-solid border-[var(--colorPrimary)] mt-[14px] mx-[-30px] pt-[14px] px-[30px]' :
                  ''}
               `}>
                <span>{item.label}:</span>
                <span className='font-medium'>{item.count}</span>
              </div>)
          })}
          {/* xl:bottom-[-65px] xl:right-[-120px] xl:pt-[10px] xl:w-[250px] xl:h-[126px]
               */}
          <div className="
              bottom-[-96px] right-[-96px] pt-[4px] w-[105px] h-[115px]
              rotate-[-42deg]  
              absolute text-center bg-[var(--colorPrimary)] text-white">
            <i className={`${pr.icon} rotate-[42deg] text-[20px]`} />
          </div>
        </div>
      </div>
    </ScreenLoader>
  )//End return
}//End function

export default UserCountWidget;