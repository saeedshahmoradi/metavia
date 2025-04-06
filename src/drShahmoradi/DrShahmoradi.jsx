import { Helmet } from 'react-helmet-async';
import styles from './drShahmoradi.module.css';
import { useFormik } from 'formik';
import { Button, Form, Modal } from 'react-bootstrap';
import { age_validator, full_name_validator, phone_number_validator, subject_validator } from './cosultaionFormValidator';
import axios from 'axios';
import { useState } from 'react';
import Loader from './loader/Loader';


export default function DrShahmoradi() {

  const subjects = [
    { id: 1, name: 'بوتاکس' },
    { id: 2, name: 'کاشت مو' },
    { id: 3, name: 'کاشت ابرو' },
    { id: 4, name: 'کاشت ریش و سبیل' },
    { id: 5, name: 'لاغری موضعی' },
    { id: 6, name: 'فیتنس و تناسب اندام' },
    { id: 7, name: 'سایر' },
  ];

  const [isShowingResultModal, setIsShowingResultModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  function handleFormSubmition(values, resetForm) {
    setIsLoading(true);

    const data = {
      service_id: 'service_ahmrzqo',
      template_id: 'template_tjpnc9l',
      user_id: 'xamjeH81fX-hj9LVy',
      template_params: values,
    };

    axios.post('https://api.emailjs.com/api/v1.0/email/send', data, { signal: AbortSignal.timeout(10000) })
      .then(() => {
        setModalMessage('درخواست شما با موفقیت ثبت و در اسرع وقت بررسی خواهد شد');
        setSuccess(true);
        resetForm();
      })
      .catch(() => {
        setModalMessage('متاسفانه ارسال درخواست موفقیت آمیز نبود، لطفا مجددا تلاش کنید');
        setSuccess(false);
      })
      .finally(() => {
        setIsLoading(false);
        setIsShowingResultModal(true);
      })
  }

  function handleFormValidation(values) {
    const errors = {};
    full_name_validator(values, errors);
    age_validator(values, errors);
    phone_number_validator(values, errors);
    subject_validator(values, errors);
    return errors;
  }

  const ConsultationForm = useFormik({
    initialValues: { fullName: '', age: '', phoneNumber: '', subject: '', message: '' },
    onSubmit: (values, { resetForm }) => handleFormSubmition(values, resetForm),
    validate: values => handleFormValidation(values),
  });


  return (
    <>
      <Helmet>
        <title>دکتر امید رضا شاه مرادی - Metavia</title>
        <meta name="description" content="دکتر شاه مرادی - کاشت مو، ابرو، ریش، سبیل، زیبایی، لاغری موضعی و جوان سازی پوست" />
      </Helmet>

      {isLoading && <Loader />}

      <main className={`${styles.contact_container} container-fluid`}>

        <section className='text-light lh-lg mb-5'>
          <p>زیباجوی گرامی؛</p>
          <p>
            برای دریافت مشاوره با آقای دکتر امیدرضا شاه مرادی، فرم زیر را تکمیل و ارسال نمایید.
            درخواستهای رسیده در اولین فرصت به نوبت بررسی و شخصا توسط خود دکتر پاسخ داده خواهند شد.
          </p>
          <p>با سپاس فراوان</p>
        </section>

        <form className={styles.contact_form} onSubmit={ConsultationForm.handleSubmit}>

          <div className={styles.fields_container}>
            <div className={styles.inputs_container}>
              <div className='w-100'>
                <input className={styles.input} name='fullName' placeholder='نام و نام خانوادگی (فارسی)'
                  value={ConsultationForm.values.fullName}
                  onChange={ConsultationForm.handleChange}
                  onBlur={ConsultationForm.handleBlur} />
                <p className={styles.errorMessage}>{ConsultationForm.errors.fullName && ConsultationForm.touched.fullName && ConsultationForm.errors.fullName}</p>
              </div>

              <div className='w-100'>
                <input className={styles.input} name='age' placeholder='سن (با اعداد انگلیسی)'
                  value={ConsultationForm.values.age}
                  onChange={ConsultationForm.handleChange}
                  onBlur={ConsultationForm.handleBlur} />
                <p className={styles.errorMessage}>{ConsultationForm.errors.age && ConsultationForm.touched.age && ConsultationForm.errors.age}</p>
              </div>

              <div className='w-100'>
                <input className={styles.input} name='phoneNumber' placeholder='شماره موبایل با اعداد انگلیسی (09xxxxxxxxx)'
                  value={ConsultationForm.values.phoneNumber}
                  onChange={ConsultationForm.handleChange}
                  onBlur={ConsultationForm.handleBlur} />
                <p className={styles.errorMessage}>{ConsultationForm.errors.phoneNumber && ConsultationForm.touched.phoneNumber && ConsultationForm.errors.phoneNumber}</p>
              </div>
            </div>

            <div className={styles.description_container}>
              <div className='w-100'>
                <Form.Select className={styles.subjectSelect}
                  style={{ color: !ConsultationForm.values.subject ? 'rgb(103, 102, 102)' : 'var(--light)' }}
                  name='subject'
                  value={ConsultationForm.values.subject}
                  onChange={ConsultationForm.handleChange}
                  onBlur={ConsultationForm.handleBlur}
                >
                  <option hidden value={0}>موضوع</option>
                  {subjects.map(subject => <option value={subject.name} key={subject.id}>{subject.name}</option>)}
                </Form.Select>
                <p className={styles.errorMessage}>{ConsultationForm.errors.subject && ConsultationForm.touched.subject && ConsultationForm.errors.subject}</p>
              </div>

              <div className={styles.textArea_wrapper}>
                <textarea className={styles.textarea} name='message' placeholder='توضیحات (اختیاری)'
                  value={ConsultationForm.values.message}
                  onChange={ConsultationForm.handleChange}
                  onBlur={ConsultationForm.handleBlur} />
                <p className={styles.errorMessage}>{ConsultationForm.errors.message && ConsultationForm.touched.message && ConsultationForm.errors.message}</p>
              </div>
            </div>
          </div>

          <div className='d-flex justify-content-center'>
            <button type='submit' className={`${styles.submit}`}>ارسال درخواست</button>
          </div>
        </form >

      </main >

      <Modal show={isShowingResultModal} centered>
        <Modal.Body>
          <div className={styles.modalBody}>
            <p className='text-center'>{modalMessage}</p>
            <Button className={styles.modalCloseBtn} variant={success ? "success" : "danger"} onClick={() => setIsShowingResultModal(false)}>
              بستن
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  )
}
