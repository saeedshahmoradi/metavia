import styles from './desktopNavbar.module.css';
import { LiaHomeSolid } from "react-icons/lia";
import { SlPeople } from "react-icons/sl";
import { IoBriefcaseOutline } from "react-icons/io5";
import { GoMail } from "react-icons/go";
import { BsInfoSquare } from "react-icons/bs";
import { NavLink } from 'react-router';
import { memo } from 'react';
import { activeLinkSpecifier } from '../../utils';

const DesktopNavbar = memo(() => {

  return (
    <header className={styles.desktopHeader}>
      <nav className={styles.desktopNav}>
        <ul className={styles.desktopNavUl}>
          <li>
            <NavLink to="/" style={({ isActive }) => activeLinkSpecifier(isActive)}>
              <LiaHomeSolid className={styles.menuIcon} />
              <p className={styles.menuLabel}>Home</p>
            </NavLink>
          </li>
          <li>
            <NavLink to="/members" style={({ isActive }) => activeLinkSpecifier(isActive)}>
              <SlPeople className={styles.menuIcon} />
              <p className={styles.menuLabel}>Members</p>
            </NavLink>
          </li>
          <li>
            <NavLink to="/portfolio" style={({ isActive }) => activeLinkSpecifier(isActive)}>
              <IoBriefcaseOutline className={styles.menuIcon} />
              <p className={styles.menuLabel}>portfolio</p>
            </NavLink>
          </li>
          <li>
            <NavLink to="/contact" style={({ isActive }) => activeLinkSpecifier(isActive)}>
              <GoMail className={styles.menuIcon} />
              <p className={styles.menuLabel}>Contact Us</p>
            </NavLink>
          </li>
          <li>
            <NavLink to="/about" style={({ isActive }) => activeLinkSpecifier(isActive)}>
              <BsInfoSquare className={styles.menuIcon} />
              <p className={styles.menuLabel}>About Us</p>
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  )
})

export default DesktopNavbar