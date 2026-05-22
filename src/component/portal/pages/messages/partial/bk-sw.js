import { useState, useEffect, useContext } from 'react';
import { Avatar, Tabs, Form, Button } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { AntInput } from '../../../../mutualComponents/antd-fields';
import ContextAPI from '../../../../../context';
import { HTTP, FormatDate } from '../../../../services';
import ScreenLoader from '../../../../mutualComponents/screen-loader';

const SWMessages = () => {
  const context = useContext(ContextAPI);

  const [getLoader, setGetLoader] = useState(false);
  const [sendLoader, setSendLoader] = useState(false);
  const [data, setData] = useState([]);
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [selectedKey, setSelectedKey] = useState('0')

  const GetData = () => {
    setGetLoader(true);
    HTTP('get', '/getMessagesSW').then(res => {
      setGetLoader(false);
      if (!res) return false;
      // console.log(res.data);
      setData(SetDataList(res.data));
    });//End function
  }//End function

  const SetDataList = (dt) => {
    dt.forEach((item) => {
      item.label =
        <div className='flex items-center w-full'>
          <div>
            <Avatar className='[&>.anticon]:!m-0 [&>.anticon]:relative [&>.anticon]:top-[-2px]' shape="circle" size={50} icon={<UserOutlined />} src={item.profileImg} />
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

  const sendMsg = (values) => {
    values.sw_ref_id = data[parseInt(selectedKey) - 1].messageData[0].sw_ref_id;
    values.sw_user_ref_id = context.data.ud.id;//@ Login User;
    values.user_ref_id = context.data.ud.id;//@ Login User;
    values.type = 'reply';
    setSendLoader(true);
    HTTP('post', '/sendMessagesBySW', values).then(res => {
      setSendLoader(false);
      if (!res) return false;

    });//End function
  }//End function

  useEffect(() => { GetData(); }, [])

  return (
    <div className="portal-container">
      <ScreenLoader active={getLoader}>
        <div className={`grid grid-cols-12 ${context.data.portal_grid_gap}`}>
          <div className='col-span-3'>

            <Tabs
              className='[&>.ant-tabs-nav]:w-full [&>.ant-tabs-nav>.ant-tabs-nav-wrap>.ant-tabs-nav-list>.ant-tabs-tab]:p-0'
              activeKey={selectedKey}
              // defaultActiveKey={'0'}
              tabPosition='left'
              items={data}
              onChange={(e) => { setSelectedProvider(data[e - 1].messageData); setSelectedKey(e) }}
            />

          </div>
          <div className='col-span-9'>

            {selectedProvider &&
              <div className="h-full">
                <div className='bg-[#e0d7d0] rounded-t-md p-5'>
                  {selectedProvider.map(item => {
                    return (
                      <div key={item.id} className={`flex ${item.reply ? 'justify-end text-right' : 'justify-start text-left'}`}>
                        <div className={`md:max-w-[48%] mb-1 border border-solid border-gray-300 text-[14px] py-[5px] px-[10px] shadow-md rounded-md ${item.reply ? 'bg-[#dcf8c5]' : 'bg-white'}`}>
                          {item.message}
                          <span className='block text-[11px] italic text-gray-400'>{FormatDate(item.createdAt, 'DD-MM-YYYY hh:mm A')}</span>
                        </div>
                      </div>
                    )
                  })}
                </div>
                <Form onFinish={sendMsg} className='p-5 bg-[#f0f0f0] rounded-b-md'>
                  <div className='grid grid-cols-1 md:grid-cols-12 gap-2'>
                    <div className='col-span-10'>
                      <AntInput name="message" size="large" placeholder='Please type your message here' containerClassName='!m-0' disabled={sendLoader} />
                    </div>
                    <div className='col-span-2'>
                      <Button type="primary" size="large" htmlType="submit" className='w-full' loading={sendLoader}>Send</Button>
                    </div>
                  </div>
                </Form>
              </div>
            }

          </div>
        </div>
      </ScreenLoader>
    </div>
  )//End return
}//End function

export default SWMessages;