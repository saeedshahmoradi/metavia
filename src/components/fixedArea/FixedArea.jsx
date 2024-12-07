import { memo } from 'react';
import styles from './fixedArea.module.css';
// import { PiInstagramLogoLight } from "react-icons/pi";
// import { PiTelegramLogoLight } from "react-icons/pi";
// import { PiWhatsappLogoLight } from "react-icons/pi";
import { AiFillInstagram } from "react-icons/ai";
import { FaTelegramPlane } from "react-icons/fa";
import { IoLogoWhatsapp } from "react-icons/io";

const FixedArea = memo(() => {
  return (
    <section className={styles.fixed_area}>
      <img className={styles.logo} src="assets/images/profilePhoto.gif" alt="dev group" />
      <h1 className={styles.groupName}>Dev Group</h1>
      <strong className={styles.shortDescription}>Web and App Design</strong>
      <div className={styles.social}>
        {/* <PiInstagramLogoLight className={styles.social_icon} />
        <PiTelegramLogoLight className={styles.social_icon} />
        <PiWhatsappLogoLight className={styles.social_icon} /> */}
        <AiFillInstagram className={styles.social_icon} />
        <FaTelegramPlane className={styles.social_icon} />
        <IoLogoWhatsapp className={styles.social_icon} />
      </div>
    </section>
  )
})

export default FixedArea;