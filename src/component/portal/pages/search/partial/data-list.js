import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Avatar, Pagination, Result, Button, Tooltip } from 'antd';
import { UserOutlined, EnvironmentOutlined, LockFilled } from '@ant-design/icons';
import ContextAPI from '../../../../../context';
import ScreenLoader from '../../../../mutualComponents/screen-loader';
import FilterTags from './filter-tags';
import ViewSWDetails from '../../users/partial/view-details';
import SendMsgModal from '../../users/partial/view-details/sw/send-msg-modal';
import { FormatDate } from '../../../../services';
const DataList = (pr) => {
  const navigate = useNavigate();
  const context = useContext(ContextAPI);
  const [viewId, setViewId] = useState(false);
  const [openViewModal, setOpenViewModal] = useState(false);
  const [segment, setSegment] = useState('block');
  const [openSendMsgModal, setOpenSendMsgModal] = useState(false);
  const [sendMsgModalData, setSendMsgModalData] = useState({});
  const [selectedItemIndex, setSelectedItemIndex] = useState(false);

  const PaginationSet = (page, pageSize) => {
    let offset = (page - 1) * pageSize; //skip
    let limit = pageSize;
    pr.setPaginationObj({ offset, limit })
    pr.setPaginationLimit(pageSize);
    // console.log(offset, limit);
  }//End function

  const data = (pr.data && pr.data.length > 0) ? pr.data : false;
  return (
    <>

      {!pr.web &&
        (
          (pr.tagsData.userCondition && Object.keys(pr.tagsData.userCondition).length > 0) ||
          (pr.tagsData.swCondition && Object.keys(pr.tagsData.swCondition).length > 0)
        ) &&
        <FilterTags tags={pr.tagsData} listData={pr.listData} onCloseTag={pr.onCloseTag} setSegment={e => setSegment(e)} defaultSegment={segment} />
      }

      <ScreenLoader active={pr.loader}>
        {data ?
          <div className={`grid grid-cols-1 ${segment === 'block' ? (pr.web ? 'lg:grid-cols-3' : 'lg:grid-cols-2') : ''} ${pr.context.data ? pr.context.data.portal_grid_gap : 'gap-3'}`}>
            {data && data.map((item, index) => {
              return <div key={index} className="portal-container relative hover:border-[var(--colorPrimary)] transition-slow hover:!shadow-none">
                <div className={pr.blurAfterNumber ? ((index + 1) > pr.blurAfterNumber[0] ? pr.blurAfterNumber[1] : '') : ''}>
                  <div className={(pr.web && pr.userType !== 'sw') ? 'h-48 grid grid-cols-1 gap-4 content-between' : ''}>
                    <div>
                      <div className='flex items-center justify-between border-b border-solid border-[var(--colorPrimary)] m-[-20px] py-[15px] px-[20px] mb-0'>
                        <div className='flex items-center'>
                          <div className='border-2 border-solid border-[var(--colorPrimary)] rounded-full p-[1px]'>
                            <div className='overflow-hidden'>
                              <Avatar shape="circle" size={50} icon={<UserOutlined />}
                                src={item.profile_image ? process.env.REACT_APP_API_URL + '/profile_images/' + item.profile_image : null}
                              // className={item.messageData[0] ? '' : 'blur-sm'}
                              // src={item.profile_image}
                              />
                            </div>
                          </div>
                          <div className='ml-3'>
                            <div className='text-lg font-bold leading-6'>{item.full_name}</div>
                            <div>
                              <EnvironmentOutlined className='text-sm mr-1' />
                              {/* <i className='las la-map-marker ml-[-4px]' /> */}
                              <span className='text-sm'>
                                {item.messageData[0] && item.street_address + ', ' + item.state + ', '}{item.suburb}, {item.post_code}
                              </span>
                              {/* {pr.web ?
                                <span className='text-sm'>{item.suburb}, {item.post_code}</span> :
                                <span className='text-sm'>{item.suburb}, {item.post_code}</span>
                              } */}
                            </div>
                          </div>
                        </div>
                        {/* {JSON.stringify(item.messageData)} */}
                        {!pr.web && <div className='text-right ml-1'>
                          <Button type="primary" size="small" className='w-[75px] mb-1' onClick={() => { setViewId(item.swData.id); setOpenViewModal(true); }}>Details</Button><br />
                          {context.data.ud.connects > 0 ?
                            <Button type="primary" ghost size="small" className='w-[75px]' onClick={() => { setOpenSendMsgModal(true); setSendMsgModalData(item); setSelectedItemIndex(index) }}>
                              {item.messageData[0] ?
                                <Tooltip placement="bottomRight" title={<span>Last message sent at <br />{FormatDate(item.messageData[0].updatedAt, 'DD-MM-YYYY hh:mm A')}</span>}>
                                  <span><i className='las la-check-circle relative top-[1px] text-[16px]' />&nbsp;Sent</span>
                                </Tooltip>
                                :
                                'Message'
                              }
                            </Button>
                            :
                            <button onClick={() => navigate('/app/buyConnects')} className='btn-to-link-color text-[12px]'>Buy Connects</button>
                          }
                        </div>}
                      </div>
                      <div className='mt-0 m-[-20px] py-[15px] px-[20px]'>
                        <span className={`text-sm ${segment === 'block' ? 'line-clamp-3' : 'line-clamp-5'}`}>{item.swData.about_you}</span>
                      </div>
                    </div>
                    {(pr.web && pr.userType !== 'sw') && <>
                      {pr.loginType ?
                        <Button type="primary" className='w-full' onClick={() => { setViewId(item.swData.id); setOpenViewModal(true); }}>View Full Profile</Button>
                        :
                        <Button className='w-full !text-gray-500 bg-gray-200 !border-gray-400' onClick={() => navigate('/registration')}><LockFilled /> Sign up to view full profile</Button>
                      }
                    </>}
                  </div>
                </div>
              </div>
            })}
          </div>
          :
          !pr.web &&
          <div className='portal-container'>
            <Result
              status="500"
              title=""
              subTitle="Please select some filter to find Support Workers from the database"
            />
          </div>
        }
      </ScreenLoader>

      {(data && !pr.web) &&
        <div className='portal-container mt-3 !py-[22px] !border-t !border-solid !border-t-[var(--colorPrimary)] !rounded-t-none !bg-[var(--bgPrimary)]'>
          {/* sticky z-[1000] bottom-0 */}
          <div className='grid grid-cols-12 items-center'>
            <div className='col-span-12 xl:col-span-3 [&>span]:block [&>span]:text-center [&>span]:pb-3 [&>span]:xl:text-left [&>span]:xl:pb-0'><ScreenLoader active={pr.loader} inline={true} tip={<span className='text-lg'>Loading Data, Please wait...</span>} /></div>
            <div className='col-span-12 xl:col-span-9 text-center xl:text-right'>

              <Pagination
                // size="small"
                total={pr.totalCountPagination}
                showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
                defaultPageSize={pr.paginationLimit}
                pageSize={pr.paginationLimit}
                // showSizeChanger={false}
                showLessItems={true}
                responsive={true}
                onChange={(page, pageSize) => PaginationSet(page, pageSize)}
              />

            </div>
          </div>
        </div>
      }
      <ViewSWDetails open={openViewModal} id={viewId} close={() => setOpenViewModal(false)} type='sw' allowMessage={true} />
      <SendMsgModal open={openSendMsgModal} close={() => setOpenSendMsgModal(false)} data={sendMsgModalData}
        updateLastMessageSent={(e, k) => {
          pr.updateLastMessageSent(e, selectedItemIndex);
          if (!sendMsgModalData.messageData[0].id) {
            sendMsgModalData.messageData[0] = { ...sendMsgModalData.messageData[0], id: k };
            setSendMsgModalData(selectedItemIndex);
          }//End if condition
        }}
      />
    </>
  )//End return
}//End function

export default DataList;