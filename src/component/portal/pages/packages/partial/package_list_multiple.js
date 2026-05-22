import React, { Component } from 'react';
import { Button, Tooltip } from 'antd';
import { AntInput } from '../../../../mutualComponents/antd-fields';
import MFS from '../../../../services/multiple_field_services';

class PackageListMultiple extends Component {
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
    if (this.props.formValues.list) {
      let data = this.props.formValues.list;
      // console.log(data);
      if (!data.strike) { data.strike = {}; }
      data.label && Object.keys(data.label).forEach(s => {
        data.strike[s] = data.strike[s] ? data.strike[s] : false;
      })
      // console.log(data);

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
    // const fp = this.props.fp;
    const rowArr = this.state.rowArr;
    const fv = this.state.fieldValues;
    return (
      <div className={`grid grid-cols-1 md:grid-cols-3 ${this.props.context.data.portal_grid_gap} items-center`}>
        {rowArr.map((item, index) => {
          return (
            <React.Fragment key={index}>
              <AntInput type="select" label="Icon" name={`icon%${item}`} size="large" options={[
                { label: 'Active', value: 'las la-check' },
                { label: 'In Active', value: 'las la-times' },
                { label: 'Exclamation', value: 'las la-exclamation' },
              ]} filter={true}
                onChange={(e) => this.onChangeVal(`icon%${item}`, e)}
              />
              <AntInput label="Label" name={`label%${item}`} size="large" onBlur={(e) => this.onChangeVal(`label%${item}`, e)}
                addonAfter={
                  <Tooltip placement="top" title='Show label with Strike'>
                    <span className='flex items-center'><AntInput type="checkbox" name={`strike%${item}`} text="Strike?" className="!pb-0" onChange={(e) => this.onChangeVal(`strike%${item}`, e)} noRequired={true} /></span>
                  </Tooltip>
                }
              />
              <div>
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
            </React.Fragment>
          )
        })}
      </div>
    );//End return
  }//End render

  componentDidMount() { this.setFieldsOnLoad() }//End componentDidMount
  componentDidUpdate(prevProps) {
    if ((prevProps.formValues.list !== this.props.formValues.list)) { this.setFieldsOnLoad() }//End if condition
  }//End componentDidMount


}//End Class
export default PackageListMultiple;