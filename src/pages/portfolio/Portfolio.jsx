import { motion } from 'framer-motion';
import styles from './portfolio.module.css';
import PageTitle from '../../components/pageTitle/PageTitle';
import { useContext, useEffect, useRef, useState } from 'react';
import axiosRequest from '../../services/axios/axiosRequest';
import Loading from '../../components/loading/Loading';
import AppContext from '../../contexts/AppContext';
import { Helmet } from 'react-helmet-async';


export default function Portfolio() {

  const { fullScreen } = useContext(AppContext);
  const allPortfolioRef = useRef([]);
  const [isLoading, setIsLoading] = useState(true);
  const [categoryName, setCategoryName] = useState('All');
  const [currentCategory, setCurrentCategory] = useState([]);

  useEffect(() => {
    const portfolioController = new AbortController();
    axiosRequest.get('/projects/', { signal: portfolioController.signal })
      .then(res => {
        allPortfolioRef.current = res.data;
        setCurrentCategory(res.data);
      })
      .catch(err => console.log(err))
      .finally(() => setIsLoading(false));
    return () => portfolioController.abort();
  }, []);

  function handleCategoryChange(category) {
    setCategoryName(category);
    if (category === 'All') {
      setCurrentCategory(allPortfolioRef.current)
    } else {
      const filteredItems = allPortfolioRef.current.filter(item => item.category === category);
      setCurrentCategory(filteredItems);
    }
  }

  return (

    <>
      <Helmet>
        <title>Portfolio - Metavia</title>
        <meta name="description" content="We specialize in professional web design and mobile app development. Explore our portfolio and innovative solutions to take your business to the next level." />
      </Helmet>

      <div style={{ perspective: '700px', height: '100%' }}>
        <motion.div className={fullScreen ? 'fullScreen_page_container' : 'page_container'}
          initial={{ x: '50%', translateX: '-50%', rotateX: -90, scale: 0.2 }}
          animate={{ x: '0', translateX: '0', rotateX: [-90, 0], scale: [0.2, 1] }}
          exit={{ x: '50%', translateX: '-50%', rotateX: [0, 90], scale: [1, 0.2] }}
          transition={{ duration: 0.7, ease: "easeInOut" }}

        // initial={{ rotateY: -15, rotateX: 10, rotateZ: -5, scale: 0 }}
        // animate={{
        //   rotateY: [-15, 15, -15, 15, -15, 0],
        //   rotateX: [10, 0, 10, 0, 10, 0],
        //   rotateZ: [-5, 5, -5, 5, -5, 0],
        //   scale: [0, 0.2, 0.4, 0.6, 0.8, 1],
        //   transformOrigin: ['50% left', '50% right', '50% left', '50% right', '50% left', '50% 50%'],
        // }}
        // exit={{
        //   rotateY: [0, -15, 15, -15, 15, -15],
        //   rotateX: [0, -10, 0, -10, 0, -10],
        //   rotateZ: [0, -5, 5, -5, 5, -5],
        //   scale: [1, 0.8, 0.6, 0.4, 0.2, 0]
        // }}
        // transition={{ duration: 1, ease: "easeInOut" }}

        // initial={{ opacity: 0, scale: 1.2 }}
        // animate={{ opacity: 1, scale: 1 }}
        // exit={{ opacity: 0, scale: 1.2 }}
        // transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          {isLoading ? <Loading /> :
            <>
              <PageTitle title='Portfolio' />
              <div className='mt-5'>
                <nav>
                  <ul className={`${styles.portfolioUl}`}>
                    <li className={`${categoryName === 'All' ? 'textVividCyan' : 'textMuted'} px-1`} onClick={() => handleCategoryChange('All')}>All</li>
                    <li className={`${categoryName === 'Websites' ? 'textVividCyan' : 'textMuted'} px-1`} onClick={() => handleCategoryChange('Websites')}>Websites</li>
                    <li className={`${categoryName === 'Designs' ? 'textVividCyan' : 'textMuted'} px-1`} onClick={() => handleCategoryChange('Designs')}>Designs</li>
                  </ul>
                </nav>

                <section className={styles.portfolio_container}>
                  {currentCategory.map(({ id, link, name, photo }, index) =>
                    <motion.div
                      className={styles.portfolioCard}
                      layout
                      key={id}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.2 }}
                    >
                      <a href={link} target='_blank' rel="noreferrer noopener">
                        <div className={styles.portfolioPhoto_wrapper}>
                          <img className={styles.portfolioPhoto} src={photo} alt={name} />
                          <div className={styles.visitButton}>View Project</div>
                        </div>
                        <p className='cardTitle text-truncate w-100 mt-2'>{name}</p>
                      </a>
                    </motion.div>
                  )}
                </section>

              </div>
            </>
          }
        </motion.div>
      </div >
    </>
  )
}