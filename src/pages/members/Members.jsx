import {motion} from 'framer-motion';
import styles from './members.module.css';

function Members() {
  return (
    <motion.div className={`${styles.container} page_container`}
      initial={{ rotateY: -90 }}
      animate={{ rotateY: 0 }}
      exit={{ rotateY: -90 }}
      transition={{ duration: 0.55 }}
    >
      <h1>Members</h1>
    </motion.div>
  )
}

export default Members;