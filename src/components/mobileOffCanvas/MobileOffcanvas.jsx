import styles from './mobileOffcanvas.module.css';
import { activeLinkSpecifier } from '../../utils';
import { memo } from 'react';
import { NavLink } from 'react-router';
import { Offcanvas } from 'react-bootstrap';
import { IoCloseSharp } from "react-icons/io5";
import { AiFillInstagram } from "react-icons/ai";
import { FaTelegramPlane } from "react-icons/fa";
import { IoLogoWhatsapp } from "react-icons/io";

const MobileOffcanvas = memo(({ show, closeOffcanvas }) => {

  return (
    <Offcanvas className={styles.offcanvas} show={show} onHide={closeOffcanvas} placement='end'>
      <Offcanvas.Header className={styles.offcanvasHeader}>
        <IoCloseSharp className={styles.closeBtn} onClick={closeOffcanvas} />
      </Offcanvas.Header>
      <Offcanvas.Body className={styles.offcanvasBody}>
        <div className={styles.intro}>
          <img className={styles.logo} src="assets/images/profilePhoto.gif" alt="dev group" />
          <strong className='h3 text-light mt-3'>Dev Group</strong>
          <strong className={`${styles.description} text-secondary text-center mt-1`}>Website and application development</strong>
        </div>

        <nav className='mt-3'>
          <ul className={styles.desktopNavUl}>
            <li onClick={closeOffcanvas} ><NavLink to="/" style={({ isActive }) => activeLinkSpecifier(isActive)}>Home</NavLink></li>
            <li onClick={closeOffcanvas} ><NavLink to="/members" style={({ isActive }) => activeLinkSpecifier(isActive)}>Members</NavLink></li>
            <li onClick={closeOffcanvas} ><NavLink to="/portfolio" style={({ isActive }) => activeLinkSpecifier(isActive)}>portfolio</NavLink></li>
            <li onClick={closeOffcanvas} ><NavLink to="/contact" style={({ isActive }) => activeLinkSpecifier(isActive)}>Contact Us</NavLink></li>
            <li onClick={closeOffcanvas} ><NavLink to="/about" style={({ isActive }) => activeLinkSpecifier(isActive)}>About Us</NavLink></li>
          </ul>
        </nav>

        <div className={styles.social}>
          <AiFillInstagram className={styles.social_icon} />
          <FaTelegramPlane className={styles.social_icon} />
          <IoLogoWhatsapp className={styles.social_icon} />
        </div>
      </Offcanvas.Body>
    </Offcanvas>
  )
});

export default MobileOffcanvas;

