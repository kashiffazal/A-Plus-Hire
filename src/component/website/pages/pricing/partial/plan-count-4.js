import { Button } from "antd";

const PlanCount4 = (pr) => {
  let packageList = pr.packageList ? pr.packageList : [];
  // console.log(item);
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-0 rounded-l-lg rounded-r-lg 
      lg:border-2 lg:border-solid lg:border-gray-200 lg:shadow-lg
      [&>*]:lg:border-r-2 [&>*]:lg:border-solid [&>*]:lg:border-gray-200 [&>*:last-child]:lg:border-r-0
      ">

        {packageList.map((item) => {
          item = pr.setRelevantVariable(item);
          var popularClass = item.is_default ? 'lg:my-[-10px] !border-2 !border-[#f37203] !rounded-lg bg-white flex' : '';
          {/* var popularClass = ''; */ }
          return (
            <div key={item.id} className={`
            border-2 border-solid border-gray-200 rounded-lg shadow-lg lg:border-0 lg:rounded-none lg:shadow-none
            relative  flex flex-wrap content-center ${popularClass}`}>
              <div className="p-4 sm:p-5 rounded-l-lg w-full">

                <div className="flex items-center justify-between mt-[-7px]">
                  <h2 className="text-lg font-bold">{item.name}</h2>
                  {item.sale_price &&
                    <div className="flex items-center">
                      <span className="line-through mr-2 text-gray-500 text-[12px]">{item.currency}{item.regular_price}</span>
                      <span className="bg-[#afff88] text-[11px] font-medium text-[#488828] rounded-full py-1 px-2">SAVE {item.ratio}%</span>
                    </div>
                  }
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-4xl font-extrabold leading-[46px] my-4">
                    <span className="font-semibold text-2xl relative bottom-1">{item.currency}</span>
                    <span>{item.sale_price ? item.sale_price : item.regular_price}</span>
                    {/* <span className="text-lg font-normal relative bottom-1">{pr.yearlyPrice ? '/year' : '/mo'}</span> */}
                  </div>
                  {item.is_default && <div className="absolute right-0 bg-[#f37203] text-white text-[12px] font-semibold py-[5px] px-[15px] rounded-l-lg shadow-[0px_8px_7px_#d1d1d1] mb-[10px]">POPULAR</div>}
                </div>

                <p className="text-base mb-5">{item.desc}</p>

                <Button onClick={() => pr.redirectToRegPage(item)} type="primary" size="large" className="mb-6 btn-shadow w-full text-base lg:!text-sm">
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
                    <div className={`${(item.list.strike && item.list.strike[it]) ? 'line-through' : 'no-underline'} text-base lg:text-sm lg:pt-[1px]`}>{item.list.label[it]}</div>
                  </div>
                ))}

              </div>
            </div>
          )//End map return
        })}
      </div>
    </div>
  )//End return
}//End function

export default PlanCount4;