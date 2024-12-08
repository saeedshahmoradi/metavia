import {motion} from 'framer-motion';
import styles from './contact.module.css';

function Contact() {
  return (
    <motion.div className={`${styles.container} page_container`}
      initial={{ x: '-100%' }}
      animate={{ x: 0 }}
      exit={{ x: '-100%' }}
      transition={{ duration: 0.55 }}
    >
      <h1>contact</h1>
    </motion.div>
  )
}

export default Contact;