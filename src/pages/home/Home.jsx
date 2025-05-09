import styles from './home.module.css';
import Loading from '../../components/loading/Loading';
import { motion } from 'framer-motion';
import { useContext, useEffect, useMemo, useState } from 'react';
import AppContext from '../../contexts/AppContext';
import { AiFillInstagram } from "react-icons/ai";
import { FaTelegramPlane } from "react-icons/fa";
import { IoLogoWhatsapp } from "react-icons/io";
import { Helmet } from 'react-helmet-async';
import ParticlesBackground from '../../components/particlesBackground/ParticlesBackground';
import { Link } from 'react-router-dom';
import { GiCheckMark } from "react-icons/gi";
import Accordion from 'react-bootstrap/Accordion';
import { FaPlus } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa6";
import PortfolioMarquee from '../../components/home/portfolioMarquee/PortfolioMarquee';
import HeroMarquee from '../../components/home/heroMarquee/HeroMarquee';
import { RtlFadeIn, VerticalFadeIn } from '../../components/animations/Animations';
import axiosRequest from '../../services/axios/axiosRequest';
import DOMPurify from 'dompurify';
import { shuffleArray } from '../../utils/utils';


export default function Home() {

  const { team, fullScreen, t, language } = useContext(AppContext);
  const [openAccordionItem, setOpenAccordionItem] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [home, setHome] = useState({});

  const description = t("home.hero.teamDescription").split('');

  useEffect(() => {
    setIsLoading(true);
    const homeController = new AbortController();
    axiosRequest.get(`/home/?lang=${language}`, { signal: homeController.signal })
      .then(res => setHome(res.data))
      .catch(err => console.log(err))
      .finally(() => setIsLoading(false));
    return () => homeController.abort();
  }, []);


  const heroBgImages = [
    { id: 1, src: '/assets/images/home/hero/1.jpg' },
    { id: 2, src: '/assets/images/home/hero/2.jpg' },
    { id: 3, src: '/assets/images/home/hero/3.jpg' },
    { id: 4, src: '/assets/images/home/hero/4.jpg' },
    { id: 5, src: '/assets/images/home/hero/5.jpg' },
    { id: 6, src: '/assets/images/home/hero/6.jpg' },
    { id: 7, src: '/assets/images/home/hero/7.jpg' },
    { id: 8, src: '/assets/images/home/hero/8.jpg' },
    { id: 9, src: '/assets/images/home/hero/9.jpg' },
    { id: 10, src: '/assets/images/home/hero/10.jpg' },
    { id: 11, src: '/assets/images/home/hero/11.jpg' },
  ];

  const shuffled1 = useMemo(() => shuffleArray(heroBgImages), []);
  const shuffled2 = useMemo(() => shuffleArray(heroBgImages), []);
  const shuffled3 = useMemo(() => shuffleArray(heroBgImages), []);
  const shuffled4 = useMemo(() => shuffleArray(heroBgImages), []);
  const shuffled5 = useMemo(() => shuffleArray(heroBgImages), []);


  return (
    <>
      <Helmet>
        <title>{t('home.title')}</title>
        <meta name="description" content={t('home.metaDescription')} />
        <link rel="canonical" href={`https://www.metavia.ir/${language}/`} />
      </Helmet>

      <div style={{ perspective: '400px', height: '100%' }}>
        {/* <motion.div className={`${styles.container} ${fullScreen ? 'fullScreen_page_container' : 'page_container'}`} */}
        <motion.div className={styles.container}
          style={{ transformStyle: 'preserve-3d' }}
          initial={{ rotateX: -130 }}
          animate={{ rotateX: 0, transformOrigin: '0 0 0' }}
          // animate={{ rotateX: [-130, 10, -5, 0], transformOrigin: '0 0 0' }}
          exit={{ rotateX: 130, transformOrigin: '0 bottom 0' }}
          transition={{ duration: 1, ease: "easeInOut" }}
        >

          {isLoading ? <Loading /> :
            <>
              {/* START Hero */}
              <section className={styles.hero}>
                <div className={styles.marqueeBgWrapper}>
                  <div className={styles.heroDimmer}></div>
                  <HeroMarquee data={shuffled1} />
                  <HeroMarquee data={shuffled2} direction='up' />
                  <HeroMarquee data={shuffled3} className={fullScreen ? styles.fullHeroMarquee3 : styles.smallHeroMarquee3} />
                  <HeroMarquee data={shuffled4} direction='up' className={fullScreen ? styles.fullHeroMarquee4 : styles.smallHeroMarquee4} />
                  <HeroMarquee data={shuffled5} className={fullScreen ? styles.fullHeroMarquee5 : styles.smallHeroMarquee5} />
                </div>

                <ParticlesBackground />

                {(fullScreen || window.innerWidth < 992) && <img className={styles.teamLogo} src={team.photo ?? "/logo512.png"} alt={team.name} />}

                <h1 className={styles.teamName} style={{ fontFamily: language === 'fa' ? 'IranSans' : 'recoleta', }}>{team.name}</h1>

                <strong className='text-center px-3 lightDesc'>
                  {description.map((char, index) =>
                    <span className={styles.teamDesc} style={{ animationDelay: `${(index * 0.07) + 1}s` }} key={index + 1}>
                      {char}
                    </span>)}
                </strong>

                <p className={`${styles.teamSlogan} h2`} style={{
                  animationDelay: `${(description.length * 0.07) + 1.5}s`,
                  fontFamily: language === 'fa' ? 'IranSans' : 'recoleta',
                }}>{t("home.hero.teamSlogan")}</p>

                <Link to={`/${language}/contactUs`} className={styles.heroBtn}>{t("home.hero.heroButton")}</Link>
              </section>


              {/* WHY METAVIA */}
              <section className={styles.whyMetavia}>
                {/* Programming SubSection */}
                <div className={styles.programming_container}>
                  <div className={`${styles.subSection_wrapper} container`}>
                    <div className={styles.programming_title_wrapper}>
                      <h3 className={`${styles.programming_title} h4 mb-0`}>{t("home.programming.sectionLabel")}</h3>
                    </div>

                    <div className={styles.programming_images_container}>
                      <img className={styles.laptop} src="assets/images/home/programming/laptop.png" alt={t("home.programming.sectionLabel")} loading='lazy' />
                      <img className={styles.coding1} src="assets/images/home/programming/coding1.jpg" alt={t("home.programming.sectionLabel")} loading='lazy' />
                      <img className={styles.coding2} src="assets/images/home/programming/coding2.jpg" alt={t("home.programming.sectionLabel")} loading='lazy' />
                    </div>

                    <VerticalFadeIn>
                      <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(home?.custom_design) }}></div>
                    </VerticalFadeIn>

                  </div>
                </div>

                {/* Responsive SubSection */}
                <div className={styles.responsive_container}>
                  <div className={`${styles.subSection_wrapper} container`}>
                    <div className={styles.responsive_title_wrapper}>
                      <h3 className={`${styles.responsive_title} h4 mb-0`}>{t("home.responsive.sectionLabel")}</h3>
                    </div>
                    <VerticalFadeIn>
                      <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(home?.responsive_feature) }}></div>
                    </VerticalFadeIn>
                  </div>

                  <img className={styles.devices} src="assets/images/home/responsive/responsive.png" alt={t("home.responsive.sectionLabel")} loading='lazy' />

                  <div className='mx-auto'>
                    {home?.responsive_features?.map(({ id, option }) =>
                      <VerticalFadeIn key={id}>
                        <div className='d-flex gap-3 align-items-start'>
                          <div className={`${styles.responsive_check_icon} rounded-circle d-flex justify-content-center align-items-center flex-shrink-0`}>
                            <GiCheckMark className='text-white' /*style={{ fontSize: '18px' }}*/ />
                          </div>
                          <p className={styles.responsiveFeature}>{option}</p>
                        </div>
                      </VerticalFadeIn>
                    )}
                  </div>
                </div>

                {/* Other Features SubSection*/}
                <div className={styles.otherFeatures_container}>
                  <div className={styles.subSection_wrapper}>
                    <div className={styles.otherFeatures_title_wrapper}>
                      <h3 className={`${styles.otherFeatures_title} h4 mb-0`}>{t("home.otherFeatures.sectionLabel")}</h3>
                    </div>
                    <div className={styles.features_wrapper}>
                      {home?.other_features?.map(({ id, option, description, icon, alt }) =>
                        <div className={styles.feature} key={id}>
                          <VerticalFadeIn>
                            <img src={icon} alt={alt} loading='lazy' />
                          </VerticalFadeIn>
                          <VerticalFadeIn>
                            <h3 className={`${styles.feature_title} h4 mb-0`} style={{ fontFamily: language === 'en' ? 'recoleta' : 'IranSans' }}>
                              {option}
                            </h3>
                          </VerticalFadeIn>
                          <VerticalFadeIn>
                            <p className={`${styles.feature_desc} lightDesc`}>{description}</p>
                          </VerticalFadeIn>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </section>


              {/* Services Section */}
              <section className={styles.services_container}>
                <div className='container'>
                  <div className={styles.services_title_wrapper}>
                    <h2 className={`${styles.services_title} fw-bold text-white text-center`}>{t("home.services.sectionTitle")}</h2>
                  </div>

                  <VerticalFadeIn>
                    <div className='text-white my-5' dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(home?.service) }}></div>
                  </VerticalFadeIn>

                  <div className=' d-flex flex-wrap justify-content-center gap-5'>
                    {home?.services_list?.map(({ id, option, icon, alt }) =>
                      <VerticalFadeIn className={styles.service_wrapper} key={id}>
                        <div className='w-100 h-100 d-flex flex-column justify-content-center align-items-center gap-3 text-light border border-light-subtle border-2 rounded-4 px-3 py-4'>
                          <img src={icon} alt={alt} style={{ width: '40px' }} loading='lazy' />
                          <h3 className={`${styles.service_description} lh-lg text-center`}>{option}</h3>
                        </div>
                      </VerticalFadeIn>
                    )}
                  </div>
                </div>
              </section>

              {/* FAQ */}
              <section className={styles.faq_container}>
                <div className='container'>
                  <h2 className='fw-bold text-white text-center'>{t("home.faq.sectionTitle")}</h2>

                  <VerticalFadeIn>
                    <div className='text-white my-5' dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(home?.faq) }}></div>
                  </VerticalFadeIn>

                  <VerticalFadeIn>
                    <Accordion defaultActiveKey="1" className={styles.faqAccordion}>
                      {home?.faq_list?.map(({ question, answer, id }, index) =>
                        <Accordion.Item eventKey={index + 1} key={id} className={styles.faqAccordion_item} onClick={() => setOpenAccordionItem(index + 1)}>
                          <Accordion.Header className={styles.faqAccordion_Header}>
                            <p className={styles.faqAccordion_question} style={{ textAlign: language === 'en' ? "left" : "right" }}>{question}</p>
                            <div className={styles.faqAccordion_toggleIcon_wrapper}>{openAccordionItem === index + 1 ? <FaMinus /> : <FaPlus />}</div>
                          </Accordion.Header>
                          <Accordion.Body className={styles.faqAccordion_Body} onExiting={() => openAccordionItem === index + 1 && setOpenAccordionItem(null)}>
                            {answer}
                          </Accordion.Body>
                        </Accordion.Item>
                      )}
                    </Accordion>
                  </VerticalFadeIn>
                </div>
              </section>

              {/* Portfolio Section */}
              {/* <section className={styles.portfolio_container}>
                <div className='container'>
                  <h2 className='fw-bold text-white text-center'>نمونه کارها</h2>
                </div>

                <PortfolioMarquee data={portfolio} language={language} />

                <div style={{ marginTop: '20px' }}>
                  <Link to={`/${language}/portfolio`} style={{ color: '#6C63FF', textDecoration: 'underline' }}>مشاهده همه پروژه‌ها</Link>
                </div>
              </section> */}


              {/* Tesimonials */}
              {/* <section className={styles.testimonials_container}>
                <h2>نظرات مشتریان</h2>
                <p>"متاویا فراتر از انتظارات ما عمل کرد. وبسایت و اپ ما بی‌نظیره!"<br />— رضا احمدی | مدیرعامل BeautyWay</p>
              </section>

              <section id="contact">
                <h2>تماس با ما</h2>
                <p>آیا آماده‌اید پروژه‌ی رویایی خود را شروع کنید؟ ما منتظر شنیدن ایده‌های شما هستیم! ✨</p>
                <div className="buttons">
                  <a href="#">درخواست مشاوره رایگان</a>
                </div>
              </section> */}


              {/* <svg width="364" height="382" viewBox="0 0 364 382" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ position: 'fixed', left: 0 }}>
                <path opacity="0.6" d="M28.4913 347.55C-110.483 492.294 -305.432 302.753 -385.535 189.889L146.099 -213.257C216.813 -163.395 219.675 -46.8114 169.541 -8.79371C119.406 29.2241 80.4793 84.1904 83.3707 122.713C87.8525 280.481 61.1915 312.574 28.4913 347.55Z" fill="url(#paint0_linear_1056_3536)" />
                <path opacity="0.6" d="M303.427 137.206C164.453 281.951 -30.4963 92.4094 -110.599 -20.4544L421.035 -423.601C491.748 -373.738 494.611 -257.155 444.476 -219.137C394.342 -181.12 355.415 -126.153 358.306 -87.6303C362.788 70.1371 336.127 102.23 303.427 137.206Z" fill="url(#paint1_linear_1056_3536)" />
                <defs>
                  <linearGradient id="paint0_linear_1056_3536" x1="179.727" y1="378.682" x2="-117.544" y2="-13.3325" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#20D9A1" />
                    <stop offset="1" stop-color="#5F39FF" />
                  </linearGradient>
                  <linearGradient id="paint1_linear_1056_3536" x1="454.663" y1="168.338" x2="157.392" y2="-223.676" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#20D9A1" />
                    <stop offset="1" stop-color="#5F39FF" />
                  </linearGradient>
                </defs>
              </svg>

              <svg width="364" height="382" viewBox="0 0 364 382" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path opacity="0.6" d="M335.509 347.55C474.483 492.294 669.432 302.753 749.535 189.889L217.901 -213.257C147.187 -163.395 144.325 -46.8114 194.459 -8.79371C244.594 29.2241 283.521 84.1904 280.629 122.713C276.148 280.481 302.809 312.574 335.509 347.55Z" fill="url(#paint0_linear_1056_3542)" />
                <path opacity="0.6" d="M60.5732 137.206C199.547 281.951 394.496 92.4094 474.599 -20.4544L-57.035 -423.601C-127.748 -373.738 -130.611 -257.155 -80.4764 -219.137C-30.342 -181.12 8.58517 -126.153 5.6938 -87.6303C1.21196 70.1371 27.873 102.23 60.5732 137.206Z" fill="url(#paint1_linear_1056_3542)" />
                <defs>
                  <linearGradient id="paint0_linear_1056_3542" x1="184.273" y1="378.682" x2="481.544" y2="-13.3325" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#20D9A1" />
                    <stop offset="1" stop-color="#5F39FF" />
                  </linearGradient>
                  <linearGradient id="paint1_linear_1056_3542" x1="-90.6628" y1="168.338" x2="206.608" y2="-223.676" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#20D9A1" />
                    <stop offset="1" stop-color="#5F39FF" />
                  </linearGradient>
                </defs>
              </svg> */}


              {/* Footer */}
              {/* {fullScreen && */}
              <div className={styles.homeFooter}>
                <p className={styles.footer_description}>{t("home.footer.copyright")}</p>
                <div className={styles.social_container}>
                  <a href={team.instagram} target='_blank' rel='noreferrer noopener'><AiFillInstagram className={styles.social_icon} /></a>
                  <a href={team.telegram} target='_blank' rel='noreferrer noopener'><FaTelegramPlane className={styles.social_icon} /></a>
                  <a href={team.whatsapp} target='_blank' rel='noreferrer noopener'><IoLogoWhatsapp className={styles.social_icon} /></a>
                </div>
              </div>
              {/* } */}
            </>
          }
        </motion.div >
      </div >
    </>
  )
}
