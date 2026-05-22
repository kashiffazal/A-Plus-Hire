import { useContext } from 'react';
import ContextAPI from '../../../../context';
// import SWMessages from './partial/sw';
import MsgDetails from './partial/msg-details';
import './styles.css';

const Messages = () => {
  const context = useContext(ContextAPI);
  const props = {
    provider: {
      getAPI: '/getMessagesProvider',
      sendMsgAPI: '/sendMessageToSW',
      msgType: 'msg',
      listTitle: 'Support Worker List',
      listSubTitle: 'With Sent Messages',
      typeLabel: 'Support Worker'
    },
    sw: {
      getAPI: '/getMessagesSW',
      sendMsgAPI: '/sendMessageToProvider',
      msgType: 'reply',
      listTitle: 'Provider List',
      listSubTitle: 'Who Sent You Messages',
      typeLabel: 'Provider'
    }
  };//End props
  return (
    <div className="portal-container message-container !p-2 md:!p-5">
      <MsgDetails context={context} mod={context.data.ud.type === 'sw' ? props.sw : props.provider} />
    </div>
  )//End return
}//End function

export default Messages;