import styles from './resume.module.css';
import { motion } from 'motion/react';
import { useNavigate, useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import axiosRequest from '../../services/axios/axiosRequest';
import { FaLinkedin } from "react-icons/fa";
import { TfiWorld } from "react-icons/tfi";
import { FaGithub } from "react-icons/fa";
import SectionTitle from '../../components/sectionTitle/SectionTitle';
import Loading from '../../components/loading/Loading';
import AppContext from '../../contexts/AppContext';
import { Helmet } from 'react-helmet-async';
import { stringToTitle, formatPhoneNumber } from '../../utils/utils';


export default function Resume() {

  const { fullScreen, language, t } = useContext(AppContext);
  const { slug } = useParams();
  const navigateTo = useNavigate();
  const [resume, setResume] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const resumeController = new AbortController();
    axiosRequest.get(`/members/${slug}/?lang=${language}`, { signal: resumeController.signal })
      .then(res => setResume(res.data))
      .catch(err => { if (err?.response?.status === 404) navigateTo('/'); })
      .finally(() => setIsLoading(false));
    return () => resumeController.abort();
  }, []);

  return (
    <>
      <Helmet>
        {isLoading ?
          <>
            <title>{t("resume.title", { name: stringToTitle(slug, '-') })}</title>
            <meta name="description" content={t("resume.metaDescription", { name: stringToTitle(slug, '-') })} />
          </>
          :
          <>
            <title>{t("resume.title", { name: resume.full_name })}</title>
            <meta name="description" content={t("resume.metaDescription", { name: resume.full_name })} />
          </>
        }
      </Helmet>

      <motion.div className={fullScreen ? 'fullScreen_page_container' : 'page_container'}
        initial={{ x: '-100%', scale: 0.7 }}
        animate={{ scale: [0.7, 0.7, 1], x: ['-100%', '50%', '50%'], translateX: [0, '-50%', '-50%'] }}
        exit={{ scale: [1, 0.7, 0.7], x: ['50%', '50%', '100%'], translateX: ['-50%', '-50%', 0] }}
        transition={{ duration: 0.7, ease: "easeInOut" }}
      >
        {isLoading ? <Loading /> :
          <div className={styles.resume_wrapper}>

            {/* Profile Section */}
            <div>
              <SectionTitle title={t("resume.profile.sectionTitle")} />
              <section className={styles.profile} style={resume.photo ? { padding: '60px 20px 20px' } : { padding: '40px 20px' }} key={resume.id}>

                {resume.photo && <img className={styles.profilePhoto} src={resume.photo} alt={resume.full_name} />}

                <div className='d-flex flex-column justify-content-between'>
                  <div className={`text-center ${language === 'fa' ? 'text-sm-end' : 'text-sm-start'}`}>
                    <h2 className={`${styles.fullName} h5 mt-2 mb-3`}>{resume.full_name}</h2>
                    <h3 className={styles.role}>{resume.role}</h3>
                  </div>
                  <div className='d-none d-sm-flex gap-3 mt-3'>
                    {resume.linkedin && <a href={resume.linkedin}><FaLinkedin className={styles.social_icon} /></a>}
                    {resume.github && <a href={resume.github}><FaGithub className={styles.social_icon} /></a>}
                    {resume.website && <a href={resume.website}><TfiWorld className={styles.social_icon} /></a>}
                  </div>
                </div>

                <div>
                  <div className={styles.memberDetail}>
                    <p className={styles.profileTitle}>{t("resume.profile.age")} </p>
                    <p className={styles.profileValue}>{resume.age}</p>
                  </div>
                  <div className={styles.memberDetail}>
                    <p className={styles.profileTitle}>{t("resume.profile.degree")} </p>
                    <p className={styles.profileValue}>{resume.degree}</p>
                  </div>
                  <div className={styles.memberDetail}>
                    <p className={styles.profileTitle}>{t("resume.profile.city")} </p>
                    <p className={styles.profileValue}>{resume.city}</p>
                  </div>
                  <div className={styles.memberDetail}>
                    <p className={styles.profileTitle}>{t("resume.profile.email")} </p>
                    <a className={styles.profileValue} href={`mailto:${resume.email}`} style={{ fontFamily: 'calibri' }}>{resume.email}</a>
                  </div>
                  <div className={styles.memberDetail}>
                    <p className={styles.profileTitle}>{t("resume.profile.phone")} </p>
                    <a className={`${styles.profileValue} ${styles.phone}`} href={`tel:${resume.phone}`}>{formatPhoneNumber(resume.phone)}</a>
                  </div>

                  <div className='d-flex d-sm-none gap-3 mt-3'>
                    {resume.linkedin && <a href={resume.linkedin} target='_blank' rel="noreferrer noopener"><FaLinkedin className={styles.social_icon} /></a>}
                    {resume.github && <a href={resume.github} target='_blank' rel="noreferrer noopener"><FaGithub className={styles.social_icon} /></a>}
                    {resume.website && <a href={resume.website} target='_blank' rel="noreferrer noopener"><TfiWorld className={styles.social_icon} /></a>}
                  </div>

                </div>
              </section>
            </div>

            {/* Bisection Section */}
            <div className={styles.bisection}>
              {/* َAbout Me Section */}
              {resume?.summary?.length > 0 &&
                <section>
                  <SectionTitle title={t("resume.about.sectionTitle")} className='mb-4' />
                  <div className={language === 'fa' ? styles.abouteMe_wrapper_fa : styles.abouteMe_wrapper_en}>
                    <p className='desc'>{resume.summary}</p>
                  </div>
                </section>
              }

              {/* Skills Section */}
              {resume?.skills?.length > 0 &&
                <section>
                  <SectionTitle title={t("resume.skills.sectionTitle")} className='mb-4' />
                  <div className={`${styles.skills_container} d-flex flex-wrap gap-2 user-select-none`}>
                    {resume.skills.map(skill =>
                      <p className='textWhite px-2 py-1 bgVividCyan' key={skill.id}>{skill.name}</p>
                    )}
                  </div>
                </section>
              }
            </div>

            {/* Projects Section */}
            {resume?.projects?.length > 0 &&
              <div>
                <SectionTitle title={t("resume.portfolio.sectionTitle")} className='mb-4' />
                <section className={styles.portfolio_container}>
                  {resume.projects.map(project =>
                    <a href={project.link} target='_blank' rel="noreferrer noopener" key={project.id}>
                      <div className={styles.portfolioPhoto_wrapper}>
                        <img className={styles.portfolioPhoto} src={project.photo} alt={project.name} />
                        <p className={`${language === 'fa' ? styles.visitButton_fa : styles.visitButton_en} cardTitle text-truncate mt-2`}>
                          {project.name}
                        </p>
                      </div>
                    </a>
                  )}
                </section>
              </div>
            }

            {/* Certificates Section */}
            {resume?.certifications?.length > 0 &&
              <div>
                <SectionTitle title={t("resume.certificates.sectionTitle")} className='mb-4' />
                <section className={styles.certificates_container}>
                  {resume.certifications.map(certification =>
                    <a className={styles.certificate} href={certification.link} target='_blank' rel="noreferrer noopener" key={certification.id}>
                      <div className={styles.certificateInstitution}>
                        {certification.institution}
                      </div>
                      <div className={styles.certificateName}>
                        {certification.name}
                      </div>
                    </a>
                  )}
                </section>
              </div>
            }
          </div>
        }
      </motion.div >
    </>
  )
}