import React, { Component } from 'react';
import { Row, Col } from 'antd';
import { AntInput } from '../../../../../../mutualComponents/antd-fields';
import MFS from '../../../../../../services/multiple_field_services';
// import moment from "moment";

class MultipleDaysAvailability extends Component {
  state = {
    rowArr: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    fieldValues: {},
  }//End state

  onChangeVal = (fieldName, fieldValue) => {
    this.setState({ fieldValues: MFS.onChange(fieldName, fieldValue, this.state.fieldValues) }, () => {
      this.props.onChange(this.state.fieldValues);
      //console.log(this.state.fieldValues);
    });
  }//End function

  setDays = () => {
    this.state.rowArr.forEach((item, index) => { this.onChangeVal(`day%${index + 1}`, item); })
    return false;
  }//end if condition

  setFieldsOnLoad = () => {
    if (this.props.formValues && this.props.formValues.day) {
      //console.log(this.props.formValues);
      let data = { ...this.props.formValues };
      // let data = {
      //   broker_ref_id: { 1: '11', 2: '10' },
      //   brokery_type_ref_id: { 1: '2', 2: '4' },
      //   brokery: { 1: 0.5, 2: 2500 }
      // }
      let set = MFS.loadDataOnMount(data);
      this.setState({ rowArr: set.rowArr, fieldValues: data }, () => {
        Object.keys(set.formValObj).forEach((a, i) => { if (set.formValObj[a] === '-') { set.formValObj[a] = ''; } })
        this.props.fp.setFieldsValue(set.formValObj)
        // console.log(set.formValObj);
      })
    } else {
      this.setDays();
    }//End if condition
  }//End if condition

  notAvailable = (i, checkBoxValue) => {

    this.state.rowArr.forEach((item, k) => {
      var index = (k + 1);
      var vl = this.props.fp.getFieldValue(`not_available%${index}`);
      this.onChangeVal(`not_available%${index}`, (vl ? true : false));
    });


    this.onChangeVal(`not_available%${i}`, checkBoxValue);
    this.onChangeVal(`from%${i}`, '-');
    this.onChangeVal(`to%${i}`, '-');
  }//End if condition


  render() {
    const fp = this.props.fp;
    const rowArr = this.state.rowArr;
    const timeList = this.props.timeList;
    const rowGap = 12;
    return (
      <React.Fragment>
        <div className='bg-[var(--colorPrimary)] p-2 mb-3 rounded text-white font-semibold'>
          <Row gutter={rowGap}>
            <Col lg={20} md={20} sm={24} xs={24}>
              <Row gutter={rowGap} className='[&>*]:!px-3'>
                <Col lg={8} md={8} sm={24} xs={24}><label>Days</label></Col>
                <Col lg={8} md={8} sm={24} xs={24}><label>Time From</label></Col>
                <Col lg={8} md={8} sm={24} xs={24}><label>Time To</label></Col>
              </Row>
            </Col>
            <Col lg={4} md={4} sm={24} xs={24} className='!px-3'><label>Availability</label></Col>
          </Row>
        </div>
        {rowArr.map((item, index) => {
          return (
            <Row gutter={rowGap} key={index} className={'[&>.ant-col>.ant-row>.ant-col]:!mb-[12px]'}>
              <Col lg={20} md={19} sm={24} xs={24}>
                <Row gutter={rowGap}>
                  <Col lg={8} md={8} sm={24} xs={24}>
                    <AntInput size="large" name={`day%${index + 1}`} value={item} disabled className='!text-[var(--colorPrimary)] !bg-[var(--bgPrimary)]' />
                  </Col>
                  <Col lg={8} md={8} sm={12} xs={24}>
                    <AntInput size="large" type="select" options={timeList} filter={true} name={`from%${index + 1}`}
                      disabled={fp && fp.getFieldValue(`not_available%${index + 1}`)}
                      noRequired={fp && fp.getFieldValue(`not_available%${index + 1}`)}
                      onChange={e => this.onChangeVal(`from%${index + 1}`, e)}
                    />
                  </Col>
                  <Col lg={8} md={8} sm={12} xs={24}>
                    <AntInput size="large" type="select" options={timeList} filter={true} name={`to%${index + 1}`}
                      disabled={fp && fp.getFieldValue(`not_available%${index + 1}`)}
                      noRequired={fp && fp.getFieldValue(`not_available%${index + 1}`)}
                      onChange={e => this.onChangeVal(`to%${index + 1}`, e)}
                    />
                  </Col>
                </Row>
              </Col>
              <Col lg={4} md={5} sm={24} xs={24}>
                <AntInput type="checkbox" text={<span className='text-[14px]'>Not Available</span>}
                  noRequired={fp && fp.getFieldValue(`from%${index + 1}`) && fp.getFieldValue(`to%${index + 1}`)}
                  reqMsg="*" name={`not_available%${index + 1}`} onChange={e => this.notAvailable(index + 1, e)}
                  className='mt-2'
                />
              </Col>
            </Row>
          )
        })}
      </React.Fragment>
    );//End return
  }//End render

  componentDidMount() { this.setFieldsOnLoad(); }//End componentDidMount
  // componentDidUpdate(prevProps) {
  //   if ((prevProps.data !== this.props.data)) { this.setFieldsOnLoad() }//End if condition
  // }//End componentDidMount


}//End Class
export default MultipleDaysAvailability;