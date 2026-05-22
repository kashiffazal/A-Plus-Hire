import { useContext, useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
import { Button, Form, Divider } from "antd";
import Verification from '../verification';
import { HTTP, GetAppCookie, RandomAlphaNumber, SetNumberMask } from '../../../../services';
import ContextAPI from '../../../../../context';
import { AntInput } from '../../../../mutualComponents/antd-fields';
import PackageModal from '../../../../website/pages/pricing/partial/package-modal';
import ScreenLoader from "../../../../mutualComponents/screen-loader";


const RegistrationForm = (pr) => {
  const context = useContext(ContextAPI);
  const [getLoader, setGetLoader] = useState(true);
  const [listData, setListData] = useState({})
  const [postLoader, setPostLoader] = useState(false);
  const [showVerification, setShowVerification] = useState(false);
  const [regFormData, setRegFormData] = useState({});
  const [openPackageModal, setOpenPackageModal] = useState(false);
  const [packageDetails, setPackageDetails] = useState({});
  const [isPackageModalClose, setIsPackageModalClose] = useState(false);
  // const navigate = useNavigate();
  const typeSW = (pr.type.type === 'sw');

  // console.log(context);
  const Submit = (values) => {
    setPostLoader(true);
    values.type = pr.type.type;
    if (!typeSW) {
      values.package_ref_id = packageDetails.id;
    }//End if condition
    HTTP('post', '/registration', values).then(res => {
      setPostLoader(false);
      if (!res) { return false; }
      // console.log(res);
      values.id = res.id;
      setRegFormData(values);
      setShowVerification(true);
      pr.setDisabledBackBtnOnVerify(true);
    });
  }//End function

  const GetData = () => {
    setGetLoader(true);
    HTTP('get', '/registrationFormData').then(res => {
      setGetLoader(false);
      if (!res) { return false; }
      // console.log(res.data);
      setListData(res.data);
    });
  }//End function

  //@ Set package/plan details
  useEffect(() => {
    //@ Support Worker has no plan, that's way don't ask for plan on SW
    if (!typeSW) {
      let appCookie = GetAppCookie();
      // console.log(appCookie);
      //@ If package is not found in cookie then open Modal to ask about package/plan
      if (!appCookie || !appCookie.package) {
        setOpenPackageModal(true);
      } else {
        setPackageDetails(appCookie.package);
      }//End if condition
    } else { setPackageDetails({}); }//End if condition
    GetData();
    setTimeout(() => { SetNumberMask('mobile_number') }, 1000);
  }, []);

  //@ ISSUE - This is because when package modal is close then setPackageDetails could not set because it set on load
  //@         but package modal open after load that's why setPackageDetails is empty and package data could not submit with form
  //@ Solution - set another useEffect to set setPackageDetails on modal close
  useEffect(() => {
    // console.log(isPackageModalClose);
    //# setTimeOut is just for safe side - maybe it's not important
    setTimeout(() => {
      if (isPackageModalClose) {
        let appCookie = GetAppCookie();
        setPackageDetails(appCookie.package);
      }//End if condition
    }, 500);
  }, [isPackageModalClose])


  return (
    <div className="w-full">
      <ScreenLoader active={getLoader}>
        {!showVerification ?
          <>
            {/*  */}
            <div className={`sm:flex items-center justify-between mb-3 
            text-white py-3 px-4 rounded-xl 
              ${!typeSW ? 'bg-[var(--colorPrimary)]' : 'bg-gradient-to-r from-[var(--colorPrimary)] from-30% to-[var(--bgPrimary)] to-100%'}
          `}>
              <div className="flex items-center justify-center">
                <div className="hidden sm:flex items-center justify-center drop-shadow border-2 border-solid border-white bg-[var(--colorSecondary)] text-white rounded-full p-2 text-2xl w-[40px] h-[40px] mr-4">
                  <i className={pr.type.icon} />
                </div>
                <div className="text-center sm:text-left">
                  <div className="text-xl font-semibold leading-6 drop-shadow">{pr.type.subLabel}</div>
                  <div className="text-base leading-6 drop-shadow"> {pr.type.label}</div>
                </div>
              </div>
              {packageDetails.name &&
                <div className="text-center sm:text-right">
                  <span className="text-xl font-semibold ">Plan:</span>&nbsp;{packageDetails.name}<br />
                  <button className="text-[14px]" onClick={() => setOpenPackageModal(true)}>Want To Change Plan?</button>
                </div>
              }
            </div>

            <Form onFinish={Submit} layout="vertical" autoComplete="off" className="form-style">

              <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ${context.data.portal_grid_gap}`}>

                <AntInput label="First Name" name="first_name" size="large" placeholder="Please enter your first name" />
                <AntInput label="Last Name" name="last_name" size="large" placeholder="Please enter your last name" />
                <AntInput label="Date Of Birth" name="date_of_birth" type="datepicker" size="large" placeholder="Select your DOB" />
                <AntInput label="Mobile Number" name="mobile_number" size="large" placeholder="Please enter your mobile number" rules={{ min: process.env.REACT_APP_MOBILE_FORMAT_NUMBER.length-2, message: 'Invalid Number' }} />

                <div className="md:col-span-2 lg:col-span-3">
                  <AntInput label="Street Address" name="street_address" size="large" placeholder="Please enter your street address" />
                </div>

                <AntInput label="Suburb" name="suburb" size="large" placeholder="Please enter your suburb" />
                <AntInput label="Post Code" name="post_code" size="large" placeholder="Please enter your post code" />
                <AntInput label="State" name="state" type="select" filter={true} options={listData.list_states} setValueLabel={['id', 'name']} size="large" placeholder="Please select your state" />
                <AntInput label="Place of Birth" name="country_to_born" type="select" filter={true} options={listData.list_countries} setValueLabel={['id', 'name']} size="large" placeholder="Please select your born country" />

                <div className="md:col-span-2 lg:col-span-1">
                  <AntInput label="How did you hear about us?" name="hear_about_us" type="select" filter={true} options={listData.list_hear_about} setValueLabel={['id', 'name']} size="large" placeholder="Please select how your hear" />
                </div>
                <div className="sm:col-span-2 md:col-span-3 lg:col-span-4">
                  <Divider orientation="left" orientationMargin={0} className="!my-0 !mb-3 divider-primary">Set Your Account Credential</Divider>
                </div>
              </div>



              <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 ${context.data.portal_grid_gap}`}>

                <AntInput label="Email Address" name="email" type="email" size="large" placeholder="Please enter your email address" autoComplete='off' />
                <AntInput label="Confirm Email" name="confirm_email" type="email" compareMode={true} compareWith="email" size="large" placeholder="Enter to confirm your email" autoComplete='off' />
                <AntInput label="Password" name="password" type="password" size="large" placeholder="Please enter your password" autoComplete='new-password' />
                <AntInput label="Confirm Password" name="confirm_password" type="password" compareMode={true} compareWith="password" size="large" placeholder="Enter to confirm your password" autoComplete='new-password' />

                <Button className='btn-accent1 btn-shadow mt-2' size="large" onClick={() => pr.back()}><i className="las la-angle-double-left" />&nbsp;Back</Button>
                <div className="hidden lg:block"></div><div className="hidden lg:block"></div>
                <Button type="primary" size="large" htmlType="submit" className="btn-shadow mt-2" loading={postLoader}>Register&nbsp;<i className="las la-thumbs-up text-[18px] relative top-px" /></Button>

              </div>

            </Form>
          </>
          :
          <Verification context={context} regFormData={regFormData} />
        }
      </ScreenLoader>
      <PackageModal open={openPackageModal} onClose={() => { setIsPackageModalClose(RandomAlphaNumber()); setOpenPackageModal(false) }} allowClose={false} />
    </div>
  )//End return
}//End Function

export default RegistrationForm;