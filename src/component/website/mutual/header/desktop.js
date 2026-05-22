import { useContext } from 'react';
import { Button } from 'antd';
import { NavLink, useNavigate } from 'react-router-dom';
import { RedirectToDashboard } from '../../../services';
import ContextAPI from '../../../../context';

const HeaderDesktop = (pr) => {
  const a = useContext(ContextAPI);
  const navigate = useNavigate();
  return (
    <header>

      <div className={`${pr.containerWidth} grid grid-cols-12 pt-2`}>
        <div className="col-span-2 flex items-center">
          <NavLink to="/">
            <img src={`${process.env.PUBLIC_URL}/images/logo-final.png`} alt="" className="w-44" />
          </NavLink>
        </div>
        <div className="col-span-10 text-right">
          <div className="py-3 pr-3 rounded-tr rounded-br bg-gradient-to-l from-[var(--bgColor)] from-80% to-white to-1%">
            <span className="pl-2 text-base font-medium text-[var(--colorPrimary)]">Address: {a.data.app_data.company_address}&nbsp;|&nbsp;</span>
            <span className="pr-2 text-base font-medium text-[var(--colorPrimary)]">ABN 87 662 147 622</span>
          </div>

          <nav className={`
                ${pr.containerWidth} flex items-center justify-end !px-0
                [&>*]:text-black [&>*]:font-medium [&>*]:no-underline [&>*]:px-4 [&>*]:py-4
              `}>
            {pr.navLinks.map((item, i) => {
              var linkClass = `
                    transition border-0 border-b-4 border-solid border-white 
                    hover:border-[var(--colorPrimary)] hover:text-[var(--colorPrimary)] 
                    hover:bg-gradient-to-t from-[var(--bgColor)] from-1% to-white to-90%
                `;
              if (item.to) {
                return <NavLink key={item.key} to={item.to} className={linkClass}>{item.label}</NavLink>
              } else {
                return <a key={item.key} href={item.href} target="blank" className={linkClass}>{item.label}</a>
              }//End if condition
            })}

            {pr.isCookiesSet ?
              <Button size="large" type="primary" className='!text-white !m-0 !ml-4' onClick={() => navigate(RedirectToDashboard())}>Dashboard</Button> :
              <>
                <NavLink to="login" className="!p-0 !pl-4"><Button size="large" className="bg-white border-[var(--colorPrimary)] text-[var(--colorPrimary)] hover:bg-[var(--bgPrimary)]">Login</Button></NavLink>
                <Button size="large" type="primary" onClick={() => pr.redirectToRegistrationByPackage()} className='!text-white !m-0 !ml-2'>Get Started</Button>
              </>
            }

          </nav>

        </div>
      </div>
    </header>

  )//End return
}//End function

export default HeaderDesktop