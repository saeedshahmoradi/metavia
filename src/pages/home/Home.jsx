import { motion } from 'framer-motion';
import styles from './home.module.css';

function Home() {

  return (
    <motion.div className={`${styles.container} page_container`}
      initial={{ opacity: 0, y: '-100%', scale: 0.5 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: '-100%', scale: 0.5 }}
      transition={{ duration: 0.3 }}
    >
      <h1 className={styles.title}>Dev Group</h1>
      <strong className={styles.description}>
        Website and Application Design
      </strong>
    </motion.div>
  )
}

export default Home;
