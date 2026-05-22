import { useState, useEffect } from 'react';
// import { Tooltip, Popconfirm } from 'antd';
import { HTTP, SortableDateInTableData, TableColumnFilter, TableColumnListForSelectFilter, LogResetList, LogResetRow, GetUserCookie } from '../../../services';
import DataTable from '../../../mutualComponents/andt-data-table-component';
import ScreenLoader from '../../../mutualComponents/screen-loader';
import PageTitle from '../../mutual/pate-title';
import ViewModal from './partial/view-modal';
const ContactFormList = () => {
  const [getLoader, setGetLoader] = useState(true);
  const [data, setData] = useState([]);
  // const [updateStatusLoader, setUpdateStatusLoader] = useState(false);
  const [filterIndividualColArr, setFilterIndividualColArr] = useState({});
  const [tableIndividualColFilter] = useState(GetUserCookie() ? GetUserCookie().tableIndividualColFilter : {});
  const [viewId, setViewId] = useState(false);
  const [openViewModal, setOpenViewModal] = useState(false);


  //Get data on Load
  useEffect(() => { GetDataList(); }, []);

  const GetDataList = () => {
    setGetLoader(true);
    HTTP('get', '/getFormList').then(res => {
      setGetLoader(false);
      if (!res) { return false; }
      // console.log(res.data );
      setData(res.data);
      setFilterIndividualColArr(TableColumnListForSelectFilter(res.data));
      // console.log(TableColumnListForSelectFilter(res.data));
    });
  }//End function

  // const UpdateStatus = (row, status) => {
  //   setUpdateStatusLoader({ ...updateStatusLoader, [row.id]: true });
  //   HTTP('get', '/updateFormStatus/' + row.id + '/' + status).then(res => {
  //     setUpdateStatusLoader({ ...updateStatusLoader, [row.id]: false });
  //     if (!res) { return false; }
  //     row.status = status;
  //     // let newData = LogResetRow(row, data);
  //     // setData(newData);
  //     // setFilterIndividualColArr(TableColumnListForSelectFilter(newData));
  //   });
  // }//End function

  const columns = [{
    title: 'Sr',
    dataIndex: 'key',
    width: '5%',
    sorter: (a, b) => a.key - b.key,
  }, {
    title: 'Name',
    dataIndex: 'name',
    width: '20%',
    sorter: (a, b) => a.name.localeCompare(b.name),
    ...TableColumnFilter(tableIndividualColFilter, 'name', filterIndividualColArr)
  }, {
    title: 'Phone',
    dataIndex: 'phone',
    width: '15%',
    sorter: (a, b) => a.phone.localeCompare(b.phone),
    ...TableColumnFilter(tableIndividualColFilter, 'phone', filterIndividualColArr),
  }, {
    title: 'Email',
    dataIndex: 'email',
    width: '20%',
    sorter: (a, b) => a.email.localeCompare(b.email),
    ...TableColumnFilter(tableIndividualColFilter, 'email', filterIndividualColArr)
  }, {
    title: 'Message Type',
    dataIndex: 'message_type',
    width: '15%',
    sorter: (a, b) => a.message_type.localeCompare(b.message_type),
    ...TableColumnFilter(tableIndividualColFilter, 'message_type', filterIndividualColArr)
  }, {
    title: 'Create Date Time',
    dataIndex: 'createdDate',
    width: '15%',
    sorter: SortableDateInTableData('createdDate'),
    ...TableColumnFilter(tableIndividualColFilter, 'createdDate', filterIndividualColArr),
    render: (record, row) => record + ', ' + row.createdTime
  }, {
    title: 'Action',
    width: '10%',
    align: 'center',
    render: (record, row) =>
      // <ScreenLoader active={updateStatusLoader[row.id]} inline={true} tip="Loading...">
        <div className="menu-icon-container">
          {/* <Tooltip placement="topRight" title='View Details' mouseEnterDelay={0.5}> */}
            <button className="btn-to-link-color" onClick={() => { setViewId(row.id); setOpenViewModal(true); }}>
              {/* <i className="las la-table" /> */}
              View Details
            </button>
          {/* </Tooltip> */}
          {/* <i className="las la-redo" />
          <Popconfirm
            placement="topRight"
            title={<span>Are you sure to Archive this form?&nbsp;&nbsp;</span>}
            // description={<span>Are you sure to Archive this form?&nbsp;&nbsp;</span>}
            onConfirm={() => UpdateStatus(row, 'Archive')}
            okText="Yes"
            cancelText="No"
          >
            <button type="button">
              <Tooltip placement="bottomRight" title='Change Status as Archive' mouseEnterDelay={0.5}>
                <i className="las la-archive info-link" />
              </Tooltip>
            </button>
          </Popconfirm>
          <i className="las la-redo" />
          <Popconfirm
            placement="topRight"
            title={<span>Are you sure to Delete this form?&nbsp;&nbsp;</span>}
            // description={<span>Are you sure to Archive this form?&nbsp;&nbsp;</span>}
            onConfirm={() => UpdateStatus(row, 'Delete')}
            okText="Yes"
            cancelText="No"
          >
            <button type="button">
              <Tooltip placement="bottomRight" title='Change Status as Delete' mouseEnterDelay={0.5}>
                <i className="las la-times-circle danger-link" />
              </Tooltip>
            </button>
          </Popconfirm> */}
        </div>
      // </ScreenLoader>
  }];

  return (
    <div>
      <PageTitle icon='las la-sms' title='Contact Form' titleSpan='List' desc='List of all submitted contact form by visiter on website' />
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
              { label: 'Name', value: 'name' },
              { label: 'Phone', value: 'phone' },
              { label: 'Email', value: 'email' },
              { label: 'Message Type', value: 'message_type' },
              { label: 'Created Date Time', value: 'createdDate' }
            ]}
          />
        </ScreenLoader>
      </div>
      <ViewModal id={viewId} open={openViewModal} close={() => setOpenViewModal(false)} />
    </div>
  )//End return
}//End function

export default ContactFormList;