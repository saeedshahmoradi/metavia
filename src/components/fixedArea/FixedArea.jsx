import { memo, useContext } from 'react';
import styles from './fixedArea.module.css';
import { AiFillInstagram } from "react-icons/ai";
import { FaTelegramPlane } from "react-icons/fa";
import { IoLogoWhatsapp } from "react-icons/io";
import AppContext from '../../contexts/AppContext';

const FixedArea = memo(() => {

  const { team } = useContext(AppContext);

  return (
    <section className={styles.fixed_area}>
      <img className={styles.logo} src={team.photo ?? "/assets/images/noProfile.gif"} alt={team.name} />
      <strong className={styles.groupName}>{team.name}</strong>
      <strong className={styles.shortDescription}>{team.jobTitle}</strong>
      <div className={styles.social_container}>
        <a href={team.instagram} target='_blank' rel='noreferrer noopener'><AiFillInstagram className={styles.social_icon} /></a>
        <a href={team.telegram} target='_blank' rel='noreferrer noopener'><FaTelegramPlane className={styles.social_icon} /></a>
        <a href={team.whatsapp} target='_blank' rel='noreferrer noopener'><IoLogoWhatsapp className={styles.social_icon} /></a>
      </div>
    </section>
  )
})

export default FixedArea;