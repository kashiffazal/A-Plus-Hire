import { useState, useEffect } from 'react';
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import DataTable from '../../../mutualComponents/andt-data-table-component';
import { HTTP, TableColumnFilter, GetUserCookie, TableColumnListForSelectFilter, RandomAlphaNumber } from '../../../services';
import PageTitle from '../../mutual/pate-title';
import ScreenLoader from '../../../mutualComponents/screen-loader';
import ViewDetails from './view-details';

const UsersSW = () => {
  const [getLoader, setGetLoader] = useState(true);
  const [data, setData] = useState([]);
  const [filterIndividualColArr, setFilterIndividualColArr] = useState({});
  const [tableIndividualColFilter] = useState(GetUserCookie() ? GetUserCookie().tableIndividualColFilter : {});
  const [editAndViewId, setEditAndViewId] = useState(false);
  const [openViewModal, setOpenViewModal] = useState(false);
  const [roleType, setRoleType] = useState(false);
  const [randQuerystring] = useState(RandomAlphaNumber());


  //Get data on Load
  useEffect(() => { GetDataList(); }, []);

  const GetDataList = () => {
    setGetLoader(true);
    HTTP('get', '/swListForNotAdmin').then(res => {
      setGetLoader(false);
      if (!res) { return false; }
      // console.log(res.data);
      setData(res.data);
      setFilterIndividualColArr(TableColumnListForSelectFilter(res.data));
    });
  }//End function


  const columns = [{
    title: 'Sr',
    dataIndex: 'key',
    width: '6%',
    sorter: (a, b) => a.key - b.key,
  }, {
    title: 'Img',
    dataIndex: 'profile_image',
    width: '6%',
    align: 'center',
    render: (text, row) =>
      <div className='flex justify-center'>
        <div className='overflow-hidden border border-solid border-gray-400 rounded-full w-[30px]'>
          <Avatar src={text ? process.env.REACT_APP_API_URL + '/profile_images/' + text + '?l=' + randQuerystring : null} size="small" icon={<UserOutlined />} className='blur-[2px]' />
        </div>
      </div>
  }, {
    title: 'Full Name',
    dataIndex: 'full_name',
    width: '40%',
    sorter: (a, b) => a.full_name.localeCompare(b.full_name),
    ...TableColumnFilter(tableIndividualColFilter, 'full_name', filterIndividualColArr),
    render: (record, row) => <div>{record}</div>
  }, {
    title: 'Gender',
    dataIndex: 'gender',
    width: '12%',
    sorter: (a, b) => a.gender.localeCompare(b.gender),
    ...TableColumnFilter(tableIndividualColFilter, 'gender', filterIndividualColArr),
  }, {
    title: 'Suburb',
    dataIndex: 'suburb',
    width: '12%',
    sorter: (a, b) => a.suburb.localeCompare(b.suburb),
    ...TableColumnFilter(tableIndividualColFilter, 'suburb', filterIndividualColArr),
  }, {
    title: 'Post Code',
    dataIndex: 'post_code',
    width: '12%',
    sorter: (a, b) => a.post_code.localeCompare(b.post_code),
    ...TableColumnFilter(tableIndividualColFilter, 'post_code', filterIndividualColArr),
  }, {
    title: 'Action',
    width: '12%',
    align: 'center',
    render: (record, row) => <button className='btn-to-link-color' onClick={() => { setRoleType(row.type); setEditAndViewId(row.sw_ref_id); setOpenViewModal(true); }}>View Details</button>
  }];

  return (
    <>
      <PageTitle icon='las la-handshake' title='Support Worker' titleSpan='List' desc='Support worker list with detailed view' />
      <div className='portal-container'>
        <ScreenLoader active={getLoader}>
          <DataTable
            columns={columns}
            styleType={2}
            dataSource={data}
            showSizeChanger={true}
            pagination={{ itemDetails: true, showOnSinglePage: true }}
            customFilter="true"
            customFilterLabel="Filter by"
            customFilterCol={[
              { label: 'Full Name', value: 'full_name' },
              { label: 'Street Address', value: 'street_address' },
              { label: 'Suburb', value: 'suburb' },
              { label: 'State', value: 'state' }
            ]}
          />
          <ViewDetails open={openViewModal} id={editAndViewId} close={() => setOpenViewModal(false)} type={roleType} allowMessage={true} />
        </ScreenLoader>
      </div>
    </>
  )//End return
}//End function

export default UsersSW;