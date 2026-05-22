import React, { useState, useEffect, useContext } from 'react';
import { List, Avatar, Button, Space } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import ContextAPI from '../../../../../../../context';
import { HTTP } from '../../../../../../services';
import ScreenLoader from '../../../../../../mutualComponents/screen-loader';
import EditFormModal from '../../form-modal';
import ProfileModal from '../../../../profile/partial/profile-modal';
import bgImage from '../bg-cover.jpg';



const NDISProfile = (pr) => {
  const context = useContext(ContextAPI);
  const [loader, setLoader] = useState(true);
  const [data, setData] = useState({ userData: {} });
  const [openForm, setOpenForm] = useState(false);
  const [openProfileForm, setOpenProfileForm] = useState(false);

  // const [tempData, setTempData] = useState({ userData: {} });

  const GetData = (id) => {
    setLoader(true);
    HTTP('get', '/ndisViewDetails/' + id).then(res => {
      setLoader(false);
      if (!res) { return false; }
      setData(res.data);
    });
  }//End function

  useEffect(() => { pr.id && GetData(pr.id); }, [pr.id])
  const admin = context.data.ud.type === 'ua' ? true : false;
  return (
    <>
      <ScreenLoader active={loader}>

        <div className="w-auto h-[100px] md:h-[150px] bg-cover rounded-xl m-[-10px] md:m-0" style={{ backgroundImage: `url(${bgImage})` }}></div>
        <div className='portal-container !bg-white/80 backdrop-blur-xl !rounded-xl mt-[-80px] mx-0 md:mx-10'>
          <div className='grid grid-cols-1 lg:grid-cols-2 items-center'>
            <div className={`text-center ${admin ? 'mb-3' : ''} lg:m-0 lg:text-left lg:flex items-center`}>
              <div className='m-auto mb-3 lg:m-0 lg:mr-5 border-[3px] border-solid border-[var(--colorPrimary)] rounded-[5px] p-[4px] w-fit'>
                <Avatar shape="square" size={100} icon={<UserOutlined />} src={data.userData.profile_image ? process.env.REACT_APP_API_URL + '/profile_images/' + data.userData.profile_image : null}
                  className='!h-[unset]'
                />
              </div>
              <div>
                <h3 className={context.data.h2}>{data.userData.full_name}</h3>
                <p className='text-lg'>{data.userData.role}</p>
                <p>{data.userData.street_address}, {data.userData.state}, {data.userData.suburb}, {data.userData.post_code}</p>
                <p>
                  <span className='font-medium'>DOB :</span> {data.userData.date_of_birth}
                  <span className='font-medium ml-2'>Age :</span> {data.userData.age}
                </p>
              </div>
            </div>
            {admin ?
              <div className='md:flex items-center justify-between'>
                <div className='text-center mb-3 md:mb-0 md:text-left'>
                  <p><span className='font-medium'>Current Plan :</span> {data.userData.package_name}</p>
                  {/* <p><span className='font-medium'>Recurring Type :</span> {data.userData.package_monthly ? 'Monthly' : 'Yearly'}</p> */}
                  <p><span className='font-medium'>How heard of us :</span> {data.userData.hear_about_us}</p>
                </div>
                <div className='text-center md:text-right'>
                  <p className='font-medium'>Status : <span className={`${data.userData.status === 'Active' ? 'success-link' : 'danger-link'} font-semibold`}>{data.userData.status}</span></p>
                  <p><span className='font-medium'>Username :</span> {data.userData.username}</p>
                  <p><span className='font-medium'>Password :</span> {data.userData.password}</p>
                </div>
              </div>
              :
              <div>
                {context.data.ud.type === 'ndis' &&
                  <Space.Compact block className='justify-end'>
                    <Button type="primary" onClick={() => setOpenProfileForm(true)}><i className='las la-user' />&nbsp;Edit Profile</Button>
                    <Button type="primary" onClick={() => setOpenForm(true)}><i className='las la-edit' />&nbsp;Edit Details</Button>
                  </Space.Compact>
                }
              </div>
            }
          </div>
        </div>

        <div className='mt-5 grid md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-2 md:gap-5'>
          <div className='lg:col-span-2 xl:col-span-2 portal-container !rounded-xl'>
            <h2 className='text-[18px] font-semibold'>About Company</h2>
            <hr className='border-dashed border-gray-300 my-[3px]' />
            <List
              itemLayout="horizontal"
              dataSource={[
                { title: 'Company Name', description: data.company_name },
                {
                  title: 'Company Details', description: <div className='pt-1 mb-1 whitespace-pre-wrap'>
                    {data.about_your_company}
                  </div>
                }]}
              className='[&>.ant-spin-nested-loading>.ant-spin-container>.ant-list-items>.ant-list-item:last-child]:!pb-0'
              renderItem={(item, index) => (
                <List.Item className='!py-[4px]'><List.Item.Meta title={<span className='font-medium'>{item.title}</span>} description={<span className='text-gray-900'>{item.description}</span>} /></List.Item>
              )}
            />
          </div>

          <div className='portal-container !rounded-xl'>
            <h2 className='text-[18px] font-semibold'>General Details</h2>
            <hr className='border-dashed border-gray-300 my-[3px]' />
            <List
              itemLayout="horizontal"
              dataSource={[
                { title: 'Gender', description: (data.gender === 'Prefer to self-describe' ? data.self_describe_explain : data.gender) },
                { title: 'Country to Born', description: data.userData.country_to_born }
              ]}
              className='[&>.ant-spin-nested-loading>.ant-spin-container>.ant-list-items>.ant-list-item:last-child]:!pb-0'
              renderItem={(item, index) => (
                <List.Item className='!py-[4px]'><List.Item.Meta title={<span className='font-medium'>{item.title}</span>} description={<span className='text-gray-900'>{item.description}</span>} /></List.Item>
              )}
            />

            <h2 className='mt-4 text-[18px] font-semibold'>Support Services</h2>
            <hr className='border-dashed border-gray-300 my-[3px]' />
            <List
              itemLayout="horizontal"
              dataSource={[
                {
                  title: 'What kind of NDIS support services you provide?', description: <span>
                    {data.services_you_provide && data.services_you_provide.map(item => {
                      return <span key={item.id} className='inline-block mr-[4px] mb-[4px] rounded py-[3px] px-[8px] bg-[#d0fdb9]'>{item.name}</span>
                    })}
                  </span>
                }
              ]}
              className='[&>.ant-spin-nested-loading>.ant-spin-container>.ant-list-items>.ant-list-item:last-child]:!pb-0'
              renderItem={(item, index) => (
                <List.Item className='!py-[4px]'><List.Item.Meta title={<span className='font-medium'>{item.title}</span>} description={<span className='text-gray-900'>{item.description}</span>} /></List.Item>
              )}
            />
          </div>
        </div>

        {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
      </ScreenLoader>
      <EditFormModal open={openForm} id={data.id} close={() => setOpenForm(false)} type={data.userData.type} callBack={() => GetData(pr.id)} />
      <ProfileModal open={openProfileForm} close={() => setOpenProfileForm(false)} updateData={(e) => {
        let dt = { ...data };
        dt.userData = { ...data.userData, ...e };
        setData(dt);
      }} editMode={true}/>
    </>
  )//End return
}//End function

export default NDISProfile;