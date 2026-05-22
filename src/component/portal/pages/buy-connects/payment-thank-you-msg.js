import { useContext } from 'react';
import { Button } from 'antd';
import ContextAPI from '../../../../context';

const PaymentThankYouMsg = (pr) => {
  const context = useContext(ContextAPI);

  return (
    <div className='text-center w-full lg:w-6/12 m-auto py-10 px-5'>
      <i className='las la-check-circle text-[#1fb91d] text-7xl mb-3' />
      <h3 className={context.data.h2}>{pr.title}</h3>
      <h4 className={context.data.h4}>{pr.subTitle}</h4>
      <p className='my-3'>{pr.desc}</p>
      <Button type="primary" size="large" onClick={() => pr.btnAction()}>{pr.btnLabel}</Button>
    </div>
  )//End return
}//End function

export default PaymentThankYouMsg;