import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Button, Drawer, Menu } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import { RedirectToDashboard } from '../../../services';
const HeaderMobile = (pr) => {
  const [openMenu, setOpenMenu] = useState(false);
  const navigate = useNavigate();

  return (
    <div className='shadow-md relative'>
      <div className={pr.containerWidth}>

        <div className="grid grid-cols-5 py-1 items-center">
          <div className='col-span-1'>
            <NavLink to="/">
              <img src={`${process.env.PUBLIC_URL}/images/logo-final.png`} alt="" className="w-[95px]" />
            </NavLink>
          </div>
          <div className='col-span-4 text-right'>
            {pr.isCookiesSet ?
              <Button type="primary" className="mr-1" onClick={() => navigate(RedirectToDashboard())}>Dashboard</Button>
              :
              <>
                <NavLink to="login" className="pr-1"><Button className="bg-white border-[var(--colorPrimary)] text-[var(--colorPrimary)] hover:bg-[var(--bgPrimary)]">Login</Button></NavLink>
                <Button type="primary" onClick={() => pr.redirectToRegistrationByPackage()} className='!text-white mr-1'>Get Started</Button>
              </>
            }
            <Button className="bg-white border-[var(--colorPrimary)] text-[var(--colorPrimary)] hover:bg-[var(--bgPrimary)]"
              onClick={() => setOpenMenu(true)}>
              <MenuOutlined />
            </Button>
          </div>
        </div>

        <Drawer
          title="Navigation Menu"
          placement='right'
          width={250}
          onClose={() => setOpenMenu(false)}
          open={openMenu}
        >
          <Menu mode="inline" items={pr.navLinks} onClick={() => setOpenMenu(false)}
            className='
              !border-0
              [&>li]:border-b [&>li]:border-solid [&>li]:border-grey-900  [&>li]:!rounded-none
              [&>li]:!m-0 [&>li]:!p-0 [&>li]:!px-3
            '
          />
        </Drawer>
      </div>
    </div>
  )//End return
}//End function

export default HeaderMobile