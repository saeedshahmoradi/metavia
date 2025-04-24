import { Link } from 'react-router-dom';
import styles from './backButton.module.css';
import { FaArrowRight } from "react-icons/fa6";
import { FaArrowLeft } from "react-icons/fa6";
import { useContext } from 'react';
import AppContext from '../../contexts/AppContext';


export default function BackButton({title, to, className='', style={}}) {
  
  const {language} = useContext(AppContext);

  return (
    <Link to={to} className={`${styles.backButton} ${className}`} style={style}>
      {language === 'fa' ? <FaArrowRight /> : <FaArrowLeft />}
      <span>{title}</span>
    </Link>
  )
}
