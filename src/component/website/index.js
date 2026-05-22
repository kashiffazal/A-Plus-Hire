import { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { HTTP, SetAppCookie, UpdateAppCookie } from '../services';
import ScrollToTop from '../scroll-to-tol-helper';
import Header from './mutual/header';
import Footer from './mutual/footer';
import PackageModal from './pages/pricing/partial/package-modal';
import './styles.css';


const MainWebsite = () => {
  const navigate = useNavigate();
  const [isPackageDefaultLoader, setIsPackageDefaultLoader] = useState(false)
  const [defaultPackage, setDefaultPackage] = useState({});
  const [openPackageModal, setOpenPackageModal] = useState(false);

  useEffect(() => {
    //@ Getting default package on load
    setIsPackageDefaultLoader(true);
    HTTP('get', '/packageDefault/').then(res => {
      setIsPackageDefaultLoader(false);
      if (!res) { return false; }
      // console.log(res);
      let data = res.data;
      //@ Default is monthly then set monthly as main price
      data.main_price = data.monthly_sale_price ? data.monthly_sale_price : data.monthly_price;
      data.package_monthly = true;
      setDefaultPackage(data);
    });
  }, []);


  // useEffect(() => {
  //   var Tawk_API = Tawk_API || {};
  //   var Tawk_LoadStart = new Date();
  //   (function () {
  //     var s1 = document.createElement("script");
  //     var s0 = document.getElementsByTagName("script")[0];
  //     s1.async = true;
  //     s1.src = 'https://embed.tawk.to/652f9515a84dd54dc4827943/1hd0tsnb8';
  //     s1.charset = 'UTF-8';
  //     s1.setAttribute('crossorigin', '*');
  //     s0.parentNode.insertBefore(s1, s0);
  //   })();
  // }, []);

  const RedirectToRegistrationByPackage = (regType = false) => {
    SetAppCookie({ regType });
    //@ If package default id is set then redirect to registration without asking about package/plan
    if (defaultPackage.id) {
      UpdateAppCookie({ package: defaultPackage });
      navigate('registration');
    } else {
      //@ If package default id is not set then ask for package/plan
      // alert('Show Packages');
      setOpenPackageModal(true);
    }//End if condition
  }//End function

  const containerWidth = "container lg:!max-w-6xl mx-auto px-4"; /* max-width: 72rem;  1152px; */
  const sectionPadding = 'py-14';
  const gridGap = 'gap-5';
  return (
    <>
      <ScrollToTop />
      <Header containerWidth={containerWidth} redirectToRegistrationByPackage={RedirectToRegistrationByPackage} />
      <Outlet context={[{ containerWidth, sectionPadding, gridGap, redirectToRegistrationByPackage: RedirectToRegistrationByPackage }]} />
      <Footer containerWidth={containerWidth} />
      <PackageModal open={openPackageModal} onClose={() => setOpenPackageModal(false)} allowClose={true} />
    </>
  )//End return
}//End website

export default MainWebsite