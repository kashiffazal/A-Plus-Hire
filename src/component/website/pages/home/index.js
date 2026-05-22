import { useContext } from "react";
import ContextAPI from "../../../../context";
import { useOutletContext } from "react-router-dom";
import HeroSection from './partial/1-hero-section';
import Search from './partial/1-1-search';
import AboutSection from "./partial/2-about-section";
import WhyToUse from './partial/3-why-to-use';
import AvailableSupports from './partial/4-available-supports';
import DifferentModal from './partial/5-different-modal';

const Home = (pr) => {
  const context = useContext(ContextAPI).data;
  const [outletContext] = useOutletContext();
  // const containerWidth = data.containerWidth;
  // const sectionPadding = data.sectionPadding;
  // console.log(data);
  const dividerBorder =
    <div className='h-2 !my-4'>
      <div className="border-divider-right mx-auto !left-[-13px] lg:float-left lg:!left-[0px]"></div>
    </div>;
  return (
    <div className="web-pages-container">
      <HeroSection outletContext={outletContext} context={context} dividerBorder={dividerBorder} />
      <Search outletContext={outletContext} context={context} />
      <AboutSection outletContext={outletContext} context={context} dividerBorder={dividerBorder} />
      <WhyToUse outletContext={outletContext} context={context} />
      <AvailableSupports outletContext={outletContext} context={context} />
      <DifferentModal outletContext={outletContext} context={context} dividerBorder={dividerBorder} />
    </div>
  )//End return
}//End function

export default Home;