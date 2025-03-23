import styles from './fullScreenNavbar.module.css';
import { LiaHomeSolid } from "react-icons/lia";
import { SlPeople } from "react-icons/sl";
import { IoBriefcaseOutline } from "react-icons/io5";
import { GoMail } from "react-icons/go";
import { GrBlog } from "react-icons/gr";
import { NavLink } from 'react-router';
import { memo, useContext } from 'react';
import { activeLinkSpecifier } from '../../utils';
import { RxEnterFullScreen } from 'react-icons/rx';
import { RxExitFullScreen } from "react-icons/rx";
import AppContext from '../../contexts/AppContext';

const FullScreenNavbar = memo(() => {

  const appContext = useContext(AppContext);

  return (
    <header className='d-none d-lg-block'>
      <nav>
        <ul className={styles.fullScreenNavUl}>
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
                <>
                  <RxExitFullScreen className={`${styles.menuIcon} ${styles.fullScreenIcon}`} />
                  <p className={styles.menuLabel}>Small Mode</p>
                </>
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
});

export default FullScreenNavbar;