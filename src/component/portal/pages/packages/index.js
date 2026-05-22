import { useState, useEffect } from 'react';
import { Button, Tooltip, Popconfirm } from 'antd';
import { SyncOutlined } from '@ant-design/icons';
// import Cookies from 'js-cookie';
import FormModal from './partial/form-modal';
import { HTTP, SortableDateInTableData, TableColumnFilter, TableColumnListForSelectFilter, LogResetList, LogResetRow, GetUserCookie } from '../../../services';
import DataTable from '../../../mutualComponents/andt-data-table-component';
import ScreenLoader from '../../../mutualComponents/screen-loader';
import PageTitle from '../../mutual/pate-title';
import ViewModal from './partial/view-modal';
const Packages = () => {
  const [openForm, setOpenForm] = useState(false);
  const [getLoader, setGetLoader] = useState(true);
  const [updateStatusLoader, setUpdateStatusLoader] = useState({});
  const [defaultLoader, setDefaultLoader] = useState({})
  const [data, setData] = useState([]);
  const [filterIndividualColArr, setFilterIndividualColArr] = useState({});
  const [tableIndividualColFilter] = useState(GetUserCookie() ? GetUserCookie().tableIndividualColFilter : {});
  const [editAndViewId, setEditAndViewId] = useState(false);
  const [openViewModal, setOpenViewModal] = useState(false);


  //Get data on Load
  useEffect(() => { GetDataList(); }, []);

  const GetDataList = () => {
    setGetLoader(true);
    HTTP('get', '/getPackageList').then(res => {
      setGetLoader(false);
      if (!res) { return false; }
      // console.log(res.data );
      setData(res.data);
      setFilterIndividualColArr(TableColumnListForSelectFilter(res.data));
      // console.log(TableColumnListForSelectFilter(res.data));
    });
  }//End function

  const AppendOrUpdateData = (action, values) => {
    var newData = [];
    if (action === 'add') {
      newData = LogResetList(values, data);
    }//End if condition
    if (action === 'update') {
      newData = LogResetRow(values, data);
    }//End if condition
    // console.log(newData);
    setData(newData);
  }//End if condition

  const UpdateStatus = (row, status) => {
    setUpdateStatusLoader({ ...updateStatusLoader, [row.id]: true });
    HTTP('get', '/updatePackageStatus/' + row.id + '/' + status).then(res => {
      setUpdateStatusLoader({ ...updateStatusLoader, [row.id]: false });
      if (!res) { return false; }
      row.status = status;
      let newData = LogResetRow(row, data);
      setData(newData);
      setFilterIndividualColArr(TableColumnListForSelectFilter(newData));
    });
  }//End function

  const MakeDefaultPackage = (row, status) => {
    let loaderObj = {};
    loaderObj[row.id] = true;
    setDefaultLoader(loaderObj);
    HTTP('get', '/updatePackageDefaultStatus/' + row.id + '/' + status).then(res => {
      loaderObj[row.id] = false;
      setDefaultLoader(loaderObj);
      if (!res) { return false; }
      //@ Update in Log
      let newData = [...data];
      newData.forEach((item, i) => {
        newData[i].is_default = false;
        if (status && item.id === row.id) { newData[i].is_default = true; }//End if condition
      });
      setData(newData);
    });
  }//End function

  const columns = [{
    title: 'Sr',
    dataIndex: 'key',
    width: '5%',
    sorter: (a, b) => a.key - b.key,
  }, {
    title: 'Default',
    dataIndex: 'is_default',
    align: 'center',
    className: 'center-col',
    width: '5%',
    render: (record, row) =>
      <div>
        {row.is_default ?
          <Popconfirm
            title={<span>Are you sure to remove this package from default?</span>}
            onConfirm={() => MakeDefaultPackage(row, false)}
            okText="Yes"
            cancelText="No"
            placement="right"
          ><button className="btnToLink">
              <Tooltip placement="bottom" title="Click to remove from default">
                <i className="text-[24px] absolute top-[5px] left-[15px] text-[#58c536] las la-check-circle" />
              </Tooltip>
            </button>
          </Popconfirm>
          :
          (defaultLoader[row.id] ? <SyncOutlined spin /> :
            <Popconfirm
              title={<span>Are you sure to make this package as default?</span>}
              onConfirm={() => MakeDefaultPackage(row, true)}
              okText="Yes"
              cancelText="No"
              placement="right"
            >
              <button className="btnToLink">
                <Tooltip placement="bottom" title="Click to make it default">
                  <i className="text-[20px] absolute top-[8px] left-[17px] text-[#cecece] las la-check-circle" />
                </Tooltip>
              </button>
            </Popconfirm>
          )}
      </div>
  }, {
    title: 'Name',
    dataIndex: 'name',
    width: '20%',
    sorter: (a, b) => a.status.localeCompare(b.status),
    ...TableColumnFilter(tableIndividualColFilter, 'name', filterIndividualColArr)
  }, {
    title: 'Free Plan',
    dataIndex: 'is_free_plan',
    width: '10%',
    align: 'center',
    className: 'center-col',
    sorter: (a, b) => a.status.localeCompare(b.is_free_plan),
    ...TableColumnFilter(tableIndividualColFilter, 'is_free_plan', filterIndividualColArr),
  }, {
    title: 'Connects',
    dataIndex: 'connects',
    width: '9%',
    align: 'center',
    className: 'center-col',
    sorter: (a, b) => a.status.localeCompare(b.connects),
    ...TableColumnFilter(tableIndividualColFilter, 'connects', filterIndividualColArr)
  }, {
    title: 'Price',
    dataIndex: 'regular_price',
    width: '15%',
    sorter: (a, b) => a.regular_price.localeCompare(b.regular_price),
    ...TableColumnFilter(tableIndividualColFilter, 'regular_price_format', filterIndividualColArr),
    render: (record, row) =>
      <div>
        {row.sale_price ? <span className='flex items-center justify-between'><span><span className='font-bold text-[11px]'>Sale:</span> {row.currency}{row.sale_price}</span> <span><span className='font-bold text-[11px]'>Regular:</span> {row.currency}{record}</span></span> :
          <span>{row.currency}{record}</span>
        }
      </div>
  },{
    title: 'Status',
    dataIndex: 'status',
    width: '10%',
    align: 'center',
    className: 'center-col',
    sorter: (a, b) => a.status.localeCompare(b.status),
    ...TableColumnFilter(tableIndividualColFilter, 'status', filterIndividualColArr),
    render: (record) => <span className={`${record === 'Active' ? 'success-link' : 'danger-link'} font-semibold`}>{record}</span>
  }, {
    title: 'Create Date Time',
    dataIndex: 'createdDate',
    width: '18%',
    sorter: SortableDateInTableData('createdDate'),
    ...TableColumnFilter(tableIndividualColFilter, 'createdDate', filterIndividualColArr),
    render: (record, row) => record + ', ' + row.createdTime
  }, {
    title: 'Action',
    width: '10%',
    align: 'center',
    render: (record, row) =>
      <ScreenLoader active={updateStatusLoader[row.id]} inline={true} tip="Loading...">
        <div className="menu-icon-container">
          <Tooltip placement="topRight" title='View Package Details' mouseEnterDelay={0.5}>
            <button onClick={() => { setEditAndViewId(row.id); setOpenViewModal(true); }}><i className="las la-table" /></button>
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
      <PageTitle icon='las la-money-bill' title='Packages' titleSpan='List' desc='Create New Packages, you can also view details, update and change status'
        render={<Button type='primary' size="large" className='w-full' onClick={() => { setEditAndViewId(false); setOpenForm(true); }}>Add New Package</Button>}
      />
      <FormModal open={openForm} onClose={() => setOpenForm(false)}
        appendData={(e) => AppendOrUpdateData('add', e)}
        updateData={(e) => AppendOrUpdateData('update', e)}
        id={editAndViewId}
      />
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
              { label: 'Trial', value: 'trial_duration' },
              { label: 'Connects', value: 'connects' },
              { label: 'Monthly Price', value: 'monthly_price' },
              { label: 'Yearly Price', value: 'yearly_price' },
              { label: 'Status', value: 'status' },
              { label: 'Created Date Time', value: 'createdDate' }
            ]}
          />
        </ScreenLoader>
      </div>
      <ViewModal id={editAndViewId} open={openViewModal} close={() => setOpenViewModal(false)} />
    </div>
  )//End return
}//End function

export default Packages;