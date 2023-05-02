import React, { useState, useEffect } from "react";
import "./epfo.css";
import axios from "axios";
import epfoImg from "../../assets/epfoimg.jpg";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { generateOrderId } from "../formspage/helpers.js";

const EPFOConsulting = () => {
  const [clientId, setclientId] = useState(null);
  const [dataSubmitted, setdataSubmitted] = useState(false);

  const navigate = useNavigate();
  const refData = { amount: 99, clientId: clientId };

  
  useEffect(() => {
    const orderId = generateOrderId();
    setclientId(orderId);
  }, []);

  const validationSchema = Yup.object().shape({
    uan: Yup.string().required("UAN is required"),
    phone: Yup.string()
      .matches(
        /^[6789]\d{9}$/,
        "Phone number should be a valid 10 digit mobile number"
      )
      .required("Phone number is required"),
  });

  const handleFormSubmit = async (values, { setSubmitting }) => {
    // const formData = new FormData();
    // for (let key in values) {
    //   formData.append(key, values[key]);
    // }
    // formData.append("clientId", clientId);
    // console.log(values);
    // setSubmitting(false);
    const payload = {
      uan: values.uan,
      phone: values.phone,
      clientId: clientId,
    };
  
    console.log(payload);
    setSubmitting(false);

    //give relevant headers and check for backend work
    try {
      const response = await axios.post("/consultorders/create", payload);
      if (response.status >= 200 && response.status < 300) {
        //console.log(JSON.stringify(response));
        setdataSubmitted(!dataSubmitted);
        navigate("/payment", { state: refData });
      }
    } catch (error) {
      alert(error, "details not submitted successfully!");
      console.error(error); // handle error
    }
    // resetForm({ values: "" });
  };

  return (
    <div className="epfo-consulting-container">
      <div className="epfo-consulting-form-container">
        <h2>EPFO Consulting </h2>
        <div className="epfo-consulting-form">
          <p>
            We provide smooth assistance to all your Pf queries regarding
            registration and PF withdrawal for individuals in three easy steps.
          </p>
          <div className="steps">
            <div className="formstep">
              <p>1. Submit UAN and Phone no. below. Your ClientID: {clientId} </p>
              <Formik
                initialValues={{ uan: "", phone: "" }}
                validationSchema={validationSchema}
                onSubmit={handleFormSubmit}
              >
                {({ isSubmitting }) => (
                  <Form>
                    <div>
                      <Field
                        type="text"
                        name="uan"
                        placeholder="Enter your 12 digit UAN No."
                        minLength={12}
                      />
                      <ErrorMessage name="uan" className="error" component="div" />
                    </div>
                    <div>
                      <Field
                        type="text"
                        name="phone"
                        placeholder="Enter your phone number"
                      />
                      <ErrorMessage name="phone" className="error" component="div" />
                    </div>
                    <button type="submit" disabled={isSubmitting}>
                      Submit
                    </button>
                  </Form>
                )}
              </Formik>
            </div>
            <div className="paymentstep">
              <p>2. Pay INR 99/- only as consulting fee, once payment done.</p>
            </div>
            <div className="callstep">
              <p className="epfocta">3. Call us at: +91-9650673487</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EPFOConsulting;
