import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Button, Avatar, List, Popconfirm, Form } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { HTTP, RandomAlphaNumber, Logout, UpdateUserCookie, GetObjectFromArr } from '../../../../../services';
import UploadImage from '../../../../../mutualComponents/andt-upload-and-crop-image-component';
import { AntInput } from '../../../../../mutualComponents/antd-fields';
import PageTitle from '../../../../mutual/pate-title';

const formRef = React.createRef();

const SMProfile = (pr) => {
  const navigate = useNavigate();
  const [profileImageNew, setProfileImageNew] = useState(false);
  const [toggleEdit, setToggleEdit] = useState(false);
  const [btnLoader, setBtnLoader] = useState(false);
  const [getLoader, setGetLoader] = useState(false);
  const [dataList, setDataList] = useState([])

  const SubmitForm = (values) => {
    values.id = pr.context.data.ud.id;
    setBtnLoader(true);
    // console.log(pr.context.data.ud);
    // console.log(values);
    HTTP('post', '/updateUserProfile', { ...values, profile_image: profileImageNew }).then(res => {
      setBtnLoader(false);
      if (!res) { return false; }
      formRef.current.resetFields();
      let stateName = GetObjectFromArr(values.state, 'value', dataList).label;
      UpdateUserCookie(res.data);
      if (res.data.profile_image) { res.data.profile_image = res.data.profile_image + '?p=' + RandomAlphaNumber() }
      let updatedData = { ...pr.context.data.ud, ...res.data, stateData: { id: values.state, name: stateName } };
      // console.log(res.data);
      pr.context.updateData({ ud: updatedData });
      pr.updateData && pr.updateData({ ...updatedData, state: stateName });
      if (pr.modal) {
        pr.close();
      } else {
        setToggleEdit(false);
      }//End if condition
    });
  }//End function

  const ToggleForm = () => {
    formRef.current.setFieldsValue(pr.context.data.ud);
    setToggleEdit(!toggleEdit);
  }//End function

  const GetList = () => {
    setGetLoader(true);
    HTTP('get', '/profileFormGetList').then(res => {
      setGetLoader(false);
      if (!res) { return false; }
      setDataList(res.data);
    });
  }//End function
  
  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => { GetList(); }, []);
  useEffect(() => { pr.editMode && ToggleForm(); }, [pr.editMode]);

  const ud = pr.context.data.ud;
  return (
    <div>
      {!pr.modal &&
        <PageTitle icon='las la-money-bill' title='User' titleSpan='Profile' desc='User details, you can review or edit'
          render={<Button type='primary' danger={toggleEdit ? true : false} size="large" className='w-full' onClick={() => ToggleForm()}>
            <i className={`${toggleEdit ? 'las la-times-circle' : 'las la-edit'} mr-1`} />
            {!toggleEdit ? 'Edit Profile' : 'Remove Form'}
          </Button>}
        />
      }
      <div className={!pr.modal ? 'portal-container' : ''}>
        <div className='grid grid-cols-1 lg:grid-cols-12 lg:gap-10'>
          <div className={!pr.modal ? 'col-span-9' : 'col-span-12'}>

            <Form layout="vertical" className='form-style' autoComplete="off" ref={formRef} onFinish={SubmitForm}>
              <div className='lg:flex'>
                <div className='md:flex w-full [&>*]:mb-5 [&>*]:md:mb-0'>
                  <div className='lg:w-[23.3%] md:mr-10 lg:mr-[70px] xl:mr-10 text-center md:text-left'>
                    {toggleEdit ?
                      <UploadImage
                        defaultImageUrl={profileImageNew ? profileImageNew : (ud.profile_image ? process.env.REACT_APP_API_URL + '/profile_images/' + ud.profile_image + '?p=' + RandomAlphaNumber() : null)}
                        onChange={(e) => setProfileImageNew(e)} type="image" imageType="square" />
                      :
                      <div className='border-[3px] border-solid border-[var(--colorPrimary)] rounded-[5px] p-[4px] !mb-[-1px] w-max m-auto'>
                        <Avatar shape="square" size={185} icon={<UserOutlined />} src={ud.profile_image ? process.env.REACT_APP_API_URL + '/profile_images/' + ud.profile_image : null}
                          className='!h-[unset]'
                        />
                      </div>
                    }
                  </div>
                  <div className='w-full md:w-[38.3%] md:mr-5 text-center md:text-left'>
                    <h2 className='text-[18px] font-semibold'>General User Details</h2>
                    <hr className='border-dashed border-gray-300 my-[3px]' />
                    {toggleEdit ?
                      <div className='mt-[11px] [&>*]:!mb-[7px] [&>:last-child]:!mb-0'>
                        <AntInput size="large" className="h-[48px]" name="full_name" placeholder="Full Name" />
                        <AntInput size="large" className="h-[48px]" name="street_address" placeholder="Street Address" />
                        <AntInput size="large" className="h-[48px]" name="suburb" placeholder="Suburb" />
                      </div>
                      :
                      <List
                        itemLayout="horizontal"
                        dataSource={[
                          { title: 'Full Name', description: ud.full_name },
                          { title: 'Street Address', description: ud.street_address },
                          { title: 'Suburb', description: ud.suburb }
                        ]}
                        className='[&>.ant-spin-nested-loading>.ant-spin-container>.ant-list-items>.ant-list-item:last-child]:!pb-0'
                        renderItem={(item, index) => (
                          <List.Item className='!py-[4px]'><List.Item.Meta title={<span className='font-medium'>{item.title}</span>} description={<span className='text-gray-900'>{item.description}</span>} /></List.Item>
                        )}
                      />
                    }
                  </div>
                  <div className='w-full md:w-[38.3%] md:ml-5 text-center md:text-left'>
                    <h2 className='hidden md:block text-[18px] font-semibold'>Create and Status Details</h2>
                    <hr className='hidden md:block border-dashed border-gray-300 my-[3px]' />
                    {toggleEdit ?
                      <div className='mt-[11px] [&>*]:!mb-[7px] [&>:last-child]:!mb-0'>
                        <AntInput size="large" className="h-[48px]" type="select" options={dataList} filter={true} name="state" loading={getLoader} />
                        <AntInput size="large" className="h-[48px]" name="post_code" placeholder="Post Code" />
                        <Button size="large" type="primary" htmlType="submit" className='w-full !h-[48px]' loading={btnLoader}>Update Profile</Button>
                      </div>
                      :
                      <List
                        itemLayout="horizontal"
                        dataSource={[
                          { title: 'State', description: ud.stateData.name },
                          { title: 'Post Code', description: ud.post_code },
                          { title: 'Created At', description: ud.createdDate + ', ' + ud.createdTime }
                        ]}
                        className='[&>.ant-spin-nested-loading>.ant-spin-container>.ant-list-items>.ant-list-item:last-child]:!pb-0'
                        renderItem={(item, index) => (
                          <List.Item className='!py-[4px]'><List.Item.Meta title={<span className='font-medium'>{item.title}</span>} description={<span className='text-gray-900'>{item.description}</span>} /></List.Item>
                        )}
                      />
                    }
                  </div>
                </div>
              </div>
            </Form>

          </div>
          <div className={!pr.modal ? 'col-span-3 hidden lg:block' : 'hidden'}>
            <h2 className='text-[18px] font-semibold'>Relevant Links</h2>
            <hr className='border-dashed border-gray-300 my-[3px]' />
            <div className='mt-3 [&>*]:block [&>*]:mb-[7px] [&>:last-child]:mb-0'>
              {pr.context.data.ud.type === 'ua' ?
                <NavLink to='/app/createAdminUser'>
                  <Button type="primary" size="large" className='w-full !h-[48px]' disabled={toggleEdit}>Create New User</Button>
                </NavLink>
                :
                <NavLink to='/app/buyConnects'>
                  <Button type="primary" size="large" className='w-full !h-[48px]' disabled={toggleEdit}>More Connects</Button>
                </NavLink>
              }
              <NavLink to='/app/resetPassword'>
                <Button size="large" className='btn-light w-full !h-[48px]' disabled={toggleEdit}>Reset Password</Button>
              </NavLink>

              <Button size="large" className='btn-light-danger w-full !h-[48px]' disabled={toggleEdit}>
                <Popconfirm placement="leftBottom" title="Confirm" description="Are you sure you want to logout?" onConfirm={() => navigate(Logout())} okText="Yes" cancelText="No"
                >
                  <span className='absolute top-0 left-0 right-0 bottom-0 !flex items-center justify-center'>Log out</span>
                </Popconfirm>
              </Button>

            </div>

          </div>
        </div>
      </div>
    </div>
  )//End return
}//End function

export default SMProfile;