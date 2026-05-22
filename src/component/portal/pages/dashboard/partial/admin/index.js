import { useEffect, useState } from 'react';
import UserCountWidget from "./widgets/user-count";
import UserRegistrationChart from "./charts/user-registration";
import UseConnectsChart from "./charts/use-connects";
import { HTTP } from '../../../../../services';
const AdminDashboard = (pr) => {
  const [data, setData] = useState({});
  const [loader, setLoader] = useState(false)

  useEffect(() => {
    setLoader(true);
    HTTP('get', '/dashboard').then((res) => {
      setLoader(false);
      if (!res) return;
      setData(res.data);
    });
  }, [])



  return (
    <div className={`grid grid-cols-1 xl:grid-cols-2 ${pr.context.data.portal_grid_gap}`}>
      <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-2 ${pr.context.data.portal_grid_gap}`}>
        <UserCountWidget title='Support Workers' link={'/app/users/sw'} icon='las la-handshake' loading={loader} dataObj={[
          { label: 'Active', count: data.sw ? data.sw.active : 0 },
          { label: 'In Active', count: data.sw ? data.sw.inActive : 0 },
          { label: 'Not Verified', count: data.sw ? data.sw.notVerified : 0 },
          { label: 'Total', count: data.sw ? data.sw.total : 0, total: true }
        ]} />
        <UserCountWidget title='NDIS Provider' link={'/app/users/ndis'} icon='las la-city' loading={loader} dataObj={[
          { label: 'Active', count: data.ndis ? data.ndis.active : 0 },
          { label: 'In Active', count: data.ndis ? data.ndis.inActive : 0 },
          { label: 'Not Verified', count: data.ndis ? data.ndis.notVerified : 0 },
          { label: 'Total', count: data.ndis ? data.ndis.total : 0, total: true }
        ]} />
        <UserCountWidget title='Self-Managed' link={'/app/users/sm'} icon='las la-user-nurse' loading={loader} dataObj={[
          { label: 'Active', count: data.sm ? data.sm.active : 0 },
          { label: 'In Active', count: data.sm ? data.sm.inActive : 0 },
          { label: 'Not Verified', count: data.sm ? data.sm.notVerified : 0 },
          { label: 'Total', count: data.sm ? data.sm.total : 0, total: true }
        ]} />
        <UserCountWidget title='Admin User' link={'/app/adminUserLog'} icon='las la-user-plus' loading={loader} dataObj={[
          { label: 'Active', count: data.ua ? data.ua.active : 0 },
          { label: 'In Active', count: data.ua ? data.ua.inActive : 0 },
          { label: 'Not Verified', count: data.ua ? data.ua.notVerified : 0 },
          { label: 'Total', count: data.ua ? data.ua.total : 0, total: true }
        ]} />
      </div>
      <div className={`grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-1 ${pr.context.data.portal_grid_gap}`}>
        {/* <UserCountWidget title='Packages Detail' link={'/app/packages'} icon='las la-money-bill' dataObj={[
          { label: 'Active', count: '12' },
          { label: 'In Active', count: '34' },
          { label: 'Not Verified', count: '90' },
          { label: 'Total', count: '90', total: true }
        ]} /> */}

        <div className="portal-container h-[235px]">
          <UserRegistrationChart className='' data={data.chartUserRegistration} />
        </div>
        <div className="portal-container h-[235px]">
          <UseConnectsChart className='' data={data.chartUsesOfConnects} />
        </div>
      </div>
    </div>
  )//End return
}//End function

export default AdminDashboard;