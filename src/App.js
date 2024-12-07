import { useRoutes, useLocation } from 'react-router';
import styles from './app.module.css';
import DesktopNavbar from './components/desktopNavbar/DesktopNavbar';
import routes from './routes';
import { AnimatePresence, motion } from 'framer-motion';
import FixedArea from './components/fixedArea/FixedArea';
import { useEffect, useRef, useState } from 'react';

function App() {

  const location = useLocation();
  const router = useRoutes(routes);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMouseMove = (event) => {
    const { clientX, clientY, currentTarget } = event;

    const { width, height, left, top } = currentTarget.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;

    const offsetX = (clientX - centerX) / (width / 2);
    const offsetY = (clientY - centerY) / (height / 2);

    setOffset({
      x: offsetX * 10,
      y: offsetY * 10,
    });
  };

  return (
    <div className={styles.container}
      onMouseMove={handleMouseMove}
      style={{ backgroundPosition: `${50 + offset.x}% ${50 + offset.y}%` }}
    >
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
