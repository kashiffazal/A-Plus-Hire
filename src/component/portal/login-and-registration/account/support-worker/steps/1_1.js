// import { useState } from 'react';
import { AntInput } from '../../../../../mutualComponents/antd-fields';
import UploadImage from '../../../../../mutualComponents/andt-upload-and-crop-image-component';
import { RandomAlphaNumber } from '../../../../../services';

const Step1_1 = (pr) => {

  const ocf = pr.onChangeField;
  const fv = pr.fv;

  const iconClass = 'relative top-[0px] rounded-full p-[3px] text-white text-[14px] mr-2 bg-[#34b000]';
  const iconClassBulb = iconClass + ' !bg-[#ff9900]';

  return (
    <div className={` ${pr.context.data.portal_grid_gap}`}>


      <div className='md:flex items-center justify-start'>
        <UploadImage
          defaultImageUrl={pr.userImgNew ? pr.userImgNew : (pr.userImgOld ? process.env.REACT_APP_API_URL + '/profile_images/' + pr.userImgOld + '?p=' + RandomAlphaNumber() : null)}
          onChange={(e) => { pr.setUserImgNew(e); }}
          type="button"
          imageType="circle"
          width={220}
          height={220}

        />
        <div className='mt-3 md:mt-0 md:ml-8 [&>*]:mb-1'>
          <h3 className={pr.context.data.h3}>Profile Photo</h3>
          <p>A profile picture is a great way to show off your personality and help build trust between you and your clients/NDIS providers.</p>
          <p className='font-bold'>An ideal photo is</p>
          <ol className='list-none'>
            <li className='flex'><div><i className={`las  la-check ${iconClass}`} /></div><div>Use a clear and professional photo to show who they will be working with.</div></li>
            <li className='flex'><div><i className={`las la-check ${iconClass}`} /></div><div>Recent and accurate. This helps avoid confusion and ensures that clients can easily recognize you when you connect with them.</div></li>
          </ol>
          <p>Personal Touch: A profile picture adds a personal touch, fostering positive and engaging experiences with clients/NDIS providers.</p>
        </div>
      </div>


      <div className='form-container mt-5'>
        <AntInput
          name="gender"
          type="radio"
          label="Your Gender"
          size="large"
          // vertical
          radioOptions={[
            { label: 'Male' },
            { label: 'Female' },
            { label: 'Prefer not to say' },
            { label: 'Prefer to self-describe' }
          ]}
          onChange={(value, name) => ocf(value, name)}
        />
        {fv.gender === 'Prefer to self-describe' &&
          <AntInput
            type='textarea'
            label="Please explain below"
            name="self_describe_explain"
            size="large"
            placeholder="Please type here"
            className='!h-[60px] md:!h-[80px] !resize-none'
            onBlur={(value, name) => ocf(value, name)}
          />
        }
      </div>
      <div className='form-container'>
        <AntInput
          name="cultural_diversity"
          type="radio"
          label="Are you of Aboriginal or Torres Strait Islander origin?"
          size="large"
          // vertical
          radioOptions={[
            { label: 'Yes' },
            { label: 'No' },
            { label: 'Prefer not to say' }
          ]}
          onChange={(value, name) => ocf(value, name)}
        />
      </div>
      <div className='form-container'>

        <div className='[&>*]:mb-1'>
          <h3 className={pr.context.data.h3}>Profile bio</h3>
          <p>Your bio is a chance to share who you are! We know that meaningful connections in the {pr.context.data.app_data.company_name} community happen when like-minded people meet. Your bio is where that begins.</p>
          {/* <p className='font-bold'>Here are a few thought starters:</p>
          <ol className='list-none'>
            <li className='flex'><div><i className={`las  la-lightbulb ${iconClassBulb}`} /></div><div> What are your interests or hobbies? What do you find fun?</div></li>
            <li className='flex'><div><i className={`las la-lightbulb ${iconClassBulb}`} /></div><div> Is there anything you are looking for from a support worker?</div></li>
            <li className='flex'><div><i className={`las la-lightbulb ${iconClassBulb}`} /></div><div> Are there any goals you are working towards?</div></li>
          </ol> */}
          {/* <p>If you're worried about privacy, upload a photo of your pet, your favourite food or footy team - anything that gives more insight into what makes you, you.</p> */}
        </div>

        <AntInput
          type='textarea'
          label="Please write in full detail about yourself."
          name="about_you"
          size="large"
          placeholder="Please type here"
          className='!h-[100px] !resize-none'
          containerClassName='mt-3'
          onBlur={(value, name) => ocf(value, name)}
        />
      </div>

    </div>
  )//End return
}//End function

export default Step1_1;