import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { List, Avatar, Typography, Popover, Button, Space } from 'antd';
import { UserOutlined, QuestionCircleTwoTone } from '@ant-design/icons';
import ContextAPI from '../../../../../../../context';
import { HTTP, FormatDate, GetObjectFromArr } from '../../../../../../services';
import ScreenLoader from '../../../../../../mutualComponents/screen-loader';
import EditFormModal from '../../../../users/partial/form-modal';
import SendMsgModal from './send-msg-modal';
import ProfileModal from '../../../../profile/partial/profile-modal';
import bgImage from '../bg-cover.jpg';



const SWProfile = (pr) => {
  const context = useContext(ContextAPI);
  const navigate = useNavigate();

  const [loader, setLoader] = useState(true);
  const [data, setData] = useState({ userData: {} });
  const [aboutReadMore, setAboutReadMore] = useState(true);
  const [openForm, setOpenForm] = useState(false);
  const [openSendMsgModal, setOpenSendMsgModal] = useState(false);
  const [openProfileForm, setOpenProfileForm] = useState(false);

  const GetData = (id) => {
    setLoader(true);
    HTTP('get', '/swViewDetails/' + id).then(res => {
      setLoader(false);
      if (!res) { return false; }
      // console.log(res.data);
      // console.log(res.data.days_availability);
      // res.days_availability
      setData(res.data);
    });
  }//End function

  useEffect(() => { pr.id && GetData(pr.id); }, [pr.id])
  const admin = context.data.ud.type === 'ua' ? true : false;
  const lastMessage = (data.userData.messageData && data.userData.messageData[0] && data.userData.messageData[0].id) ? data.userData.messageData[0] : {};
  return (
    <>
      <ScreenLoader active={loader}>

        <div className="w-auto h-[100px] md:h-[150px] bg-cover rounded-xl m-[-10px] md:m-0" style={{ backgroundImage: `url(${bgImage})` }}></div>
        <div className='portal-container !bg-white/80 backdrop-blur-xl !rounded-xl mt-[-80px] mx-0 md:mx-10'>
          <div className='grid grid-cols-1 lg:grid-cols-2 items-center'>
            <div className={`text-center ${admin ? 'mb-3' : ''} lg:m-0 lg:text-left lg:flex items-center`}>
              <div className='m-auto mb-3 lg:m-0 lg:mr-5 border-[3px] border-solid border-[var(--colorPrimary)] rounded-[5px] p-[4px] w-fit'>
                <div className='overflow-hidden'>
                  <Avatar shape="square" size={100} icon={<UserOutlined />} src={data.userData.profile_image ? process.env.REACT_APP_API_URL + '/profile_images/' + data.userData.profile_image : null}
                    // className={`!h-[unset] ${(context.data.ud.type !== 'ua' && context.data.ud.type !== 'sw' && !lastMessage.id) ? 'blur-sm' : ''}`}
                  />
                </div>
              </div>
              <div>
                <h3 className={context.data.h2}>{data.userData.full_name}</h3>
                <p className='text-lg'>{data.userData.role}</p>
                <p>
                  {(context.data.ud.type === 'ua' || lastMessage.id) && data.userData.street_address + ', ' + data.userData.state + ', '}
                  {data.userData.suburb}, {data.userData.post_code}</p>
                <p>
                  <span className='font-medium'>DOB :</span> {data.userData.date_of_birth}
                  <span className='font-medium ml-2'>Age :</span> {data.userData.age}
                </p>
              </div>
            </div>
            {admin ?
              <div className='md:flex items-center justify-between'>
                <div className='text-center mb-3 md:mb-0 md:text-left'>
                  <p><span className='font-medium'>Current Plan :</span> {data.userData.package_name ? data.userData.package_name : 'No Plan'}</p>
                  {/* <p><span className='font-medium'>Recurring Type :</span> {data.userData.package_name ? (data.userData.package_monthly ? 'Monthly' : 'Yearly')}</p> */}
                  <p><span className='font-medium'>How heard of us :</span> {data.userData.hear_about_us}</p>
                </div>
                <div className='text-center md:text-right'>
                  <p className='font-medium'>Status : <span className={`${data.userData.status === 'Active' ? 'success-link' : 'danger-link'} font-semibold`}>{data.userData.status}</span></p>
                  <p><span className='font-medium'>Username :</span> {data.userData.username}</p>
                  <p><span className='font-medium'>Password :</span> {data.userData.password}</p>
                </div>
              </div>
              :
              <div className='text-right'>
                {context.data.ud.type === 'sw' &&
                  <Space.Compact block className='justify-end'>
                    <Button type="primary" onClick={() => setOpenProfileForm(true)}><i className='las la-user' />&nbsp;Edit Profile</Button>
                    <Button type="primary" onClick={() => setOpenForm(true)}><i className='las la-edit' />&nbsp;Edit Details</Button>
                  </Space.Compact>
                }
                {context.data.ud.type !== 'sw' &&
                  (context.data.ud.connects > 0 ?
                    (pr.allowMessage &&
                      <Button type="primary" size="large" onClick={() => setOpenSendMsgModal(true)}>
                        {lastMessage.id ?
                          <><i className='las la-check-circle' />&nbsp;Message Sent</>
                          :
                          <><i className='las la-comments' />&nbsp;Message</>
                        }
                      </Button>)
                    :
                    <Button type="primary" size="large" onClick={() => navigate('/app/buyConnects')}>Buy Connects To Contact</Button>
                  )}
                {lastMessage.id && <div className='text-[12px] text-gray-700 mt-2'>Last Message Sent at {FormatDate(lastMessage.updatedAt, 'DD-MM-YYYY hh:mm A')} </div>}
              </div>
            }
          </div>
        </div>

        <div className='mt-5 grid md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-2 md:gap-5'>
          <div className='lg:col-span-2 xl:col-span-2 portal-container !rounded-xl'>
            <h2 className='text-[18px] font-semibold'>About Me</h2>
            <hr className='border-dashed border-gray-300 my-[3px]' />
            <div className={`pt-1 mb-1 whitespace-pre-wrap h-[207px] ${!aboutReadMore ? 'border-b border-solid border-grey-300 overflow-auto' : ''}`}>
              <Typography.Paragraph ellipsis={aboutReadMore ? { rows: 6, expandable: true, symbol: ' ' } : false}>
                {data.about_you}
              </Typography.Paragraph>
            </div>
            <button onClick={() => setAboutReadMore(!aboutReadMore)} className='text-[var(--colorPrimary)]'>{aboutReadMore ? 'Read More' : 'Hide Text'}</button>
          </div>

          <div className='portal-container !rounded-xl'>
            <h2 className='text-[18px] font-semibold'>General Details</h2>
            <hr className='border-dashed border-gray-300 my-[3px]' />
            <List
              itemLayout="horizontal"
              dataSource={[
                { title: 'Gender', description: (data.gender === 'Prefer to self-describe' ? data.self_describe_explain : data.gender) },
                { title: 'Country to Born', description: data.userData.country_to_born },
                { title: 'Main Language', description: (data.is_english_main_language === 'Yes' ? 'English' : data.main_language) },
                {
                  title: 'Other Language', description: <span>
                    {data.other_language_name ? data.other_language_name.map(item => {
                      return <span key={item.name} className='inline-block mr-[4px] mb-[4px] rounded py-[3px] px-[8px] bg-[#d0fdb9]'>{item.name}</span>
                    }) : '-'}
                  </span>
                }]}
              className='[&>.ant-spin-nested-loading>.ant-spin-container>.ant-list-items>.ant-list-item:last-child]:!pb-0'
              renderItem={(item, index) => (
                <List.Item className='!py-[4px]'><List.Item.Meta title={<span className='font-medium'>{item.title}</span>} description={<span className='text-gray-900'>{item.description}</span>} /></List.Item>
              )}
            />
          </div>

          <div className='portal-container !rounded-xl'>
            <h2 className='text-[18px] font-semibold'>Emergency Contact</h2>
            <hr className='border-dashed border-gray-300 my-[3px]' />
            <List
              itemLayout="horizontal"
              dataSource={[
                { title: 'Full Name', description: data.emergency_name },
                { title: 'Email Address', description: data.emergency_email },
                { title: 'Contact Number', description: data.emergency_contact },
                { title: 'Relationship', description: data.emergency_relationship }
              ]}
              className='[&>.ant-spin-nested-loading>.ant-spin-container>.ant-list-items>.ant-list-item:last-child]:!pb-0'
              renderItem={(item, index) => (
                <List.Item className='!py-[4px]'><List.Item.Meta title={<span className='font-medium'>{item.title}</span>} description={<span className='text-gray-900'>{item.description}</span>} /></List.Item>
              )}
            />
          </div>

          <div className='portal-container !rounded-xl'>
            <h2 className='text-[18px] font-semibold'>Availability</h2>
            <hr className='border-dashed border-gray-300 my-[3px]' />

            {data.availability === 'Hours in detail' ?

              <div className='mt-2 grid grid-cols-4 gap-2 [&>*]:text-xs sm:[&>*]:text-sm [&>*]:text-center'>
                <div className='font-semibold !text-left'>Day</div>
                <div className='font-semibold'>From</div>
                <div className='font-semibold'>To</div>
                <div className='font-semibold'>Availability</div>
                {data.days_availability && Object.keys(data.days_availability.day).map(item => {
                  var avail = data.days_availability.not_available[item];
                  return (
                    <React.Fragment key={item}>
                      <div className='!text-left'>{data.days_availability.day[item]}</div>
                      <div>{data.days_availability.from[item]}</div>
                      <div>{data.days_availability.to[item]}</div>
                      <div>{avail ?
                        <span className='danger-link'><i className='las la-times-circle' /> Available</span> :
                        <span className='success-link'><i className='las la-check-circle' /> Available</span>}
                      </div>
                    </React.Fragment>
                  )
                })}
              </div>
              :
              data.availability
            }
          </div>

          <div className='portal-container !rounded-xl'>
            <h2 className='text-[18px] font-semibold'>Medical Details</h2>
            <hr className='border-dashed border-gray-300 my-[3px]' />
            <List
              itemLayout="horizontal"
              dataSource={[
                {
                  title:
                    <div className='flex items-center justify-between'>
                      <div>Any disability or health conditions?</div>
                      <Popover placement="topRight" content={'Do i ever had any disability or health conditions including, allergies, illnesses, injuries or diseases lasting for more than 6 months and that may adversely impact on your abilities to carry out the duties of your role?'} trigger="hover">
                        <QuestionCircleTwoTone />
                      </Popover>
                    </div>
                  , description: (data.any_health_conditions === 'Yes' ? data.any_health_conditions_details : data.any_health_conditions)
                },
                {
                  title:
                    <div className='flex items-center justify-between'>
                      <div>Any pre-existing injury or disease?</div>
                      <Popover placement="topRight" content={'Do i have any pre-existing injury or disease which i am aware of or could reasonably be expected to foresee, that could be affected by the nature of the duties and responsibilities of the position for which i am applying?'} trigger="hover">
                        <QuestionCircleTwoTone />
                      </Popover>
                    </div>
                  , description: (data.any_existing_injury === 'Yes' ? data.any_existing_injury_details : data.any_existing_injury)
                },
                {
                  title:
                    <div className='flex items-center justify-between'>
                      <div>Am i identify as LGBTIQ+?</div>
                      <Popover placement="topRight" content={'Am i identify as Lesbian, Gay, Bi-Sexual, Transgender, Intersex and/or Queer?'} trigger="hover">
                        <QuestionCircleTwoTone />
                      </Popover>
                    </div>
                  , description: data.identify_as_lesbian
                },
                {
                  title:
                    <div className='flex items-center justify-between'>
                      <div>Guilt and/or pending police charges?</div>
                      <Popover placement="topRight" content={'Am i have any convictions, finding of guilt and/or pending police charges against me that are less than 10 years old?'} trigger="hover">
                        <QuestionCircleTwoTone />
                      </Popover>
                    </div>
                  , description: data.any_guilt
                },
              ]}
              className='[&>.ant-spin-nested-loading>.ant-spin-container>.ant-list-items>.ant-list-item:last-child]:!pb-0'
              renderItem={(item, index) => (
                <List.Item className='!py-[4px]'><List.Item.Meta title={<span className='font-medium'>{item.title}</span>} description={<span className='text-gray-900'>{item.description}</span>} /></List.Item>
              )}
            />
          </div>

          <div className='lg:col-span-2 xl:col-span-3 portal-container !rounded-xl'>
            <h2 className='text-[18px] font-semibold'>Work Experience</h2>
            <hr className='border-dashed border-gray-300 my-[3px]' />
            <List
              itemLayout="horizontal"
              dataSource={[
                { title: 'Any disability support worker experience?', description: data.have_experience },
                data.have_experience === 'Yes' && { title: 'How many years of experience i have?', description: data.years_of_experience }
              ]}
              className='[&>.ant-spin-nested-loading>.ant-spin-container>.ant-list-items>.ant-list-item:last-child]:!pb-0'
              renderItem={(item, index) => (
                <List.Item className='!py-[4px]'><List.Item.Meta title={<span className='font-medium'>{item.title}</span>} description={<span className='text-gray-900'>{item.description}</span>} /></List.Item>
              )}
            />
            {(data.have_experience === 'Yes' && data.years_of_experience) &&
              <div className="mt-2 overflow-x-auto">
                <table className="min-w-full border border-solid border-gray-300">
                  <thead className="bg-gray-50">
                    <tr className='[&>*]:p-2 [&>*]:text-xs [&>*]:border-b [&>*]:border-solid [&>*]:border-gray-300 divide-x divide-gray-300'>
                      <th className="text-left uppercase tracking-wider">Job Title</th>
                      <th className="text-left uppercase tracking-wider">Company Name</th>
                      <th className="text-left uppercase tracking-wider">Industry</th>
                      <th className="text-left uppercase tracking-wider">Job Role</th>
                      <th className="uppercase tracking-wider">Start Time</th>
                      <th className="uppercase tracking-wider">End Time</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white">
                    {/* {JSON.stringify(data.work_experience)} */}
                    {data.work_experience && Object.keys(data.work_experience.job_title).map(item => {
                      var still = data.work_experience.still_working ? data.work_experience.still_working[item] : false;
                      var industryId = data.work_experience.industry[item];
                      return (
                        <tr key={item} className='[&>*]:p-2 [&>*]:text-sm [&>*]:whitespace-nowrap [&>*]:border-b [&>*]:border-solid [&>*]:border-gray-300 divide-x divide divide-gray-300'>
                          <td>{data.work_experience.job_title[item]}</td>
                          <td>{data.work_experience.company_name[item]}</td>
                          <td>{(data.work_experience_industry_name && industryId) && GetObjectFromArr(industryId, 'id', data.work_experience_industry_name).name}</td>
                          <td>{data.work_experience.job_role[item]}</td>
                          <td className="text-center">{FormatDate(data.work_experience.start_date[item])}</td>
                          <td className="text-center">{still ?
                            <span className='success-link'>Still Working</span> :
                            <span>{FormatDate(data.work_experience.end_date[item])}</span>}
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            }
          </div>
        </div>

        <div className='mt-5 grid grid-cols-1 md:grid-cols-2 gap-5'>
          <div className='portal-container !rounded-xl'>
            <h2 className='text-[18px] font-semibold'>Other Experience</h2>
            <hr className='border-dashed border-gray-300 my-[3px]' />
            <List
              itemLayout="horizontal"
              dataSource={[
                {
                  title: 'Other experience is the following?', description: <span>
                    {data.further_experience && data.further_experience.map(item => {
                      return <span key={item.id} className='inline-block mr-[4px] mb-[4px] rounded py-[3px] px-[8px] bg-[#d0fdb9]'>{item.name}</span>
                    })}
                    {data.further_experience_other && <span className='inline-block mr-[4px] mb-[4px] rounded py-[3px] px-[8px] bg-[#d0fdb9]'>{data.further_experience_other}</span>}
                  </span>
                }
              ]}
              className='[&>.ant-spin-nested-loading>.ant-spin-container>.ant-list-items>.ant-list-item:last-child]:!pb-0'
              renderItem={(item, index) => (
                <List.Item className='!py-[4px]'><List.Item.Meta title={<span className='font-medium'>{item.title}</span>} description={<span className='text-gray-900'>{item.description}</span>} /></List.Item>
              )}
            />

            <h2 className='mt-4 text-[18px] font-semibold'>Work Status</h2>
            <hr className='border-dashed border-gray-300 my-[3px]' />
            <List
              itemLayout="horizontal"
              dataSource={[
                { title: 'Your work status in Australia', description: data.work_status },
                {
                  title: 'What kind of support i am willing to provide?', description: <span>
                    {data.willing_to_provide && data.willing_to_provide.map(item => {
                      return <span key={item.id} className='inline-block mr-[4px] mb-[4px] rounded py-[3px] px-[8px] bg-[#d0fdb9]'>{item.name}</span>
                    })}
                    {data.willing_to_provide_other && <span className='inline-block mr-[4px] mb-[4px] rounded py-[3px] px-[8px] bg-[#d0fdb9]'>{data.willing_to_provide_other}</span>}
                  </span>
                }
              ]}
              className='[&>.ant-spin-nested-loading>.ant-spin-container>.ant-list-items>.ant-list-item:last-child]:!pb-0'
              renderItem={(item, index) => (
                <List.Item className='!py-[4px]'><List.Item.Meta title={<span className='font-medium'>{item.title}</span>} description={<span className='text-gray-900'>{item.description}</span>} /></List.Item>
              )}
            />
          </div>


          <div className='portal-container !rounded-xl'>
            <h2 className='text-[18px] font-semibold'>Other Details</h2>
            <hr className='border-dashed border-gray-300 my-[3px]' />
            <List
              itemLayout="horizontal"
              dataSource={[
                { title: 'Aboriginal or Torres Strait Islander origin?', description: data.cultural_diversity },


                {
                  title:
                    <div className='flex items-center justify-between'>
                      <div>Am i of (CALD) background?</div>
                      <Popover placement="topLeft" content={'Am i of a culturally and / or linguistically Diverse (CALD) background?'} trigger="hover">
                        <QuestionCircleTwoTone />
                      </Popover>
                    </div>
                  , description: data.clad_background
                },


                { title: 'Gender Preferences', description: (data.gender_preferences === 'Prefer to self-describe' ? data.gender_preferences_other : data.gender_preferences) },
                { title: 'Car with Driving License', description: data.have_car + (data.is_car_insurance === 'Yes' ? ' (Insured)' : ' (Not Insured)') },
                { title: 'KM i am happy to travel', description: (data.km_to_travel === 'Other') ? data.km_to_travel_other : data.km_to_travel },
              ]}
              className='[&>.ant-spin-nested-loading>.ant-spin-container>.ant-list-items>.ant-list-item:last-child]:!pb-0'
              renderItem={(item, index) => (
                <List.Item className='!py-[4px]'><List.Item.Meta title={<span className='font-medium'>{item.title}</span>} description={<span className='text-gray-900'>{item.description}</span>} /></List.Item>
              )}
            />
          </div>

        </div>

      </ScreenLoader>
      <EditFormModal open={openForm} id={data.id} close={() => setOpenForm(false)} type={data.userData.type} callBack={() => GetData(pr.id)} />
      <SendMsgModal open={openSendMsgModal} close={() => setOpenSendMsgModal(false)} data={{ ...data.userData, swData: data }}
        updateLastMessageSent={(e, k) => {
          let dt = { ...data };
          lastMessage.updatedAt = e;
          if (k) { lastMessage.id = k; }
          dt['userData']['messageData'][0] = lastMessage;
          setData(dt);
        }} />
      <ProfileModal open={openProfileForm} close={() => setOpenProfileForm(false)} updateData={(e) => {
        let dt = { ...data };
        dt.userData = { ...data.userData, ...e };
        setData(dt);
      }} editMode={true} />
    </>
  )//End return
}//End function

export default SWProfile