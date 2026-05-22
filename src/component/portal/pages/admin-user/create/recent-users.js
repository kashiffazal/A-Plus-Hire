import { useState, useEffect } from 'react';
import { Avatar, Spin } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { HTTP, RandomAlphaNumber } from '../../../../services';
import ViewDetails from '../log/view-details';
import ModalGeneral from '../../../../mutualComponents/modal-general';

const RecentUsers = (pr) => {
  const [loader, setLoader] = useState(true);
  const [viewDetailModal, setViewDetailModal] = useState(false);
  const [viewData, setViewData] = useState({});
  const [list, setList] = useState([]);
  const [randQuerystring] = useState(RandomAlphaNumber());


  const GetData = () => {
    setLoader(true);
    HTTP('get', '/adminRecentUserList').then(res => {
      setLoader(false);
      if (!res) { return false; }
      setList(res.data)
    });
  }//End function

  useEffect(() => { GetData(); }, [pr.reset])

  return (
    <div>
      <div className="portal-container">
        <h2 className="mb-2 mt-[-5px] text-lg border-b border-dashed border-gray-300 pb-2"><span className="font-medium">Recent</span> Users</h2>
        <Spin tip="loading" spinning={loader}>
          {loader ? <div style={{ height: '261px' }}></div> :
            (list && list.length > 0) ?
              <div className='[&>:first-child]:pt-0 [&>:last-child]:border-none [&>:last-child]:pb-0 my-[-1px]'>
                {list.map(item => {
                  return (
                    <div key={item.id} className='flex border-b border-dashed border-gray-300 py-2'>
                      <div className='mr-3'>
                        <Avatar src={item.profile_image ? process.env.REACT_APP_API_URL + '/profile_images/' + item.profile_image + '?l=' + randQuerystring : null} icon={<UserOutlined />} 
                        className='border border-solid border-gray-300' />

                      </div>
                      <div>
                        <button className="btn-to-link-color block font-medium mb-[-5px]" onClick={() => { setViewDetailModal(true); setViewData(item) }}>{item.full_name}</button>
                        <span className='text-xs text-gray-500'>{item.status}</span>
                      </div>
                    </div>
                  )
                })}
              </div>
              :
              <div className="m-t-15">No User Yet!</div>
          }
        </Spin>
      </div>

      <ModalGeneral
        show={viewDetailModal}
        close={() => setViewDetailModal(false)}
        width={940}
        title={viewData.full_name}
        subTitle="User Details"
        hideHeaderHr={true}
        render={<ViewDetails data={viewData} />}
      />

    </div>
  );//End return
}//End function

export default RecentUsers;