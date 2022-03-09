import React from 'react';
import { useFormik } from 'formik';
import InputText from '../InputText/InputText';

import * as Yup from 'yup';

// Convert a JavaScript object to a string of key=value pairs, separated by
// ampersands
const encode = (data) =>
  Object.keys(data)
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
    .join('&');

const ContactFormSchema = Yup.object().shape({
  name: Yup.string().required('The name field is required'),
  designSystemName: Yup.string(),
  designSystemUrl: Yup.string().url('Please add a complete URL'),
});

const Form = () => {
  const formik = useFormik({
    initialValues: {
      name: '',
      designSystemName: '',
      designSystemUrl: '',
    },
    onSubmit: (values, actions) => {
      fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encode({ 'form-name': 'Contact form', ...values }),
      })
        .then(() => {
          alert('Success');
          actions.resetForm();
        })
        .catch(() => {
          alert('Error');
        })
        .finally(() => actions.setSubmitting(false));
    },
    validationSchema: ContactFormSchema,
  });

  return (
    <form
      name="Contact form"
      method="post"
      data-netlify="true"
      onSubmit={formik.handleSubmit}
      className="l-stack sm:border-2 my-6 sm:px-4 sm:py-6"
    >
      <input type="hidden" name="form-name" value="Contact form" />

      <InputText
        name="name"
        id="name"
        label="Your name"
        onChange={formik.handleChange}
        value={formik.values.name}
        touched={formik.touched.name}
        errors={formik.errors.name}
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
        onChange={formik.handleChange}
        value={formik.values.designSystemUrl}
        touched={formik.touched.designSystemUrl}
        errors={formik.errors.designSystemUrl}
      />

      <button type="submit">Submit</button>
    </form>
  );
};

export default Form;
