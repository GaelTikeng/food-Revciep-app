import React from 'react';
import ReactDOM from 'react-dom';
import { Formik, Form, useField } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';


const MyTextInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      <label htmlFor={props.id || props.name}>{label}</label>
      <input className="text-input" {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="text-red-600 italic text-sm">{meta.error}</div>
      ) : null}
    </>
  );
};

const MyCheckbox = ({ children, ...props }) => {
  const [field, meta] = useField({ ...props, type: 'checkbox' });
  return (
    <div>
      <label className="checkbox-input">
        <input type="checkbox" {...field} {...props} />
        {children}
      </label>
      {meta.touched && meta.error ? (
        <div className="text-red-600 italic text-sm">{meta.error}</div>
      ) : null}
    </div>
  );
};

export default function SignupForm () {

  const navigate = useNavigate()
  const backgroundStyle = {
    marginTop: "50px",
    width: "100%",
    display:"flex",
    flexDirection: "column",
    justifyContent:"space-around"
  }

  const mystyle = {
    border: "1px solid #000",
    padding: "10px",
    border: "none",
    borderRadius: "10px"
  }

  return (
    <div style={backgroundStyle}>
      <h1 className='text-3xl text-center mt-8' >Create account</h1>
      <p className='text-center italic m-2'>Please enter your informations</p>
      <Formik
        initialValues={{
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          confirmPassword: '',
          acceptedTerms: false, // added for our checkbox
        }}
        validationSchema={Yup.object({
          firstName: Yup.string()
            .max(15, 'Must be 15 characters or less')
            .required('Required'),
          lastName: Yup.string()
            .max(20, 'Must be 20 characters or less')
            .required('Required'),
          email: Yup.string()
            .email('Invalid email address')
            .required('Required'),
          password: Yup.string()
            .min(8, 'password must be atleast 8 character long')
            .matches(/[0-9]/, 'password must contain numbers')
            .matches(/[^\w]/, 'weak password'),
          confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Must match "password" field value'),
          acceptedTerms: Yup.boolean()
            .required('Required')
            .oneOf([true], 'You must accept the terms and conditions.'),
        })}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
            localStorage.setItem("userInfo", JSON.stringify(values));
          }, 400);
          navigate('/loginForm/signup/accountPage')
        }}
      >
        <Form style={mystyle} className='flex flex-col mx-auto shadow-xl leading-9 bg-gray-300'>
          <MyTextInput
            // className="p-1"
            label="First Name"
            name="firstName"
            type="text"
            placeholder="Jane"
          />

          <MyTextInput
            label="Last Name"
            name="lastName"
            type="text"
            placeholder="Doe"
            // className="p-1"
          />

          <MyTextInput
            label="Email Address"
            name="email"
            type="email"
            placeholder="jane@formik.com"
          />

          <MyTextInput
            label="Password"
            name="password"
            type="password"
          />

          <MyTextInput
            label="Confirm password"
            name="confirmPassword"
            type="password"
          />

          <MyCheckbox name="acceptedTerms">
            I accept the terms and conditions
          </MyCheckbox>

          <button type="submit" className='mt-4 bg-green-300 rounded-md'>Submit</button>
        </Form>
      </Formik>
    </div>
  );
}