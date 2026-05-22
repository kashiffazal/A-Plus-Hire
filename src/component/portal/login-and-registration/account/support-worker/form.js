import { useContext, useState, useEffect, useRef } from "react";
import { Button, Form, message } from 'antd';
import ContextAPI from "../../../../../context";
import { HTTP, setFormStateValues, SetUserCookie, GetUserCookie, RandomAlphaNumber } from '../../../../services';
import FormHeading from "../mutual/form-heading";
import ScreenLoader from "../../../../mutualComponents/screen-loader";
import StepList from './partial/step-list';
//@ Importing Steps
import STEP_1_1 from './steps/1_1';
import STEP_1_2 from './steps/1_2';
import STEP_1_3 from './steps/1_3';
import STEP_1_4 from './steps/1_4';
import STEP_2_1 from './steps/2_1';
import STEP_2_2 from './steps/2_2';
import STEP_2_3 from './steps/2_3';
import STEP_2_4 from './steps/2_4';
import STEP_2_5 from './steps/2_5';
import STEP_2_6 from './steps/2_6';
import STEP_3 from './steps/3';
import Success from "../mutual/success-msg";
import '../styles.css';

const SupportWorkerForm = (pr) => {
  const context = useContext(ContextAPI);

  //@ Set State
  const [userImgOld, setUserImgOld] = useState('');
  const [userImgNew, setUserImgNew] = useState(false);
  const [getLoader, setGetLoader] = useState(true);
  const [listData, setListData] = useState(null);
  const [stepsCount, setStepsCount] = useState(1);
  const [subStepsCount, setSubStepsCount] = useState([1, 1]);
  const [stepCountForMobile, setStepCountForMobile] = useState(1)
  const [formValues, setFormValues] = useState({});
  const [progressStatus, setProgressStatus] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);
  const [loader, setLoader] = useState(false)
  const [cookieState, setCookieState] = useState(GetUserCookie())
  const [headTitle, setHeadTitle] = useState('');
  const [formDataLoaded, setFormDataLoaded] = useState(false);

  const formRef = useRef(null);


  //@ Some Initial Variables
  const maxStepCount = 3;
  const totalStep = 11;
  const progressPerSection = Math.round(100 / totalStep);//Divided by total steps
  const fp = formRef.current;
  // console.log(fp);
  const padding = pr.withinModal ? '' : 'p-3 lg:p-8';

  //@ Functions
  const NextStep = () => {
    if (stepsCount < (maxStepCount + 1)) {
      let nextStep = (stepsCount + 1);
      if (stepsCount === 1) {
        NextSubStep(0, 4, nextStep)
      } else if (stepsCount === 2) {
        NextSubStep(1, 6, nextStep)
      } else {
        setStepsCount(nextStep);
        pr.setStepsCount && pr.setStepsCount(nextStep)
      }//End if condition
      setProgressStatus(progressStatus + progressPerSection);
      setStepCountForMobile(stepCountForMobile + 1);
    }//End if condition
  }//End function

  const NextSubStep = (serial, limit, nextStep) => {
    let newSubStepsCount = [...subStepsCount];
    newSubStepsCount[serial] = (newSubStepsCount[serial] + 1);
    if (newSubStepsCount[serial] > limit) {
      setStepsCount(nextStep);
      pr.setStepsCount && pr.setStepsCount(nextStep);
    }//End if condition
    setSubStepsCount(newSubStepsCount);
    pr.setSubStepsCount && pr.setSubStepsCount(newSubStepsCount);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }//End function

  const BackStep = () => {
    if (stepsCount !== 0) {
      let backStep = (stepsCount - 1);

      if (backStep === 1) { BackSubStepSet(0, 4); }//End if condition
      if (backStep === 2) { BackSubStepSet(1, 6); }//End if condition

      if (stepsCount === 1) {
        BackSubStep(0, backStep);
      } else if (stepsCount === 2) {
        BackSubStep(1, backStep);
      } else {
        setStepsCount(backStep);
        pr.setStepsCount && pr.setStepsCount(backStep);
      }//End if condition
      setProgressStatus(progressStatus - progressPerSection);
      setStepCountForMobile(stepCountForMobile - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }//End if condition
  }//End function

  const BackSubStep = (serial, backStep) => {
    let newSubStepsCount = [...subStepsCount];
    newSubStepsCount[serial] = (newSubStepsCount[serial] - 1);
    if (newSubStepsCount[serial] !== 0) {
      setSubStepsCount(newSubStepsCount);
      pr.setSubStepsCount && pr.setSubStepsCount(newSubStepsCount);
    } else {
      setStepsCount(backStep);
      pr.setStepsCount && pr.setStepsCount(backStep);
    }//End if condition
  }//End function

  const BackSubStepSet = (serial, limit) => {
    let newSubStepsCount = [...subStepsCount];
    newSubStepsCount[serial] = limit;
    setSubStepsCount(newSubStepsCount);
    pr.setSubStepsCount && pr.setSubStepsCount(newSubStepsCount);
  }//End function

  const OnChangeField = (fieldValue, fieldName) => {
    // console.log(fieldValue, fieldName)
    setFormValues(setFormStateValues({ ...formValues }, fieldName, fieldValue));

  }//End function

  const Submit = (values) => {
    if (stepsCount === 1 && (!userImgOld && !userImgNew)) { message.error('Please upload profile image'); return false; }//End if condition
    setTimeout(() => {
      if (stepsCount === maxStepCount) {
        values = formValues;
        //@ At the time of Insert user_ref_id will not be there
        //@ But on update it will be there
        if (!values.user_ref_id) { values.user_ref_id = cookieState.id; }//? getting user id
        if (userImgNew) { values.profile_image = userImgNew; }
        setLoader(true)
        HTTP('post', '/swForm', values).then(res => {
          setLoader(false);
          if (!res) { return false; }
          setShowSuccess(true);
          NextStep();
          setProgressStatus(100);
          //# Update cookies with 'complete_by_type' as true, SW IDc on complete
          cookieState.complete_by_type = true;
          cookieState.sw_ref_id = res.id;
          cookieState.profile_image = res.data.profile_image;
          SetUserCookie(cookieState);
          // Cookies.set('uData', JSON.stringify(cookieState));
          setCookieState(cookieState);
          setTimeout(() => {
            (pr.updateData && pr.id && res.data.profile_image) && pr.updateData({ id: values.user_ref_id, profile_image: res.data.profile_image + '?k=' + RandomAlphaNumber() });
          }, 1000);
          pr.callBack && pr.callBack();
        });
      } else {
        NextStep();
      }//End if condition
      // console.log(formValues);
    }, 10);
  }//End function

  const GetData = () => {
    setGetLoader(true);
    HTTP('get', '/swFormData/' + (pr.id ? pr.id : '')).then(res => {
      setGetLoader(false);
      if (!res) { return false; }
      // console.log(res);
      if (pr.id) {
        //@ If image is uploaded then set into state and remove for formValues state
        if (res.data.profile_image) { setUserImgOld(res.data.profile_image); delete res.data.profile_image; }//End if condition
        setFormValues(res.data);
        setFormDataLoaded(true);
      }//End if condition
      setListData(res.list);
    });
  }//End function

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    //@ If there is no list then get from server
    if (!listData) { GetData() }
    !pr.withinModal && setHeadTitle(pr.headTitle)
  }, [pr.headTitle]);

  useEffect(() => {
    // Watch for changes in formDataLoaded and set the form fields when data is available
    formRef.current && formRef.current.setFieldsValue(formValues);
  }, [formDataLoaded]);

  const formName = 'Support Worker Form';
  return (
    <div className={`reg-profile-form-container col-span-12 lg:col-span-9 ${padding} ${pr.withinModal ? '' : 'lg:pr-0 bg-[var(--bgColor)] border-l border-gray-200'}`}>
      <div className='shadow-lg'>
        <FormHeading context={context} progressStatus={progressStatus} headTitle={headTitle} showSuccess={showSuccess} successMsg={[formName, `${pr.withinModal ? 'Updated' : 'Completed and Submitted'} Successfully`]} />

        {pr.withinModal && <StepList stepsCount={stepsCount} subStepsCount={subStepsCount} setHeadTitle={(data) => setHeadTitle(data)} withinModal={true} />}

        <ScreenLoader active={getLoader}>
          {getLoader ? <div className="h-[300px]"></div> :
            !showSuccess ?
              <div className="bg-white p-4 sm:p-6 lg:px-8 lg:py-7 rounded-b">
                <Form onFinish={Submit} layout="vertical" className='form-style form-text text-base' autoComplete="off" ref={formRef}>

                  {/* <h2 className="text-2xl">{stepsCount} - {subStepsCount[0]} - {subStepsCount[1]}</h2> */}
                  {(stepsCount === 1 && subStepsCount[0] === 1) && <STEP_1_1 onChangeField={OnChangeField} fv={formValues} headTitle={headTitle} context={context} userImgNew={userImgNew} setUserImgNew={setUserImgNew} userImgOld={userImgOld} />}
                  {(stepsCount === 1 && subStepsCount[0] === 2) && <STEP_1_2 onChangeField={OnChangeField} fv={formValues} headTitle={headTitle} context={context} languagesList={listData.languagesList} />}
                  {(stepsCount === 1 && subStepsCount[0] === 3) && <STEP_1_3 onChangeField={OnChangeField} fv={formValues} headTitle={headTitle} context={context} />}
                  {(stepsCount === 1 && subStepsCount[0] === 4) && <STEP_1_4 onChangeField={OnChangeField} fv={formValues} headTitle={headTitle} context={context} />}
                  {(stepsCount === 2 && subStepsCount[1] === 1) && <STEP_2_1 onChangeField={OnChangeField} fv={formValues} headTitle={headTitle} context={context} workStatusList={listData.workStatus} />}
                  {(stepsCount === 2 && subStepsCount[1] === 2) && <STEP_2_2 onChangeField={OnChangeField} fv={formValues} headTitle={headTitle} context={context} fp={fp} timeList={listData.timeList} availabilityList={listData.availability} />}
                  {(stepsCount === 2 && subStepsCount[1] === 3) && <STEP_2_3 onChangeField={OnChangeField} fv={formValues} headTitle={headTitle} context={context} serviceList={listData.serviceToProvide} />}
                  {(stepsCount === 2 && subStepsCount[1] === 4) && <STEP_2_4 onChangeField={OnChangeField} fv={formValues} headTitle={headTitle} context={context} fp={fp} industryList={listData.industryList} expYearsList={listData.expYears} />}
                  {(stepsCount === 2 && subStepsCount[1] === 5) && <STEP_2_5 onChangeField={OnChangeField} fv={formValues} headTitle={headTitle} context={context} expList={listData.expInFields} />}
                  {(stepsCount === 2 && subStepsCount[1] === 6) && <STEP_2_6 onChangeField={OnChangeField} fv={formValues} headTitle={headTitle} context={context} />}
                  {stepsCount === 3 && <STEP_3 onChangeField={OnChangeField} fv={formValues} headTitle={headTitle} context={context} kmToTravelList={listData.kmToTravel} />}

                  <hr className="my-5" />
                  <div className={`grid grid-cols-5 md:grid-cols-12 ${context.data.portal_grid_gap} items-center`}>
                    <div className="col-span-2">
                      {((stepsCount > 1 || subStepsCount[0] > 1)) &&
                        <Button type="primary" className="btn-shadow w-full" size="large" onClick={() => BackStep()}>Back</Button>
                      }
                    </div>
                    <div className="col-span-1 md:col-span-8 text-right text-[12px] sm:text-base text-gray-400">
                      <div className={`block ${!pr.withinModal && 'lg:hidden'}`}>{stepCountForMobile}/{totalStep}</div>
                    </div>
                    <div className="col-span-2">
                      <Button type="primary" className="btn-shadow w-full" size="large" htmlType="submit" loading={loader}>{stepsCount < maxStepCount ? 'Next' : 'Submit'}</Button>
                      {/* {stepsCount < maxStepCount && <Button type="primary" className="btn-shadow w-full" size="large" htmlType="submit">Next</Button>} */}
                      {/* {stepsCount === maxStepCount && <Button type="primary" className="btn-shadow w-full" size="large" htmlType="submit" loading={loader}>Submit</Button>} */}
                    </div>
                  </div>
                </Form>

              </div>
              :
              <div className="shadow-lg bg-white rounded-b py-10"><Success formName={formName} closeModal={pr.closeModal} /></div>
          }
        </ScreenLoader>
      </div>
    </div>
  )//End return 
}//End function

export default SupportWorkerForm;