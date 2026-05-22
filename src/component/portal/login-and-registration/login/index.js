import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// import Cookies from 'js-cookie';
import ContextAPI from '../../../../context'
import { GetUserCookie, RedirectToDashboard } from '../../../services';
import LoginAndRegistrationForm from './partial/form';
import InfoSection from './partial/info-section';
import Header from '../mutual/header';
import Footer from '../mutual/footer';
const Login = () => {
  const context = useContext(ContextAPI);
  const navigate = useNavigate();

  useEffect(() => {
    //@ When it's already login then redirect to dashboard
    if (GetUserCookie()) { navigate(RedirectToDashboard()); }//End if condition
    window.scrollTo({ top: 0, behavior: 'smooth' });
  },[navigate]);



  const columnPadding = 'py-20 px-5 md:px-10 sm:px-5 sm:py-10 md:px-5 md:py-5 lg:px-10 lg:py-5 xl:px-24 xl:py-5';
  return (
    <div className='md:bg-gradient-to-r from-white from-50% to-[var(--bgPrimary)] to-50%'>
      <Header menuType='login' />

      <div className='overflow-auto'>
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 min-h-[calc(100vh-96px)]">
            <div className={`md:col-span-5 ${columnPadding} flex items-center`}>
              <LoginAndRegistrationForm context={context} />
            </div>
            <div className={`md:col-span-7 hidden md:flex ${columnPadding} items-center bg-[var(--bgPrimary)]`}>
              <InfoSection context={context} />
            </div>
          </div>
        </div>
      </div>

      <Footer context={context} />
    </div>
  )//End return
}//End function

export default Login;