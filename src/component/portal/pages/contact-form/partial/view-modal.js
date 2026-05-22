import { useState, useEffect } from 'react';
import ModalGeneral from '../../../../mutualComponents/modal-general';
import { HTTP } from '../../../../services';
import { Descriptions } from 'antd';
// import { AntInput } from '../../../../mutualComponents/antd-fields';

const ViewModal = (pr) => {
  const [loader, setLoader] = useState(false);
  // const [postLoader, setPostLoader] = useState(false);
  const [data, setData] = useState({});

  const GetDetails = (id) => {
    setLoader(true);
    HTTP('get', '/getFormDetails/' + id).then(res => {
      setLoader(false);
      if (!res) { return false; }
      // console.log(res.data );
      setData(res.data);
    });
  }//End function

  // const ReplySubmit = (values) => {
  //   setPostLoader(true);
  //   HTTP('post', '/getFormDetails/', values).then(res => {
  //     setPostLoader(false);
  //     if (!res) { return false; }
  //     // console.log(res.data );
  //     pr.close()
  //   });
  // }//End function

  useEffect(() => { pr.id && GetDetails(pr.id); }, [pr.id])
  return (
    <ModalGeneral
      show={pr.open}
      close={() => pr.close()}
      // width={1300}
      title='View Details'
      subTitle='Website Contact Form'
      loading={loader}
      // hideHeaderHr={true}
      // allowEscKey={false}
      render={
        <>
          <div className="description-custom">
            <Descriptions bordered size="small" column={1}>
              <Descriptions.Item label="Name">{data.name}</Descriptions.Item>
              <Descriptions.Item label="Phone">{data.phone}</Descriptions.Item>
              <Descriptions.Item label="Email">{data.email}</Descriptions.Item>
              <Descriptions.Item label="Type">{data.message_type}</Descriptions.Item>
              <Descriptions.Item label="Date and Time">{data.createdDate}, {data.createdTime}</Descriptions.Item>
              <Descriptions.Item label="Message"><div className='whitespace-pre-line'>{data.message}</div></Descriptions.Item>
            </Descriptions>
          </div>
          {/* <hr className='mt-4 mb-2'/>
          <Form onFinish={ReplySubmit} layout="vertical" className='form-style' autoComplete="off">
            <AntInput
              type='textarea'
              label="Reply"
              name="reply"
              size="large"
              placeholder="Please type your reply here"
              className='!h-[100px] !resize-none mb-2'
            />
            <Button type="primary" htmlType='submit' className="btn-shadow w-full" size="large" loading={postLoader}>Reply</Button>
          </Form> */}
        </>
      }//End render
    />
  )//End return
}//End function

export default ViewModal;