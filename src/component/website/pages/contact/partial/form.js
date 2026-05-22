import { useState, useRef, useEffect } from 'react';
import { Button, Form, Alert } from 'antd';
import { AntInput } from '../../../../mutualComponents/antd-fields';
import { HTTP } from '../../../../services';


const ContactForm = (pr) => {
  const formRef = useRef(null);
  const [loader, setLoader] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false)

  const Submit = (values) => {
    setLoader(true);
    setFormSubmitted(false);
    HTTP('post', '/webFormSendEmail', values).then(res => {
      setLoader(false);
      if (!res) { return false; }
      setFormSubmitted(true);
    });
  }//End function

  useEffect(() => {
    (formSubmitted && formRef.current) && formRef.current.resetFields();
  }, [formSubmitted])

  return (
    <Form onFinish={Submit} layout="vertical" className='form-style form-text text-base' autoComplete="off" ref={formRef}>
      <div className='[&>*]:mb-4'>
        <h2 className={pr.context.data.h2 + ' mt-[-7px]'}>Submit a complaint, compliment or feedback.</h2>
        {/* <div className="border-b-4 border-solid border-[var(--colorPrimary)] w-[80px] mx-auto md:float-left"></div> */}
        <div className="border-divider-left !w-[80px]"></div>
        <p>If you would like to submit a complaint, feedback, or a compliment, please complete this form and our team will respond as soon as possible.</p>
        <hr />
      </div>

      <div className={`grid grid-cols-1 md:grid-cols-3 ${pr.context.data.portal_grid_gap}`}>

        <AntInput label="Full Name" name="name" size="large" placeholder="Please type your name here" />
        <AntInput label="Phone Number" name="phone" size="large" placeholder="Please type your phone number here" />
        <AntInput label="Email Address" name="email" size="large" type="email" placeholder="Please type your email here" />
        <div className='md:col-span-3'>
          <AntInput
            name="message_type"
            type="radio"
            label="What type of feedback would you like to provide"
            size="large"
            // vertical
            optionType="button"
            buttonStyle="solid"
            radioOptions={[
              { label: 'Complaint' },
              { label: 'Compliment' },
              { label: 'General feedback' }
            ]}
            className="sm:w-[33.3%] text-center"
          />
        </div>
        <div className='md:col-span-3'>
          <AntInput
            type='textarea'
            label="Your Message / Comment"
            name="message"
            size="large"
            placeholder="Please type here"
            className='!h-[100px] !resize-none'
          />
        </div>

        <Button type="primary" htmlType='submit' className="btn-shadow w-full" size="large" loading={loader}>Submit</Button>
        <div className='md:col-span-2'>
          {formSubmitted && <Alert message="Form has been submitted successfully" type="success" showIcon className='h-[44px]' />}
        </div>
      </div>
    </Form>
  )//End return
}//End function

export default ContactForm;