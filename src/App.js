import { useRoutes, useLocation } from 'react-router';
import styles from './app.module.css';
import DesktopNavbar from './components/desktopNavbar/DesktopNavbar';
import routes from './routes';
import { AnimatePresence, motion } from 'framer-motion';
import FixedArea from './components/fixedArea/FixedArea';

function App() {

  const location = useLocation();
  const router = useRoutes(routes);

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <FixedArea />
        <section className={styles.variable_area}>
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
