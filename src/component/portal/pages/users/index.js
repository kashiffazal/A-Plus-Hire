import { useParams, useNavigate } from 'react-router-dom';
import { Tabs, Button } from 'antd';
import PageTitle from '../../mutual/pate-title';
import SWList from './partial/sw-list';
import NDISList from './partial/ndis-list';
import SMList from './partial/sm-list';

const Users = () => {
  const navigate = useNavigate();
  const param = useParams()
  // console.log(param.type);
  return (
    <div>
      <PageTitle icon='las la-users-cog' title='Users' titleSpan='List' desc='All users are separated by Tabs like Support Worker, Self-Management and NDIS'
        render={<Button type='primary' size="large" className='w-full'
          onClick={() => navigate('/app/createAdminUser')}
        >Create Admin User</Button>}
      />
      <div className='portal-container'>

        <Tabs
          // onChange={onChange}
          defaultActiveKey={param.type}
          type="card"
          items={[{
              label: <div className='flex items-center'><i className='las la-handshake text-lg relative top-[-1px] mr-1' /> Support Worker</div>,
              key: 'sw',
              children: <SWList />,
            },
            {
              label: <div className='flex items-center'><i className='las la-city text-lg relative top-[-2px] mr-1' /> NDIS Provider</div>,
              key: 'ndis',
              children: <NDISList />,
            },
            {
              label: <div className='flex items-center'><i className='las la-user-nurse text-lg relative top-[-2px] mr-1' /> Self-Managed Participant</div>,
              key: 'sm',
              children: <SMList />,
            }
          ]}
        />


        
      </div>
    </div>
  )//End return
}//End function

export default Users;