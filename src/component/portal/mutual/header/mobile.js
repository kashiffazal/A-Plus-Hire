import { useState } from 'react';
import { NavLink } from "react-router-dom";
import { Button, Menu, Avatar, Dropdown, Drawer, Badge } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import { RandomAlphaNumber } from '../../../services';

const HeaderDesktop = (pr) => {
  const [openMenu, setOpenMenu] = useState(false);
  const [randQuerystring] = useState(RandomAlphaNumber());

  const showConnect = (pr.context.data.ud.type !== 'ua' && pr.context.data.ud.type !== 'sw');
  const drawerBtn =
    <Badge size="small" count={showConnect ? pr.context.data.ud.connects : undefined} overflowCount={100000} showZero>
      <Button className="ml-3 bg-white border-[var(--colorPrimary)] text-[var(--colorPrimary)] hover:bg-[var(--bgPrimary)]"
        onClick={() => setOpenMenu(true)}>
        <MenuOutlined className='relative top-[0px]' />
      </Button>
    </Badge>;

  return (
    <div className="relative z-10">

      <div className='container mx-auto shadow-md relative px-[10px]'>
        <div className={pr.containerWidth}>

          <div className="grid grid-cols-12 py-1 items-center">
            <div className='col-span-2'>
              <span className='hidden sm:block'><NavLink to='/app'><img src={`${process.env.PUBLIC_URL}/images/logo-h-final.png`} alt="" className="w-[120px] mx-auto inline-block" /></NavLink></span>
              <span className='block sm:hidden'>{drawerBtn}</span>
            </div>
            <div className='col-span-10 text-right'>
              <div className='flex items-center'>
                <Dropdown
                  menu={{ items: pr.dropDownItems }} placement='bottomRight' overlayClassName='!min-w-[185px]'>
                  <div className='flex items-center w-full justify-end cursor-pointer'>
                    <div className='text-sm text-right mr-3'>
                      <span className='block leading-3 pb-1'>{pr.context.data.ud.full_name}</span>
                      <span className='block leading-3 font-medium'>{pr.context.data.ud.role}</span>
                    </div>
                    <div>
                      <div className='p-[2px] border-2 border-solid border-[var(--colorPrimary)] rounded-full'>
                        <Avatar size={40} src={pr.context.data.ud.profile_image ? process.env.REACT_APP_API_URL + '/profile_images/' + pr.context.data.ud.profile_image + '?l=' + randQuerystring : null} style={{ backgroundColor: 'var(--colorPrimary)', verticalAlign: 'middle', }}>KF</Avatar>
                      </div>
                    </div>
                  </div>
                </Dropdown>
                <span className='hidden sm:block'>{drawerBtn}</span>
              </div>
            </div>
          </div>

          <Drawer
            title={<NavLink to='/app/dashboard'><img src={`${process.env.PUBLIC_URL}/images/logo-h-final.png`} alt="" className="w-[120px] mx-auto inline-block" /></NavLink>
            }
            placement='right'
            width={250}
            onClose={() => setOpenMenu(false)}
            open={openMenu}
            closeIcon={false}
          >

            <Menu mode="inline" items={[...pr.menuItems, ...pr.connectItems]} onClick={() => setOpenMenu(false)}
              className='
              !border-0
              [&>li]:border-b [&>li]:border-solid [&>li]:border-grey-900  [&>li]:!rounded-none
              [&>li]:!m-0 [&>li]:!p-0 [&>li]:!px-3
            '
            />
          </Drawer>
        </div>
      </div>
    </div>
  )//End return
}//End function

export default HeaderDesktop;