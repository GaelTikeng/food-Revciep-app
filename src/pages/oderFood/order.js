import React, { useRef } from 'react';
import { Formik, Form, useField } from 'formik';
import * as Yup from 'yup';
import getImage from '../../utils/getImage';
import { useParams } from "react-router-dom";
import StripeCheckout from 'react-stripe-checkout';
import './orderFood.css';


const MyTextInput = ({ label, ...props }) => {
  
  const [field, meta] = useField(props);
  return (
    <>
      <label htmlFor={props.id || props.name}>{label}</label>
      <input className="text-input" {...field} {...props} required/>
      {meta.touched && meta.error ? (
        <div className="text-red-600 italic text-sm">{meta.error}</div>
      ) : null}
    </>
  );
};

export default function OrderFood () {
  const {id} = useParams();
  // const [open, setOpen] = useState(false);
  const payment = useRef();

  // const togglePopup = () => {
  //   setOpen(!open);
  // }

  const onToken = (token) => {
    console.log(token);
  }

  const localFood = JSON.parse(localStorage.getItem('foodItems'))
  const foodBought = localFood.find((dish) => dish.id === id);

  const mystyle = {
    padding: "10px",
    borderRadius: "10px",
    backgroundColor: "#c9c3c5"
  }
  const backgroundStyle = {
    marginTop: "50px",
    width: "100%",
    display:"flex",
    justifyContent:"space-around"
  }
  

  return (
    <div style={backgroundStyle}>
      
      <div className='form'>
        <h1 className='text-3xl text-center mt-8' >Delivery form</h1>
        <p className='text-center italic m-2'>Please enter your informations</p>
        <Formik
          initialValues={{
            Name: '',
            Location: '',
            Telephone: '',
            email: ''
          }}
          validationSchema={Yup.object({
            Name: Yup.string()
              .max(15, 'Must be 15 characters or less')
              .required('Required'),
            Location: Yup.string()
              .min(6, 'Must be more than three characters')
              .required('Required'),
            Telephone: Yup.number()
              .min(12, 'Invalid phone number')
              .required('Required'),
            email: Yup.string()
              .email('Invalid email address')
              .required('Required')
          })}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              setSubmitting(false);
              localStorage.setItem('clientInfo', JSON.stringify(values));
              payment.current.onClick();
              
            }, 400);
          }}
        >
          
          <Form style={mystyle} className='flex flex-col mx-auto shadow-xl leading-9 '>
            <MyTextInput
              className="p-1"
              label="Name"
              name="Name"
              type="text"
              placeholder="Jane"
            />

            <MyTextInput
              className="p-1"
              label="Location"
              name="Location"
              type="text"
              placeholder="Etoudi, Yaounde"
            />
            <MyTextInput
              className="p-1"
              label="Telephone"
              name="Telephone"
              type="number"
              placeholder="+237"
            />

            <MyTextInput
              className="p-1"
              label="Email Address"
              name="email"
              type="email"
              placeholder="jane@formik.com"
            />
            <button type="submit" className='mt-4 bg-green-300 rounded-md'>Submit</button>
            <div className='hidden'>
              <StripeCheckout
                token={onToken}
                ref={payment}
                name="Food purchase"
                description = 'From Astride food'
                currency='USD'
                amount= {foodBought.price}
                stripeKey="pk_test_51NEVlaHX2T5xVKLdpinmsabv8k62puQRRRbR939aDHuGi1WpFP5pxg1uJfdDp5THxnvv350Zqpst7CrD1iy5ngUy00S0c8zI9K"
              />
            </div>
            
          </Form>
        </Formik>
        
      </div>
      <img
        className='image-of-food'
        src = {getImage(foodBought.image)} alt='command'
      />
      
      
    </div>
  );
}
