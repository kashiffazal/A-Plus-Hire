/*eslint-disable array-callback-return*/
import React, { useState, useEffect } from 'react';
import { Form, Select, Input, Row, Col, Button, Table, Popconfirm } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

import './styles.css';

const FormItem = Form.Item;
const Option = Select.Option;

const DataTable = (pr) => {
  const [currentPaginationPage, setCurrentPaginationPage] = useState(null);
  const [defaultPageSize, setDefaultPageSize] = useState(null)
  const [defaultPageSizeOption] = useState([10, 20, 30, 40, 50, 100]);
  const [tableData, setTableData] = useState(pr.dataSource);
  const [filterData, setFilterData] = useState(pr.dataSource);
  const [bulkActionValue, setBulkActionValue] = useState(null);
  const [bulkActionLabelToShowOnPopOver, setBulkActionLabelToShowOnPopOver] = useState(null);
  const [bulkActionMsg, setBulkActionMsg] = useState('');
  const [bulkActionBottomBtnLabel, setBulkActionBottomBtnLabel] = useState('');
  const [bulkActionValueError, setBulkActionValueError] = useState(null);
  const [numberOfSelectedRows, setNumberOfSelectedRows] = useState(null)
  const [bulkActionPopOverConfirmVisible, setBulkActionPopOverConfirmVisible] = useState(false);
  const [selectedCustomFilterCol, setSelectedCustomFilterCol] = useState(null)

  const formRef = React.createRef();

  useEffect(() => {
    setTableData(pr.dataSource);
    setFilterData(pr.dataSource);
  }, [pr.dataSource])

  const FilterDataArray = (text, dataArray, keys) => {
    const newData = dataArray.filter(item => {
      const textData = text.toUpperCase();
      for (var i = 0; i < keys.length; i++) {
        item[keys[i]] = item[keys[i]] ? item[keys[i]].toString() : '';
        if (item[keys[i]].toUpperCase().indexOf(textData) > -1) {
          return item[keys[i]].toUpperCase().indexOf(textData) > -1;
        }//End if condition
      }//End for loop
    });
    return newData;
  }//End function

  //Next and previous links
  const ItemRender = (current, type, originalElement) => {
    if (type === 'prev') { return <button type="button" className="btnToLink">Previous</button>; }
    if (type === 'next') { return <button type="button" className="btnToLink">Next</button>; }
    return originalElement;
  }//End function

  const ChangeCurrentPage = (page) => { setCurrentPaginationPage(page); }//End function

  const ShowSizeChangerDropDown = () => {
    const optionList = pr.sizeChangerOptions || defaultPageSizeOption;
    const pageOptionList = optionList.map((item, i) => { return (<Option key={i} value={item}>{item}</Option>) });
    return (
      <div>
        <FormItem label={pr.sizeChangeLabel || "Record per page"} name='pageSize' initialValue={(pr.sizeChangerOptions ? pr.sizeChangerOptions[0] : defaultPageSizeOption[0])} >
          <Select className="pageSizeSelectBox" onChange={(value) => setDefaultPageSize(value)}>
            {pageOptionList}
          </Select>
        </FormItem>
      </div>
    );
  }//End function

  const ShowFilterField = () => {
    let filterColData = [];
    if (pr.filterCol && pr.filterCol.length >= 1) {
      filterColData = pr.filterCol;
    } else {
      for (var i = 0; i < pr.columns.length; i++) {
        filterColData.push(pr.columns[i]['dataIndex']);
      }//End for loop
    }//End if condition
    //Remove Empty values from array
    filterColData.forEach((item, key) => { if (!item) { filterColData.splice(key, 1); } });
    return (
      <div>
        <FormItem label={pr.filterLabel || "Filter"} name='filter'>
          <Input prefix={<SearchOutlined type="search" style={{ color: 'rgba(0,0,0,.25)' }} />} onChange={(value) => setTableData(FilterDataArray(value.target.value.trim(), filterData, filterColData))} placeholder={pr.filterPlaceholder || "Filter data"} />
        </FormItem>
      </div>
    )
  }//End function

  const ShowCustomFilterField = () => {
    let selectedfilterCol = [];
    let st = pr.smallTable;
    pr.customFilterCol.forEach(item => { selectedfilterCol.push(item.value); })
    return (
      <React.Fragment>
        <Col lg={st ? 6 : 4} md={6} sm={24} xs={24}>
          <FormItem label={pr.customFilterLabel || "Filter By"} name='filterBy' initialValue=''>
            <Select
              style={{ width: '100%' }}
              filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
              onChange={(value) => {
                if (pr.dataSource && pr.dataSource.length > 1) {
                  setSelectedCustomFilterCol(value ? [value] : null);
                  setTableData(FilterDataArray('', filterData, selectedfilterCol));
                }//End if condition
                formRef.current.setFieldsValue({ filter: '' });
              }}>
              <Option value={''}>-Select-</Option>
              {pr.customFilterCol.map(item => {
                return (<Option key={item.value} value={item.value}>{item.label}</Option>)
              })}
            </Select>
          </FormItem>
        </Col>
        <Col lg={st ? 6 : 4} md={6} sm={24} xs={24}>
          <FormItem label={pr.filterLabel || "Filter"} name='filter'>
            <Input prefix={<SearchOutlined type="search" style={{ color: 'rgba(0,0,0,.25)' }} />} onChange={
              (value) => {
                (pr.dataSource && pr.dataSource.length > 1) &&
                  setTableData(FilterDataArray(
                    value.target.value.trim(),
                    filterData,
                    (selectedCustomFilterCol ? selectedCustomFilterCol : selectedfilterCol)))
              }} placeholder={pr.filterPlaceholder || "Filter data"} />
          </FormItem>
        </Col>
      </React.Fragment>
    )
  }//End function

  const BulkAction = (position) => {
    const bulkOptionList = pr.bulkAction.map((item, i) => { return (<Option key={i + 1} value={item.value + "=>" + item.label + "=>" + (item.bulkActionMsg ? item.bulkActionMsg : '') + "=>" + (item.bulkActionBottomBtnLabel ? item.bulkActionBottomBtnLabel : '')}>{item.label}</Option>) });
    return (
      <span className={(position === 'top' ? "bulkGroup" : "bulkGroup bulkGroupBottom")}>
        {/* Show field when at least one row is selected */}
        {numberOfSelectedRows && numberOfSelectedRows.selectedRowKeys.length > 0 ?
          <React.Fragment>
            <p className="bulkActionLabel">
              <span className="bulkGroupBottomLabel">{pr.bulkActionLabel ? pr.bulkActionLabel + " : " : "Bulk Action : "}</span>
              <span className="bulkActionError">{bulkActionValueError}</span>
              <span className="selectedRowsCount">{bulkActionValue && numberOfSelectedRows && numberOfSelectedRows.selectedRowKeys.length + ' rows is selected'}</span>
            </p>
            <FormItem name='bulkAction' initialValue=''>
              <Select onChange={(data) => {
                setBulkActionValue(data.split('=>')[0]);
                setBulkActionLabelToShowOnPopOver(data.split('=>')[1]);
                setBulkActionMsg(data.split('=>')[2]);
                setBulkActionBottomBtnLabel(data.split('=>')[3]);
                setTimeout(() => {
                  BulkActionHandler('skip')
                }, 100);
              }}>
                <Option key={0} value="">-Select-</Option>
                {bulkOptionList}
              </Select>
            </FormItem>

            <Popconfirm
              title={pr.bulkActionMsg ? pr.bulkActionMsg : (bulkActionMsg ? bulkActionMsg : `Are you sure to change status as '${bulkActionLabelToShowOnPopOver}'?`)}
              onConfirm={() => BulkActionHandler('run')}
              onCancel={() => setBulkActionPopOverConfirmVisible(false)}
              okText="Yes"
              cancelText="No"
              open={bulkActionPopOverConfirmVisible}
            >
              <Button type="primary" onClick={() => BulkActionHandler('openPopOver')}>
                {pr.bulkActionBottomBtnLabel ? pr.bulkActionBottomBtnLabel :
                  (bulkActionBottomBtnLabel ? bulkActionBottomBtnLabel : <span><span className="bulkGroupBottomBtnText">Bulk&nbsp;</span>Action</span>)
                }
              </Button>
            </Popconfirm>
          </React.Fragment>
          : <div style={{ height: "42px" }}></div>
        }
      </span>
    )//End return
  }//End function

  const BulkActionHandler = (statusKeyword) => {
    if (!bulkActionValue) {
      setBulkActionValueError('Please select action');
      return false;
    }//End if condition
    if (!(numberOfSelectedRows && numberOfSelectedRows.selectedRowKeys.length > 0)) {
      setBulkActionValueError('At least one row must be selected');
      return false;
    }//End if condition
    if (statusKeyword === 'openPopOver') {
      setBulkActionPopOverConfirmVisible(true)
    }//End if condition

    setBulkActionValueError('');
    if (statusKeyword === 'run') {
      //alert('asdf');
      pr.bulkActionHandler(numberOfSelectedRows, bulkActionValue);
      setBulkActionPopOverConfirmVisible(false)
    }//End if condition
  }//End function

  const tableClass = (pr.className ? pr.className + " dataTable" : 'dataTable');
  //rowSelection object indicates the need for row selection
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {

      //Getting rows id
      let selectedRowIds = [];
      selectedRows.forEach(element => { selectedRowIds.push(element['id']); });
      //End rows id

      if (typeof pr.rowSelection === 'function') {
        pr.rowSelection(selectedRowKeys, selectedRowIds, selectedRows);
      }//End if condition

      setNumberOfSelectedRows({
        'selectedRowKeys': selectedRowKeys,
        'selectedRowIds': selectedRowIds,
        'selectedRows': selectedRows,
      });

    }//End onChange
  }//End rowSelection

  const PaginationOptions = (attr) => {
    let res = {};
    if (attr.size) { res['size'] = attr.size; }
    if (attr.nextPreviousBtn) { res['ItemRender'] = ItemRender; }
    if (attr.itemDetails) { res['showTotal'] = (total, range) => `${range[0]}-${range[1]} of ${total} items`; }
    if (attr.simple) { res['simple'] = true; }
    if (attr.showQuickJumper) { res['showQuickJumper'] = true; }
    if (attr.itemTotal) { res['showTotal'] = (total) => `Total ${total} items`; }
    if (attr.showSizeChanger) {
      res['showSizeChanger'] = true;
      res['onShowSizeChange'] = (current, pageSize) => attr.showSizeChanger(current, pageSize);
      if (attr.sizeChangerOptions) { res['pageSizeOptions'] = attr.sizeChangerOptions; }
    }//End if condition
    if (attr.currentPage) {
      res['current'] = currentPaginationPage || attr.currentPage;
      res['onChange'] = (page) => { ChangeCurrentPage(page) }
    }//End if condition
    if (attr.showOnSinglePage) {//Default is false
      res['hideOnSinglePage'] = false;
    } else {
      res['hideOnSinglePage'] = true;
    }//End if condition
    if (pr.showSizeChanger) {
      res['defaultPageSize'] = defaultPageSize || defaultPageSizeOption[0];
      res['pageSize'] = defaultPageSize || defaultPageSizeOption[0];
      if (pr.sizeChangerOptions) {
        res['defaultPageSize'] = defaultPageSize || pr.sizeChangerOptions[0];
        res['pageSize'] = defaultPageSize || pr.sizeChangerOptions[0];
      }
    } else {
      res['defaultPageSize'] = attr.defaultPageSize || 10;
    }//End if condition

    return res;
  }//End function
  const classNameContainer = (pr.classNameContainer ? pr.classNameContainer + ' c_k_table_0' : 'c_k_table_0');
  const st = pr.smallTable;

  return (
    <div className={classNameContainer}>
      <Form ref={formRef} layout="vertical">
        {pr.label
          ?
          (pr.showSizeChanger ?
            (pr.customFilter ?
              <Row gutter={10} className="m-b-10 headingAndFilter">
                <Col lg={12} md={24} sm={24} xs={24}>
                  <div>
                    <h1 className={pr.desc ? 'tableLabel tableLabel2' : 'tableLabel'}>
                      {pr.label}
                    </h1>
                    {pr.desc && <p style={{ 'margin': '0px' }}>{pr.desc}</p>}
                  </div>
                </Col>
                {ShowCustomFilterField()}
                <Col lg={4} md={6} sm={24} xs={24}>
                  {pr.showSizeChanger && ShowSizeChangerDropDown()}
                </Col>
              </Row>
              :
              <Row gutter={10} className="m-b-10 headingAndFilter">
                <Col lg={16} md={12} sm={24} xs={24}>
                  <h1 className={pr.desc ? 'tableLabel tableLabel2' : 'tableLabel'}>
                    {pr.label}
                  </h1>
                  {pr.desc && <p style={{ 'margin': '0px' }}>{pr.desc}</p>}
                </Col>
                <Col lg={4} md={6} sm={24} xs={24}>
                  {pr.filter && ShowFilterField()}
                </Col>
                <Col lg={4} md={6} sm={24} xs={24}>
                  {pr.showSizeChanger && ShowSizeChangerDropDown()}
                </Col>
              </Row>
            )
            :
            <Row gutter={10} className="m-b-10">
              <Col lg={16} md={12} sm={24} xs={24}>
                <h1 className={pr.desc ? 'tableLabel tableLabel2' : 'tableLabel'}>
                  {pr.label}
                </h1>
                {pr.desc && <p style={{ 'margin': '0px' }}>{pr.desc}</p>}
              </Col>
              <Col lg={4} md={6} sm={24} xs={24}></Col>
              <Col lg={4} md={6} sm={24} xs={24}>
                {pr.filter && ShowFilterField()}
              </Col>
            </Row>
          )


          :
          pr.customFilter ?
            <Row gutter={10} className="m-b-10">
              {ShowCustomFilterField()}
              {!st &&
                <Col lg={6} md={0} sm={24} xs={24}>
                </Col>
              }
              <Col lg={6} md={6} sm={24} xs={24}>
                {pr.bulkAction && BulkAction("top")}
              </Col>
              <Col lg={st ? 6 : 4} md={6} sm={24} xs={24}>
                {pr.showSizeChanger ? ShowSizeChangerDropDown() : ''}
              </Col>
            </Row>
            :
            <Row gutter={10} className="m-b-10">
              <Col lg={st ? 8 : 4} md={st ? 8 : 7} sm={24} xs={24}>
                {pr.filter && ShowFilterField()}
              </Col>
              <Col lg={st ? 0 : 6} md={st ? 0 : 10} sm={24} xs={24}>
                {pr.bulkAction && BulkAction("top")}
              </Col>
              <Col lg={st ? 8 : 10} md={st ? 8 : 0} sm={24} xs={24}>
              </Col>
              <Col lg={st ? 8 : 4} md={st ? 8 : 7} sm={24} xs={24}>
                {pr.showSizeChanger ? ShowSizeChangerDropDown() : ''}
              </Col>
            </Row>
        }

        <div className="tableContainer">
          <div className={(pr.overFlow ? "overFlowTable" : "")}>
            {/* {!tableData && dataLoader ? <div className="table_loader_1"></div> : */}
            <Table
              className={tableClass + " tableStyles-1"}//End className
              rowSelection={(pr.rowSelection ? rowSelection : undefined)}
              columns={pr.columns}
              dataSource={tableData}
              total={tableData.length}
              pagination={pr.pagination && PaginationOptions(pr.pagination)}

              // expandable={{
              //   expandedRowRender: (record) => (
              //     <div>asdfasd{record.description}</div>
              //   ),
              //   rowExpandable: (record) => record.name !== 'Not Expandable',
              // }}
              
              onChange={pr.onChange}
              scroll={pr.scroll ? pr.scroll : undefined}
            />
            {/* } */}
            {pr.label &&
              <Row gutter={10}>
                <Col lg={14} md={24} sm={24} xs={24}>
                  {pr.bulkAction && BulkAction("bottom")}
                </Col>
                <Col lg={10} md={24} sm={24} xs={24}></Col>
              </Row>
            }
          </div>
        </div>


      </Form>
    </div>
  );//End return
}//End fucntion





export default DataTable;