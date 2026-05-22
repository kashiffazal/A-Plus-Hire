import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import ContextAPI from "../../../../../context";
import { RedirectOnLogin } from '../../../../services';
import Header from '../../mutual/header';
import Footer from '../../mutual/footer';
import StepList from './partial/step-list';
import MainForm from './form';
import '../styles.css';

const SupportWorkerForm = () => {
  const context = useContext(ContextAPI);
  const navigate = useNavigate();

  //@ Set State
  const [stepsCount, setStepsCount] = useState(1);
  const [subStepsCount, setSubStepsCount] = useState([1, 1]);
  const [headTitle, setHeadTitle] = useState([]);


  //@ Some Initial Variables
  const padding = 'p-3 lg:p-8';

  useEffect(() => {
    //@ If there is no Cookie then redirect to Login Screen
    if (RedirectOnLogin()) { navigate(RedirectOnLogin()); }//End if condition
    //@ If there is no list then get from server
  });

  return (
    <div className='reg-profile-form-container lg:bg-gradient-to-r from-white from-50% to-[var(--bgColor)] to-50%'>
      <Header menuType="sw-Form" showOnMobile />
      <div className="lg:container mx-auto">
        <div className={`grid grid-cols-1 ${context.data.portal_grid_gap} lg:grid-cols-12 min-h-[calc(100vh-96px)]`}>

          <div className={`hidden lg:block lg:col-span-3 ${padding} lg:pl-0`}>
            <StepList stepsCount={stepsCount} subStepsCount={subStepsCount} setHeadTitle={(data) => setHeadTitle(data)} />
          </div>
          <MainForm headTitle={headTitle} setStepsCount={(e) => setStepsCount(e)} setSubStepsCount={(e) => setSubStepsCount(e)}/>

        </div>
      </div>
      <Footer context={context} />
    </div>
  )//End return 
}//End function

export default SupportWorkerForm;