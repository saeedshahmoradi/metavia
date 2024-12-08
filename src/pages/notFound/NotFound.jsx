import { motion } from 'framer-motion';
import styles from './notFound.module.css';

function NotFound() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%' }}>
      <motion.div className={`${styles.container} page_container`}
        initial={{ width: 0, height: 0, rotateZ: -360 }}
        animate={{ width: '100%', height: '100%', rotateZ: 0 }}
        exit={{ width: 0, height: 0, rotateZ: 360 }}
        transition={{ duration: 0.4 }}
      >
        <h1>NotFound</h1>
      </motion.div>
    </div>
  )
}

export default NotFound;