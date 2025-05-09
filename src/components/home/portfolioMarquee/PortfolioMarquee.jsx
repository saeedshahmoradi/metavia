import styles from './portfolioMarquee.module.css';
import { motion } from 'framer-motion';
import { memo } from 'react';


const PortfolioMarquee = memo(({ language, data }) => {

  const allImages = [...data, ...data];

  const animate = language === 'en' ? { x: ['0%', '-50%'] } : { x: ['0%', '50%'] }

  return (
    <div className={styles.marquee_container}>
      <motion.div className={styles.marquee_track}
        animate={animate}
        transition={{
          duration: 10,
          ease: "linear",
          repeat: Infinity,
        }}
      >
        {allImages.map(({ src }, index) =>
          <div className={styles.marquee_item} key={index}>
            <img src={src}  className={styles.marquee_image} alt={`portfolio-${index}`} />
          </div>
        )}

      </motion.div>
    </div>
  )
});

export default PortfolioMarquee;