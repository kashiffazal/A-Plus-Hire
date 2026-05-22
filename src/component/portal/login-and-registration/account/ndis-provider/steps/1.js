import { AntInput } from '../../../../../mutualComponents/antd-fields';
import UploadImage from '../../../../../mutualComponents/andt-upload-and-crop-image-component';
import UploadFile from '../../../../../mutualComponents/antd-upload-file-component';

import { RandomAlphaNumber } from '../../../../../services';

const Step1 = (pr) => {
  const ocf = pr.onChangeField;
  const fv = pr.fv;
  const iconClass = 'relative top-[0px] rounded-full p-[3px] text-white text-[14px] mr-2 bg-[#34b000]';
  // const iconClassBulb = iconClass + ' !bg-[#ff9900]';

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
          <p>A profile picture and company logo are excellent ways to showcase your identity and build trust with clients and support workers.</p>
          <p className='font-bold'>An ideal photo is</p>
          <ol className='list-none'>
            <li className='flex'><div><i className={`las  la-check ${iconClass}`} /></div><div>Of the Provider: Clients and support workers appreciate seeing the faces behind the company, fostering a personal connection.</div></li>
            <li className='flex'><div><i className={`las la-check ${iconClass}`} /></div><div>Recent and Accurate: Ensure the photo is up-to-date and accurately represents your organization to avoid any confusion.</div></li>
          </ol>
          <p>A profile picture adds a personal touch, fostering positive and engaging experiences with clients/Support Workers.</p>
        </div>
      </div>

      <hr className='my-3' />
      <div className='md:flex items-center justify-start'>
        <UploadFile type='1.2'
          className='m-auto md:m-none w-[230px] [&>div>div>div>div>div]:h-[180px] border-[3px] border-solid border-[var(--colorPrimary)] p-1 rounded'
          formProps={pr.fp}
          name="company_logo"
          title="Upload Company Logo" msg='You can drag and drop'
          uploadedDocuments={pr.companyLogoOnLoad}
          filePath={process.env.REACT_APP_API_URL + '/company_logo/'}
          onChange={e => ocf(e, 'company_logo')} onRemove={() => ocf('company_logo', undefined)} accept={'.jpg,.jpeg,.png'} restrictExtension={'jpg,jpeg,png'} fileSize={'1'}
          viewImageOnModal={true}
          viewImageOnModalWidth={350}
        />

        {/* {fv.company_logo && <img src={fv.company_logo} alt='' className='w-[100px] h-[100px]'/>} */}

        <div className='mt-3 md:mt-0 md:ml-8 [&>*]:mb-1'>
          <h3 className={pr.context.data.h3}>Company Logo</h3>
          <p>Upload company logo is a powerful approach to display your identity and establish trust with clients and support workers. It fosters a personal connection and builds credibility in your services.</p>
          {/* <p className='font-bold'>An ideal photo is</p> */}
          <ol className='list-none'>
            <li className='flex'><div><i className={`las  la-check ${iconClass}`} /></div><div>A well-designed logo showcases your company's identity and values.</div></li>
            <li className='flex'><div><i className={`las la-check ${iconClass}`} /></div><div>Ensure the logo reflects the services you offer and leaves a lasting impression.</div></li>
          </ol>
          {/* <p>A profile picture adds a personal touch, fostering positive and engaging experiences with clients/Support Workers.</p> */}
        </div>
      </div>


      <div className='form-container mt-5'>
        <div className='[&>*]:mb-1'>
          <h3 className={pr.context.data.h3}>Company Details</h3>
          <p>Your company detail is a chance to share who you are! We know that meaningful connections in the {pr.context.data.app_data.company_name} community happen when like-minded people meet. Company detail is where that begins.</p>
          {/* <p className='font-bold'>Here are a few thought starters:</p> */}
          {/* <ol className='list-none'>
            <li className='flex'><div><i className={`las  la-lightbulb ${iconClassBulb}`} /></div><div> What are your interests or hobbies? What do you find fun?</div></li>
            <li className='flex'><div><i className={`las la-lightbulb ${iconClassBulb}`} /></div><div> Is there anything you are looking for from a support worker?</div></li>
            <li className='flex'><div><i className={`las la-lightbulb ${iconClassBulb}`} /></div><div> Are there any goals you are working towards?</div></li>
          </ol> */}
          {/* <p>If you're worried about privacy, upload a photo of your pet, your favourite food or footy team - anything that gives more insight into what makes you, you.</p> */}
        </div>

        <AntInput
          label="Company Name"
          name="company_name"
          size="large"
          placeholder="Please type here"
          onBlur={(value, name) => ocf(value, name)}
        />

        <AntInput
          type='textarea'
          label="Please write in full detail about your company. (You can use your company about us here)"
          name="about_your_company"
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

export default Step1;