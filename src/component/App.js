import { useEffect, useState } from 'react';
import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from 'react-router-dom';
import { theme, Result, Button } from 'antd';
// import Cookies from 'js-cookie';
import ContextData from '../context/data';
import ScreenLoader from './mutualComponents/screen-loader';
import { GetUserCookie } from './services';
//# Official Doc - https://loadable-components.com/docs/getting-started/
import loadable from '@loadable/component';

//# Importing Components
// import DBErrorModal from './mutualComponents/db-error-modal';
import ErrorBoundary from './error';

const loaderWebsite = <ScreenLoader active={true} tip={' '} loaderType="website" />;
const _404 = loadable(() => import('./mutualComponents/404'), { fallback: loaderWebsite });

//@ Website Component / Pages
const MainWebsite = loadable(() => import('./website'), { fallback: loaderWebsite });
const Home = loadable(() => import('./website/pages/home'), { fallback: loaderWebsite });
const AboutUs = loadable(() => import('./website/pages/about'), { fallback: loaderWebsite });
const Search = loadable(() => import('./website/pages/search'), { fallback: loaderWebsite });
const Pricing = loadable(() => import('./website/pages/pricing'), { fallback: loaderWebsite });
const ContactUs = loadable(() => import('./website/pages/contact'), { fallback: loaderWebsite });
const TermOfUse = loadable(() => import('./website/pages/term-fo-use'), { fallback: loaderWebsite });
const PrivacyPolicy = loadable(() => import('./website/pages/privacy-policy'), { fallback: loaderWebsite });

const loaderLoginRegistration = <ScreenLoader active={true} />;
//@ Portal Component - Login & Registration
const Login = loadable(() => import('./portal/login-and-registration/login'), { fallback: loaderLoginRegistration });
const Registration = loadable(() => import('./portal/login-and-registration/registration'), { fallback: loaderLoginRegistration });
const NDISProviderForm = loadable(() => import('./portal/login-and-registration/account/ndis-provider'), { fallback: loaderLoginRegistration });
const SupportWorkerForm = loadable(() => import('./portal/login-and-registration/account/support-worker'), { fallback: loaderLoginRegistration });
const SelfManageParticipant = loadable(() => import('./portal/login-and-registration/account/self-managed-participant'), { fallback: loaderLoginRegistration });

const loaderPortal = <ScreenLoader active={true} loaderType='jellyBox' />;
//@Portal Component - Pages
const MainApp = loadable(() => import('./portal'), { fallback: loaderPortal });
const Dashboard = loadable(() => import('./portal/pages/dashboard'), { fallback: loaderPortal });
const Packages = loadable(() => import('./portal/pages/packages'), { fallback: loaderPortal });
const Users = loadable(() => import('./portal/pages/users'), { fallback: loaderPortal });
const UsersSW = loadable(() => import('./portal/pages/usersSW'), { fallback: loaderPortal });
const SearchSW = loadable(() => import('./portal/pages/search'), { fallback: loaderPortal });
const BuyConnects = loadable(() => import('./portal/pages/buy-connects'), { fallback: loaderPortal });
const Profile = loadable(() => import('./portal/pages/profile'), { fallback: loaderPortal });
const CreateAdminUser = loadable(() => import('./portal/pages/admin-user/create'), { fallback: loaderPortal });
const AdminUserLog = loadable(() => import('./portal/pages/admin-user/log'), { fallback: loaderPortal });
const ResetPassword = loadable(() => import('./portal/pages/reset-password'), { fallback: loaderPortal });
const ContactFormList = loadable(() => import('./portal/pages/contact-form'), { fallback: loaderPortal });
const Messages = loadable(() => import('./portal/pages/messages'), { fallback: loaderPortal });
const Payment = loadable(() => import('./portal/login-and-registration/payment'), { fallback: loaderPortal });


const Test = loadable(() => import('./portal/pages/test'), { fallback: loaderPortal });


