import { motion } from 'framer-motion';
import styles from './notFound.module.css';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router';


export default function NotFound() {

  const navigateTo = useNavigate();

  return (
    <motion.div className={`${styles.container} page_container`}
      initial={{ scale: 0.85 }}
      animate={{
        rotateZ: [-10, 10, -10, 10, -10, 10, -10, 10, 0, 0],
        scale: [0.85, 0.85, 0.85, 0.85, 0.85, 0.85, 0.85, 0.85, 1, 1],
        transition: { duration: 1, ease: 'easeInOut' }
      }}
      exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.5 } }}
    >
      <div className={styles.notFound_container}>
        <p className='h1 fw-bold'>Sorry,</p>
        <p className='h1 fw-bold'>Page Not Found !</p>
        <Button className={styles.backToHomeBtn} onClick={(() => navigateTo('/'))}>Back to Home</Button>
      </div>
    </motion.div>
  )
}