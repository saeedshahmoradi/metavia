import { useRoutes, useLocation } from 'react-router-dom';
import styles from './app.module.css';
import DesktopNavbar from './components/desktopNavbar/DesktopNavbar';
import routes from './routes';
import { AnimatePresence, motion } from 'motion/react';
import FixedArea from './components/fixedArea/FixedArea';
import { useEffect, useState } from 'react';
import MobileOffcanvas from './components/mobileOffCanvas/MobileOffcanvas';
import { handleMouseMove } from './utils/utils';
import { GiHamburgerMenu } from "react-icons/gi";
import axiosRequest from './services/axios/axiosRequest';
import AppContext from './contexts/AppContext';
import Loading from './components/loading/Loading';
import FullScreenNavbar from './components/fullScreenNavbar/FullScreenNavbar';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import axios from 'axios';

// Dr Omid Shahmoradi Start Test
import drShahmoradiRoutes from './drShahmoradi/drShahmoradiRoutes';
// Dr Omid Shahmoradi End Test


export default function App() {

  const location = useLocation();
  const router = useRoutes(routes);
  const [isShowingOffcanvas, setisShowingOffcanvas] = useState(false);
  const [team, setTeam] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [fullScreen, setFullScreen] = useState(false);
  const { t, i18n } = useTranslation();


  // Detect Clients Language from IP Address
  useEffect(() => {
    const countryController = new AbortController();
    if (location.pathname === '/') {
      setIsLoading(true);
      axios.get('https://api.db-ip.com/v2/free/self', { signal: countryController.signal })
        .then((res) => {
          const countryCode = res.data.countryCode;
          const defaultLang = ['IR', 'AF', 'TJ'].includes(countryCode) ? 'fa' : 'en';
          window.location.replace(`/${defaultLang}`);
        })
        .catch(() => window.location.replace(`/en`))
        .finally(() => setIsLoading(false));
    }
    return (() => countryController.abort());
  }, [location.pathname]);


  useEffect(() => {
    setIsLoading(true);
    const teamController = new AbortController();
    const query = `query {
      team(lang: "${i18n.language ?? 'en'}"){
        id
        photo
        name
        jobTitle
        telegram
        whatsapp
        instagram
        phone
        email
        city
      }
    }`;
    axiosRequest.get(`/team?query=${query}`, { headers: { 'Content-Type': 'application/json' }, signal: teamController.signal })
      .then(res => setTeam(res.data.data.team[0]))
      .catch(err => console.log(err))
      .finally(() => setIsLoading(false))
    return (() => teamController.abort());
  }, [i18n.language]);


  // Detecting Language from URL and changing i18n language to it when user refreshes the page
  useEffect(() => {
    const pathLang = location.pathname.split('/')[1];
    if (['fa', 'en'].includes(pathLang)) {
      i18n.changeLanguage(pathLang);
      document.documentElement.lang = pathLang;
    }
  }, [location.pathname]);


  function handleFullScreenMode(bool) {
    setFullScreen(bool)
  }


  const globalValues = {
    team,
    fullScreen,
    handleFullScreenMode,
    language: i18n.language,
    t,
  }


  // Dr Omid Shahmoradi Start Test
  const drShahmoradiRouter = useRoutes(drShahmoradiRoutes);
  if (location.pathname.toLowerCase() === '/drshahmoradi') { return <>{drShahmoradiRouter}</> }
  // Dr Omid Shahmoradi End Test


  return (
    <AppContext.Provider value={globalValues}>
      <Helmet>
        <title>{t("app.title")}</title>
        <meta name="description" content={t("app.metaDescription")} />
      </Helmet>

      {/* {isLoading ? <Loading className='bgDarkCharcoal' /> : */}

      <div className={fullScreen ? styles.fullScreenContainer : styles.container} onMouseMove={(event) => handleMouseMove(event)}>

        <DesktopNavbar />

        <main className={styles.main} style={fullScreen ? { width: '100%', height: '100%', alignItems: 'flex-start', borderRadius: 0 } : {}}>

          {fullScreen ? <FullScreenNavbar /> : <FixedArea />}

          <section className={styles.animatedArea} style={fullScreen ? { width: '100%', height: '100%', borderRadius: 0 } : {}}>

            <GiHamburgerMenu className={styles.hamburger}
              style={i18n.language === 'fa' ? { left: '10px' } : { right: '10px' }}
              onClick={() => setisShowingOffcanvas(true)} />

            <MobileOffcanvas show={isShowingOffcanvas} closeOffcanvas={() => setisShowingOffcanvas(false)} />

            {isLoading ? <Loading className='bgDarkCharcoal' /> :
              <AnimatePresence mode="wait">
                <motion.div className={`${styles.routerWrapper}`} key={location.pathname}>
                  {router}
                </motion.div>
              </AnimatePresence>
            }

          </section>
        </main>

        {<div className={styles.spaceFiller} style={fullScreen ? { width: 0, transition: '0.5s 0.5s' } : { width: '70px', transition: '1s' }}></div>}

      </div>
      {/* } */}
    </AppContext.Provider >
  );
}
