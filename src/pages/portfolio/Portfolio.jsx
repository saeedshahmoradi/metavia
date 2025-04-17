import { motion } from 'motion/react';
import styles from './portfolio.module.css';
import PageTitle from '../../components/pageTitle/PageTitle';
import { useContext, useEffect, useRef, useState } from 'react';
import axiosRequest from '../../services/axios/axiosRequest';
import Loading from '../../components/loading/Loading';
import AppContext from '../../contexts/AppContext';
import { Helmet } from 'react-helmet-async';


export default function Portfolio() {

  const { fullScreen, t, language } = useContext(AppContext);
  const allPortfolioRef = useRef([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategoryMenu, setSelectedCategoryMenu] = useState('All');
  const [currentCategory, setCurrentCategory] = useState([]);


  useEffect(() => {
    const portfolioController = new AbortController();
    axiosRequest.get(`/projects/?lang=${language}`, { signal: portfolioController.signal })
      .then(res => {
        allPortfolioRef.current = res.data;
        setCurrentCategory(res.data);
      })
      .catch(err => console.log(err))
      .finally(() => setIsLoading(false));
    return () => portfolioController.abort();
  }, []);


  const categoryMenu = [
    { id: 1, name: 'All' },
    { id: 2, name: 'Websites' },
    { id: 3, name: 'Designs' }];

  function handleCategoryChange(menu) {
    setSelectedCategoryMenu(menu);
    if (menu === 'All') {
      setCurrentCategory(allPortfolioRef.current)
    } else {
      const filteredItems = allPortfolioRef.current.filter(item => item.category === menu);
      setCurrentCategory(filteredItems);
    }
  }

  return (
    <>
      <Helmet>
        <title>{t("portfolio.title")}</title>
        <meta name="description" content={t("portfolio.metaDescription")} />
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
              <PageTitle title={t("portfolio.pageTitle")} />
              <div className='mt-5'>
                <nav>
                  <ul className={`${styles.portfolioUl}`}>
                    {categoryMenu.map((menu) =>
                      <li className={`${selectedCategoryMenu === menu.name ? styles.activeLink : 'textMuted'} pb-2 px-2`} key={menu.id}
                        onClick={() => handleCategoryChange(menu.name)}
                      >
                        {t(`portfolio.categories.${menu.name.toLowerCase()}`)}
                      </li>
                    )}
                  </ul>
                </nav>

                <section className={styles.portfolio_container}>
                  {currentCategory.map(({ id, link, name, photo }) =>
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
                          <div className={language === 'fa' ? styles.visitButton_fa : styles.visitButton_en}>{t("portfolio.visitButton")}</div>
                        </div>
                        <p className={`${styles.projectName} cardTitle text-truncate w-100 mt-2 px-2`}>{name}</p>
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