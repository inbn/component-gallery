import React from 'react';
import { useFormik } from 'formik';
import InputText from '../InputText/InputText';

const encode = (data) =>
  Object.keys(data)
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
    .join('&');

const Form = () => {
  const formik = useFormik({
    initialValues: {
      name: '',
      designSystemUrl: '',
    },
    onSubmit: (values) => {
      // alert(JSON.stringify(values, null, 2));
      encode(values);
    },
  });

  return (
    <form
      name="Contact form"
      method="POST"
      data-netlify="true"
      onSubmit={formik.handleSubmit}
    >
      <input type="hidden" name="Contact form" />
      <InputText
        name="name"
        id="name"
        label="Your name"
        onChange={formik.handleChange}
        value={formik.values.name}
      />

      <InputText
        name="designSystemUrl"
        id="designSystemUrl"
        label="Link to design system"
        onChange={formik.handleChange}
        value={formik.values.designSystemUrl}
      />

      <button type="submit">Submit</button>
    </form>
  );
};

export default Form;
