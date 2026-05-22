import { useState, useEffect } from 'react';
import { Popconfirm, Tooltip, Avatar, Popover } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import DataTable from '../../../../mutualComponents/andt-data-table-component';
import { HTTP, TableColumnFilter, GetUserCookie, TableColumnListForSelectFilter, LogResetRow, RandomAlphaNumber } from '../../../../services';
import ScreenLoader from '../../../../mutualComponents/screen-loader';
import FormModal from './form-modal';
import ViewDetails from './view-details';

const SMList = () => {
  const [openForm, setOpenForm] = useState(false);
  const [getLoader, setGetLoader] = useState(true);
  const [updateStatusLoader, setUpdateStatusLoader] = useState({});
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
    HTTP('get', '/smList').then(res => {
      setGetLoader(false);
      if (!res) { return false; }
      // console.log(res.data);
      setData(res.data);
      setFilterIndividualColArr(TableColumnListForSelectFilter(res.data));
    });
  }//End function


  const UpdateStatus = (row, status) => {
    setUpdateStatusLoader({ [row.id]: true });
    HTTP('get', '/smUpdateStatus/' + row.id + '/' + status).then(res => {
      setUpdateStatusLoader({ [row.id]: false });
      if (!res) { return false; }
      row.status = status;
      let newData = LogResetRow(row, data);
      setData(newData);
      setFilterIndividualColArr(TableColumnListForSelectFilter(newData));
    });
  }//End function

  const activeStatus = 'Active';
  const inActiveStatus = 'In Active';

  const columns = [{
    title: 'Sr',
    dataIndex: 'key',
    width: '5%',
    sorter: (a, b) => a.key - b.key,
  }, {
    title: 'Img',
    dataIndex: 'profile_image',
    width: '5%',
    align: 'center',
    render: (text, row) =>
      <Avatar src={text ? process.env.REACT_APP_API_URL + '/profile_images/' + text + '?l=' + randQuerystring : null} size="small" icon={<UserOutlined />} className='border border-solid border-gray-300' />
  }, {
    title: 'Full Name',
    dataIndex: 'full_name',
    width: '21%',
    sorter: (a, b) => a.full_name.localeCompare(b.full_name),
    ...TableColumnFilter(tableIndividualColFilter, 'full_name', filterIndividualColArr),
    render: (record, row) => <div>{record}</div>
  }, {
    title: 'Email',
    dataIndex: 'email',
    width: '21%',
    sorter: (a, b) => a.email.localeCompare(b.email),
    ...TableColumnFilter(tableIndividualColFilter, 'email', filterIndividualColArr),
  }, {
    title: 'Mobile',
    dataIndex: 'mobile_number',
    width: '10%',
    sorter: (a, b) => a.mobile_number.localeCompare(b.mobile_number),
    ...TableColumnFilter(tableIndividualColFilter, 'mobile_number', filterIndividualColArr),
  }, {
    title: 'Suburb',
    dataIndex: 'suburb',
    width: '10%',
    sorter: (a, b) => a.suburb.localeCompare(b.suburb),
    ...TableColumnFilter(tableIndividualColFilter, 'suburb', filterIndividualColArr),
  }, {
    title: 'State',
    dataIndex: 'state',
    width: '10%',
    sorter: (a, b) => a.state.localeCompare(b.state),
    ...TableColumnFilter(tableIndividualColFilter, 'state', filterIndividualColArr),
  }, {
    title: 'Status',
    dataIndex: 'status',
    width: '8%',
    align: 'center',
    className: 'center-col',
    sorter: (a, b) => a.status.localeCompare(b.status),
    ...TableColumnFilter(tableIndividualColFilter, 'status', filterIndividualColArr),
    render: (record) => <span className={`${record === activeStatus ? 'success-link' : 'danger-link'} font-semibold`}>{record}</span>
  }, {
    title: 'Action',
    width: '10%',
    align: 'center',
    render: (record, row) =>
      <ScreenLoader active={updateStatusLoader[row.id]} inline={true} tip="Loading...">
        <div className="menu-icon-container">
          <Tooltip placement="topRight" title='View Details' mouseEnterDelay={0.5}>
            <button onClick={() => { setRoleType(row.type); setEditAndViewId(row.sm_ref_id); setOpenViewModal(true); }}><i className="las la-table" /></button>
          </Tooltip>
          <i className="las la-redo" />
          {row.complete_by_type ?
            <Tooltip placement="top" title='Edit' mouseEnterDelay={0.5}>
              <button onClick={() => { setRoleType(row.type); setEditAndViewId(row.sm_ref_id); setOpenForm(true); }}><i className="las la-edit" /></button>
            </Tooltip>
            :
            <Popover placement="topLeft" content={`This user did not complete their ${row.role} profile.`} title="Can not edit data">
              <button><i className="las la-exclamation-circle pending-link" /></button>
            </Popover>
          }
          <i className="las la-redo" />
          {/* &nbsp;&nbsp;|&nbsp;&nbsp; */}
          {row.status === activeStatus ?
            <Popconfirm
              placement="topRight"
              title={<span>Are you sure to change status as "{inActiveStatus}" for this user?&nbsp;&nbsp;</span>}
              description={<span>Users with <strong>{inActiveStatus}</strong> status will not show in search results.&nbsp;&nbsp;</span>}
              onConfirm={() => UpdateStatus(row, inActiveStatus)}
              okText="Yes"
              cancelText="No"
            >
              <button type="button">
                <Tooltip placement="bottomRight" title={`Change Status as ${inActiveStatus}`} mouseEnterDelay={0.5}>
                  <i className="las la-times-circle danger-link" />
                </Tooltip>
              </button>
            </Popconfirm>
            :
            <Popconfirm
              placement="topRight"
              title={<span>Are you sure to changes status as {activeStatus} for this user?&nbsp;&nbsp;</span>}
              description={<span>Users with <strong>{activeStatus}</strong> status will show in search results.&nbsp;&nbsp;</span>}
              onConfirm={() => UpdateStatus(row, activeStatus)}
              okText="Yes"
              cancelText="No"
            >
              <button type="button">
                <Tooltip placement="bottomRight" title={`Change Status as ${activeStatus}`} mouseEnterDelay={0.5}>
                  <i className="las la-check-circle success-link" />
                </Tooltip>
              </button>
            </Popconfirm>
          }
        </div>
      </ScreenLoader>
  }];

  return (
    <ScreenLoader active={getLoader}>
      <DataTable
        columns={columns}
        styleType={2}
        dataSource={data}
        showSizeChanger={true}
        pagination={{ itemDetails: true, showOnSinglePage: true }}
        customFilter="true"
        customFilterLabel="Filter by"
        label=<span className='font-semibold'>Self-Managed Participant <span className='text-[var(--colorPrimary)]'>Log</span></span>
        desc="Self-Managed with view, edit and change status functionality"
        customFilterCol={[
          { label: 'Full Name', value: 'full_name' },
          { label: 'Email', value: 'email' },
          { label: 'Mobile', value: 'mobile_number' },
          { label: 'Suburb', value: 'suburb' },
          { label: 'State', value: 'state' },
          { label: 'Status', value: 'status' }
        ]}
      />
      <FormModal open={openForm} id={editAndViewId} close={() => setOpenForm(false)} updateData={(e) => setData(LogResetRow(e, data))} type={roleType} />
      <ViewDetails open={openViewModal} id={editAndViewId} close={() => setOpenViewModal(false)} type={roleType} />
    </ScreenLoader>
  )//End return
}//End function

export default SMList;