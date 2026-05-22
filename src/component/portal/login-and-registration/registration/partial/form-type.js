import { NavLink } from 'react-router-dom';

const FormType = (pr) => {
  return (
    <div className="w-full text-center">
      <NavLink to='/'>
        <img src={`${process.env.PUBLIC_URL}/images/logo-v-final.png`} alt="" className="w-20 mx-auto inline-block" />
      </NavLink>
      <div className='pt-3 pb-5'>
        <h4 className={pr.context.data.h4}>Registration</h4>
        <p>Get started with {pr.context.data.app_data.company_name}, Select the type of Registration you want</p>
      </div>

      {pr.type.map((item, index) => (
        <button key={index} className="btn-to-link block w-full" onClick={() => pr.setShowRegistrationForm(item)}>
          <div className="
              border border-solid border-[var(--borderColor)] rounded 
              text-left mb-2 p-3
              bg-gradient-to-t from-[var(--bgColor)] from-20% to-white to-100%
              transition hover:bg-gradient-to-b
              hover:shadow-md
              flex items-center">
            <i className={`${item.icon} text-3xl mr-3`} />
            <div>
              <div className='text-sm tracking-tighter'>{item.label}</div>
              <div className='text-sm'>({item.subLabel})</div>
            </div>
          </div>
        </button>
      ))}



      <div className='text-sm lg:text-base mt-5 p-3 flex md:block lg:flex justify-between items-center border border-dashed border-[var(--borderColor)] rounded bg-[var(--bgPrimary)]'>
        <p>Already a Member?</p>
        <NavLink to='/login'>
          <button type="button" className="btn-to-link-color text-sm lg:text-base">Lon in to your account</button>
        </NavLink>
      </div>
    </div>
  )//End return
}//End function

export default FormType;