import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import ContextAPI from '../../context';
import ScrollToTop from '../scroll-to-tol-helper';
import { RedirectOnLogin, GetUserCookie, RandomAlphaNumber, RedirectToDashboard } from '../services';
import { Outlet } from "react-router-dom";
import HeaderApp from './mutual/header';
import FooterApp from './mutual/footer';

const MainApp = (pr) => {
  const context = useContext(ContextAPI);
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    //@ If there is no Cookie then redirect to Login Screen
    if (RedirectOnLogin()) { navigate(RedirectOnLogin()); }//End if condition
    if (!userData) {
      let userCookieData = GetUserCookie();
      setUserData(userCookieData);
      //@ Update in context to runtime effect on portal
      context.updateData({ ud: { ...context.data.ud, ...userCookieData } });
      //@ This is to update userData state in App Component because userData has condition in Route
      pr.setLoginStatus(RandomAlphaNumber());
    }//En dif condition
    
    //@ Redirect to the dashboard when /app route is accessed
    if (window.location.pathname === '/app' || window.location.pathname === '/app/') {
      navigate('/app/dashboard');
    }//End if condition
    // alert('asdf')
    // if(userCookieData.)
    //@ If user change url directly then redirect target url
    //? Targeted url could be payment and user profile form  
    //? If payment and profile are clear then don't need re redirect 
    //? Avoid redirect to Dashboard if all are OK keep user on same url
    let redirectAtTarget = RedirectToDashboard(true);
    redirectAtTarget && navigate(redirectAtTarget);
  });

  return (
    <>
      <ScrollToTop />
      <HeaderApp userData={userData ? userData : {}} />
      <div className="h-[calc(100vh-107px)] overflow-auto bg-[var(--bgColor)]">
        <div className="container mx-auto py-5 px-[10px]">
          <Outlet />
        </div>
      </div>
      <FooterApp />
    </>
  )//End return
}//End function

export default MainApp;