import React from 'react';
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import { globalService } from '../../Services/globalServices';


interface UploadItemToolFormProps {
  handleCloseModal: Function;
  createItem: Function;
}

interface Values {
  name: String;
  title: String;
  radiusInMeters: number;
  angle: number;
}

const UploadItemTool: React.FC<UploadItemToolFormProps> = ({
  handleCloseModal,
  createItem
}) => {
  const initialValues: Values = {name: 'Defualt Item', title: '', radiusInMeters: 0, angle: 0 };
  const errors: { radius: String} = { radius: ''};
  return (
    <div>
      <Formik
        initialValues={initialValues}
        validate={(values) => {
          if (values.radiusInMeters <= 0) {
            errors.radius = 'Radius Required';
          }else if (globalService.validateCanvasObjectName(values.name)){
            values.name = values.name + '1'
  
          } else {
            errors.radius = '';
          }
        }}
        onSubmit={(
          values: Values,
          { setSubmitting }: FormikHelpers<Values>
        ) => {
          if (errors.radius) return;
          createItem(values.name, values.title, values.radiusInMeters, values.angle);
          setSubmitting(false);
          handleCloseModal();
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Field type="number" name="radiusInMeters" placeholder="Radius" />
            {errors.radius && <p>{errors.radius}</p>}
            <Field type="number" name="angle" placeholder="Angle In Degrees"  />

            <Field type="text" name="name"  placeholder="Name" />
            <Field type="text" name="title" placeholder="Title" />
            <button type="submit">Submit</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default UploadItemTool;
