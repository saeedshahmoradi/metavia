import { style } from 'framer-motion/client';
import styles from './loader.module.css';

export default function Loader() {
  return (
    <div className={styles.loader_container}>
      <div className={styles.loader}></div>
    </div>
  )
}
