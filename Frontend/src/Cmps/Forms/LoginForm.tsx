import React from 'react';
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import { globalService } from '../../Services/globalServices';

interface LoginFormProps  {
    handleCloseModal: Function,
}

interface Values {
    email: string;
    password: string;
}



export const LoginForm:React.FC<LoginFormProps > = ({ handleCloseModal }) => {

    const initialValues: Values = {  email: '', password: '' };
    const errors: { email: string, password: string} = {email: '', password: ''};
    return (

  <>
    
    <Formik
      initialValues={initialValues}
      validate={values => {
        if (!values.email) {
          errors.email = 'Required';
          
        } else if (!values.password){
          errors.password = 'Required';
        } else {
            errors.email = '';
            errors.password = '';
        } 
      }}
      onSubmit={(values: Values,  { setSubmitting }: FormikHelpers<Values>) => {
          if (errors.email || errors.password) return;
          console.log(values)
          setSubmitting(false)
          handleCloseModal({showForm: false})
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <Field type="email" name="email"  placeholder="Email"/>
      {errors.email && <p>{errors.email}</p>}
          <Field type="password" name="password" placeholder="Password"/>
          {errors.password && <p>{errors.password}</p>}
          <button type="submit" >
            Login
          </button>
        </Form>
      )}
    </Formik>
  </>
)};

