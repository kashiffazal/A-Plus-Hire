import { useContext } from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import { Tooltip, Badge } from 'antd';
import ContextAPI from '../../../../context';
import { Logout } from '../../../services';
import HeaderDesktop from './desktop';
import HeaderMobile from './mobile';

const HeaderApp = () => {
  const context = useContext(ContextAPI);
  const navigate = useNavigate();
  const itemClass = 'hover:!text-[var(--colorPrimary)] !px-5 after:w-full after:!border-b-4 after:!left-0 hover:!bg-gradient-to-t from-[var(--bgColor)] from-1% to-white to-90%';
  const dropDownItemsAndConnectsClass = 'h-[58px] border-l border-gray-300 flex items-center pl-5';
  const menuVar = {
    dashboard: {
      label: <NavLink to="dashboard">Dashboard</NavLink>,
      key: 'dashboard',
      icon: <i className='las la-home !text-[18px] mr-[-3px]' />,
      className: itemClass
    },
    packages: {
      label: <NavLink to="packages">Packages</NavLink>,
      key: 'packages',
      icon: <i className='las la-money-bill !text-[18px] mr-[-3px]' />,
      className: itemClass
    },
    users: {
      label: <NavLink to="users">Users</NavLink>,
      key: 'users',
      icon: <i className='las la-users-cog !text-[18px] mr-[-3px]' />,
      className: itemClass
    },
    userSW: {
      label: <NavLink to="sw">Users</NavLink>,
      key: 'userSW',
      icon: <i className='las la-users-cog !text-[18px] mr-[-3px]' />,
      className: itemClass
    },
    search: {
      label: <NavLink to="search">Search</NavLink>,
      key: 'search',
      icon: <i className='las la-search !text-[18px] mr-[-3px]' />,
      className: itemClass
    },
    contactForm: {
      label: <NavLink to="contactFormList">Contact Form</NavLink>,
      key: 'contactFormList',
      icon: <i className='las la-sms !text-[18px] mr-[-3px]' />,
      className: itemClass
    },
    messages: {
      label: <NavLink to="messages">Messages</NavLink>,
      key: 'messages',
      icon: <i className='las la-comment !text-[18px] mr-[-3px]' />,
      className: itemClass
    }
  };

  const connectVar = {
    updatePlan: {
      label: <NavLink to="/app/buyConnects">More Connections?</NavLink>,
      key: 'more_connects',
      icon: <i className='las la-shopping-cart !text-[18px] mr-[-3px]' />,
      className: itemClass,
      btn: <button className='btn-to-link' onClick={() => navigate('/app/buyConnects')}>
        <div className={`${dropDownItemsAndConnectsClass} text-[13px] pr-5`}>More Connects?</div>
      </button>
    },
    connectsCount: {
      label: <Badge size="small" count={11} overflowCount={100000} showZero><div className='mt-1 text-[var(--colorPrimary)]'>Total Connects</div></Badge>,
      key: 'connects_count',
      icon: <i className='las la-comments !text-[18px] mr-[-3px]' />,
      className: itemClass,
      btn: <Tooltip placement="bottom" title="Remaining Connects">
        <div className={`${dropDownItemsAndConnectsClass} pr-5`}>
          <Badge size="small" count={context.data.ud.connects} overflowCount={100000} showZero><i className="las la-comments text-[22px]" /></Badge>
        </div>
      </Tooltip>
    }
  };

  //@ Setting Menus by Role
  const menuItems = [];
  menuItems.push(menuVar.dashboard);

  const connectItems = [];

  if (context.data.ud.type === 'ua') {
    menuItems.push(menuVar.packages);
    menuItems.push(menuVar.users);
    menuItems.push(menuVar.search);
    menuItems.push(menuVar.contactForm);
  }//End if condition

  if (context.data.ud.type === 'sw') {
    menuItems.push(menuVar.messages);
  }//End if condition

  if (context.data.ud.type === 'sm') {
    menuItems.push(menuVar.userSW);
    menuItems.push(menuVar.search);
    menuItems.push(menuVar.messages);
    connectItems.push(connectVar.updatePlan);
    connectItems.push(connectVar.connectsCount);
  }//End if condition

  if (context.data.ud.type === 'ndis') {
    menuItems.push(menuVar.userSW);
    menuItems.push(menuVar.search);
    menuItems.push(menuVar.messages);
    connectItems.push(connectVar.updatePlan);
    connectItems.push(connectVar.connectsCount);
  }//End if condition

  const dropItemText = '!text-[13px]';
  const dropIconText = '!text-[18px]';
  const dropItemClass = dropItemText + ' border-b border-solid border-gray-300 !rounded-none min-w-[150px]';
  const dropDownMenu = {
    profile: {
      label: <NavLink to="profile">Profile</NavLink>,
      key: 'profile',
      icon: <i className={`las la-user ${dropIconText}`} />,
      className: dropItemClass
    },
    userManagement: {
      label: <span className={dropItemText}>User Management</span>,
      key: 'user-management',
      icon: <i className={`las la-user-plus ${dropIconText}`} />,
      className: dropItemClass,
      children: [{
        label: <NavLink to="createAdminUser">Create User</NavLink>,
        icon: <i className={`las la-plus ${dropIconText}`} />,
        key: 'createAdminUser',
        className: dropItemClass
      }, {
        label: <NavLink to="adminUserLog">User Log</NavLink>,
        icon: <i className={`las la-list ${dropIconText}`} />,
        key: 'adminUserLog',
        className: dropItemText + ' !rounded-none'
      }],
    },
    resetPassword: {
      label: <NavLink to="resetPassword">Reset Password</NavLink>,
      icon: <i className={`las la-key ${dropIconText}`} />,
      key: 'resetPassword',
      className: dropItemClass,
    },
    logout: {
      label: <NavLink onClick={() => navigate(Logout())}>Logout</NavLink>,
      icon: <i className={`las la-sign-out-alt ${dropIconText}`} />,
      key: 'logout',
      className: dropItemText + ' !rounded-none',
      danger: true
    }
  };

  //@ Setting Menus by Role
  const dropDownItems = [];
  dropDownItems.push(dropDownMenu.profile);
  if (context.data.ud.type === 'ua') {
    dropDownItems.push(dropDownMenu.userManagement);
  }//End if condition
  dropDownItems.push(dropDownMenu.resetPassword);
  dropDownItems.push(dropDownMenu.logout);



  return (
    <header className='shadow-[0px_2px_8px_#d9d5d5] border-b border-[var(--borderColor)]'>
      <div className='hidden lg:block'><HeaderDesktop menuItems={menuItems} connectItems={connectItems} dropDownItems={dropDownItems} context={context} dropDownItemsAndConnectsClass={dropDownItemsAndConnectsClass} /></div>
      <div className="block lg:hidden"><HeaderMobile menuItems={menuItems} connectItems={connectItems} dropDownItems={dropDownItems} context={context} /></div>
    </header>
  )//return
}//End function

export default HeaderApp;