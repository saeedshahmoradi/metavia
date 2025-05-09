import { useContext, useEffect, useState } from 'react';
import PageTitle from '../../components/pageTitle/PageTitle';
import styles from './blogs.module.css';
import { motion } from 'framer-motion';
import axiosRequest from '../../services/axios/axiosRequest';
import Loading from '../../components/loading/Loading';
import AppContext from '../../contexts/AppContext';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

export default function Blogs() {

  const { fullScreen, t, language } = useContext(AppContext);
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const blogsController = new AbortController();
    axiosRequest.get(`/blogs/?lang=${language}`, { signal: blogsController.signal })
      .then(res => setBlogs(res.data))
      .catch(err => console.log(err))
      .finally(() => setIsLoading(false));
    return () => blogsController.abort();
  }, []);

  return (

    <>
      <Helmet>
        <title>{t("blogs.title")}</title>
        <meta name="description" content={t('blogs.metaDescription')} />
      </Helmet>

      <motion.div className={fullScreen ? 'fullScreen_page_container' : 'page_container'}
        initial={{ y: '-100%', rotateZ: -10 }}
        animate={{ y: ['-100%', '0', '-30%', '0', '-15%', '0', '-3%', '0'], rotateZ: [-10, 10, -6, 4, -2, 1, 0, 0], transition: { duration: 1.3, ease: 'easeInOut' } }}
        exit={{ rotateZ: 90, transformOrigin: '0 0 -200px', opacity: [1, 1, 1, 0.5, 0], transition: { duration: 0.7, ease: 'easeIn' } }}
      >
        {isLoading ? <Loading /> :
          <>
            <PageTitle title={t("blogs.pageTitle")} />
            <div className={styles.blogs_container}>
              {blogs.map(({ id, photo, title, slug }) =>
                <Link to={`/${language}/blog/${slug}`} className={styles.card} key={id}>
                  <div className='rounded-2 overflow-hidden'>
                    <img className={styles.image} src={photo ?? '/assets/images/noImage.jpg'} alt={title} loading='lazy' />
                  </div>
                  <p className={`${styles.title} cardTitle`}>{title}</p>
                </Link>
              )}
            </div>
          </>
        }
      </motion.div>
    </>
  )
}