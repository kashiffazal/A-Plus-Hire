import { useContext, useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom'
import { Outlet, useLocation } from "react-router-dom"
import ContextAPI from '../../../../context'
import FormType from './partial/form-type';
import InfoSection from './partial/info-section';
import Header from './partial/header';
import Footer from '../login/partial/footer';
import RegistrationForm from './registration-form';
import { Button } from 'antd';
const Registration = () => {
  const context = useContext(ContextAPI);
  const [showOutlet, setShowOutlet] = useState(false);
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);
  const [disabledBtnOnVerify, setDisabledBtnOnVerify] = useState(false)
  let pathName = useLocation().pathname;

  const IsOutletAvailable = () => {
    //@ find character from string
    if (pathName.includes('/registration/')) {
      setShowOutlet(true);
    } else {
      setShowOutlet(false);
    }//End if condition
  }//End function

  useEffect(() => { IsOutletAvailable(); })

  const columnPadding = 'py-20 px-10 sm:px-5 sm:py-10 md:px-5 md:py-5 lg:px-10 lg:py-5 xl:px-24 xl:py-5';
  const columnPaddingR = 'py-20 px-10 sm:px-5 sm:py-10 md:px-5 md:py-5 lg:px-5 lg:py-5 xl:px-6 xl:py-2';
  const RegistrationFormCom = <RegistrationForm type={showRegistrationForm} back={() => setShowRegistrationForm(false)} setDisabledBtnOnVerify={(e) => setDisabledBtnOnVerify(e)} />
  return (
    showOutlet ?
      <Outlet /> :
      <div className='md:bg-gradient-to-r from-white from-50% to-[var(--bgPrimary)] to-50%'>
        <Header />


        <div className={showRegistrationForm ? 'hidden md:block overflow-auto' : ''}>
          <div className="container mx-auto">
            <div className="flex flex-row min-h-[calc(100vh-96px)]">
              <div className={`transition-slow basis-full ${showRegistrationForm ? 'md:basis-4/12' : 'md:basis-5/12'} ${showRegistrationForm ? columnPaddingR + ' !pl-0' : columnPadding} flex items-center
                ${showRegistrationForm ? 'pointer-events-none' : ''}
              `}>
                <FormType context={context} setShowRegistrationForm={(e) => setShowRegistrationForm(e)} />
              </div>
              {showRegistrationForm ?
                <div className={`transition-slow basis-full md:basis-8/12  flex ${columnPaddingR} !pr-0 items-center bg-[var(--bgPrimary)]
                  shadow-[-420px_0px_250px_70px_rgb(0,0,0,0.5)]
                `}>
                  {RegistrationFormCom}
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


        {showRegistrationForm &&
          <div className='block md:hidden'>
            <div className='border border-solid border-[var(--colorPrimary)] px-5 py-2 flex items-center justify-between'>
              <div><img src={`${process.env.PUBLIC_URL}/images/logo-final.png`} alt="" className="w-[80px] mx-auto inline-block" /></div>
              <div className='text-[var(--colorPrimary)] font-bold text-center text-xl'>Registration</div>
              <div><Button type="primary" size='small' disabled={disabledBtnOnVerify} onClick={() => setShowRegistrationForm(false)}><i className="las la-angle-double-left" />&nbsp;Back</Button></div>
            </div>
            <div className='p-5'>
              {RegistrationFormCom}
            </div>
          </div>
        }


        <Footer context={context} />
      </div>
  )//End return
}//End function

export default Registration;