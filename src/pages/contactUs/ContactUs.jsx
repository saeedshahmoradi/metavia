import { motion } from 'framer-motion';
import styles from './contactUs.module.css';
import PageTitle from '../../components/pageTitle/PageTitle';
import { useFormik } from 'formik';
import { MdPhone } from "react-icons/md";
import { IoIosMail } from "react-icons/io";
import { FaLocationDot } from "react-icons/fa6";
import axiosRequest from '../../services/axios/axiosRequest';
import { Form, Toast, ToastContainer } from 'react-bootstrap';
import { full_name_validator, email_validator, isd_validator, phone_validator, subject_validator, message_validator } from '../../forms/formValidators';
import { useContext, useEffect, useState } from 'react';
import AppContext from '../../contexts/AppContext';
import Loading from '../../components/loading/Loading';
import { Helmet } from 'react-helmet-async';
import { formatPhoneNumber } from '../../utils/utils';


export default function Contact() {

  const { team, fullScreen, t } = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(false);
  const [ISDs, setISDs] = useState([]);
  const [selectedCountryCode, setSelectedCountryCode] = useState('');
  const [isShowingSuccessToast, setIsShowingSuccessToast] = useState(false);
  const [isShowingFailureToast, setIsShowingFailureToast] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const isdControlller = new AbortController();
    axiosRequest.get('/ISDs/', { signal: isdControlller.signal })
      .then(res => setISDs(res.data))
      .catch(err => console.log(err))
      .finally(() => setIsLoading(false));
    return () => isdControlller.abort();
  }, []);


  function handleCountryChange(event) {
    const selectedId = event.target.value;
    const selectedCountry = ISDs.find((isd) => isd.id == selectedId);
    if (selectedCountry) {
      setSelectedCountryCode(`+${selectedCountry.ISD}`);
      contactForm.handleChange(event);
    }
  }


  function handleISDChange(event) {
    let value = event.target.value;
    if (/^\d/.test(value)) value = `+${value}`;
    setSelectedCountryCode(value);
    const matchedISD = ISDs.find((isd) => value === `+${isd.ISD}`);
    contactForm.setFieldValue('ISD', matchedISD?.id ?? 0);
  }


  const contactForm = useFormik({
    initialValues: { full_name: '', email: '', ISD: 0, phone: '', subject: '', message: '' },
    validate: (values) => handleContactFormValidation(values),
    onSubmit: (values, { resetForm }) => handleContactFormSubmition(values, resetForm),
  });

  function handleContactFormValidation(values) {
    const errors = {};
    full_name_validator(values, errors, t);
    email_validator(values, errors, t);
    isd_validator(values, errors, t);
    phone_validator(values, errors, t);
    subject_validator(values, errors, t);
    message_validator(values, errors, t);
    return errors;
  }

  function handleContactFormSubmition(values, resetForm) {
    setIsLoading(true);
    axiosRequest.post('/contact/', values, { signal: AbortSignal.timeout(10000) })
      .then(() => {
        setIsShowingSuccessToast(true);
        resetForm();
      })
      .catch(err => {
        console.log(err);
        setIsShowingFailureToast(true);
      })
      .finally(() => setIsLoading(false));
  }

  return (
    <>
      <Helmet>
        <title>{t("contact.title")}</title>
        <meta name="description" content={t("contact.metaDescription")} />
      </Helmet>

      <div style={{ height: '100%' }}>
        <motion.div className={fullScreen ? 'fullScreen_page_container' : 'page_container'}
          style={{ transformOrigin: 'right 50%' }}
          initial={{ x: '100%', scaleY: 0.7 }}
          animate={{ x: ['-100%', '0', '0', '0', '0'], scaleX: [1, 1, 0.7, 0.9, 1], scaleY: [0.7, 0.7, 1, 1, 1] }}
          exit={{ transformOrigin: 'left 50%', x: ['0', '0', '0', '0', '100%'], scaleX: [1, 0.8, 0.7, 1, 1], scaleY: [1, 1.04, 1.08, 0.7, 0.7] }}
          transition={{ duration: 0.9, ease: 'linear' }}
        >
          {isLoading ? <Loading /> :
            <>
              <PageTitle title={t("contact.pageTitle")} />
              <div className={styles.contact_container}>

                <section className={styles.contactWays_container}>
                  <div className={styles.contactWay_container}>
                    <div className={styles.contactIcon_container}><FaLocationDot className='fs-3 textDarkCharcoal' /></div>
                    <p className='d-none d-sm-block mt-2 textGold'>{t("contact.city")}</p>
                    <p className='lightDesc'>{team.city}</p>
                  </div>
                  <div className={styles.contactWay_container}>
                    <div className={styles.contactIcon_container}><IoIosMail className='fs-3 textDarkCharcoal' /></div>
                    <p className='d-none d-sm-block mt-2 textGold'>{t("contact.email")}</p>
                    <a className='lightDesc' href={`mailto:${team.email}`}>{team.email}</a>
                  </div>
                  <div className={styles.contactWay_container}>
                    <div className={styles.contactIcon_container}><MdPhone className='fs-4 textDarkCharcoal' /></div>
                    <p className='d-none d-sm-block mt-2 textGold'>{t("contact.phone")}</p>
                    <a className='lightDesc' style={{direction:'ltr'}} href={`tel:${team.phone}`}>{formatPhoneNumber(team.phone)}</a>
                  </div>
                </section>

                <p className='h5 text-center mt-5 mb-4 textGold fw-bold'>{t('contact.form.label')}</p>

                <form className={styles.contact_form} onSubmit={contactForm.handleSubmit}>
                  <div className={styles.inputs_container}>
                    <div className='w-100'>
                      <input className={styles.input} name='full_name' placeholder={t("contact.form.fullName")}
                        value={contactForm.values.full_name}
                        onChange={contactForm.handleChange}
                        onBlur={contactForm.handleBlur} />
                      <p className={styles.errorMessage}>{contactForm.errors.full_name && contactForm.touched.full_name && contactForm.errors.full_name}</p>
                    </div>

                    <div className='w-100'>
                      <input className={styles.input} name='email' placeholder={t("contact.form.email")}
                        value={contactForm.values.email}
                        onChange={contactForm.handleChange}
                        onBlur={contactForm.handleBlur} />
                      <p className={styles.errorMessage}>{contactForm.errors.email && contactForm.touched.email && contactForm.errors.email}</p>
                    </div>

                    <div className='w-100'>
                      <Form.Select className={styles.countrySelect}
                        style={{ color: contactForm.values.ISD === 0 ? 'rgb(103, 102, 102)' : 'var(--light)' }}
                        name='ISD'
                        value={contactForm.values.ISD}
                        onChange={handleCountryChange}
                        onBlur={contactForm.handleBlur}
                      >
                        <option hidden value={0}>{t("contact.form.country")}</option>
                        {ISDs.map(isd => <option value={isd.id} key={isd.id}>{isd.name}</option>)}
                      </Form.Select>
                      <p className={styles.errorMessage}>{contactForm.errors.ISD && contactForm.touched.ISD && contactForm.errors.ISD}</p>
                    </div>

                    <div className='w-100'>
                      <div className={styles.phoneWrapper}>
                        <input className={styles.countryCodeInput}
                          maxLength={5}
                          placeholder={t("contact.form.code")}
                          value={selectedCountryCode}
                          onChange={handleISDChange}
                        />
                        <input className={styles.phoneNumberInput} name='phone' placeholder={t("contact.form.phone")}
                          value={contactForm.values.phone}
                          onChange={contactForm.handleChange}
                          onBlur={contactForm.handleBlur} />
                      </div>
                      <p className={styles.errorMessage}>{contactForm.errors.phone && contactForm.touched.phone && contactForm.errors.phone}</p>
                    </div>

                    <div className='w-100'>
                      <input className={styles.input} name='subject' placeholder={t("contact.form.subject")}
                        value={contactForm.values.subject}
                        onChange={contactForm.handleChange}
                        onBlur={contactForm.handleBlur} />
                      <p className={styles.errorMessage}>{contactForm.errors.subject && contactForm.touched.subject && contactForm.errors.subject}</p>
                    </div>
                  </div>

                  <div className={styles.textArea_container}>
                    <div className={styles.textArea_wrapper}>
                      <textarea className={styles.textarea} name='message' placeholder={t("contact.form.message")}
                        value={contactForm.values.message}
                        onChange={contactForm.handleChange}
                        onBlur={contactForm.handleBlur} />
                      <p className={styles.errorMessage}>{contactForm.errors.message && contactForm.touched.message && contactForm.errors.message}</p>
                    </div>

                    <div className='d-flex flex-column'>
                      <button type='submit' className={`${styles.submit}`}>{t("contact.form.submit")}</button>
                      <p className={styles.errorMessage}></p>
                    </div>
                  </div>
                </form>

              </div>
            </>
          }
          <ToastContainer className="p-3" position={window.innerWidth < 576 ? "top-center" : 'middle-center'} style={{ zIndex: 4 }}>
            <Toast className='bg-success text-light text-center lightDesc' show={isShowingSuccessToast} autohide delay={6000} onClose={() => setIsShowingSuccessToast(false)}>
              <Toast.Body>{t("contact.form.api.success")}</Toast.Body>
            </Toast>

            <Toast className='bg-danger text-light text-center lightDesc' show={isShowingFailureToast} autohide delay={6000} onClose={() => setIsShowingFailureToast(false)}>
              <Toast.Body>{t("contact.form.api.failure")}</Toast.Body>
            </Toast>
          </ToastContainer>
        </motion.div>

      </div>
    </>
  )
}