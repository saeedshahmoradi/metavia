import styles from './about.module.css';
import { motion } from 'framer-motion';

function About() {

  return (
    <motion.div className={`${styles.container} page_container`}
      initial={{ rotateX: -90 }}
      animate={{ rotateX: 0 }}
      exit={{ rotateX: -90 }}
      transition={{ duration: 0.55 }}
    >
      <h1>About</h1>
    </motion.div>
  )
}

export default About;