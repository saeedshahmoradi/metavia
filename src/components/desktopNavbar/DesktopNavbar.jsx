import styles from './desktopNavbar.module.css';
import { LiaHomeSolid } from "react-icons/lia";
import { GrGroup } from "react-icons/gr";
import { PiToolboxFill } from "react-icons/pi";
import { GoMail } from "react-icons/go";
import { BsInfoSquare } from "react-icons/bs";
import { NavLink } from 'react-router';
import { memo } from 'react';

const DesktopNavbar = memo(() => {
  
  function activeLinkSpecifier(isActive){
    return ({color: isActive ? 'var(--vividCyan)' : 'var(--whiteTextColor)'});
  }
  
  return (
    <header>
      <nav className={styles.desktopNav}>
        <ul className={styles.desktopNavUl}>
          <li><NavLink to="/" style={({isActive}) => activeLinkSpecifier(isActive)}><LiaHomeSolid className={styles.menuIcon} /></NavLink></li>
          <li><NavLink to="/members" style={({isActive}) => activeLinkSpecifier(isActive)}><GrGroup className={styles.menuIcon} /></NavLink></li>
          <li><NavLink to="/portfolio" style={({isActive}) => activeLinkSpecifier(isActive)}><PiToolboxFill className={styles.menuIcon} /></NavLink></li>
          <li><NavLink to="/contact" style={({isActive}) => activeLinkSpecifier(isActive)}><GoMail className={styles.menuIcon} /></NavLink></li>
          <li><NavLink to="/about" style={({isActive}) => activeLinkSpecifier(isActive)}><BsInfoSquare className={styles.menuIcon} /></NavLink></li>
        </ul>
      </nav>
    </header>
  )
})

export default DesktopNavbar