import { useContext, useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
// import { Outlet, useLocation } from "react-router-dom"
import ContextAPI from '../../../../context'
import FormType from './partial/form-type';
import InfoSection from './partial/info-section';
import Header from '../mutual/header';
import Footer from '../mutual/footer';
import RegistrationForm from './registration-form';
import { GetAppCookie, GetObjectFromArr } from '../../../services';
import { Button } from 'antd';
const Registration = () => {
  const context = useContext(ContextAPI);
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);
  const [disabledBackBtnOnVerify, setDisabledBackBtnOnVerify] = useState(false)

  const type = [
    { type: 'sw', label: 'I want to provide support', subLabel: 'Support Worker', link: 'support-worker', icon: 'las la-handshake' },
    { type: 'ndis', label: 'We\'re a disability services organization', subLabel: 'NDIS Provider', link: 'ndis-provider', icon: 'las la-city' },
    { type: 'sm', label: 'Find a qualified NDIS support worker for yourself', subLabel: 'Self-Managed Participants', link: 'self-managed-participant', icon: 'las la-search-location' }
  ];

  useEffect(() => {
    //@ Check if Registration type is in Cookie then get and open Reg Form with this type
    let appCookie = GetAppCookie();
    // console.log(appCookie);
    if (appCookie && appCookie.regType) {
      let typeData = GetObjectFromArr(appCookie.regType, 'type', type);
      setShowRegistrationForm(typeData);
      setTimeout(() => { ScrollTop(); }, 100);
    }//End if condition
    //@ Scroll to Top on Load
    ScrollTop();
  }, [])

  const ScrollTop = () => { window.scrollTo({ top: 0, behavior: 'smooth' }); }//End function

  const columnPadding = 'py-20 px-5 md:px-10 sm:px-5 sm:py-10 md:px-5 md:py-5 lg:px-10 lg:py-5 xl:px-24 xl:py-5';
  const columnPaddingR = 'py-20 px-5 md:px-10 sm:px-5 sm:py-10 md:!px-5 md:!py-5 lg:!px-5 lg:!py-5 xl:!px-6 xl:!py-2';
  const RegistrationFormCom = <RegistrationForm type={showRegistrationForm} back={() => { setShowRegistrationForm(false); ScrollTop(); }} setDisabledBackBtnOnVerify={(e) => setDisabledBackBtnOnVerify(e)} />
  return (
    // showOutlet ?
    //   <Outlet /> :
    <div className='md:bg-gradient-to-r from-white from-50% to-[var(--bgPrimary)] to-50%'>
      <Header menuType='registration' />

      {/* hidden md:block  */}
      <div className={showRegistrationForm ? 'overflow-auto' : ''}>
        <div className={`${showRegistrationForm ? 'md:container' : 'container'} mx-auto`}>
          <div className={`flex flex-row md:min-h-[calc(100vh-96px)]`}>
            <div className={`transition-slow basis-full ${showRegistrationForm ? 'md:basis-4/12' : 'md:basis-5/12'} ${showRegistrationForm ? columnPaddingR + ' !pl-0' : columnPadding} flex items-center
                ${showRegistrationForm ? 'pointer-events-none hidden md:flex' : ''}
              `}>
              <FormType context={context} type={type} setShowRegistrationForm={(e) => { setShowRegistrationForm(e); ScrollTop(); }} />
            </div>
            {showRegistrationForm ?
              <div className={`transition-slow basis-full md:basis-8/12 flex ${columnPaddingR} !pr-0 items-center bg-[var(--bgPrimary)]
                  shadow-[-420px_0px_250px_70px_rgb(0,0,0,0.5)]
                  !p-0
                `}>

                <div className='w-full'>
                  <div className='block md:hidden bg-white'>
                    <div className='border-b border-solid border-[var(--colorPrimary)] px-5 py-2 flex items-center justify-between'>
                      <div><NavLink to='/'><img src={`${process.env.PUBLIC_URL}/images/logo-final.png`} alt="" className="w-[80px] mx-auto inline-block" /></NavLink></div>
                      <div className='text-[var(--colorPrimary)] font-bold text-center text-xl'>Registration</div>
                      <div><Button type="primary" size='small' disabled={disabledBackBtnOnVerify} onClick={() => setShowRegistrationForm(false)}><i className="las la-angle-double-left" />&nbsp;Back</Button></div>
                    </div>
                  </div>
                  <div className='p-5 bg-white md:p-0 md:bg-transparent'>
                    {RegistrationFormCom}
                  </div>
                </div>

              </div>
              :
              <div className={`transition-shadow duration-300 basis-full md:basis-7/12 hidden md:flex ${columnPadding} items-center bg-[var(--bgPrimary)]
                  ${showRegistrationForm ? 'shadow-[-420px_0px_250px_70px_rgb(0,0,0,0.5)]' : ''}
                `}>
                <InfoSection context={context} />
              </div>
            }
          </div>
        </div>
      </div>
      <Footer context={context} />
    </div>
  )//End return
}//End function

export default Registration;