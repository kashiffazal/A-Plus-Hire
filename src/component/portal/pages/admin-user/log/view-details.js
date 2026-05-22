import { useEffect, useState } from 'react';
import { Avatar, Descriptions } from 'antd';
import { EyeOutlined, EyeInvisibleOutlined, UserOutlined } from '@ant-design/icons';


const ViewDetails = (pr) => {
  const [data, setData] = useState({})
  const [layout] = useState('vertical');
  const [descResponsiveDetailsTwoCol] = useState({ xxl: 2, xl: 2, lg: 2, md: 2, sm: 2, xs: 1 });
  const [togglePassword, setTogglePassword] = useState(false);

  useEffect(() => { setData(pr.data); }, [pr.data])


  return (
    <>
      <div className="description-custom flex">
        <div className='mr-3'>
          <Avatar shape="square" size={228} icon={<UserOutlined />} src={data.profile_image ? process.env.REACT_APP_API_URL + '/profile_images/' + data.profile_image : null} 
            className='border border-solid border-gray-200'
          />
        </div>
        <div className="description-custom w-full">
          <h1>Main Details</h1>
          <Descriptions size="small" layout={layout} bordered column={descResponsiveDetailsTwoCol} className={`two-col-${layout}`}>
            <Descriptions.Item label="Full Name">{data.full_name}</Descriptions.Item>
            <Descriptions.Item label="Email Address">{data.email}</Descriptions.Item>
            <Descriptions.Item label="Mobile Number">{data.mobile_number}</Descriptions.Item>
            <Descriptions.Item label="Status"><span className={`${data.status === 'Active' ? 'success-link' : 'danger-link'} font-semibold`}>{data.status}</span></Descriptions.Item>
            <Descriptions.Item label="Username">{data.username}</Descriptions.Item>
            <Descriptions.Item label="Password">
              <div className="flex items-center justify-between">
                <div>{togglePassword ? data.password : '********'}</div>
                <div>
                  <button type="button" className="btnToLink link-color" onClick={() => setTogglePassword(!togglePassword)}>
                    {togglePassword ? <span><EyeInvisibleOutlined /> Hide</span> : <span><EyeOutlined /> Show</span>}
                  </button>
                </div>
              </div>
            </Descriptions.Item>
          </Descriptions>
        </div>
      </div>
    </>
  );//End return
}//End class

export default ViewDetails;