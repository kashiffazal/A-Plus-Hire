import { useState, useEffect } from 'react';
import { Form, Button, message } from 'antd';
import { useContext } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import ContextAPI from '../../../../context';
import PageTitle from '../../mutual/page-title';
import { AntInput } from '../../../mutualComponents/antd-fields';
import { HTTP, setFormStateValues, GetUserCookie } from '../../../services';
import DataTable from '../../../portal/pages/search/partial/data-list';

import './styles.css';

const Search = (pr) => {
  const navigate = useNavigate();
  const context = useContext(ContextAPI);
  const [outletContext] = useOutletContext();

  const [loader, setLoader] = useState(false);
  const [getLoader, setGetLoader] = useState(false);
  const [formValues, setFormValues] = useState({});
  const [dataList, setDataList] = useState({});
  const [data, setData] = useState([]);
  // const [isOpen, setIsOpen] = useState(false);

  const [form] = Form.useForm();

  const ocf = (fieldValue, fieldName) => {
    if (fieldName === 'userCondition') { fieldValue = { ...formValues.userCondition, ...fieldValue }; }
    if (fieldName === 'swCondition') { fieldValue = { ...formValues.swCondition, ...fieldValue }; }
    setFormValues(setFormStateValues({ ...formValues }, fieldName, fieldValue));
  }//End function

  const Submit = (values) => {
    let limitData = { offset: 0, limit: 9 };
    setLoader(true);
    // console.log(formValues);
    HTTP('post', '/searchSWWeb', { ...formValues, pagination: limitData }).then(res => {
      setLoader(false);
      if (!res) { return false; }
      setData(res.data);
      if (res.noData) {
        message.config({ top: 20, duration: 2, maxCount: 1 });
        message.info(<span><span className="font-bold">{res.errorTitle}:</span> {res.errorMsg}</span>);
      }
    });
  }//End function

  const GetFormData = () => {
    setGetLoader(true);
    // console.log(formValues);
    HTTP('get', '/getSearchFormDataWeb').then(res => {
      setGetLoader(false);
      if (!res) { return false; }
      setDataList(res.data);
    });
  }//End function

  useEffect(() => { GetFormData(); }, [])

  const dataCount = 6;
  const dataCountLength = data.length > dataCount;
  const fieldContainerClass = 'md:border-b-0 lg:border-r lg:border-solid lg:border-gray-400 md:pb-0 !mb-0 lg:pr-5 [&>.ant-row>.ant-col>label]:font-bold [&>.ant-row>.ant-col>label]:text-[16px] [&>.ant-row>.ant-col>label]:pt-0';
  const fieldClass = 'border-none p-0 !outline-none !shadow-none rounded-none';

  const userType = GetUserCookie() ? GetUserCookie().type : '';
  //@ It is used for website. If user is login then show view profile otherwise 'sign up' message
  const loginType = (userType && (userType === 'ua' || userType === 'sm' || userType === 'ndis')) ? true : false;
  return (
    <div>
      {!pr.partial &&
        <PageTitle
          outletContext={outletContext}
          context={context}
          title="Search Support Workers"
          sub_title="Find Your Perfect Co-Worker"
        />
      }
      <div className={`search-on-web ${outletContext.sectionPadding}`}>
        <div className={outletContext.containerWidth}>
          <div className='border border-solid border-[var(--colorPrimary)] px-10 py-5 bg-white shadow-xl rounded-md'>
            <Form form={form} onFinish={Submit} layout="vertical" autoComplete="off">
              <div className={`grid grid-cols-1 md:grid-cols-12 items-center gap-2 md:gap-5`}>
                <div className='md:col-span-4 lg:col-span-3'>
                  <AntInput label="Post Code" name="post_code" placeholder="Please type post code" onBlur={(value, name) => ocf({ [name]: { type: 'like', value, name: 'Post Code' } }, 'userCondition')} noRequired
                    containerClassName={`border-b border-dashed border-[var(--colorPrimary)] pb-2 ${fieldContainerClass}`}
                    className={fieldClass}
                    sufIconLine='las la-map-marked-alt'
                  />
                </div>
                <div className='md:col-span-4 lg:col-span-3'>
                  <AntInput label="Suburb" name="suburb" placeholder="Please type suburb" onBlur={(value, name) => ocf({ [name]: { type: 'like', value, name: 'Suburb' } }, 'userCondition')} noRequired
                    containerClassName={`border-b border-dashed border-[var(--colorPrimary)] pb-2 ${fieldContainerClass}`}
                    className={fieldClass}
                    sufIconLine={'las la-map-marker'}
                  />
                </div>
                <div className='md:col-span-4 lg:col-span-3'>
                  <AntInput label="State" name="state" type="select" filter={true} loading={getLoader} options={dataList.stateList} onChange={(value, name) => ocf({ [name]: { type: 'equal', value, name: 'State' } }, 'userCondition')} noRequired
                    containerClassName={fieldContainerClass} emptyFirstVal="Please select state" />
                </div>
                <div className='md:col-span-12 lg:col-span-3'>
                  <Button type="primary" className="btn-shadow w-full !h-[62px]" size="large" htmlType="submit" loading={loader}>Search co-worker</Button>
                </div>
              </div>
            </Form>
          </div>
          {data.length > 0 &&
            <div className='mt-3'>
              <DataTable
                data={data}
                loader={loader}
                context={outletContext}
                web={true}
                userType={userType}
                loginType={loginType}
                blurAfterNumber={[dataCount, 'blur-sm']}
              />
              <div className={`relative ${dataCountLength ? 'mt-[-75px]' : 'mt-3'}`}>
                {dataCountLength && <div className='absolute h-[12rem] top-[-12rem] w-full bg-gradient-to-b from-[rgba(19,27,57,0)] to-[rgba(255,255,255,0.75)]'></div>}
                <div className='flex items-center justify-between bg-[var(--colorPrimary)] text-white py-5 px-7 rounded'>

                  {userType === 'sw' ?
                    <div className='py-2 text-center w-full'>Support Worker cannot see other details. To view others profile, you have to sign up with different type of account.</div> :
                    <div>
                      {loginType ? 'Go to Dashboard > Search' : 'Sign up now'}
                      &nbsp;to browse all support worker profiles and find the perfect fit for you.
                    </div>
                  }

                  {userType !== 'sw' &&
                    <Button type='primary' size="large" className='!bg-white !text-[var(--colorPrimary)] hover:!bg-[var(--bgPrimary)] w-32'
                      onClick={() => navigate(loginType ? '/app/dashboard' : '/registration')}
                    >
                      {loginType ? 'Dashboard' : 'Sign up'}
                    </Button>
                  }
                </div>
              </div>
            </div>
          }
        </div>
      </div>
    </div>
  )//End return
}//End function

export default Search;