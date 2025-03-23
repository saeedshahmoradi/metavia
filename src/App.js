import { useRoutes, useLocation } from 'react-router';
import styles from './app.module.css';
import DesktopNavbar from './components/desktopNavbar/DesktopNavbar';
import routes from './routes';
import { AnimatePresence, motion } from 'framer-motion';
import FixedArea from './components/fixedArea/FixedArea';
import { Suspense, useEffect, useState } from 'react';
import MobileOffcanvas from './components/mobileOffCanvas/MobileOffcanvas';
import { handleMouseMove } from './utils';
import { GiHamburgerMenu } from "react-icons/gi";
import axiosRequest from './services/axios/axiosRequest';
import AppContext from './contexts/AppContext';
import Loading from './components/loading/Loading';
import FullScreenNavbar from './components/fullScreenNavbar/FullScreenNavbar';
import { Helmet } from 'react-helmet-async';


export default function App() {

  const location = useLocation();
  const router = useRoutes(routes);
  const [isShowingOffcanvas, setisShowingOffcanvas] = useState(false);
  const [team, setTeam] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [fullScreen, setFullScreen] = useState(false);

  useEffect(() => {
    const teamController = new AbortController();
    const query = `query {
      team{
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
    axiosRequest.get(`/team?query=${query}`, { headers: { 'Content-Type': 'application/json', }, signal: teamController.signal })
      .then(res => setTeam(res.data.data.team[0]))
      .catch(err => console.log(err))
      .finally(() => setIsLoading(false));
    return () => teamController.abort();
  }, []);

  function handleFullScreenMode(bool) {
    setFullScreen(bool)
  }

  const globalValues = {
    team,
    fullScreen,
    handleFullScreenMode,
  }

  return (
    <AppContext.Provider value={globalValues}>
      <Helmet>
        <title>Metavia</title>
        <meta name="description" content="We craft stunning, high-performance websites, mobile apps, and custom softwares. With a focus on cutting-edge UI/UX design, our team transforms ideas into powerful digital experiences. Let’s build something extraordinary together." />
      </Helmet>


      {isLoading ? <Loading className='bgDarkCharcoal' /> :

        <div className={fullScreen ? styles.fullScreenContainer : styles.container} onMouseMove={(event) => handleMouseMove(event)}>

          {<div className={styles.spaceFiller} style={fullScreen ? { width: 0, transition: '0.5s 0.5s' } : { width: '70px', transition: '1s' }}></div>}

          <main className={styles.main}
            style={fullScreen ? { width: '100%', height: '100%', alignItems: 'flex-start', borderRadius: 0 } : {}}>

            {fullScreen ? <FullScreenNavbar /> : <FixedArea />}

            <section className={styles.animatedArea} style={fullScreen ? { width: '100%', height: '100%', borderRadius: 0 } : {}}>

              <GiHamburgerMenu className={styles.hamburger} onClick={() => setisShowingOffcanvas(true)} />

              <MobileOffcanvas show={isShowingOffcanvas} closeOffcanvas={() => setisShowingOffcanvas(false)} />

              <AnimatePresence mode="wait">
                <motion.div className={`${styles.routerWrapper}`} key={location.pathname}>
                  {router}
                </motion.div>
              </AnimatePresence>

            </section>
          </main>

          <DesktopNavbar />
          
        </div>
      }
    </AppContext.Provider >
  );
}
