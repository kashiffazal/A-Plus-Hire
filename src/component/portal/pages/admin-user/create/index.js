import React, { useState, useEffect, useContext } from 'react';
import { Button, Row, Col } from 'antd';
import { useNavigate } from 'react-router-dom';
import ContextAPI from '../../../../../context';
import RecentUsers from './recent-users';
import PageTitle from '../../../mutual/pate-title';
import CreateAdminUserForm from './form';


const CreateAdminUser = (pr) => {
  const navigate = useNavigate();
  const context = useContext(ContextAPI);
  const [refreshRecentUserWidget, setRefreshRecentUserWidget] = useState(false);

  return (
    <div>
      <PageTitle icon='las la-user-plus' title='Create' titleSpan='New Admin User' desc='Create New admin user, this user is for manage admin area'
        render={<Button type='primary' size="large" className='w-full'
          onClick={() => navigate('/app/adminUserLog')}
        >Admin User Log</Button>}
      />
      <Row gutter={10} >
        <Col lg={19} md={18} sm={24} xs={24}>
          <div className="portal-container">
            <CreateAdminUserForm refreshRecentUser={() => setRefreshRecentUserWidget(!refreshRecentUserWidget)} />
          </div>
        </Col>
        <Col lg={5} md={6} sm={24} xs={24}>
          <RecentUsers reset={refreshRecentUserWidget} />
        </Col>
      </Row>

      <div className={`grid grid-cols-1 md:grid-cols-12 ${context.data.portal_grid_gap}`}>
        <div className='md:col-span-10'>

        </div>
        <div className='md:col-span-2'>

        </div>
      </div>
    </div >
  )//End return
}//End function

export default CreateAdminUser;