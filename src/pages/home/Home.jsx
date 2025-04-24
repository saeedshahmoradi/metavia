import { motion } from 'motion/react';
import styles from './home.module.css';
import { useContext } from 'react';
import AppContext from '../../contexts/AppContext';
import { AiFillInstagram } from "react-icons/ai";
import { FaTelegramPlane } from "react-icons/fa";
import { IoLogoWhatsapp } from "react-icons/io";
import { Helmet } from 'react-helmet-async';
import ParticlesBackground from '../../components/particlesBackground/ParticlesBackground';


export default function Home() {

  const { team, fullScreen, t, language } = useContext(AppContext);

  const description = t("home.teamDescription").split('');

  return (
    <>
      <Helmet>
        <title>{t('home.title')}</title>
        <meta name="description" content={t('home.metaDescription')} />
        <link rel="canonical" href={`https://www.metavia.ir/${language}/`} />
      </Helmet>

      <div style={{ perspective: '400px', height: '100%' }}>

        <motion.div className={`${styles.container} ${fullScreen ? 'fullScreen_page_container' : 'page_container'}`}
          style={{ transformStyle: 'preserve-3d', position: 'relative' }}
          initial={{ rotateX: -130 }}
          animate={{ rotateX: 0, transformOrigin: '0 0 0' }}
          // animate={{ rotateX: [-130, 10, -5, 0], transformOrigin: '0 0 0' }}
          exit={{ rotateX: 130, transformOrigin: '0 bottom 0' }}
          transition={{ duration: 1, ease: "easeInOut" }}
        >

          {/* START TEST */}
          <ParticlesBackground />
          {/* END TEST */}

          {(fullScreen || window.innerWidth < 992) && <img className={styles.logo} src={team.photo ?? "/assets/images/noProfile.gif"} alt={team.name} />}

          <h1 className={styles.teamName}>{team.name}</h1>

          <strong className='text-center'>
            {description.map((char, index) =>
              <span className={styles.descSpan} style={{ animationDelay: `${(index * 0.07) + 1}s` }} key={index + 1}>
                {char}
              </span>)}
          </strong>

          {fullScreen &&
            <div className={styles.social_container}>
              <a href={team.instagram} target='_blank' rel='noreferrer noopener'><AiFillInstagram className={styles.social_icon} /></a>
              <a href={team.telegram} target='_blank' rel='noreferrer noopener'><FaTelegramPlane className={styles.social_icon} /></a>
              <a href={team.whatsapp} target='_blank' rel='noreferrer noopener'><IoLogoWhatsapp className={styles.social_icon} /></a>
            </div>
          }
        </motion.div>
      </div>
    </>
  )
}
