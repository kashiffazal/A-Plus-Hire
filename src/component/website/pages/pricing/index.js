import { useContext } from "react";
import { useOutletContext } from "react-router-dom";
import ContextAPI from '../../../../context';
import PageTitle from '../../mutual/page-title';
import PackageBox from './partial/package-box';

const Pricing = () => {

  const context = useContext(ContextAPI);
  const [outletContext] = useOutletContext();
  // console.log(context)


  return (
    <div>
      <PageTitle
        outletContext={outletContext}
        context={context}
        title="Our Pricing"
        sub_title="Know about us, Who we are"
      />
      <div className={`${outletContext.sectionPadding}`}>
        <div className={outletContext.containerWidth}>
          <PackageBox />
        </div>
      </div>
    </div>
  )//End return
}//End function

export default Pricing