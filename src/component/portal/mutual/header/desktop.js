import { useState } from 'react';
import { NavLink } from "react-router-dom";
import { Menu, Avatar, Dropdown } from 'antd';
import { RandomAlphaNumber } from '../../../services';

const HeaderDesktop = (pr) => {
  const [randQuerystring] = useState(RandomAlphaNumber());
  const height = '[&>li]:h-[58px]';
  // console.log(pr.connectItems);
  return (
    <div className="relative z-10">
      <div className='container mx-auto px-[10px]'>
        <div className='grid md:grid-cols-12 items-center'>
          <div className={pr.context.data.ud.type === 'ua' ? 'lg:col-span-10 xl:col-span-8' : 'lg:lg:col-span-6 xl:col-span-7'}>
            <div className='flex items-center w-full'>
              <div className='pr-5'>
                <NavLink to='/app/dashboard'><img src={`${process.env.PUBLIC_URL}/images/logo-h-final.png`} alt="" className="w-[120px] mx-auto inline-block" /></NavLink>
              </div>
              <nav className="mt-[-1px] border-l border-solid border-[var(--borderColor)] w-[inherit]">
                <Menu mode="horizontal" items={pr.menuItems} className={`
                  border-0 
                    [&>li]:border-solid [&>li]:border-[var(--borderColor)] [&>li]:border-r
                    [&>li]:!flex [&>li]:items-center ${height}
                  `} />
              </nav>
            </div>
          </div>
          <div className={pr.context.data.ud.type === 'ua' ? 'lg:col-span-2 xl:col-span-4' : 'lg:col-span-6 xl:col-span-5'}>

            <div className='flex items-center justify-end w-full'>

              {pr.connectItems[0] && pr.connectItems[0].btn /*//@ More Connects*/}
              {pr.connectItems[1] && pr.connectItems[1].btn /*//@ Connects Count*/}

              <div className={pr.context.data.ud.type !== 'ua' ? pr.dropDownItemsAndConnectsClass : ''}>
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )//End return
}//End function

export default HeaderDesktop;