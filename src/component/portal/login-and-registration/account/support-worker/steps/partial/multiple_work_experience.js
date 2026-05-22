import React, { Component } from 'react';
import { Button } from 'antd';
import { AntInput } from '../../../../../../mutualComponents/antd-fields';
import MFS from '../../../../../../services/multiple_field_services';
import dayjs from 'dayjs';

class MultipleWorkExperience extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rowArr: [1],
      fieldValues: {},
    }//End state
  }//End constructor

  onChangeVal = (fieldName, fieldValue) => {
    this.setState({ fieldValues: MFS.onChange(fieldName, fieldValue, this.state.fieldValues) }, () => {
      this.props.onChange(this.state.fieldValues);
    });
  }//End function

  setFieldsOnLoad = () => {
    if (this.props.formValues && this.props.formValues.job_title) {
      let data = this.props.formValues;
      // console.log(data);
      // return false;

      data.start_date && Object.keys(data.start_date).forEach(s => {
        
        if (!data.still_working) { data.still_working = []; }
        if (!data.start_date) { data.start_date = []; }
        if (!data.end_date) { data.end_date = []; }
        
        data.still_working[s] = data.still_working[s] ? data.still_working[s] : false;
        data.start_date[s] = data.start_date[s] ? dayjs(data.start_date[s]) : '';
        data.end_date[s] = data.end_date[s] ? dayjs(data.end_date[s]) : '';
      });

      // let data = {
      //   broker_ref_id: { 1: '11', 2: '10' },
      //   brokery_type_ref_id: { 1: '2', 2: '4' },
      //   brokery: { 1: 0.5, 2: 2500 }
      // }
      // this.setState({ fieldValues: data });
      // let set = MFS.loadDataOnMount(data);
      let set = MFS.loadDataOnMount(data);
      this.setState({ rowArr: set.rowArr, fieldValues: data }, () => {
        this.props.fp.setFieldsValue(set.formValObj)
      })
    }//End if condition
  }//End if condition

  render() {
    const fp = this.props.fp;
    const rowArr = this.state.rowArr;
    const fv = this.state.fieldValues;
    return (
      <div>
        {rowArr.map((item, index) => {
          return (
            <div key={index} className={`mx-[-2rem] px-[2rem] py-[10px] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 ${this.props.context.data.portal_grid_gap} items-center`}>
              {index > 0 && <div className='sm:col-span-2 md:col-span-3'><hr className='my-[10px] mx-[-25px] md:mx-[-2rem] border-dashed border-gray-400' /></div>}
              <AntInput label="Job Title" name={`job_title%${item}`} size="large" onBlur={(e) => this.onChangeVal(`job_title%${item}`, e)} />
              <AntInput label="Company Name" name={`company_name%${item}`} size="large" onBlur={(e) => this.onChangeVal(`company_name%${item}`, e)} />
              <AntInput type="select" label="Industry" name={`industry%${item}`} size="large" options={this.props.industryList} filter={true}
                onChange={(e) => this.onChangeVal(`industry%${item}`, e)}
              />
              <div className='md:col-span-2'>
                <AntInput label="Your Job Role" name={`job_role%${item}`} size="large" onBlur={(e) => this.onChangeVal(`job_role%${item}`, e)} />
              </div>

              <div className='sm:col-span-2 md:col-span-1 label-space border border-dashed border-gray-400 rounded-[var(--borderRadius)] '>
                <AntInput text="I'm still working here" name={`still_working%${item}`} type="checkbox" containerClassName="w-full field-height flex items-center justify-center" className="!p-0" onChange={(e) => {
                  this.onChangeVal(`still_working%${item}`, e);
                  this.onChangeVal(`end_date%${item}`, null);
                  fp.setFieldsValue({ [`end_date%${item}`]: null });
                }} noRequired={true} />
              </div>
              <AntInput label="Start Date" name={`start_date%${item}`} type="datepicker" size="large" onChange={(e) => this.onChangeVal(`start_date%${item}`, e)} />
              <AntInput label="End Date" name={`end_date%${item}`} type="datepicker" size="large" onChange={(e) => this.onChangeVal(`end_date%${item}`, e)} disabled={fv.still_working && fv.still_working[item]} noRequired={true} />
              <div className='sm:col-span-2 md:col-span-1'>
                <div className={`grid grid-cols-2 ${this.props.context.data.portal_grid_gap}`}>
                  <Button className="w-full label-space btn-multi-add" size='large'
                    disabled={MFS.addDisabled(rowArr, index)}
                    onClick={() => this.setState({ rowArr: MFS.addRow(rowArr) })}
                  >Add New<i className="las la-plus-circle ml-1 relative top-[1px] text-[18px]" /></Button>
                  <Button className="w-full label-space btn-multi-less" size='large'
                    disabled={MFS.lessDisabled(rowArr)}
                    onClick={() => {
                      let rr = MFS.removeRow(rowArr, index, fv, item);
                      this.setState({ rowArr: rr[0], fieldValues: rr[1] })
                    }}>Remove <i className="las la-minus-circle ml-1 relative top-[1px] text-[18px]"
                    /></Button>
                </div>
              </div>
            </div>
          )
        })}
        {/* {JSON.stringify(fv)} */}
      </div>
    );//End return
  }//End render

  componentDidMount() { this.setFieldsOnLoad() }//End componentDidMount
  // componentDidUpdate(prevProps) {
  //   if ((prevProps.formValues.list !== this.props.formValues.list)) { this.setFieldsOnLoad() }//End if condition
  // }//End componentDidMount


}//End Class
export default MultipleWorkExperience;