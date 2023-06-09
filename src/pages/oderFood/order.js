import React, {useState} from 'react';
import { Formik, Form, useField } from 'formik';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import getImage from '../../utils/getImage';
import { useParams } from "react-router-dom";
import StripeCheckout from 'react-stripe-checkout';


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
  const { register, handleSubmit } = useForm();
  const {id} = useParams();
  const [open, setOpen] = useState(false);

  const togglePopup = () => {
    setOpen(!open);
  }

  const onToken = (token) => {
    console.log(token);
  }

  // const handleDeliver = () => {
    
  // }
  const localFood = JSON.parse(localStorage.getItem('foodItems'))
  const foodBought = localFood.find((dish) => dish.id == id);

  const mystyle = {
    border: "1px solid #000",
    padding: "10px",
    border: "none",
    borderRadius: "10px"
  }
  const backgroundStyle = {
    marginTop: "50px",
    width: "100%",
    display:"flex",
    justifyContent:"space-around"
  }
  

  return (
    <div style={backgroundStyle}>
      
      <div style={{width: "50%"}}>
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
              alert(JSON.stringify(values, null, 2));
              setSubmitting(false);
              localStorage.setItem('clientInfo', JSON.stringify(values));
              
            }, 400);
          }}
        >
          
          <Form style={mystyle} className='flex flex-col mx-auto shadow-xl leading-9 bg-gray-300'>
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
            <StripeCheckout
              token={onToken}
              name="Food purchase"
              description = 'From Astride food'
              currency='USD'
              amount= {foodBought.price}
              stripeKey="pk_test_51NEVlaHX2T5xVKLdpinmsabv8k62puQRRRbR939aDHuGi1WpFP5pxg1uJfdDp5THxnvv350Zqpst7CrD1iy5ngUy00S0c8zI9K"
            />
          </Form>
        </Formik>
        
      </div>
      <img
        style={{width:"300px", height:"50vh", 
        alignContent: "first baseline", paddingTop: "50px", marginTop: "55px"}}
        src = {getImage(foodBought.image)} alt='command picture'
      />
      
      
    </div>
  );
}
