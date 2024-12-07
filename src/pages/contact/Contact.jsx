import {motion} from 'framer-motion';
import styles from './contact.module.css';

function Contact() {
  return (
    <motion.div className={`${styles.container} page_container`}
      initial={{ opacity: 0, x: '-100%' }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: '-100%' }}
      transition={{ duration: 0.3 }}
    >
      <h1>contact</h1>
    </motion.div>
  )
}

export default Contact;