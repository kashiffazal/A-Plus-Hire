import { NavLink, useNavigate } from 'react-router-dom';
import { Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Logout } from '../../../services';

const Header = (pr) => {
  const navigate = useNavigate();
  const [modal, contextHolder] = Modal.useModal();

  const confirm = () => {
    modal.confirm({
      title: 'Confirm',
      icon: <ExclamationCircleOutlined />,
      content: 'Are you sure you want to logout?',
      okText: 'Yes',
      onOk: () => navigate(Logout()),
      cancelText: 'No',
    });
  };

  const logoutBtn = <button type="button" className="btn-to-link-color" onClick={() => confirm()}><i className="las la-arrow-left relative top-px" /> Logouts</button>;
  return (
    <div className={pr.showOnMobile ? '' : 'hidden md:block'}>
      <div className='h-12 flex items-center border-b border-solid border-[var(--colorPrimary)] bg-white'>
        <div className='container mx-auto md:text-sm lg:text-base [&>*]:text-[var(--colorPrimary)] '>
          <div className='grid md:grid-cols-12 items-center'>
            {/*//@ Left Menu*/}
            {(pr.menuType === 'login' || pr.menuType === 'registration') &&
              <div className='md:col-span-8'>
                <NavLink to='/'>
                  <button type="button" className="btn-to-link-color"><i className="las la-globe " /> Website</button>
                </NavLink>
                &nbsp;<i className='las la-minus relative top-px rotate-90' />&nbsp;
                <NavLink to='/about'>
                  <button type="button" className="btn-to-link-color"><i className="las la-users relative top-px" /> Know About Us</button>
                </NavLink>
                &nbsp;<i className='las la-minus relative top-px rotate-90' />&nbsp;
                <NavLink to='/search'>
                  <button type="button" className="btn-to-link-color"><i className="las la-search-location relative top-px" /> Search for Support Workers</button>
                </NavLink>
              </div>
            }
            {pr.menuType === 'sw-Form' &&
              <div className='md:col-span-8'>
                <div className='hidden md:block'>
                  <div className='flex items-center'>
                    <div><NavLink to='/'><img src={`${process.env.PUBLIC_URL}/images/logo-final.png`} alt="" className="w-[100px] mx-auto mr-2 inline-block" /></NavLink>&nbsp;&nbsp;</div>
                    <NavLink to='/'>
                      <button type="button" className="btn-to-link-color"><i className="las la-globe " /> Website</button>
                    </NavLink>
                    &nbsp;<i className='las la-minus relative top-px rotate-90' />&nbsp;
                    <NavLink to='/about'>
                      <button type="button" className="btn-to-link-color"><i className="las la-users relative top-px" /> Know About Us</button>
                    </NavLink>
                    &nbsp;<i className='las la-minus relative top-px rotate-90' />&nbsp;
                    <NavLink to='/contact'>
                      <button type="button" className="btn-to-link-color"><i className="las la-envelop relative top-px" /> Contact Us</button>
                    </NavLink>
                  </div>
                </div>
                <div className='block md:hidden'>
                  <div className='flex flex-row items-center justify-between px-5'>
                    <div className='basis-1/3'><NavLink to='/'><img src={`${process.env.PUBLIC_URL}/images/logo-final.png`} alt="" className="w-[80px] mx-auto inline-block" /></NavLink>&nbsp;&nbsp;</div>
                    <div className='basis-1/3 text-center text-sm font-semibold'>Provide Data</div>
                    <div className='basis-1/3 text-right text-xs'>{logoutBtn}</div>
                  </div>
                </div>
              </div>
            }
            {/*//@ Right Menu*/}
            {pr.menuType === 'login' &&
              <div className='md:col-span-4 text-right'>
                <NavLink to='/registration'>
                  <button type="button" className="btn-to-link-color"><i className="las la-globe" /> New here? Sign Up for New Account</button>
                </NavLink>
              </div>
            }
            {pr.menuType === 'registration' &&
              <div className='md:col-span-4 text-right'>
                <NavLink to='/login'>
                  <button type="button" className="btn-to-link-color"><i className="las la-user" /> Already a member? Log In to your Account</button>
                </NavLink>
              </div>
            }
            {pr.menuType === 'sw-Form' &&
              <div className='hidden md:block md:col-span-4 text-right'>{logoutBtn}</div>
            }
          </div>
        </div>
      </div>
      {contextHolder}
    </div>
  )//End return
}//End function

export default Header;