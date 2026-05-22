import { Button } from "antd";
import { NavLink } from "react-router-dom";

const PlanCount2 = (pr) => {
  let packageList = pr.packageList ? pr.packageList : [];
  // console.log(item);

  let contentMain =
    <div className="text-center lg:text-left">
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold">{pr.content.heading}</h2>
      <div className="border-divider-right !my-4 mx-auto lg:mx-[unset]"></div>
      <p>{pr.content.para}</p>
    </div>;
  let contentLabel =
    <div className="p-5 bg-[var(--bgColor)] rounded-lg text-sm w-full text-center lg:text-left mt-3">
      *If you have any query regarding the packages, feel free to <NavLink to='/contact' className='btn-to-link-color'>contact us</NavLink>.
    </div>;

  return (
    <div>
      <div className="block lg:hidden">
        {contentMain}
        {contentLabel}
      </div>
      <div className="text-center lg:text-right">{pr.monthlyYearlySwitch}</div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-2 lg:gap-10">
        <div className="lg:col-span-4 hidden lg:flex flex-wrap content-between">
          {contentMain}
          {contentLabel}
        </div>
        <div className="lg:col-span-8">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">

            {packageList.map((item) => {
              item = pr.setRelevantVariable(item);
              var popularClass = item.is_default ? 'lg:my-[-10px] !border-[#f37203] flex' : '';
              return (
                <div key={item.id} className={`rounded-l-lg rounded-r-lg relative shadow-lg border-2 border-solid border-gray-200 overflow-hidden mb-2 md:mb-0 ${popularClass}`}>
                  <div className="flex flex-wrap content-center">
                    <div className="p-4 sm:p-8 rounded-l-lg w-full">

                      <div className="flex items-center justify-between mt-[-7px]">
                        <h2 className="text-2xl font-bold">{item.name}</h2>
                        {item.sale_price &&
                          <div className="flex items-center">
                            <span className="line-through mr-2 text-gray-500">{item.currency}{item.regular_price}</span>
                            <span className="bg-[#afff88] text-xs font-medium text-[#488828] rounded-full py-1 px-2">SAVE {item.ratio}%</span>
                          </div>
                        }
                      </div>
                      {/* <div className="border-divider-right !my-4"></div> */}

                      <div className="flex items-center justify-between">
                        <div className="text-5xl font-extrabold leading-[46px] my-4">
                          <span className="font-semibold text-4xl relative bottom-1">{item.currency}</span>
                          <span>{item.sale_price ? item.sale_price : item.regular_price}</span>
                          {/* <span className="text-xl font-normal relative bottom-1">{pr.yearlyPrice ? '/year' : '/mo'}</span> */}
                        </div>
                        {item.is_default && <div className="absolute right-0 bg-[#f37203] text-white text-[14px] font-semibold py-[5px] px-[15px] rounded-l-lg shadow-[0px_8px_7px_#d1d1d1] mb-[10px]">POPULAR</div>}
                      </div>


                      <p className="text-base md:text-lg mb-5">{item.desc}</p>

                      <Button onClick={() => pr.redirectToRegPage(item)} type="primary" size="large" className="mb-6 btn-shadow w-full">
                        {pr.buttonLabel}
                        {/* {item.is_trial && 'with ' + item.trial_duration + ' Days Trial'} */}
                      </Button>
                      <div className="font-bold mb-3">What's Included:</div>

                      {Object.keys(item.list.icon).map((it, i) => (
                        <div className="flex pt-2" key={i}>
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
              )//End map return
            })}

          </div>
        </div>
      </div>
    </div>
  )//End return
}//End function

export default PlanCount2;