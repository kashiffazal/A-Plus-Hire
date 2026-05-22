import { Button } from "antd";
import { NavLink } from "react-router-dom";

const PlanCount1 = (pr) => {
  let item = (pr.packageList && pr.packageList.id) ? pr.packageList : {};
  item = pr.setRelevantVariable(item);
  return (
    <div>

      <div className="text-center lg:w-7/12 mx-auto">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold">{pr.content.heading}</h2>
        <div className="border-divider-left-right !my-4 mx-auto !left-0"></div>
        <p>{pr.content.para}</p>
      </div>

      <div className="text-center mb-1">
        {pr.monthlyYearlySwitch}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-7 rounded-l-lg rounded-r-lg relative shadow-lg border border-solid border-gray-200">
        <div className="lg:col-span-5 p-4 sm:p-8 rounded-l-lg flex items-center">

          <div className="w-full">
            <h2 className="text-2xl md:text-4xl font-bold mt-[-7px]">{item.name}</h2>
            <div className="border-divider-right !my-4"></div>
            <p className="text-base md:text-lg mb-3 mt-1">{item.desc}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {Object.keys(item.list.icon).map((it, i) => (
                <div className="flex" key={i}>
                  <div>
                    <i className={`${item.list.icon[it]} mr-2 ${(
                      item.list.icon[it] === 'las la-check' ? pr.iconClasses.checkClasses :
                        (item.list.icon[it] === 'las la-times' ? pr.iconClasses.timesClasses :
                          (item.list.icon[it] === 'las la-exclamation' ? pr.iconClasses.exclaClasses : ''
                          )))}`} />
                  </div>
                  <div className={(item.list.strike && item.list.strike[it]) ? 'line-through' : 'no-underline'}>{item.list.label[it]}</div>
                </div>
              ))}
            </div>
          </div>

        </div>
        <div className="lg:col-span-2 p-4 sm:p-8 bg-[var(--bgColor)] rounded-r-lg border-l border-solid border-gray-200 flex items-center justify-center
        relative overflow-hidden">
          <div className="w-full text-center [&>*]:mb-3">

            {item.is_default &&
              <div className="absolute z-[1px] transform -rotate-45 bg-[#f37203] shadow-[0px_8px_7px_#d1d1d1] text-center text-white font-semibold py-1 left-[-50px] top-[20px] w-[170px]">
                POPULAR
              </div>
            }
            {item.sale_price &&
              <div className="flex items-center justify-center">
                <span className="line-through mr-2 text-gray-500">{item.currency}{item.regular_price}</span>
                <span className="bg-[#afff88] text-xs font-medium text-[#488828] rounded-full py-1 px-2">SAVE {item.ratio}%</span>
              </div>
            }
            <div className="text-6xl font-extrabold leading-[46px]">
              <span className="font-semibold text-4xl relative bottom-1">{item.currency}</span>
              <span>{item.sale_price ? item.sale_price : item.regular_price}</span>
              {/* <span className="text-xl font-normal relative bottom-1">{pr.yearlyPrice ? '/year' : '/mo'}</span> */}
            </div>

            <Button onClick={() => pr.redirectToRegPage(item)} type="primary" size="large" className="btn-shadow w-full">
              {pr.buttonLabel}
              {/* {item.is_trial && 'with ' + item.trial_duration + ' Days Trial'} */}
            </Button>
            <p className="text-sm !mb-0">*If you have any query regarding the packages, feel free to <NavLink to='/contact' className='btn-to-link-color'>contact us</NavLink>.</p>


          </div>
        </div>
      </div>
    </div>
  )//End return
}//End function

export default PlanCount1;