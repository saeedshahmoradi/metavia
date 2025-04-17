function full_name_validator(values, errors, t) {
  if (values.full_name.length === 0) { errors.full_name = t('contact.form.validation.fullName.required') }
  // else if (values.first_name.length < 2) { errors.first_name = 'نام باید حداقل شامل 2 حرف باشد' }
  // else if (values.first_name.length > 50) { errors.first_name = 'نام باید حداکثر شامل 50 حرف باشد' }
  // else if (!/^[\u0600-\u06FF\u067E\u0686\u0698\u06AF\u200C\s]+$/.test(values.first_name)) { errors.first_name = 'نام وارد شده معتبر نمی باشد' };
}

function phone_validator(values, errors, t) {
  if (values.phone.length === 0) { errors.phone = t("contact.form.validation.phone.required") }
  // else if (!/^09\d{9}$/.test(values.phone)) { errors.phone = 'شماره وارد شده معتبر نمی باشد' };
}

function email_validator(values, errors, t) {
  if (values.email.length === 0) { errors.email = t('contact.form.validation.email.required') }
  else if (!/^(?=.{1,64}@.{1,255}$)([a-zA-Z0-9._%+-]+)@([a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(values.email)) { errors.email = t('contact.form.validation.email.invalid') };
}

function isd_validator(values, errors, t) {
  if (values.ISD === 0) { errors.ISD = t('contact.form.validation.isd.required') }
}

function subject_validator(values, errors, t) {
  if (values.subject.length === 0) { errors.subject = t("contact.form.validation.subject.required") }
}

function message_validator(values, errors, t) {
  if (values.message.length === 0) { errors.message = t("contact.form.validation.message.required") }
}


export {
  full_name_validator,
  email_validator,
  isd_validator,
  phone_validator,
  subject_validator,
  message_validator,
};