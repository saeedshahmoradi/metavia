import {motion} from 'framer-motion';
import styles from './portfolio.module.css';

function Portfolio() {
  return (
    <motion.div className={`${styles.container} page_container`}
      initial={{ opacity: 0, y: '100%' }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: '100%' }}
      transition={{ duration: 0.3 }}
    >
      <h1>Portfolio</h1>
    </motion.div>
  )
}

export default Portfolio