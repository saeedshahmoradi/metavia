import {motion} from 'framer-motion';
import styles from './members.module.css';

function Members() {
  return (
    <motion.div className={`${styles.container} page_container`}
      initial={{ opacity: 0, rotateY: -90 }}
      animate={{ opacity: 1, rotateY: 0 }}
      exit={{ opacity: 0, rotateY: -90 }}
      transition={{ duration: 0.3 }}
    >
      <h1>Members</h1>
    </motion.div>
  )
}

export default Members;