import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
// import Cookies from 'js-cookie';
import { GetUserCookie } from '../../../services';
import HeaderDesktop from './desktop';
import HeaderMobile from './mobile';

const Header = (pr) => {
  const [top, setTop] = useState(true);

  useEffect(() => {
    const scrollHandler = () => { window.scrollY > 10 ? setTop(false) : setTop(true) };
    window.addEventListener('scroll', scrollHandler);
    return () => window.removeEventListener('scroll', scrollHandler);
  }, [top]);

  //@ All Navigation links for Website
  const navLinks = [
    { key: '1', to: "/", label: "Home" },
    { key: '2', to: "about", label: "About Us" },
    { key: '3', to: "search", label: "Search" },
    { key: '4', to: "pricing", label: "Pricing" },
    { key: '5', href: "https://www.ndis.gov.au/", label: "NDIS" },
    { key: '6', href: "https://www.ndiscommission.gov.au/", label: "NDIS Commission" },
    { key: '7', to: "contact", label: "Contact Us" },
    // { key: '8', to: "app", label: "Portal" },
  ];
  //@ All Navigation links for Website - Mobile - Dropdown
  const navLinkMobile = [];
  navLinks.forEach(link => {
    var newLink = { ...link };
    newLink.label = newLink.to ? <NavLink to={newLink.to}>{newLink.label}</NavLink> : <a target="_blank" rel="noopener noreferrer" href={newLink.href}>{newLink.label}</a>;
    navLinkMobile.push(newLink);
  });

  const isCookiesSet = GetUserCookie() ? true : false;
  return (
    <div className="sticky top-0 bg-white z-10">
      <div className={`hidden lg:block transition-slow ${!top && `shadow-md`}`}><HeaderDesktop navLinks={navLinks} containerWidth={pr.containerWidth} isCookiesSet={isCookiesSet} redirectToRegistrationByPackage={pr.redirectToRegistrationByPackage} /></div>
      <div className="block lg:hidden"><HeaderMobile navLinks={navLinkMobile} containerWidth={pr.containerWidth} isCookiesSet={isCookiesSet} redirectToRegistrationByPackage={pr.redirectToRegistrationByPackage} /></div>
    </div>
  )//End return
}//End function

export default Header