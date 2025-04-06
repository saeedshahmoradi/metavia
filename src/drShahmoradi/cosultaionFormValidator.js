function full_name_validator(values, errors) {
  if (values.fullName.length === 0) { errors.fullName = 'وارد کردن نام و نام خانوادگی الزامی می باشد'; }
  else if (!/^[\u0600-\u06FF\s\u200c]+$/.test(values.fullName)) { errors.fullName = 'نام و نام خانوادگی وارد شده معتبر نمی باشد' }
  else if (values.fullName.length < 5) { errors.fullName = 'تعداد حروف وارد شده کمتر از حد مجاز می باشد' }
  else if (!values.fullName.includes(' ')) { errors.fullName = 'لطفا نام و نام خانوادگی را با فاصله از یکدیگر بنویسید ' }
  else if (values.fullName.length > 80) { errors.fullName = 'تعداد حروف وارد شده بیشتر از حد مجاز می باشد' }
}

function phone_number_validator(values, errors) {
  if (values.phoneNumber.length === 0) { errors.phoneNumber = 'وارد کردن شماره همراه الزامی می باشد' }
  else if (!/^09\d{9}$/.test(values.phoneNumber)) { errors.phoneNumber = 'شماره وارد شده معتبر نمی باشد' };
}

function subject_validator(values, errors) {
  if (!values.subject) { errors.subject = 'لطفا موضوع مشاوره را مشخص نمایید' }
}

function age_validator(values, errors){
  if(values.age.length === 0 ) {errors.age = 'وارد کردن سن الزامی می باشد'}
  else if(!/^(1[01][0-9]|120|[1-9][0-9]?)$/.test(values.age)){errors.age = 'لطفا عدد سن را به درستی وارد کنید (مثلا 45)'}
}


export {
  full_name_validator,
  phone_number_validator,
  subject_validator,
  age_validator,
};