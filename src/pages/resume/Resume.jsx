import styles from './resume.module.css';
import { motion } from 'framer-motion';
import { useNavigate, useParams } from 'react-router';
import { useContext, useEffect, useState } from 'react';
import axiosRequest from '../../services/axios/axiosRequest';
import { FaLinkedin } from "react-icons/fa";
import { TfiWorld } from "react-icons/tfi";
import { FaGithub } from "react-icons/fa";
import SectionTitle from '../../components/sectionTitle/SectionTitle';
import Loading from '../../components/loading/Loading';
import AppContext from '../../contexts/AppContext';
import { Helmet } from 'react-helmet-async';
import { stringToTitle } from '../../utils';
import { formatPhoneNumber } from '../../utils';


export default function Resume() {

  const { fullScreen } = useContext(AppContext);
  const { slug } = useParams();
  const navigateTo = useNavigate();
  const [resume, setResume] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const resumeController = new AbortController();
    axiosRequest.get(`/members/${slug}/`, { signal: resumeController.signal })
      .then(res => setResume(res.data))
      .catch(err => { if (err?.response?.status === 404) navigateTo('/'); })
      .finally(() => setIsLoading(false));
    return () => resumeController.abort();
  }, []);

  return (
    <>
      <Helmet>
        <title>{stringToTitle(slug, '-')} - Metavia</title>
        {isLoading ?
          <meta name="description" content={`Explore the professional resume of ${stringToTitle(slug, '-')}. Learn about [his/her] expertise, skills, and experience in web and mobile app development to see how [he/she] can bring value to your project.`} />
          :
          <meta name="description" content={`${stringToTitle(slug, '-')} - ${resume?.role}  | Explore ${stringToTitle(slug, '-')} resume, Learn about  years of experience, skills, and contributions to delivering exceptional web and mobile solutions.`} />
        }
      </Helmet>

      <motion.div className={fullScreen ? 'fullScreen_page_container' : 'page_container'}
        initial={{ x: '-100%', scale: 0.7 }}
        animate={{ scale: [0.7, 0.7, 1], x: ['-100%', '50%', '50%'], translateX: [0, '-50%', '-50%'] }}
        exit={{ scale: [1, 0.7, 0.7], x: ['50%', '50%', '100%'], translateX: ['-50%', '-50%', 0] }}
        transition={{ duration: 0.7, ease: "easeInOut" }}
      >
        {isLoading ? <Loading /> :
          <div className={styles.resume_container}>

            <SectionTitle title='Profile' />

            {/* Profile Section */}
            <section className={styles.profile} style={resume.photo ? { padding: '60px 20px 20px' } : { padding: '40px 20px' }} key={resume.id}>

              {resume.photo &&
                <img className={styles.profilePhoto} src={resume.photo} alt={resume.full_name} />
              }

              <div className='d-flex flex-column justify-content-between'>
                <div className='text-center text-sm-start'>
                  <h2 className={`${styles.fullName} h5`}>{resume.full_name}</h2>
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
                  <p className={styles.profileTitle}>Age </p>
                  <p className={styles.profileValue}>{resume.age}</p>
                </div>
                <div className={styles.memberDetail}>
                  <p className={styles.profileTitle}>Degree </p>
                  <p className={styles.profileValue}>{resume.degree}</p>
                </div>
                <div className={styles.memberDetail}>
                  <p className={styles.profileTitle}>City </p>
                  <p className={styles.profileValue}>{resume.city}</p>
                </div>
                <div className={styles.memberDetail}>
                  <p className={styles.profileTitle}>Email </p>
                  <a className={styles.profileValue} href={`mailto:${resume.email}`}>{resume.email}</a>
                </div>
                <div className={styles.memberDetail}>
                  <p className={styles.profileTitle}>Phone </p>
                  <a className={styles.profileValue} href={`tel:${resume.phone}`}>{formatPhoneNumber(resume.phone)}</a>
                </div>

                <div className='d-flex d-sm-none gap-3 mt-3'>
                  {resume.linkedin && <a href={resume.linkedin} target='_blank' rel="noreferrer noopener"><FaLinkedin className={styles.social_icon} /></a>}
                  {resume.github && <a href={resume.github} target='_blank' rel="noreferrer noopener"><FaGithub className={styles.social_icon} /></a>}
                  {resume.website && <a href={resume.website} target='_blank' rel="noreferrer noopener"><TfiWorld className={styles.social_icon} /></a>}
                </div>

              </div>
            </section>

            {/* Bisection Section */}
            <div className={styles.bisection}>
              {/* َAboute Me Section */}
              {resume?.summary?.length > 0 &&
                <section>
                  <SectionTitle title='About Me' className='mt-5' />
                  <div className={styles.abouteMe_wrapper}>
                    <p className='desc'>{resume.summary}</p>
                  </div>
                </section>
              }

              {/* Skills Section */}
              {resume?.skills?.length > 0 &&
                <section>
                  <SectionTitle title='Skills' className='mt-5' />
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
              <>
                <SectionTitle title='Portfolio' className='mt-5' />
                <section className={styles.portfolio_container}>
                  {resume.projects.map(project =>
                    <a href={project.link} target='_blank' rel="noreferrer noopener" key={project.id}>
                      <div className={styles.portfolioPhoto_wrapper}>
                        <img className={styles.portfolioPhoto} src={project.photo} alt={project.name} />
                        <p className={`${styles.visitButton} cardTitle text-truncate mt-2`}>{project.name}</p>
                      </div>
                    </a>
                  )}
                </section>
              </>
            }

            {/* Certificates Section */}
            {resume?.certifications?.length > 0 &&
              <>
                <SectionTitle title='Certificates' className='mt-5' />
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
              </>
            }
          </div>
        }
      </motion.div >
    </>
  )
}
