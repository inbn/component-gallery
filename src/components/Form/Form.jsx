import React from 'react';
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
  designSystemName: Yup.string(),
  designSystemUrl: Yup.string().url('Please add a complete URL'),
  message: Yup.string().required('The message field is required'),
});

const Form = () => {
  const formik = useFormik({
    initialValues: {
      name: '',
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
    >
      <input type="hidden" name="form-name" value="Contact form" />

      <div className="sm:border-2 my-6 sm:px-4 sm:py-6 sm:shadow-block l-stack">
        <InputText
          name="name"
          id="name"
          label="Your name"
          onChange={formik.onChange}
          value={formik.values.name}
          touched={formik.touched.name}
          errors={formik.errors.name}
        />

        <InputText
          name="designSystemName"
          id="designSystemName"
          label="Design system name"
          onChange={formik.onChange}
          value={formik.values.designSystemName}
          touched={formik.touched.designSystemName}
          errors={formik.errors.designSystemName}
        />

        <InputText
          name="designSystemUrl"
          id="designSystemUrl"
          label="Link to design system"
          placeholder="https://example.com"
          onChange={formik.onChange}
          value={formik.values.designSystemUrl}
          touched={formik.touched.designSystemUrl}
          errors={formik.errors.designSystemUrl}
        />

        <Textarea
          name="message"
          id="message"
          label="Your message"
          onChange={formik.onChange}
          value={formik.values.message}
          touched={formik.touched.message}
          errors={formik.errors.message}
        />

        <button type="submit">Submit</button>
      </div>
    </form>
  );
};

export default Form;
