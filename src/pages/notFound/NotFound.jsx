import { motion } from 'framer-motion';
import styles from './notFound.module.css';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useContext } from 'react';
import AppContext from '../../contexts/AppContext';

export default function NotFound() {

  const {t, language} = useContext(AppContext);

  return (
    <>
      <Helmet>
        <title>{t("notFound.title")}</title>
        <meta name="description" content={t("notFound.metaDescription")} />
      </Helmet>

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
          <p className='h1 fw-bold text-center'>{t("notFound.pageTitle")}</p>
          <Link to={`/${language}`} className={`${styles.link} ${styles.homeLink}`}>{t("notFound.links.homeLink")}</Link>
          <Link to={`/${language}/contactUs`} className={`${styles.link} ${styles.contactUsLink}`}>{t("notFound.links.contactUsLink")}</Link>
        </div>
      </motion.div>
    </>

  )
}