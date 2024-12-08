import { useRoutes, useLocation } from 'react-router';
import styles from './app.module.css';
import DesktopNavbar from './components/desktopNavbar/DesktopNavbar';
import routes from './routes';
import { AnimatePresence, motion } from 'framer-motion';
import FixedArea from './components/fixedArea/FixedArea';
import { useState } from 'react';
import MobileOffcanvas from './components/mobileOffCanvas/MobileOffcanvas';
import { handleMouseMove } from './utils';
import { GiHamburgerMenu } from "react-icons/gi";



function App() {

  const location = useLocation();
  const router = useRoutes(routes);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isShowingOffcanvas, setisShowingOffcanvas] = useState(false);

  return (
    <div className={styles.container}
      onMouseMove={(event) => handleMouseMove(event, setOffset)}
      style={{ backgroundPosition: `${50 + offset.x}% ${50 + offset.y}%` }}
    >
      <div className={styles.spaceFiller}></div>
      <main className={styles.main}>
        <FixedArea />
        <section className={styles.variable_area}>

          <GiHamburgerMenu className={styles.hamburger} onClick={() => setisShowingOffcanvas(true)} />
          <MobileOffcanvas show={isShowingOffcanvas} closeOffcanvas={() => setisShowingOffcanvas(false)} />

          <AnimatePresence mode="wait">
            <motion.div className={styles.routerWrapper} key={location.pathname} >
              {router}
            </motion.div>
          </AnimatePresence>
        </section>
      </main>
      <DesktopNavbar />
    </div>
  );
}

export default App;
