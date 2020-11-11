import React from 'react';
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import { globalService } from '../../Services/globalServices';

interface RectToolFormProps  {
    handleCloseModal: Function,
    createRect: Function
}

interface Values {
    width: number;
    height: number;
    name: string;
}



const RectToolForm:React.FC<RectToolFormProps > = ({ handleCloseModal, createRect }) => {

    const initialValues: Values = {  width: 0, height: 0, name: 'Defualt Rect'  };
    const errors: { width: String} = {width: ''};
    return (

  <div>
    
    <Formik
      initialValues={initialValues}
      validate={values => {
        if (values.width <= 0 || values.height <= 0) {
          errors.width = 'Width And Height Required';
          
        } else if (globalService.validateCanvasObjectName(values.name)){
          values.name = values.name + '1'

        } else {
            errors.width = '';
        } 
      }}
      onSubmit={(values: Values,  { setSubmitting }: FormikHelpers<Values>) => {
          if (errors.width) return;
          createRect(values.name, values.width, values.height)
          setSubmitting(false)
          handleCloseModal()
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <Field type="number" name="width"  />
      {errors.width && <p>{errors.width}</p>}
          <Field type="number" name="height" />
         
          
          <Field type="text" name="name" />
          <button type="submit" >
            Submit
          </button>
        </Form>
      )}
    </Formik>
  </div>
)};

export default RectToolForm;