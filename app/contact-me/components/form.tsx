'use client';
import React from 'react';
import { useForm } from 'react-hook-form';

type FormData = {
  name: string;
  company?: string;
  email: string;
  message: string;
};

const Form = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
    reset,
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP Error! status ${response.status}`);
      }
      reset();
    } catch (error: any) {
      console.log(
        `There was a problem with the fetch operation ${error.message}`
      );
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-10">
        <div className="mb-4">
          <label className="label-form" htmlFor="name">
            Name
          </label>
          <input
            id="name"
            type="text"
            className="input-form"
            {...register('name', {
              required: true,
              minLength: {
                value: 3,
                message: 'The name must contain at least 3 characters.',
              },
              maxLength: {
                value: 200,
                message: 'The name may contain at most 200 characters.',
              },
            })}
          />
          {errors.name && <p>{errors.name.message}</p>}
        </div>

        <div className="mb-4">
          <label className="label-form" htmlFor="company">
            Company
          </label>
          <input
            id="company"
            type="text"
            className="input-form"
            {...register('company', {
              required: false,
              minLength: {
                value: 2,
                message: 'The company must contain at least 2 characters.',
              },
              maxLength: {
                value: 200,
                message: 'The company may contain at most 200 characters.',
              },
            })}
          />
          {errors.company && <p>{errors.company.message}</p>}
        </div>

        <div className="mb-4">
          <label className="label-form" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            className="input-form"
            {...register('email', {
              required: true,
              minLength: {
                value: 5,
                message: 'The email must contain at least 5 characters.',
              },
              maxLength: {
                value: 200,
                message: 'The email may contain at most 200 characters.',
              },
            })}
          />
          {errors.email && <p>{errors.email.message}</p>}
        </div>

        <div className="mb-4">
          <label className="label-form" htmlFor="message">
            Message
          </label>
          <textarea
            id="message"
            className="input-form"
            {...register('message', {
              required: true,
              minLength: {
                value: 10,
                message: 'The message must contain at least 10 characters.',
              },
              maxLength: {
                value: 1000,
                message: 'The message may contain at most 1000 characters.',
              },
            })}
          />
          {errors.message && <p>{errors.message.message}</p>}
        </div>
        <button
          type="submit"
          className="bg-blue rounded-md text-white hover:text-blue hover:bg-white min-w-100 px-5 h-12 border border-slate-300 hover:border-indigo-300hover:border-1"
        >
          Send Message
        </button>
      </form>
      {isSubmitSuccessful && <p> Message has been Sent</p>}
    </>
  );
};

export default Form;
