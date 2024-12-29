import { motion } from 'framer-motion';
import styles from './contact.module.css';
import PageTitle from '../../components/pageTitle/PageTitle';
import { useFormik } from 'formik';
import { MdPhone } from "react-icons/md";
import { IoIosMail } from "react-icons/io";
import { FaLocationDot } from "react-icons/fa6";
import axiosRequest from '../../services/axios/axiosRequest';
import { Form, Toast, ToastContainer } from 'react-bootstrap';
import { email_validator, full_name_validator, message_validator, phone_validator, subject_validator } from '../../forms/formValidators';
import { useContext, useEffect, useState } from 'react';
import AppContext from '../../contexts/AppContext';
import Loading from '../../components/loading/Loading';


export default function Contact() {

  const { team, fullScreen } = useContext(AppContext);
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
    full_name_validator(values, errors);
    email_validator(values, errors);
    phone_validator(values, errors);
    subject_validator(values, errors);
    message_validator(values, errors);
    return errors;
  }

  function handleContactFormSubmition(values, resetForm) {
    console.log(values);

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
            <PageTitle title='Contact Us' />
            <div className={styles.contact_container}>

              <section className={styles.contactWays_container}>
                <div className={styles.contactWay_container}>
                  <div className={styles.contactIcon_container}><FaLocationDot className='fs-3 textDarkCharcoal' /></div>
                  <p className='d-none d-sm-block mt-2 textGold'>City</p>
                  <p className='desc'>{team.city}</p>
                </div>
                <div className={styles.contactWay_container}>
                  <div className={styles.contactIcon_container}><IoIosMail className='fs-3 textDarkCharcoal' /></div>
                  <p className='d-none d-sm-block mt-2 textGold'>Email</p>
                  <a className='desc' href='mailto:someone@example.com'>{team.email}</a>
                </div>
                <div className={styles.contactWay_container}>
                  <div className={styles.contactIcon_container}><MdPhone className='fs-4 textDarkCharcoal' /></div>
                  <p className='d-none d-sm-block mt-2 textGold'>Phone</p>
                  <a className='desc' href='tel:+989003456789'>{team.phone}</a>
                </div>
              </section>

              <p className='h5 text-center mt-5 mb-4 textGold fw-bold'>Get in touch with us</p>

              <form className={styles.contact_form} onSubmit={contactForm.handleSubmit}>
                <div className={styles.inputs_container}>
                  <div className='w-100'>
                    <input className={styles.input} name='full_name' placeholder='Full name'
                      value={contactForm.values.full_name}
                      onChange={contactForm.handleChange}
                      onBlur={contactForm.handleBlur} />
                    <p className={styles.errorMessage}>{contactForm.errors.full_name && contactForm.touched.full_name && contactForm.errors.full_name}</p>
                  </div>

                  <div className='w-100'>
                    <input className={styles.input} name='email' placeholder='Email'
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
                      <option hidden value={0}>Country</option>
                      {ISDs.map(isd => <option value={isd.id} key={isd.id}>{isd.name}</option>)}
                    </Form.Select>
                    <p className={styles.errorMessage}>{contactForm.errors.ISD && contactForm.touched.ISD && contactForm.errors.ISD}</p>
                  </div>

                  <div className='w-100'>
                    <div className={styles.phoneWrapper}>
                      <input className={styles.countryCodeInput}
                        maxLength={5}
                        placeholder='Code'
                        value={selectedCountryCode}
                        onChange={handleISDChange}
                      />
                      <input className={styles.phoneNumberInput} name='phone' placeholder='Phone Number'
                        value={contactForm.values.phone}
                        onChange={contactForm.handleChange}
                        onBlur={contactForm.handleBlur} />
                    </div>
                    <p className={styles.errorMessage}>{contactForm.errors.phone && contactForm.touched.phone && contactForm.errors.phone}</p>
                  </div>

                  <div className='w-100'>
                    <input className={styles.input} name='subject' placeholder='Subject'
                      value={contactForm.values.subject}
                      onChange={contactForm.handleChange}
                      onBlur={contactForm.handleBlur} />
                    <p className={styles.errorMessage}>{contactForm.errors.subject && contactForm.touched.subject && contactForm.errors.subject}</p>
                  </div>
                </div>

                <div className={styles.textArea_container}>
                  <div className={styles.textArea_wrapper}>
                    <textarea className={styles.textarea} name='message' placeholder='Message'
                      value={contactForm.values.message}
                      onChange={contactForm.handleChange}
                      onBlur={contactForm.handleBlur} />
                    <p className={styles.errorMessage}>{contactForm.errors.message && contactForm.touched.message && contactForm.errors.message}</p>
                  </div>

                  <div className='d-flex flex-column'>
                    <button type='submit' className={`${styles.submit}`}>Send Message</button>
                    <p className={styles.errorMessage}></p>
                  </div>
                </div>
              </form>

            </div>
          </>
        }
        <ToastContainer className="p-3" position={window.innerWidth < 576 ? "top-center" : 'middle-center'} style={{ zIndex: 4 }}>
          <Toast className='bg-success text-light text-center desc' show={isShowingSuccessToast} autohide delay={6000} onClose={() => setIsShowingSuccessToast(false)}>
            <Toast.Body>Message Sent successfully</Toast.Body>
          </Toast>

          <Toast className='bg-danger text-light text-center desc' show={isShowingFailureToast} autohide delay={6000} onClose={() => setIsShowingFailureToast(false)}>
            <Toast.Body>Failed to send Message! Please Try again</Toast.Body>
          </Toast>
        </ToastContainer>
      </motion.div>

    </div>
  )
}