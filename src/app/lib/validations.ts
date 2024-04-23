import * as Yup from 'yup';

export const loginValidation = Yup.object().shape({
  emailAddress: Yup.string()
    .email('Input must be a valid email')
    .required('Email address is required'),
  password: Yup.string()
    .min(8, 'Passboard must have at least 8 characters')
    .max(20, 'Password must not have more than 20 characters')
    .required('Password is required'),
});


export const LinkValidation = Yup.object().shape({
  links: Yup.array().of(
    Yup.object().shape({
  //    platform: Yup.string().required('Platform is required'),
      url: Yup.string().url('Cannot be empty').required('Must be a valid URL'),
    })
  )
})