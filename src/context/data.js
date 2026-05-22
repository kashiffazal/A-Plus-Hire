import { useState } from "react";
import ContextAPI from "./";

const ContextMain = (props) => {
  const state = {
    show_login_screen: false,
    developed_by_route_name: 'developedBy',
    app_data: {
      company_name: 'A-Plus Hire',
      company_name_full_name: 'A-Plus Hire Pty Ltd',
      company_address: 'Melbourne, Victoria 3029',
      app_name: 'A Plus Hire',
      app_title: 'A-Plus-Hire',
      logo: 'logo.png',
      logo_w: 'logo.png',
      abn_number: 'ABN 87 662 147 622',
      email_support : 'support@aplushire.com.au',
      block_HTML: '<h1>Blocked</h1>',
      block_status: false,
      maintenance_HTML: '<h1>Maintenance</h1>',
      maintenance_status: false,
      version: '1.0',
    },
    developer: {
      company_name: 'Innotech Cloud',
      webLink: 'https://innotechcloud.com/',
      web_domain: 'innotechcloud.com',
      dev_name: 'Kashif Fazal',
      dev_url: 'https://www.innotechcloud.com/kashiffazal'
    },
    development : {
      domainPath:'www.google.com',
    },
    /*Styling*/
    h2: 'text-xl sm:text-2xl md:text-3xl font-bold',
    h3: 'text-lg sm:text-xl md:font-bold md:text-2xl font-bold',
    h4: 'text-md sm:text-lg md:text-xl font-bold',
    portal_grid_gap: 'gap-3',
    /*Other app values*/
    ud: {},
  }

  const [data, setData] = useState(state);

  const updateData = (newData) => {
    let uData = { ...data, ...newData };
    setData(uData);
  }//End function

  return (
    <ContextAPI.Provider value={{ data, updateData }}>
      {props.children}

      {/* 
      <div>About Us {a.data.app_data.app_name}
        <Button onClick={() => a.updateData({
          showLoginScreen: true,
          app_data: { ...a.data.app_data, app_name: 'NEW APP' }
        })}>Update 1</Button>
        {a.data.showLoginScreen ? 'TRUE' : 'FALSE'}
      </div> */}

    </ContextAPI.Provider>
  )
}//End

export default ContextMain;

