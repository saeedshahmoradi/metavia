import { motion } from 'framer-motion';
import styles from './home.module.css';

function Home() {

  return (
    <motion.div className={`${styles.container} page_container`}
      initial={{ y: '-100%', scale: 0.5 }}
      animate={{ y: 0, scale: 1 }}
      exit={{ y: '-100%', scale: 0.5 }}
      transition={{ duration: 0.55 }}
    >
      <h1 className={styles.groupName}>Dev Group</h1>
      <strong className={styles.description}>
        Website and Application Development
      </strong>
    </motion.div>
  )
}

export default Home;
