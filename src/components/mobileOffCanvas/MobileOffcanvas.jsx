import styles from './mobileOffcanvas.module.css';
import { activeLinkSpecifier } from '../../utils';
import { memo, useContext } from 'react';
import { NavLink } from 'react-router';
import { Offcanvas } from 'react-bootstrap';
import { IoCloseSharp } from "react-icons/io5";
import { AiFillInstagram } from "react-icons/ai";
import { FaTelegramPlane } from "react-icons/fa";
import { IoLogoWhatsapp } from "react-icons/io";
import AppContext from '../../contexts/AppContext';

const MobileOffcanvas = memo(({ show, closeOffcanvas }) => {

  const { team } = useContext(AppContext);

  return (
    <Offcanvas className={styles.offcanvas} show={show} onHide={closeOffcanvas} placement='end'>
      <Offcanvas.Header className={styles.offcanvasHeader}>
        <IoCloseSharp className={styles.closeBtn} onClick={closeOffcanvas} />
      </Offcanvas.Header>
      <Offcanvas.Body className={styles.offcanvasBody}>
        <div className={styles.intro}>
          <img className={styles.logo} src={team.photo ?? "/assets/images/noProfile.gif"} alt={team.name} />
          <strong className='h3 text-light mt-3'>{team.name}</strong>
          <strong className={`${styles.description} textMuted text-center mt-1`}>{team.jobTitle}</strong>
        </div>

        <nav className='mt-3'>
          <ul className={styles.desktopNavUl}>
            <li onClick={closeOffcanvas} ><NavLink to="/" style={({ isActive }) => activeLinkSpecifier(isActive)}>Home</NavLink></li>
            <li onClick={closeOffcanvas} ><NavLink to="/members" style={({ isActive }) => activeLinkSpecifier(isActive)}>Members</NavLink></li>
            <li onClick={closeOffcanvas} ><NavLink to="/portfolio" style={({ isActive }) => activeLinkSpecifier(isActive)}>portfolio</NavLink></li>
            <li onClick={closeOffcanvas} ><NavLink to="/contact" style={({ isActive }) => activeLinkSpecifier(isActive)}>Contact Us</NavLink></li>
            <li onClick={closeOffcanvas} ><NavLink to="/blogs" style={({ isActive }) => activeLinkSpecifier(isActive)}>Blogs</NavLink></li>
          </ul>
        </nav>

        <div className={styles.social}>
          <a href={team.instagram} target='_blank' rel='noreferrer noopener'><AiFillInstagram className={styles.social_icon} /></a>
          <a href={team.telegram} target='_blank' rel='noreferrer noopener'><FaTelegramPlane className={styles.social_icon} /></a>
          <a href={team.whatsapp} target='_blank' rel='noreferrer noopener'><IoLogoWhatsapp className={styles.social_icon} /></a>
        </div>
      </Offcanvas.Body>
    </Offcanvas>
  )
});

export default MobileOffcanvas;

