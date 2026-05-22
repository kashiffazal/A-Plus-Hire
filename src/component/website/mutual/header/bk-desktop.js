import { Button } from 'antd';
import { NavLink } from 'react-router-dom';
const HeaderDesktop = (pr) => {
  return (
    <header>
      <div className="bg-[var(--bgColor)] py-2 rounded-bl-full">
        <div className={`flex justify-between items-center ${pr.containerWidth}`} >
          <div>
            <div>
              <img src={`${process.env.PUBLIC_URL}/images/logo-final.png`} alt="" className="w-16 md:w-auto mr-5" />
            </div>
          </div>
          <div className="text-right">
            <span className="pr-2 text-base font-medium text-[var(--colorPrimary)]">ABN 87 662 147 622</span>
            <NavLink to="login"><Button size="large" className="bg-white border-[var(--colorPrimary)] text-[var(--colorPrimary)] hover:bg-transparent">Login</Button></NavLink>
            <NavLink to="registration" className="pl-2"><Button size="large" type="primary">Get Started</Button></NavLink>
          </div>
        </div>
      </div>
      <nav className={`
          ${pr.containerWidth} flex
          [&>*]:text-black [&>*]:font-medium [&>*]:no-underline [&>*]:no-underline [&>*]:px-4 [&>*]:py-4
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
      </nav>
    </header>

  )//End return
}//End function

export default HeaderDesktop