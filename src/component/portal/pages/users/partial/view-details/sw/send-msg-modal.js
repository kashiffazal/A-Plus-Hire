import { useState, useContext } from 'react';
import { Form, Button } from 'antd';
import ContextAPI from '../../../../../../../context';
import { HTTP, UpdateUserCookie, GetCurrentDate, GetCurrentTime } from '../../../../../../services';
import ModalGeneral from '../../../../../../mutualComponents/modal-general';
import { AntInput } from '../../../../../../mutualComponents/antd-fields';

const SendMsgModal = (pr) => {
  const context = useContext(ContextAPI);
  const [loader, setLoader] = useState(false);

  const lastMessage = (pr.data.messageData && pr.data.messageData[0] && pr.data.messageData[0].id) ? pr.data.messageData[0] : {};
  // console.log(pr.data);
  const Submit = (values) => {
    values.sw_ref_id = pr.data.swData.id;//@ SW Ref Id
    values.sw_user_ref_id = pr.data.id;//@ SW User Table Ref Id
    values.pr_ref_id = (context.data.ud.type === 'ndis' ? context.data.ud.ndis_ref_id : context.data.ud.sm_ref_id);//@ Login User;
    values.pr_user_ref_id = context.data.ud.id;//@ Login User
    values.pr_type = context.data.ud.type;//@ Login User;
    values.type = 'msg';
    values.lastMessage = lastMessage.id ? true : false;
    // console.log(values);
    // return false;
    // setLoader(true);
    HTTP('post', '/sendMessageToSW/', values).then(res => {
      setLoader(false);
      if (!res) { return false; }
      // console.log(res.data);
      //@ Update connects in context (connects count is showing in header)
      setTimeout(() => {
        if (res.remainingConnects != null && res.remainingConnects !== '') {
          UpdateUserCookie({ connects: res.remainingConnects });
          context.updateData({ ud: { ...context.data.ud, connects: res.remainingConnects } });
        }
      }, 300);
      pr.updateLastMessageSent(GetCurrentDate('YYYY-MM-DD') + ' ' + GetCurrentTime(), res.connectsId ? res.connectsId : null);
      pr.close();
    });
  }//End function

  // console.log(pr.data);
  // console.log(pr.data.messageData);
  return (
    <ModalGeneral
      show={pr.open}
      close={pr.close}
      width={700}
      title={<span>Send Message to <span className='text-[var(--colorPrimary)]'>{pr.data.full_name}</span></span>}
      subTitle={
        (context.data.ud.type === 'ua' || lastMessage.id) ?
          `${pr.data.street_address}, ${pr.data.suburb}, ${pr.data.state}, ${pr.data.post_code}`
          :
          `${pr.data.suburb}, ${pr.data.post_code}`
      }
      // hideHeaderHr={true}
      // allowEscKey={false}
      render={
        <div>
          {/* <pre>{JSON.stringify(pr.data, null, 2)}</pre> */}
          <Form onFinish={Submit} layout="vertical" className='form-style' autoComplete="off">
            <AntInput
              type='textarea'
              label={`Type your message here for ${pr.data.full_name}`}
              name="message"
              size="large"
              placeholder="Please type here"
              className='!h-[100px] !resize-none mb-2'
            />
            <Button type="primary" htmlType='submit' className="btn-shadow w-full" size="large" loading={loader}>Send Message</Button>
          </Form>
        </div>
      }//End render
    />
  )//End return
}//End function

export default SendMsgModal;