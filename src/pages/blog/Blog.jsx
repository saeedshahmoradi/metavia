import styles from './blog.module.css';
import { motion } from 'motion/react';
import { useContext, useEffect, useState } from 'react';
import axiosRequest from '../../services/axios/axiosRequest';
import { useNavigate, useParams } from 'react-router-dom';
import { SlClock } from "react-icons/sl";
import Loading from '../../components/loading/Loading';
import AppContext from '../../contexts/AppContext';
import { Helmet } from 'react-helmet-async';
import DOMPurify from 'dompurify';
import { extractTextFromHTML, stringToTitle } from '../../utils/utils';
import BackButton from '../../components/backButton/BackButton';


export default function Blog() {

  const { fullScreen, t, language } = useContext(AppContext);
  const { slug } = useParams();
  const navigateTo = useNavigate();
  const [blog, setBlog] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const blogController = new AbortController();
    axiosRequest.get(`/blogs/${slug}/?lang=${language}`, { signal: blogController.signal })
      .then(res => setBlog(res.data))
      .catch(err => { if (err?.response?.status === 404) navigateTo('/') })
      .finally(() => setIsLoading(false));
    return () => blogController.abort();
  }, []);

  function dateFormatter(dateString) {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' }
    const longDate = language === 'fa' ? date.toLocaleDateString("fa-IR", options) : date.toLocaleDateString("en-US", options);
    return longDate;
  }

  return (
    <>
      <Helmet>
        {isLoading ?
          <>
            <title>{t("blog.title", { title: stringToTitle(slug, '-') })}</title>
            <meta name="description" content={t("blog.metaDescriptionLoading", { title: stringToTitle(slug, '-') })} />
          </>
          :
          <>
            <title>{t("blog.title", { title: blog.title })}</title>
            <meta name='description' content={t("blog.metaDescription", { description: extractTextFromHTML(DOMPurify.sanitize(blog.description)).slice(0, 150).trim() + '...' })} />
          </>
        }
      </Helmet>

      <motion.div className={fullScreen ? 'fullScreen_page_container' : 'page_container'}
        initial={{ y: '-100%', rotateZ: -10 }}
        animate={{ y: ['-100%', '0', '-30%', '0', '-15%', '0', '-3%', '0'], rotateZ: [-10, 10, -6, 4, -2, 1, 0, 0], transition: { duration: 1.3, ease: 'easeInOut' } }}
        exit={{ rotateZ: 90, transformOrigin: '0 0 -200px', opacity: [1, 1, 1, 0.5, 0], transition: { duration: 0.7, ease: 'easeIn' } }}
      >
        
        {isLoading ? <Loading /> :
          <div className={styles.blog_container}>

            <BackButton to={`/${language}/blogs`} title={t("blog.backButton")} />

            <img className={styles.blogImage} src={blog.photo ?? '/asstes/images/noImage.jpg'}
              alt={`${language === 'fa' ? 'تصویر بلاگ' : 'Blog image'}: ${blog.title}`} />

            <article className={styles.article}>
              <header>
                <h1 className={`${styles.blogTitle} h3`}>{blog.title}</h1>
              </header>

              <section className={` ${styles.blogBody} ${language === 'fa' ? 'IranSans-font' : 'calibri-font'} desc`}
                dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(blog.description) }}>
              </section>

              <footer className={styles.blogFooter}>
                <div className='mb-1'>
                  <SlClock className={`${language === 'fa' ? 'ms-2' : 'me-2'}`} />
                  {dateFormatter(blog.created_at)}
                </div>
                <hr className='my-2' />
                <p>{t("blog.footer")}</p>
              </footer>

            </article>

          </div>
        }
      </motion.div>
    </>
  )
}

