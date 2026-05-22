import React, { useState, useEffect, useContext } from 'react';
import { Button, Form, Alert, Divider } from 'antd';
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
  const [priceCompareError, setPriceCompareError] = useState(false);
  const [priceErrorMsg, setPriceErrorMsg] = useState('');
  // const [yearlyPriceCompareError, setYearlyPriceCompareError] = useState(false);
  // const [yearlyPriceErrorMsg, setYearlyPriceErrorMsg] = useState('');

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
      values.is_free_plan = values.is_free_plan ? 'Free' : '-';
      if (values.id) {
        values.status = res.data.status;
        pr.updateData && pr.updateData(values);
      } else {
        values.id = res.id;
        values.createdDate = GetCurrentDate('DD-MM-YYYY');
        values.createdTime = GetCurrentTime();
        values.createdBy = '';
        values.status = res.data.status;
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

  const CompareRegularAnsSalePrice = (reg, sale) => {
    // console.log(reg, sale)
    let errorMsg = <span><span className='font-bold'>Sale Price</span> can not be greater than or equal to <span className='font-bold'>Regular Price</span></span>;
    if (sale >= reg) {
      setPriceCompareError(true);
      setPriceErrorMsg(errorMsg);
    } else {
      setPriceCompareError(false);
      setPriceErrorMsg('');
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
            <Divider orientation="left" orientationMargin={0} className="!my-0 divider-primary">Set Pricing</Divider>
          </div>

          <div>
            <label>Is Free Plan?
              <div className='sm:col-span-2 md:col-span-1 mt-1 border border-dashed border-gray-400 rounded-[var(--borderRadius)] cursor-pointer'>
                <AntInput size='large' name="is_free_plan" text="Check if it's free" type="checkbox" onChange={(value, name) => OCF(value, name)} noRequired containerClassName="w-full h-[40px] flex items-center justify-center" className="!p-0" />
              </div>
            </label>
          </div>
          <AntInput size='large' name="regular_price" label="Regular Price" type="number" onChange={(value, name) => { OCF(value, name); CompareRegularAnsSalePrice(value, formValues.sale_price) }} />
          <AntInput size='large' name="sale_price" label="Sale Price" type="number" onChange={(value, name) => { OCF(value, name); CompareRegularAnsSalePrice(formValues.regular_price, value) }} noRequired={true} disabled={!fv.regular_price} />
          {/* 
          <div>
            <label className='ant-form-item-label required'>Regular / Sale Price</label>
            <Space.Compact block>
            </Space.Compact>
          </div> */}

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
            {priceErrorMsg && <Alert message={priceErrorMsg} type="error" showIcon />}
          </div>
          <Button type="primary" className="btn-shadow w-full" size="large" htmlType="submit" disabled={priceCompareError} loading={loader}>{pr.id ? 'Update' : 'Add New'} Package</Button>
        </div>
      </ScreenLoader>

    </Form>
  )//End return
}//End function

export default PackagesFormModal;