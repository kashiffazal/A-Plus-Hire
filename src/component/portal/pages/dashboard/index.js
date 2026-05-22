import { useContext } from 'react'
import ContextAPI from '../../../../context';
import ScreenLoader from '../../../mutualComponents/screen-loader';
import loadable from '@loadable/component';

const loaderWebsite = <ScreenLoader active={true} tip={' '} loaderType="website" />;
const AdminDashboard = loadable(() => import('./partial/admin'), { fallback: loaderWebsite });
const SWDetails = loadable(() => import('../users/partial/view-details/sw'), { fallback: loaderWebsite });
const SMDetails = loadable(() => import('../users/partial/view-details/sm'), { fallback: loaderWebsite });
const NDISDetails = loadable(() => import('../users/partial/view-details/ndis'), { fallback: loaderWebsite });

const Dashboard = () => {
  const context = useContext(ContextAPI);
  return (
    <>
      {context.data.ud.type === 'ua' && <AdminDashboard context={context} />}
      {/* //@ Details as Dashboard */}
      {context.data.ud.type === 'sw' && <SWDetails id={context.data.ud.sw_ref_id} />}
      {context.data.ud.type === 'sm' && <SMDetails id={context.data.ud.sm_ref_id} />}
      {context.data.ud.type === 'ndis' && <NDISDetails id={context.data.ud.ndis_ref_id} />}
    </>
  )//End return
}//End function

export default Dashboard;