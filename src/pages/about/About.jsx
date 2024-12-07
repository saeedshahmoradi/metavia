import { useLocation } from 'react-router';
import styles from './about.module.css';
import { AnimatePresence, motion } from 'framer-motion';

function About() {

  const { pathname } = useLocation();
  return (
    <motion.div className={`${styles.container} page_container`}
      initial={{ opacity: 0, rotateX: -90 }}
      animate={{ opacity: 1, rotateX: 0 }}
      exit={{ opacity: 0, rotateX: -90 }}
      transition={{ duration: 0.3 }}
    >
      <h1>About</h1>
    </motion.div>
  )
}

export default About;