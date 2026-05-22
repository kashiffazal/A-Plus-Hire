import { useState, useEffect } from 'react';
import { Avatar, Tabs, Form, Button, Drawer, Empty } from 'antd';
import { UserOutlined, BarsOutlined, ReloadOutlined } from '@ant-design/icons';
import { AntInput } from '../../../../mutualComponents/antd-fields';
import { HTTP, FormatDate, GetObjectFromArr, UpdateUserCookie, GetCurrentDate, GetCurrentTime, RandomAlphaNumber } from '../../../../services';
import ScreenLoader from '../../../../mutualComponents/screen-loader';

const MessageDetails = (pr) => {
  const [form] = Form.useForm();
  const [randQuerystring] = useState(RandomAlphaNumber());

  const [getLoader, setGetLoader] = useState(false);
  const [sendLoader, setSendLoader] = useState(false);
  const [data, setData] = useState([]);
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [selectedKey, setSelectedKey] = useState('0');
  const [openDrawer, setOpenDrawer] = useState(false);

  const GetData = (reload = false) => {
    setGetLoader(true);
    HTTP('get', pr.mod.getAPI).then(res => {
      setGetLoader(false);
      if (!res) return false;
      // console.log(res.data); return false;
      setData(SetDataList(res.data));
      //@Load current/new message of selected user
      if (reload) { setSelectedProvider(GetObjectFromArr(selectedKey, 'key', res.data)); }//if condition
    });//End function
  }//End function

  const SetDataList = (dt) => {
    dt.forEach((item) => {
      item.label =
        <div className='flex items-center w-full'>
          <div>
            <Avatar className='[&>.anticon]:!m-0 [&>.anticon]:relative [&>.anticon]:top-[-2px]' shape="circle" size={40} icon={<UserOutlined />} src={
              item.profile_image ? process.env.REACT_APP_API_URL + '/profile_images/' + item.profile_image + '?l=' + randQuerystring : null
            } />
          </div>
          <span className='text-left ml-3'>
            <span className="font-semibold text-sm">{item.label}</span>
            <span className="block text-gray-500 text-xs">{item.role}</span>
            <span className='block text-gray-500 text-xs italic'>{FormatDate(item.messageData[item.messageData.length - 1].createdAt, 'DD-MM-YYYY hh:mm A')}</span>
          </span>
        </div>;
    })//End foreach
    return dt;
  }//End function

  const SendMsg = (values) => {
    let dt = GetObjectFromArr(selectedKey, 'key', data).messageData[0];
    // console.log(dt);
    if (pr.mod.msgType === 'msg') {
      values.sw_ref_id = dt.sw_ref_id;
      values.sw_user_ref_id = dt.sw_user_ref_id;//@ Login User;
      values.pr_ref_id = (pr.context.data.ud.type === 'ndis' ? pr.context.data.ud.ndis_ref_id : pr.context.data.ud.sm_ref_id);//@ Login User;
      values.pr_user_ref_id = pr.context.data.ud.id;//@ Login User;
    } else {
      values.sw_ref_id = pr.context.data.ud.sw_ref_id;//@ Login User;
      values.sw_user_ref_id = pr.context.data.ud.id;//@ Login User;
      values.pr_ref_id = dt.pr_ref_id;
      values.pr_user_ref_id = dt.pr_user_ref_id;  
    }//End if condition
    values.pr_type = pr.context.data.ud.type;//@ Login User;
    values.type = pr.mod.msgType;
    values.lastMessage = true;
    // console.log(values);
    // return false;
    setSendLoader(true);
    HTTP('post', pr.mod.sendMsgAPI, values).then(res => {
      setSendLoader(false);
      if (!res) { return false; }
      // console.log(res);
      //@ Update connects in context (connects count is showing in header)
      if (pr.mod.msgType === 'msg') {
        setTimeout(() => {
          if (res.remainingConnects != null && res.remainingConnects !== '') {
            UpdateUserCookie({ connects: res.remainingConnects });
            pr.context.updateData({ ud: { ...pr.context.data.ud, connects: res.remainingConnects } });
          }
        }, 300);
      }//End if condition

      //@ Update Msgs Array on Real-Time
      let updatedData = GetObjectFromArr(selectedKey, 'key', data);
      let newUpdateObj = {
        ...values,
        id: res.id,
        key: updatedData.messageData.length + 1,
        createdAt: GetCurrentDate('YYYY-MM-DD') + ' ' + GetCurrentTime()
      }//End obj
      updatedData.messageData = updatedData.messageData.reverse();
      updatedData.messageData.push(newUpdateObj);
      updatedData.messageData = updatedData.messageData.reverse();
      setData([...data, [updatedData]]);
      form.resetFields();
    });
  }//End function

  const TypeForTextAreaHeight = () => {
    const textarea = document.getElementById("message");
    textarea.addEventListener("input", function (e) {
      let height = this.scrollHeight;
      if (height === 56 || height === 36) { height = 38; }
      this.style.height = "auto";
      this.style.height = height + "px";
    });
  }//End function

  useEffect(() => { GetData(); }, []);

  const swList = <Tabs
    className='tab-list 
    [&>.ant-tabs-nav]:w-full
    [&>.ant-tabs-nav]:xl:w-[98%] 
    [&>.ant-tabs-nav>.ant-tabs-nav-wrap>.ant-tabs-nav-list>.ant-tabs-tab]:py-[8px] 
    [&>.ant-tabs-nav>.ant-tabs-nav-wrap>.ant-tabs-nav-list>.ant-tabs-tab]:px-[10px]
    [&>.ant-tabs-nav>.ant-tabs-nav-wrap>.ant-tabs-nav-list>.ant-tabs-tab]:m-0
    [&>.ant-tabs-nav>.ant-tabs-nav-wrap>.ant-tabs-nav-list>.ant-tabs-tab]:border-b
    [&>.ant-tabs-nav>.ant-tabs-nav-wrap>.ant-tabs-nav-list>.ant-tabs-tab]:border-l
    [&>.ant-tabs-nav>.ant-tabs-nav-wrap>.ant-tabs-nav-list>.ant-tabs-tab]:border-solid
    [&>.ant-tabs-nav>.ant-tabs-nav-wrap>.ant-tabs-nav-list>.ant-tabs-tab]:border-[#d9d9d9]
    [&>.ant-tabs-nav>.ant-tabs-nav-wrap>.ant-tabs-nav-list>.ant-tabs-tab>.ant-tabs-tab-btn]:w-full
  '
    activeKey={selectedKey}
    // defaultActiveKey={'0'}
    tabPosition='left'
    items={data}
    onChange={(e) => { setSelectedProvider(GetObjectFromArr(e, 'key', data)); setSelectedKey(e); setOpenDrawer(false) }}
  />

  return (
    <>
      <ScreenLoader active={getLoader}>
        <div className={`gridStart grid lg:grid-cols-12 ${pr.context.data.portal_grid_gap}`}>
          <div className='hidden lg:block lg:col-span-3'>
            <div className='py-[7px] px-1 bg-[#f0f0f0] border border-solid border-[#d9d9d9] text-center rounded-t-md text-[14px]'>
              <h2 className='text-[14px] font-medium'>{pr.mod.listTitle}</h2>
              <p className='text-[12px] text-gray-400'>{pr.mod.listSubTitle}</p>
            </div>
            <div className='colStart'>{swList}</div>
          </div>
          <div className='col-span-12 lg:col-span-9'>

            {selectedProvider ?
              <div className='border border-solid border-[#d9d9d9] rounded-md'>
                <div className='xs:flex items-center justify-between py-2 px-5 bg-[#f0f0f0] rounded-t-md'>
                  <div className='xs:flex items-center text-center xs:text-left'>
                    <Button size="small" onClick={() => setOpenDrawer(true)} className='hidden xs:inline lg:hidden bg-white border-[var(--colorPrimary)] text-[var(--colorPrimary)] hover:bg-[var(--bgPrimary)] mr-2'><BarsOutlined /></Button>
                    <Avatar className='[&>.anticon]:!m-0 [&>.anticon]:relative [&>.anticon]:top-[-2px]' shape="circle" size={35} icon={<UserOutlined />} src={
                      selectedProvider.profile_image ? process.env.REACT_APP_API_URL + '/profile_images/' + selectedProvider.profile_image + '?l=' + randQuerystring : null
                    } />
                    <div className='ml-2'>
                      <span className='font-medium block mb-[-8px] text-[14px]'>{selectedProvider.full_name}</span>
                      <span className='text-[12px] text-gray-400 italic'>Last Message: {FormatDate(selectedProvider.messageData[selectedProvider.messageData.length - 1].createdAt, 'DD-MM-YYYY hh:mm A')}</span>
                    </div>
                  </div>
                  <div className='text-center'>
                    <Button size="small" onClick={() => setOpenDrawer(true)} className='inline xs:hidden bg-white border-[var(--colorPrimary)] text-[var(--colorPrimary)] hover:bg-[var(--bgPrimary)] mr-2'><BarsOutlined /></Button>
                    <Button onClick={() => GetData(true)} size="small" className='border-[var(--colorPrimary)] text-[var(--colorPrimary)] hover:bg-[var(--bgPrimary)] bg-white'><ReloadOutlined /> Reload</Button>
                  </div>
                </div>

                <div className='bg-[#e0d7d0] p-5'>
                  <div className='innerColStart flex flex-col-reverse items-end'>
                    {selectedProvider.messageData.map(item => {
                      return (
                        <div key={item.id} className={`flex w-full px-1 ${item.type === pr.mod.msgType ? 'justify-end' : 'justify-start'}`}>
                          <div className={`md:max-w-[48%] mb-1 border border-solid border-gray-300 text-[14px] py-[5px] px-[10px] shadow-md rounded-md ${item.type === pr.mod.msgType ? 'bg-[#dcf8c5]' : 'bg-white'}`}>
                            {/* {item.type} = {item.id} = {item.sw_ref_id} = {item.sw_user_ref_id} =  */}
                            {/* {item.type} -  */}
                            <span className='whitespace-pre-wrap'>{item.message}</span>
                            <span className='block text-[11px] italic text-gray-400'>{FormatDate(item.createdAt, 'DD-MM-YYYY hh:mm A')}</span>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
                <Form onFinish={SendMsg} form={form} className='p-2 lg:p-5 bg-[#f0f0f0] rounded-b-md'>
                  <div className='grid grid-cols-1 md:grid-cols-12 gap-2'>
                    <div className='md:col-span-9 lg:col-span-10'>
                      <AntInput name="message" size="large" type="textarea" placeholder='Please type your message here' className="!resize-none overflow-hidden" containerClassName='!m-0' disabled={sendLoader} onChange={() => TypeForTextAreaHeight()} />
                    </div>
                    <div className='md:col-span-3 lg:col-span-2'>
                      <Button type="primary" size="large" htmlType="submit" className='w-full' loading={sendLoader}>Send</Button>
                    </div>
                  </div>
                </Form>
              </div>
              :
              <div className='p-5 border-2 border-dashed border-gray-300 rounded-md h-full flex items-center justify-center'>
                <Empty description={
                  <>
                    <p className='hidden lg:block'>Please select any {pr.mod.typeLabel}</p>
                    <span className='inline lg:hidden'>
                      <p className='mb-2'>Please select any {pr.mod.typeLabel} by clicking below button</p>
                      <Button type="primary" onClick={() => setOpenDrawer(true)}>Select</Button>
                    </span>
                  </>
                } />
              </div>
            }
          </div>
        </div>
      </ScreenLoader>
      <Drawer
        title="Support Worker List"
        placement='left'
        closable={true}
        onClose={() => setOpenDrawer(false)}
        open={openDrawer}
      >{swList}</Drawer>
    </>
  )//End return
}//End function

export default MessageDetails;