import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { Empty } from "antd";
import { HTTP, UpdateAppCookie } from '../../../../services';
import PlanCount1 from './plan-count-1';
import PlanCount2 from './plan-count-2';
import PlanCount3 from './plan-count-3';
import PlanCount4 from './plan-count-4';
import PlanCount5 from './plan-count-5';
import ScreenLoader from '../../../../mutualComponents/screen-loader';


const PackageBox = (pr) => {
  const navigate = useNavigate();

  const [getLoader, setGetLoader] = useState(false)
  const [packageList, setPackageList] = useState(false)
  const [yearlyPrice, setYearlyPrice] = useState(false);

  const GetData = () => {
    setGetLoader(true);
    HTTP('get', '/getPackageListForWeb/' + (pr.portal ? 'true' : '')).then(res => {
      setGetLoader(false);
      if (!res) { return false; }
      // console.log(res);
      setPackageList(res.data);
    });
  }//End function

  const SetRelevantVariable = (item) => {
    // item.regular_price = yearlyPrice ? item.yearly_price : item.monthly_price;
    // item.sale_price = yearlyPrice ? item.yearly_sale_price : item.monthly_sale_price;
    // item.main_price = item.sale_price ? item.sale_price : item.regular_price;
    // //@ Getting Ratio ====================//
    // let ratio = (100 - ((item.sale_price / item.regular_price) * 100));
    // item.ratio = Math.round(ratio);
    // //@ ==================================//
    item.main_price = item.sale_price ? item.sale_price : item.regular_price;
    if (item.is_free_plan) {
      item.sale_price = null;
      item.regular_price = 0;
    }//End if condition
    return item;
  }//End function

  const redirectToRegPage = (packageData) => {
    if (pr.portal) {
      pr.takePlan(packageData);
    } else {
      // packageData.package_monthly = !yearlyPrice; // true means monthly, and this variable is for yearly price - That's way inverse
      UpdateAppCookie({ package: packageData });
      pr.closeModal && pr.closeModal()
      //@ Delay to see modal closing animation
      setTimeout(() => { navigate('/registration'); }, 300);
    }
  }//End if condition
  const buttonLabel = pr.portal ? 'Buy Now' : 'Get Started';


  useEffect(() => { GetData(); }, []);

  const monthlyYearlySwitch = <div className="mx-2 my-5">
    {/* Monthly <Switch onChange={() => setYearlyPrice(!yearlyPrice)} /> Yearly */}
  </div>;

  const content = {
    heading: 'Affordable pricing plans. Choose a plan that suits you.',
    para: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'
  }//End object

  const iconClasses = {};
  iconClasses.iconClass = 'rounded-full p-[4px] text-white text-[11px] relative top-[-2px]';
  iconClasses.checkClasses = iconClasses.iconClass + ' bg-[#34b000]';
  iconClasses.timesClasses = iconClasses.iconClass + ' bg-[red]';
  iconClasses.exclaClasses = iconClasses.iconClass + ' bg-[#ff9b44]';
  return (
    <div>
      <ScreenLoader active={getLoader}>
        {getLoader && <div className="h-[200px]"></div>}
        {packageList &&
          packageList.length > 0 ?
          <>
            {packageList.length === 1 && <PlanCount1 packageList={packageList[0]} yearlyPrice={yearlyPrice} iconClasses={iconClasses} setRelevantVariable={SetRelevantVariable} monthlyYearlySwitch={monthlyYearlySwitch} content={content} redirectToRegPage={redirectToRegPage} buttonLabel={buttonLabel} />}
            {packageList.length === 2 && <PlanCount2 packageList={packageList} yearlyPrice={yearlyPrice} iconClasses={iconClasses} setRelevantVariable={SetRelevantVariable} monthlyYearlySwitch={monthlyYearlySwitch} content={content} redirectToRegPage={redirectToRegPage} buttonLabel={buttonLabel} />}
            {packageList.length === 3 && <PlanCount3 packageList={packageList} yearlyPrice={yearlyPrice} iconClasses={iconClasses} setRelevantVariable={SetRelevantVariable} monthlyYearlySwitch={monthlyYearlySwitch} content={content} redirectToRegPage={redirectToRegPage} buttonLabel={buttonLabel} />}
            {packageList.length === 4 && <PlanCount4 packageList={packageList} yearlyPrice={yearlyPrice} iconClasses={iconClasses} setRelevantVariable={SetRelevantVariable} monthlyYearlySwitch={monthlyYearlySwitch} content={content} redirectToRegPage={redirectToRegPage} buttonLabel={buttonLabel} />}
            {packageList.length === 5 && <PlanCount5 packageList={packageList} yearlyPrice={yearlyPrice} iconClasses={iconClasses} setRelevantVariable={SetRelevantVariable} monthlyYearlySwitch={monthlyYearlySwitch} content={content} redirectToRegPage={redirectToRegPage} buttonLabel={buttonLabel} />}
            {packageList.length >= 6 && <PlanCount3 packageList={packageList} yearlyPrice={yearlyPrice} iconClasses={iconClasses} setRelevantVariable={SetRelevantVariable} monthlyYearlySwitch={monthlyYearlySwitch} content={content} redirectToRegPage={redirectToRegPage} buttonLabel={buttonLabel} />}
          </>
          :
          <div className="h-[300px] flex items-center justify-center border-2 border-dashed border-[var(--colorPrimary)] rounded-lg">
            <Empty description={<span className="text-xl">Pricing is not available yet!<br /> <span className="text-base">Please visit some time later</span></span>} />
          </div>
        }
      </ScreenLoader>
    </div>
  )//End return
}//End function

export default PackageBox