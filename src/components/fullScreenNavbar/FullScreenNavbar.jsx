import styles from './fullScreenNavbar.module.css';
import { LiaHomeSolid } from "react-icons/lia";
import { SlPeople } from "react-icons/sl";
import { IoBriefcaseOutline } from "react-icons/io5";
import { GoMail } from "react-icons/go";
import { GrBlog } from "react-icons/gr";
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { memo, useContext } from 'react';
import { activeLinkSpecifier } from '../../utils/utils';
import { RxExitFullScreen } from "react-icons/rx";
import AppContext from '../../contexts/AppContext';
import { useTranslation } from 'react-i18next';
import { IoEarth } from "react-icons/io5";


const FullScreenNavbar = memo(() => {

  const { handleFullScreenMode } = useContext(AppContext);
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const navigateTo = useNavigate();

  // change Language & redirect to corresponding page with another language
  function toggleLanguage() {
    const newLang = i18n.language === 'fa' ? 'en' : 'fa';
    const currentPath = location.pathname;
    const newPath = currentPath.replace(/^\/(fa|en)/, `/${newLang}`);
    i18n.changeLanguage(newLang).then(() => {
      document.documentElement.lang = newLang;
      navigateTo(newPath);
    });
  }

  return (
    <header className='d-none d-lg-block'>
      <nav>
        <ul className={styles.fullScreenNavUl}>

          <li>
            <NavLink onClick={toggleLanguage}>
              <IoEarth className={`${styles.menuIcon} ${styles.languageIcon}`} />
              {i18n.language === 'en' ?
                <p className={styles.menuLabel} style={{ fontFamily: 'IranSans' }}>فارسی</p>
                :
                <p className={styles.menuLabel} style={{ fontFamily: 'calibri' }}>English</p>
              }
            </NavLink>
          </li>

          <li>
            <NavLink to={`/${i18n.language}`} style={() => activeLinkSpecifier('', location, i18n)}>
              <LiaHomeSolid className={styles.menuIcon} />
              <p className={styles.menuLabel}>{t("navbar.home")}</p>
            </NavLink>
          </li>
          <li>
            <NavLink to={`/${i18n.language}/members`} style={() => activeLinkSpecifier('/members', location, i18n)}>
              <SlPeople className={styles.menuIcon} />
              <p className={styles.menuLabel}>{t("navbar.members")}</p>
            </NavLink>
          </li>
          <li>
            <NavLink to={`/${i18n.language}/portfolio`} style={() => activeLinkSpecifier('/portfolio', location, i18n)}>
              <IoBriefcaseOutline className={styles.menuIcon} />
              <p className={styles.menuLabel}>{t("navbar.portfolio")}</p>
            </NavLink>
          </li>
          <li>
            <NavLink to={`/${i18n.language}/contactUs`} style={() => activeLinkSpecifier('/contactUs', location, i18n)}>
              <GoMail className={styles.menuIcon} />
              <p className={styles.menuLabel}>{t("navbar.contactUs")}</p>
            </NavLink>
          </li>
          <li>
            <NavLink to={`/${i18n.language}/blogs`} style={() => activeLinkSpecifier('/blogs', location, i18n)}>
              <GrBlog className={styles.menuIcon} />
              <p className={styles.menuLabel}>{t("navbar.blogs")}</p>
            </NavLink>
          </li>

          <li>
            <NavLink onClick={() => handleFullScreenMode(false)}>
              <RxExitFullScreen className={`${styles.menuIcon} ${styles.fullScreenIcon}`} />
              <p className={styles.menuLabel}>{t("navbar.smallMode")}</p>
            </NavLink>
          </li>

        </ul>
      </nav>
    </header >
  )
});

export default FullScreenNavbar;