import React, { useState, useEffect, useContext } from 'react';
import { Button, Form, Tooltip, Space, Alert, Divider } from 'antd';
import PackageListMultiple from './package_list_multiple';
import ContextAPI from '../../../../../context';
import { AntInput } from '../../../../mutualComponents/antd-fields';
import { HTTP, setFormStateValues, GetCurrentDate, GetCurrentTime } from '../../../../services';
import ScreenLoader from '../../../../mutualComponents/screen-loader';

const formRef = React.createRef();

const PackagesFormModal = (pr) => {
  const context = useContext(ContextAPI);
  const [loader, setLoader] = useState(false);
  const [getLoader, setGetLoader] = useState(false);
  const [formValues, setFormValues] = useState({});
  const [monthlyPriceCompareError, setMonthlyPriceCompareError] = useState(false);
  const [monthlyPriceErrorMsg, setMonthlyPriceErrorMsg] = useState('');
  const [yearlyPriceCompareError, setYearlyPriceCompareError] = useState(false);
  const [yearlyPriceErrorMsg, setYearlyPriceErrorMsg] = useState('');

  const OCF = (fieldValue, fieldName) => {
    setFormValues(setFormStateValues({ ...formValues }, fieldName, fieldValue));
  }//End function

  useEffect(() => {
    if (pr.id && pr.id !== '') { GetFormData(pr.id); }
  }, [pr.id]);

  const Submit = (values) => {
    values = formValues;
    // console.log(values);
    setLoader(true);
    HTTP('post', '/addPackage', values).then(res => {
      setLoader(false);
      if (!res) { return false; }
      // console.log(res);
      values.trial_duration = (values.is_trial && values.trial_duration) ? values.trial_duration + ' Days' : '-';
      if (values.id) {
        values.status = res.data.status;
        pr.updateData && pr.updateData(values);
      } else {
        values.id = res.id;
        values.createdDate = GetCurrentDate('DD-MM-YYYY');
        values.createdTime = GetCurrentTime();
        values.createdBy = '';
        pr.appendData && pr.appendData(values);
      }//End if condition
      pr.close && pr.close(true);
    });
  }//End function

  const GetFormData = (id) => {
    setGetLoader(true);
    HTTP('get', '/packageFormData/' + id).then(res => {
      setGetLoader(false);
      if (!res) { return false; }
      // console.log(res);
      setFormValues(res.data);
      formRef.current.setFieldsValue(res.data);
    });
  }//End function

  const CompareRegularAnsSalePrice = (keyword, reg, sale) => {
    let errorMsg = <span>{keyword} <span className='font-bold'>Sale Price</span> can not be greater than or equal to <span className='font-bold'>Regular Price</span></span>;
    if (keyword === 'Monthly') {
      if (sale >= reg) {
        setMonthlyPriceCompareError(true);
        setMonthlyPriceErrorMsg(errorMsg);
      } else {
        setMonthlyPriceCompareError(false);
        setMonthlyPriceErrorMsg('');
      }//End if condition      
    }//End if condition
    if (keyword === 'Yearly') {
      if (sale >= reg) {
        setYearlyPriceCompareError(true);
        setYearlyPriceErrorMsg(errorMsg);
      } else {
        setYearlyPriceCompareError(false);
        setYearlyPriceErrorMsg('');
      }//End if condition
    }//End if condition
  }//End function

  const fp = formRef.current;
  const fv = formValues;
  return (
    <Form onFinish={Submit} layout="vertical" className='form-style' autoComplete="off" ref={formRef}>
      <ScreenLoader active={getLoader}>

        <AntInput name="id" containerClassName='hidden' noRequired={true} />

        <div className={`grid grid-cols-1 md:grid-cols-3 ${context.data.portal_grid_gap}`}>
          <AntInput size='large' name="name" label="Package Name / Title" onBlur={(value, name) => OCF(value, name)} />
          <AntInput size='large' name="desc" label="Description" onBlur={(value, name) => OCF(value, name)} />
          <AntInput size='large' name="connects" label="Connects" type="number" onBlur={(value, name) => OCF(value, name)} />

          <div className='md:col-span-3'>
            <Divider orientation="left" orientationMargin={0} className="!my-0 divider-primary">Set Trial and Pricing</Divider>
          </div>

          <AntInput size='large' name="trial_duration" label={!fv.is_trial ? 'Allow Package on Trial' : 'Trial Duration (In Days)'} type="number" disabled={!fv.is_trial} placeholder="Click the checkbox to allow" onBlur={(value, name) => OCF(value, name)} noRequired={!fv.is_trial}
            addonBefore={
              <Tooltip placement="right" title={!fv.is_trial ? 'Click this to make it allow' : ''}>
                <span><AntInput containerClassName='!m-0' type="checkbox" name='is_trial' onChange={(value, name) => OCF(value, name)} noRequired={true} /></span>
              </Tooltip>
            }
          />
          <div>
            <label className='ant-form-item-label required'>Regular / Sale Price - Monthly</label>
            <Space.Compact block>
              <AntInput size='large' name="monthly_price" placeholder="Regular Price" type="number" onChange={(value, name) => OCF(value, name)} containerClassName='w-[50%]' className='rounded-r-[0px]' />
              <AntInput size='large' name="monthly_sale_price" placeholder="Sale Price" type="number" onChange={(value, name) => { OCF(value, name); CompareRegularAnsSalePrice('Monthly', formValues.monthly_price, value) }} containerClassName='w-[50%]' className={`${!fv.monthly_price ? '!border-l-[whitesmoke]' : 'border-l-white'} rounded-l-[0px`} noRequired={true} disabled={!fv.monthly_price} />
            </Space.Compact>
          </div>
          <div>
            <label className='ant-form-item-label required'>Regular / Sale Price - Yearly</label>
            <Space.Compact block>
              <AntInput size='large' name="yearly_price" placeholder="Regular Price" type="number" onChange={(value, name) => OCF(value, name)} containerClassName='w-[50%]' className='rounded-r-[0px]' />
              <AntInput size='large' name="yearly_sale_price" placeholder="Sale Price" type="number" onChange={(value, name) => { OCF(value, name); CompareRegularAnsSalePrice('Yearly', formValues.yearly_price, value) }} containerClassName='w-[50%]' className={`${!fv.monthly_price ? '!border-l-[whitesmoke]' : 'border-l-white'} rounded-l-[0px`} noRequired={true} disabled={!fv.yearly_price} />
            </Space.Compact>
          </div>
          <div className='md:col-span-3'>
            <Divider orientation="left" orientationMargin={0} className="!my-0 divider-primary">List to show in Website</Divider>
          </div>
          <div className='md:col-span-3'>
            <PackageListMultiple
              fp={fp}
              onChange={(e) => OCF(e, 'list')}
              formValues={fv}
              context={context}
            />
          </div>
          <div className='md:col-span-3'><hr /></div>
          <div className='md:col-span-2'>
            {(monthlyPriceErrorMsg || yearlyPriceErrorMsg) && <Alert message={monthlyPriceErrorMsg || yearlyPriceErrorMsg} type="error" showIcon />}
          </div>
          <Button type="primary" className="btn-shadow w-full" size="large" htmlType="submit" disabled={monthlyPriceCompareError || yearlyPriceCompareError} loading={loader}>{pr.id ? 'Update' : 'Add New'} Package</Button>
        </div>
      </ScreenLoader>

    </Form>
  )//End return
}//End function

export default PackagesFormModal;