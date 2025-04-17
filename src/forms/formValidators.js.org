function full_name_validator(values, errors) {
  if (values.full_name.length === 0) { errors.full_name = 'Please enter your full name' }
  // else if (values.first_name.length < 2) { errors.first_name = 'نام باید حداقل شامل 2 حرف باشد' }
  // else if (values.first_name.length > 50) { errors.first_name = 'نام باید حداکثر شامل 50 حرف باشد' }
  // else if (!/^[\u0600-\u06FF\u067E\u0686\u0698\u06AF\u200C\s]+$/.test(values.first_name)) { errors.first_name = 'نام وارد شده معتبر نمی باشد' };
}

function phone_validator(values, errors) {
  // if (values.phone_number.length === 0) { errors.phone_number = 'وارد کردن شماره همراه الزامی می باشد' }
  // else if (!/^09\d{9}$/.test(values.phone_number)) { errors.phone_number = 'شماره وارد شده معتبر نمی باشد' };
}

function email_validator(values, errors) {
  if (values.email.length === 0) { errors.email = 'Please enter your email address' }
  else if (!/^(?=.{1,64}@.{1,255}$)([a-zA-Z0-9._%+-]+)@([a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(values.email)) { errors.email = 'Please enter a valid email address' };
}

function subject_validator(values, errors) {
  if (values.subject.length === 0) { errors.subject = 'Please enter a subject' }
}

function message_validator(values, errors) {
  if (values.message.length === 0) { errors.message = 'Please enter a message' }
}


export {
  full_name_validator,
  phone_validator,
  email_validator,
  subject_validator,
  message_validator,
};