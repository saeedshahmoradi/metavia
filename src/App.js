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
// import Spinner from 'react-bootstrap/Spinner';


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
    // <AppContext.Provider value={globalValues}>
    //   {isLoading ?
    //     <Loading className='bgDarkCharcoal' />
    //     :
    //     <div className={styles.container} onMouseMove={(event) => handleMouseMove(event)}>
    //       <div className={styles.spaceFiller}></div>
    //       <main className={styles.main}>
    //         <FixedArea />
    //         <section className={styles.animatedArea}>
    //           <GiHamburgerMenu className={styles.hamburger} onClick={() => setisShowingOffcanvas(true)} />
    //           <MobileOffcanvas show={isShowingOffcanvas} closeOffcanvas={() => setisShowingOffcanvas(false)} />
    //           {/* <Suspense fallback={<Spinner animation='grow' style={{ position: 'absolute', top: 'calc(50% - 50px)', left: 'calc(50% - 50px)', width: '100px', height: '100px', backgroundColor: 'var(--vividCyan)' }} />}> */}
    //           <AnimatePresence mode="wait">
    //             <motion.div className={styles.routerWrapper} key={location.pathname}>
    //               {router}
    //             </motion.div>
    //           </AnimatePresence>
    //           {/* </Suspense> */}
    //         </section>
    //       </main>
    //       <DesktopNavbar />
    //     </div>
    //   }
    // </AppContext.Provider >


    <AppContext.Provider value={globalValues}>
      {isLoading ? <Loading className='bgDarkCharcoal' /> :

        <div className={fullScreen ? styles.fullScreenContainer : styles.container} onMouseMove={(event) => handleMouseMove(event)}>

          {/* {!fullScreen && <div className={styles.spaceFiller}></div>} */}
          {<div className={styles.spaceFiller} style={fullScreen ? { width: 0, transition: '0.5s 0.5s' } : { width: '70px', transition: '1s' }}></div>}

          <main className={styles.main}
            style={fullScreen ? { width: '100%', height: '100%', alignItems: 'flex-start', borderRadius: 0 } : {}}>

            {fullScreen ? <FullScreenNavbar /> : <FixedArea />}
            {/* <FixedArea /> */}

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
          {/* {!fullScreen && <DesktopNavbar />} */}
          {/* {fullScreen ? <FullScreenNavbar /> : <DesktopNavbar />} */}
        </div>
      }
    </AppContext.Provider >
  );
}
