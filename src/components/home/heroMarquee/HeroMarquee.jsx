import styles from './heroMarquee.module.css';
import { motion } from 'framer-motion';
import { memo } from 'react';

function HeroMarquee({ data, direction = 'down', style = {}, className = '' }) {
  const allImages = [...data, ...data];

  return (
    <div className={`${styles.marquee_container} ${className}`} style={style}>
      <motion.div
        className={styles.marquee_track}
        animate={{ y: direction.toLowerCase() === 'down' ? ['-50%', '0%'] : ['0%', '-50%'] }}
        transition={{
          duration: 180,
          ease: "linear",
          repeat: Infinity,
        }}
      >
        {allImages.map(({ id, src }, index) => (
          <div className={styles.marquee_item} key={`${id}-${index}`}>
            <img src={src} className={styles.marquee_image} alt={`slide-${id}`} />
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export default memo(HeroMarquee);
