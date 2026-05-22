import React, { useEffect, useState } from 'react';
import { Button, Avatar, Tooltip, Popconfirm } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import DataTable from '../../../../mutualComponents/andt-data-table-component';
import { HTTP, TableColumnFilter, TableColumnListForSelectFilter, GetUserCookie, LogResetRow, LogResetList, RandomAlphaNumber } from '../../../../services';
import PageTitle from '../../../mutual/pate-title';
import ScreenLoader from '../../../../mutualComponents/screen-loader';
import ViewDetails from './view-details';
import CreateAdminUserFormModal from '../create/form-modal';
import ModalGeneral from '../../../../mutualComponents/modal-general';

const AdminUserLog = () => {
  const [openForm, setOpenForm] = useState(false);
  const [getDataLoader, setGetDataLoader] = useState(true);
  const [updateStatusLoader, setUpdateStatusLoader] = useState({});
  const [listData, setListData] = useState([]);
  // const [modalVisible, setModalVisible] = useState(false);
  const [filterIndividualColArr, setFilterIndividualColArr] = useState({});
  const [tableIndividualColFilter] = useState(GetUserCookie() ? GetUserCookie().tableIndividualColFilter : {});
  const [editAndViewId, setEditAndViewId] = useState(false);
  const [userViewData, setUserViewData] = useState([]);
  const [openViewModal, setOpenViewModal] = useState(false);
  const [randQuerystring] = useState(RandomAlphaNumber());

  const GetData = () => {
    setGetDataLoader(true);
    HTTP('get', '/adminUserList').then(res => {
      //console.log(res);
      setGetDataLoader(false);
      if (!res) { return false; }
      setListData(res.data);
      setFilterIndividualColArr(TableColumnListForSelectFilter(res.data))
    });
  }//End function

  const AppendOrUpdateData = (action, values) => {
    var newData = [];
    if (action === 'add') {
      newData = LogResetList(values, listData);
    }//End if condition
    if (action === 'update') {
      newData = LogResetRow(values, listData);
    }//End if condition
    // console.log(newData);
    setListData(newData);
  }//End if condition

  const UpdateStatus = (row, status) => {
    setUpdateStatusLoader({ ...updateStatusLoader, [row.id]: true });
    HTTP('get', '/adminUserStatus/' + row.id + '/' + status).then(res => {
      setUpdateStatusLoader({ ...updateStatusLoader, [row.id]: false });
      if (!res) { return false; }
      row.status = status;
      let newData = LogResetRow(row, listData);
      setListData(newData);
      setFilterIndividualColArr(TableColumnListForSelectFilter(newData));
    });
  }//End function

  useEffect(() => { GetData(); }, [])

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
    width: '17%',
    sorter: (a, b) => a.full_name.localeCompare(b.full_name),
    ...TableColumnFilter(tableIndividualColFilter, 'full_name', filterIndividualColArr),
    render: (text, row) =>
      <button className="btnToLink w-full text-left" onClick={() => { setUserViewData(row); setOpenViewModal(true); }}> {row.full_name}</button>
  }, {
    title: 'Email Address',
    dataIndex: 'email',
    width: '22%',
    sorter: (a, b) => a.email.localeCompare(b.email),
    ...TableColumnFilter(tableIndividualColFilter, 'email', filterIndividualColArr),
  }, {
    title: 'Mobile Number',
    dataIndex: 'mobile_number',
    width: '13%',
    sorter: (a, b) => a.mobile_number - b.mobile_number,
    ...TableColumnFilter(tableIndividualColFilter, 'mobile_number', filterIndividualColArr),
  }, {
    title: 'Status',
    dataIndex: 'status',
    width: '11%',
    align: 'center',
    className: 'center-col',
    sorter: (a, b) => a.status.localeCompare(b.status),
    ...TableColumnFilter(tableIndividualColFilter, 'status', filterIndividualColArr),
    render: (record) => <span className={`${record === 'Active' ? 'success-link' : 'danger-link'} font-semibold`}>{record}</span>
  }, {
    title: 'Action',
    dataIndex: 'status',
    width: '8%',
    align: 'center',
    render: (record, row) =>
      <ScreenLoader active={updateStatusLoader[row.id]} inline={true} tip="Loading...">
        <div className="menu-icon-container">
          <Tooltip placement="topRight" title='View Package Details' mouseEnterDelay={0.5}>
            <button onClick={() => { setUserViewData(row); setOpenViewModal(true); }}><i className="las la-table" /></button>
          </Tooltip>
          <i className="las la-redo" />
          <Tooltip placement="top" title='Edit' mouseEnterDelay={0.5}>
            <button onClick={() => { setEditAndViewId(row.id); setOpenForm(true); }}><i className="las la-edit" /></button>
          </Tooltip>
          <i className="las la-redo" />
          {row.status === 'Active' ?
            <Popconfirm
              placement="topRight"
              title={<span>Are you sure to In Active this package?&nbsp;&nbsp;</span>}
              description={<span>In Active package will not show in the website.&nbsp;&nbsp;</span>}
              onConfirm={() => UpdateStatus(row, 'In Active')}
              okText="Yes"
              cancelText="No"
            >
              <button type="button">
                <Tooltip placement="bottomRight" title='Change Status as In Active' mouseEnterDelay={0.5}>
                  <i className="las la-times-circle danger-link" />
                </Tooltip>
              </button>
            </Popconfirm>
            :
            <Popconfirm
              placement="topRight"
              title={<span>Are you sure to Active this package?&nbsp;&nbsp;</span>}
              description={<span>Active package will show in the website.&nbsp;&nbsp;</span>}
              onConfirm={() => UpdateStatus(row, 'Active')}
              okText="Yes"
              cancelText="No"
            >
              <button type="button">
                <Tooltip placement="bottomRight" title='Change Status as Active' mouseEnterDelay={0.5}>
                  <i className="las la-check-circle success-link" />
                </Tooltip>
              </button>
            </Popconfirm>
          }
        </div>
      </ScreenLoader>
  }];

  return (
    <div>
      <PageTitle icon='las la-users-cog' title='Admin User' titleSpan='List' desc='Create New admin user, this user is for manage admin area'
        render={<Button type='primary' size="large" className='w-full'
          onClick={() => { setEditAndViewId(false); setOpenForm(true) }}
        >Create New Admin User</Button>}
      />

      <CreateAdminUserFormModal open={openForm} onClose={() => setOpenForm(false)}
        appendData={(e) => AppendOrUpdateData('add', e)}
        updateData={(e) => AppendOrUpdateData('update', e)}
        id={editAndViewId}
      />

      <div className="portal-container">
        <ScreenLoader active={getDataLoader}>
          <DataTable
            columns={columns}
            styleType={2}
            dataSource={listData}
            showSizeChanger={true}
            pagination={{ itemDetails: true }}
            customFilter="true"
            customFilterLabel="Filter by"
            customFilterCol={[
              { label: 'Full Name', value: 'full_name' },
              { label: 'Email Address', value: 'email' },
              { label: 'Mobile Number', value: 'mobile_number' },
              { label: 'Status', value: 'status' },
            ]}
          />
        </ScreenLoader>
        <ModalGeneral
          show={openViewModal}
          close={() => setOpenViewModal(false)}
          width={940}
          title={userViewData.full_name}
          subTitle="User Details"
          hideHeaderHr={true}
          render={<ViewDetails data={userViewData} />}
        />
      </div>
    </div>
  )//End return
}//End function

export default AdminUserLog;