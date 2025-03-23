import styles from './desktopNavbar.module.css';
import { LiaHomeSolid } from "react-icons/lia";
import { SlPeople } from "react-icons/sl";
import { IoBriefcaseOutline } from "react-icons/io5";
import { GoMail } from "react-icons/go";
import { GrBlog } from "react-icons/gr";
import { NavLink } from 'react-router';
import { useContext } from 'react';
import { activeLinkSpecifier } from '../../utils';
import { RxEnterFullScreen } from 'react-icons/rx';
import { RxExitFullScreen } from "react-icons/rx";
import AppContext from '../../contexts/AppContext';

export default function DesktopNavbar() {

  const appContext = useContext(AppContext);

  return (
    <header className={styles.desktopHeader}>
      <nav className={styles.desktopNav}
        style={appContext.fullScreen ?
          { transform: 'rotateY(90deg)', width: 0, transition: 'width 0.5s 0.5s, transform 0.3s' }
          :
          { transform: 'rotateY(0deg)', width: '70px', transition: 'width 1s, transform 0.5s 0.5s' }}>
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
            <NavLink to="/blogs" style={({ isActive }) => activeLinkSpecifier(isActive)}>
              <GrBlog className={styles.menuIcon} />
              <p className={styles.menuLabel}>Blogs</p>
            </NavLink>
          </li>

          <li>
            <NavLink onClick={() => appContext.handleFullScreenMode(prev => !prev)}>
              {appContext.fullScreen ?
                <RxExitFullScreen className={`${styles.menuIcon} ${styles.fullScreenIcon}`} />
                :
                <>
                  <RxEnterFullScreen className={`${styles.menuIcon} ${styles.fullScreenIcon}`} />
                  <p className={styles.menuLabel}>Full Screen</p>
                </>
              }
            </NavLink>
          </li>

        </ul>
      </nav>
    </header>
  )
}