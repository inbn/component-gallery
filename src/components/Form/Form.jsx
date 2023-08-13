import React, { useEffect, useRef, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import InputText from '../InputText/InputText';
import Textarea from '../Textarea/Textarea';

// Convert a JavaScript object to a string of key=value pairs, separated by
// ampersands
const encode = (data) =>
  Object.keys(data)
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
    .join('&');

const ContactFormSchema = Yup.object().shape({
  name: Yup.string().required('The name field is required'),
  twitter: Yup.string(),
  designSystemName: Yup.string(),
  designSystemUrl: Yup.string().url('Please add a complete URL'),
  message: Yup.string().required('The message field is required'),
});

const Form = () => {
  const errorsListEl = useRef();
  const successMessageEl = useRef();
  const [errorsList, setErrorsList] = useState({});

  const formik = useFormik({
    initialValues: {
      name: '',
      twitter: '',
      designSystemName: '',
      designSystemUrl: '',
      message: '',
    },
    onSubmit: (values, actions) => {
      fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encode({ 'form-name': 'Contact form', ...values }),
      })
        .then(() => {
          successMessageEl.current.removeAttribute('hidden');
          successMessageEl.current.focus();
          actions.resetForm();
        })
        .catch(() => {
          alert('Error');
        })
        .finally(() => actions.setSubmitting(false));
    },
    validationSchema: ContactFormSchema,
  });

  // Focus on the Error Summary onSubmit if there are errors
  useEffect(() => {
    // Only run after submitting is finished
    if (formik.isSubmitting) {
      successMessageEl.current.setAttribute('hidden', true);
      return;
    }

    // Make a copy of the errors list, so it doesn't every time an error changes
    setErrorsList(formik.errors);

    if (Object.entries(formik.errors).length) {
      successMessageEl.current.setAttribute('hidden', true);
      errorsListEl.current.removeAttribute('hidden');
      errorsListEl.current.focus();
    } else {
      errorsListEl.current.setAttribute('hidden', true);
    }
  }, [formik.isSubmitting]);

  return (
    <form
      name="Contact form"
      method="post"
      data-netlify="true"
      onSubmit={formik.handleSubmit}
    >
      <div
        tabIndex="-1"
        ref={successMessageEl}
        className="sm:border-2 my-6 sm:px-4 sm:py-4 sm:shadow-block mb-4"
        hidden
      >
        <h3 className="h4">Thanks for your message!</h3>
      </div>
      <div
        tabIndex="-1"
        ref={errorsListEl}
        className="sm:border-2 my-6 sm:px-4 sm:py-4 sm:shadow-block mb-4"
        hidden
      >
        <h3 className="h4">There was an error submitting the form</h3>
        <p>Please check the following fields:</p>
        <ol>
          {Object.keys(errorsList).map((key) => (
            <li>
              <a
                href={`#${key}`}
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector(e.target.getAttribute('href')).focus();
                }}
              >
                {errorsList[key]}
              </a>
            </li>
          ))}
        </ol>
      </div>

      <input type="hidden" name="form-name" value="Contact form" />

      <div className="sm:border-2 my-6 sm:px-4 sm:py-6 sm:shadow-block l-stack">
        <p>Fields marked with an asterisk (*) are required</p>
        <InputText
          name="name"
          id="name"
          label="Your name"
          onChange={formik.handleChange}
          value={formik.values.name}
          touched={formik.touched.name}
          errors={formik.errors.name}
          required
        />

        <InputText
          name="twitter"
          id="twitter"
          label="Your twitter handle or website (if you want me to credit you in the changelog)"
          onChange={formik.handleChange}
          value={formik.values.twitter}
          touched={formik.touched.twitter}
          errors={formik.errors.twitter}
        />

        <InputText
          name="designSystemName"
          id="designSystemName"
          label="Design system name"
          onChange={formik.handleChange}
          value={formik.values.designSystemName}
          touched={formik.touched.designSystemName}
          errors={formik.errors.designSystemName}
        />

        <InputText
          name="designSystemUrl"
          id="designSystemUrl"
          label="Link to design system"
          placeholder="https://example.com"
          onChange={formik.handleChange}
          value={formik.values.designSystemUrl}
          touched={formik.touched.designSystemUrl}
          errors={formik.errors.designSystemUrl}
        />

        <Textarea
          name="message"
          id="message"
          label="Your message"
          onChange={formik.handleChange}
          value={formik.values.message}
          touched={formik.touched.message}
          errors={formik.errors.message}
          required
        />

        <button type="submit">Submit</button>
      </div>
    </form>
  );
};

export default Form;
