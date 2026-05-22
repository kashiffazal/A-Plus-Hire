import { useContext } from 'react';
import ContextAPI from '../../../../context';
import ScreenLoader from '../../../mutualComponents/screen-loader';
import loadable from '@loadable/component';

const loaderWebsite = <div className='text-center'><ScreenLoader active={true} inline={true} /></div>;
const AdminProfileForm = loadable(() => import('./partial/admin'), { fallback: loaderWebsite });
const AllProfileForm = loadable(() => import('./partial/ndis-sm-sw'), { fallback: loaderWebsite });
// const SMProfileForm = loadable(() => import('./partial/sm'), { fallback: loaderWebsite });
// const SWProfileForm = loadable(() => import('./partial/sw'), { fallback: loaderWebsite });

const Profile = (pr) => {
  const context = useContext(ContextAPI);
  // console.log(context);
  return (
    <>
      {context.data.ud.type === 'ua' && <AdminProfileForm context={context} updateData={pr.updateData} modal={pr.modal} editMode={pr.editMode} close={pr.close} />}
      {context.data.ud.type !== 'ua' && <AllProfileForm context={context} updateData={pr.updateData} modal={pr.modal} editMode={pr.editMode} close={pr.close} />}
      {/* {context.data.ud.type === 'sm' && <SMProfileForm context={context} updateData={pr.updateData} modal={pr.modal} editMode={pr.editMode} close={pr.close} />} */}
      {/* {context.data.ud.type === 'ndis' && <SWProfileForm context={context} updateData={pr.updateData} modal={pr.modal} editMode={pr.editMode} close={pr.close} />} */}
    </>
  )//End return
}//End function

export default Profile;