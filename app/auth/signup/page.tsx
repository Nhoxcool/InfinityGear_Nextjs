'use client';
import React from 'react';
import AuthFormContainer from '@components/AuthFormContainer';
import { Button, Input } from '@material-tailwind/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { filterFormikErrors } from '@/app/utils/formikHelpers';
import Image from 'next/image';

const validationSchema = yup.object().shape({
  name: yup
    .string()
    .trim()
    .required('Name is required!')
    .min(3, 'Name is too short!')
    .max(40, 'Name is too long!'),
  email: yup
    .string()
    .trim()
    .required('Email is missing!')
    .email('Invalid Email!'),
  password: yup
    .string()
    .trim()
    .required('Password is missing!')
    .min(8, 'Password is too short!')
    .matches(
      /^(?=.*[a-z])/,
      'At least one lowercase letter is required in the password!'
    )
    .matches(
      /^(?=.*[A-Z])/,
      'At least one uppercase letter is required in the password!'
    )
    .matches(/^(?=.*\d)/, 'At least one digit is required in the password!')
    .matches(
      /^(?=.*[@$!%*?&])/,
      'At least one special character is required in the password!'
    )
    .matches(
      /^[A-Za-z\d@$!%*?&]{8,}$/,
      'The password must be at least 8 characters long and contain only letters, digits, and special characters!'
    ),
  comfirmPassword: yup
    .string()
    .trim('Password confirmation is missing!')
    .oneOf([yup.ref('password')], 'Password confirmation does not match!')
    .required('Re-entering the password is required!'),
});

export default function SignUp() {
  const {
    values,
    handleChange,
    handleBlur,
    handleSubmit,
    isSubmitting,
    errors,
    touched,
  } = useFormik({
    initialValues: { name: '', email: '', password: '', comfirmPassword: '' },
    validationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const formErrors: string[] = filterFormikErrors(errors, touched, values);

  const { email, name, password, comfirmPassword } = values;

  return (
    <AuthFormContainer title='Create New Account' onSubmit={handleSubmit}>
      <div className='flex justify-center items-center'>
        <Image
          width={200}
          height={200}
          src='/image/logo_no_bg.png'
          alt='logo image'
        />
      </div>

      <Input
        name='name'
        label='Name'
        onBlur={handleBlur}
        onChange={handleChange}
        value={name}
      />
      <Input
        name='email'
        label='Email'
        onBlur={handleBlur}
        onChange={handleChange}
        value={email}
      />
      <Input
        name='password'
        label='Password'
        type='password'
        onChange={handleChange}
        onBlur={handleBlur}
        value={password}
      />
      <Input
        name='comfirmPassword'
        label='comfirmPassword'
        type='password'
        onChange={handleChange}
        onBlur={handleBlur}
        value={comfirmPassword}
      />
      <Button type='submit' className='w-full bg-blue-600'>
        Sign up
      </Button>
      <div className=''>
        {formErrors.map((err) => {
          return (
            <div key={err} className='space-x-1 flex items-center text-red-500'>
              <XMarkIcon className='w-4 h-4' />
              <p className='text-xs'>{err}</p>
            </div>
          );
        })}
      </div>
    </AuthFormContainer>
  );
}
