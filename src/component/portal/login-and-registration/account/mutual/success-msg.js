import { useState, useEffect } from 'react';
import { Button, Result } from 'antd';
import { NavLink, useNavigate } from 'react-router-dom';
import Lottie from "lottie-react";
import AnimationJSON from "../lottie-json/success-2.json";


const Success = (pr) => {
  const navigate = useNavigate();
  const [showAnimation, setShowAnimation] = useState(true);

  //# Hide Animation after 4 sec in order to select text 
  useEffect(() => { setTimeout(() => { setShowAnimation(false); }, 4000); })

  return (
    <>
      {showAnimation &&
        <div className='relative'>
          <Lottie animationData={AnimationJSON} loop={false} style={{ marginTop: '-100px' }} className='absolute w-full h-[500px]' />
        </div>
      }
      <Result
        status="success"
        title={
          pr.closeModal ?
            pr.formName + ' has been updated successfully' :
            `Your ${pr.formName} has been submitted successfully.`
        }
        subTitle={
          pr.closeModal ?
            "Please click the button below to close the Modal." :
            "Please click the button below to redirect the Dashboard."
        }
        extra={[
          pr.closeModal ?
            <Button key={1} type="primary" size="large" onClick={pr.closeModal}> Close Modal</Button>
            :
            <NavLink to="/app" key={2}>
              <Button type="primary" size="large" onClick={() => navigate('/app')}> Go Dashboard</Button>
            </NavLink>
        ]}
      />
    </>
  )//End return
}//End function

export default Success;