import styles from './mobileOffcanvas.module.css';
import { activeLinkSpecifier } from '../../utils/utils';
import { memo, useContext } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Button, Offcanvas } from 'react-bootstrap';
import { IoCloseSharp } from "react-icons/io5";
import { AiFillInstagram } from "react-icons/ai";
import { FaTelegramPlane } from "react-icons/fa";
import { IoLogoWhatsapp } from "react-icons/io";
import AppContext from '../../contexts/AppContext';
import { useTranslation } from 'react-i18next';


const MobileOffcanvas = memo(({ show, closeOffcanvas }) => {

  const { team } = useContext(AppContext);
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const navigateTo = useNavigate();

  function toggleLanguage() {
    closeOffcanvas();
    const newLang = i18n.language === 'fa' ? 'en' : 'fa';
    const currentPath = location.pathname;
    const newPath = currentPath.replace(/^\/(fa|en)/, `/${newLang}`);
    i18n.changeLanguage(newLang).then(() => {
      document.documentElement.lang = newLang;
      navigateTo(newPath);
    });
  }

  return (
    <Offcanvas className={styles.offcanvas} show={show} onHide={closeOffcanvas} placement={i18n.language === 'fa' ? 'start' : 'end'}>
      <Offcanvas.Header className={styles.offcanvasHeader}>
        <IoCloseSharp className={styles.closeBtn} onClick={closeOffcanvas} />
        <Button className={styles.languageBtn} variant='outline-light' onClick={toggleLanguage}
          style={{ fontFamily: i18n.language === 'fa' ? 'calibri' : 'IranSans' }}>
          {i18n.language === 'fa' ? 'English' : 'فارسی'}
        </Button>
      </Offcanvas.Header>
      <Offcanvas.Body className={styles.offcanvasBody}>
        <div className={styles.intro}>
          <img className={styles.logo} src={team.photo ?? "/logo512.png"} alt={team.name} />
          <strong className='h3 text-light mt-3'>{team.name}</strong>
          <strong className={`${styles.description} textMuted text-center mt-1`}>{team.jobTitle}</strong>
        </div>

        <nav className='mt-3'>
          <ul className={styles.mobileNavUl}>
            <li onClick={closeOffcanvas}>
              <NavLink to={`/${i18n.language}`} style={activeLinkSpecifier('', location, i18n)}>{t("navbar.home")}</NavLink>
            </li>
            <li onClick={closeOffcanvas}>
              <NavLink to={`/${i18n.language}/members`} style={activeLinkSpecifier('/members', location, i18n)}>{t("navbar.members")}</NavLink>
            </li>
            <li onClick={closeOffcanvas}>
              <NavLink to={`/${i18n.language}/portfolio`} style={activeLinkSpecifier('/portfolio', location, i18n)}>{t("navbar.portfolio")}</NavLink>
            </li>
            <li onClick={closeOffcanvas}>
              <NavLink to={`/${i18n.language}/contactUs`} style={activeLinkSpecifier('/contactUs', location, i18n)}>{t("navbar.contactUs")}</NavLink>
            </li>
            <li onClick={closeOffcanvas}>
              <NavLink to={`/${i18n.language}/blogs`} style={activeLinkSpecifier('/blogs', location, i18n)}>{t("navbar.blogs")}</NavLink>
            </li>
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

