'use client';
import React from 'react';
import AuthFormContainer from '@components/AuthFormContainer';
import { Button, Input } from '@material-tailwind/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { filterFormikErrors } from '@/app/utils/formikHelpers';
import Image from 'next/image';
import { toast } from 'react-toastify';
import Link from 'next/link';
import { signIn } from 'next-auth/react';

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
    onSubmit: async (values, action) => {
      action.setSubmitting(true);
      const res = await fetch('/api/users', {
        method: 'POST',
        body: JSON.stringify(values),
      });
      const { message, error } = (await res.json()) as {
        message: string;
        error: string;
      };
      if (res.ok) {
        toast.success(message);
        await signIn('credentials', { email, password });
      }

      if (!res.ok && error) {
        toast.error(error);
      }
      action.setSubmitting(false);
    },
  });

  const formErrors: string[] = filterFormikErrors(errors, touched, values);

  const { email, name, password, comfirmPassword } = values;

  type valueKeys = keyof typeof values;
  const error = (name: valueKeys) => {
    return errors[name] && touched[name] ? true : false;
  };

  return (
    <AuthFormContainer title="Create New Account" onSubmit={handleSubmit}>
      <div className="flex justify-center items-center">
        <Image
          width={200}
          height={200}
          src="/image/logo_no_bg.png"
          alt="logo image"
        />
      </div>

      <Input
        name="name"
        label="Name"
        onBlur={handleBlur}
        onChange={handleChange}
        value={name}
        error={error('name')}
      />
      <Input
        name="email"
        label="Email"
        onBlur={handleBlur}
        onChange={handleChange}
        value={email}
        error={error('email')}
      />
      <Input
        name="password"
        label="Password"
        type="password"
        onChange={handleChange}
        onBlur={handleBlur}
        value={password}
        error={error('password')}
      />
      <Input
        name="comfirmPassword"
        label="Comfirm Password"
        type="password"
        onChange={handleChange}
        onBlur={handleBlur}
        value={comfirmPassword}
        error={error('comfirmPassword')}
      />

      <div className="flex items-center justify-between">
        <p>
          Already have an account!{' '}
          <Link href="/auth/signin" className="text-blue-700 underline">
            Login now
          </Link>
        </p>
      </div>

      <Button disabled={isSubmitting} type="submit" className="w-full">
        Sign up
      </Button>
      <div className="">
        {formErrors.map((err) => {
          return (
            <div key={err} className="space-x-1 flex items-center text-red-500">
              <XMarkIcon className="w-4 h-4" />
              <p className="text-xs">{err}</p>
            </div>
          );
        })}
      </div>
    </AuthFormContainer>
  );
}
