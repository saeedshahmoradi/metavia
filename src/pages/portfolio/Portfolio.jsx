import {motion} from 'framer-motion';
import styles from './portfolio.module.css';

function Portfolio() {
  return (
    <motion.div className={`${styles.container} page_container`}
      initial={{ y: '100%' }}
      animate={{ y: 0 }}
      exit={{ y: '100%' }}
      transition={{ duration: 0.55 }}
    >
      <h1>Portfolio</h1>
    </motion.div>
  )
}

export default Portfolio