function App() {
  const { token } = theme.useToken();//Getting colors rom Antd
  const [userData, setUserData] = useState(GetUserCookie() ? GetUserCookie() : {});
  const [loginStatus, setLoginStatus] = useState(false);
  // console.log(token);
  //@ Set all colors in css variable to use with tailwind
  let styleForTailwind = {};
  Object.keys(token).forEach(item => { styleForTailwind['--' + item] = '(%)' + token[item] + '(%)'; })
  // console.log(styleForTailwind);

  //@ Set all variables into body tag
  document.body.setAttribute('style',
    JSON.stringify(styleForTailwind, null, 2)
      .replaceAll('"', '')
      .replaceAll('(%),', ';')
      .replaceAll('(%)', '')
      .replace('{', '')
      .replace('}', '')
      .replace(/\\n/g, '')
  );
  // window.defaultCountryId = '16';//Australia
  // window.defaultStateId = '2';//VIC - Victoria

  //@ Every time when user login then set userData for route, 
  //@ Because Route has condition by userData, That's why we have to update userData state
  useEffect(() => { setUserData(GetUserCookie() ? GetUserCookie() : {}); }, [loginStatus])

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<MainWebsite />} >
          <Route index element={<Home />} />
          <Route path="about" element={<AboutUs />} />
          <Route path="search" element={<Search />} />
          <Route path="pricing" element={<Pricing />} />
          <Route path="contact" element={<ContactUs />} />
          <Route path="term-of-use" element={<TermOfUse />} />
          <Route path="privacy-policy" element={<PrivacyPolicy />} />
          <Route path="*" element={<_404 />} />
        </Route>

        <Route path="login" element={<Login />} />
        <Route path="registration" element={<Registration />} />
        <Route path="app/ndis-provider" element={<NDISProviderForm />} />
        <Route path="app/support-worker" element={<SupportWorkerForm />} />
        <Route path="app/self-managed-participant" element={<SelfManageParticipant />} />

        {userData.ask_payment && <Route path="app/payment" element={<Payment />} />}

        {/* 
          //@ Every time when MainApp component is loaded then setLoginStatus has a different value
          //@ For useEffect for update userData state, because userData has condition on Route 
        */}
        <Route path="app" element={<MainApp setLoginStatus={(e) => setLoginStatus(e)} />}>
          <Route path="dashboard" element={<Dashboard />} />
          {userData.type === 'ua' && <Route path="packages" element={<Packages />} />}
          {userData.type === 'ua' &&
            <Route path="users" element={<Users />} >
              <Route path=":type" element={<Users />} />
            </Route>
          }
          {userData.type === 'ua' &&
            <Route path="createAdminUser" element={<CreateAdminUser />}>
              <Route path=":id" element={<CreateAdminUser />} />
            </Route>
          }
          {userData.type === 'ua' && <Route path="adminUserLog" element={<AdminUserLog />} />}
          {(userData.type === 'ua' || userData.type === 'sm' || userData.type === 'ndis') && <Route path="search" element={<SearchSW />} />}
          {(userData.type === 'sm' || userData.type === 'ndis') &&
            <Route path="buyConnects" element={<BuyConnects />}>
              <Route path=":action" element={<BuyConnects />} />
            </Route>
          }
          {userData.type === 'ua' && <Route path="test" element={<Test />} />}
          {(userData.type === 'sm' || userData.type === 'ndis') && <Route path="sw" element={<UsersSW />} />}
          {userData.type === 'ua' && <Route path="contactFormList" element={<ContactFormList />} />}
          {userData.type !== 'ua' && <Route path="messages" element={<Messages />} />}
          <Route path="profile" element={<Profile />} />
          <Route path="resetPassword" element={<ResetPassword />} />
          <Route path="*" element={<_404 />} />
        </Route>
      </>
    )//End createRoutesFromElements
  )//End createBrowserRouter 

  const errorComponent = (
    <div className='border border-solid border-red-900 h-screen flex items-center justify-center'>
      <Result
        status="warning"
        title="There are some problems with your internet connection."
        extra={<Button type="primary" key="console" onClick={() => window.location.reload(false)}>Reload Page</Button>}
      />
    </div>
  );
  // console.log(userData);
  return (
    <ContextData>
      <ErrorBoundary fallback={errorComponent}>
        <RouterProvider router={router} />
      </ErrorBoundary>
    </ContextData>
  );//End return
}//End App Function

export default App;
