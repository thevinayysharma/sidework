import "./panform.css";
import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useRef } from "react";

const termsAndServicesURL = "https://example.com/terms";

// generate random orderID
const generateOrderId = () => {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let clientId = "";
  for (let i = 0; i < 6; i++) {
    clientId += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return clientId;
}; 



// Regular expression for Indian phone number validation
const phoneRegExp = /^[6-9]\d{9}$/;

//yup intialvalues
const initialValues = {
  firstName: "",
  lastName: "",
  middleName: "",
  age: "",
  comments: "",
  dob: "",
  gender: "",
  email: "",
  phone: "",
  files: [],
};



export default function PanForm() {
  const [clientId, setclientId] = useState(null);
  // const [paymentUrl, setPaymentUrl] = useState(null);
  const [dataSubmitted, setdataSubmitted] = useState(false);

  const fileref = useRef(null);
  const navigate = useNavigate();
  const refData = { amount: 200 , clientId: clientId };

  //yup validation
  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("Required"),
    lastName: Yup.string().required("Required"),
    middleName: Yup.string().notRequired(),
    dob: Yup.date().required("please enter your dob"),
    gender: Yup.string()
      .oneOf(["male", "female"])
      .required("Please select your gender"),
    email: Yup.string()
      .email("Invalid email addresss")
      .required("Please Enter your email"),
    phone: Yup.string()
      .required("Required")
      .matches(phoneRegExp, "Invalid phone number"),
    files: Yup.mixed()
      .notRequired()
      .test("is-file-too-big", "File exceeds 10MB", () => {
        let valid = true;
        const files = fileref?.current?.files;
        if (files) {
          const fileArr = Array.from(files);
          fileArr.forEach((file) => {
            const size = file.size / 1024 / 1024;
            if (size > 10) {
              valid = false;
            }
          });
        }
        return valid;
      })
      .test("is-file-of-correct-type", "File is not of supported type", () => {
        let valid = true;
        const files = fileref?.current?.files;
        if (files) {
          const fileArr = Array.from(files);
          fileArr.forEach((file) => {
            const type = file.type.split("/")[1];
            const validTypes = ["pdf", "jpeg", "png", "jpg"];
            if (!validTypes.includes(type)) {
              valid = false;
            }
          });
        }
        return valid;
      }),
    comments: Yup.string().notRequired(),
  });


  useEffect(() => {
    const orderId = generateOrderId();
    setclientId(orderId);
  }, []);


  const handleSubmit = async (values, { setSubmitting }) => {
    console.log(values);
    const formData = new FormData();
    for (let value in values) {
      formData.append(value, values[value]);
    }
    formData.append("clientId", clientId);
    formData.append("amount", 200);
    formData.append("work", "Apply New Pan");  
     // formData.append("paid", false); sec issue!

    setSubmitting(false);
    //adding files
    for (let key in values) {
      if (key === 'files') {
        // Append each selected file as a separate part
        const fileList = values[key];
        for (let i = 0; i < fileList.length; i++) {
          formData.append('files', fileList[i]);
        }
      } 
    }
    //give relevant headers and check for backend work
    try {
      const response = await axios.post("/create", formData); 
      // const response = await fetch("/create", {
      //   method: "POST",
      // });
      if (response.status >= 200 && response.status < 300) {
        const data = await response.json();
        console.log(data); 
        setdataSubmitted(!dataSubmitted);
        // console.log(refData);
        navigate('/payment', { state: refData });
      }
    } catch (error) {
      console.error(error); // handle error
    }
    // resetForm({ values: "" });
  };



  return (
    <div className="panContainer">
      <div className="form_title_bg">
        <h1>Pan Card Apply</h1>
        <p>&nbsp; &nbsp;Home → New Pan Card </p>
      </div>
      <p>
        Your OrderID: <span className="orderId">{clientId}</span>
      </p>
      {dataSubmitted ? (
        <p>
          Data Submitted <b>Successfully</b>You are being redirected to the payment page. If you are not
          redirected in a few seconds, please click the button below:
        </p>
      ) : (
        <div className="formscss">
          <h3>Registration Form</h3>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              setFieldValue,
              isSubmitting,
            }) => (
              <Form encType="multipart/form-data" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="firstName">First Name</label>
                  <Field name="firstName" type="text" />
                  <ErrorMessage name="firstName" />
                </div>
                <div>
                  <label htmlFor="lastName">Last Name</label>
                  <Field name="lastName" type="text" />
                  <ErrorMessage name="lastName" />
                </div>
                <div>
                  <label htmlFor="middleName">Middle Name</label>
                  <Field name="middleName" type="text" />
                  <ErrorMessage name="middleName" />
                </div>
                <div>
                  <label htmlFor="dob">Date of Birth</label>
                  <Field name="dob" type="date" />
                  <ErrorMessage name="dob" />
                </div>
                <div>
                  <label htmlFor="gender">Gender</label>
                  <Field name="gender" as="select">
                    <option value="">Select</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </Field>
                  <ErrorMessage name="gender" />
                </div>
                <div>
                  <label htmlFor="phone">Phone Number (Indian)</label>
                  <Field name="phone" type="text" />
                  <ErrorMessage name="phone" />
                </div>
                <div>
                  `<label htmlFor="email">Email Address</label>
                  <Field
                    name="email"
                    type="email"
                    placeholder="name@gmail.com"
                  />
                  <ErrorMessage name="email" />
                </div>
                <div>
                  <label htmlFor="files">Files (PDF or image)</label>
                  <Field
                    name="files" //values.files
                    type="file"
                    fileref={fileref}
                    multiple
                    value={undefined}
                    onChange={(event) =>
                      setFieldValue("files", event.currentTarget.files)
                    }
                  />
                  <ErrorMessage name="files" />
                </div>
                <div>
                  <label htmlFor="comments">Comments (Any Message)</label>
                  <Field name="comments" type="text" as="textarea" />
                  <ErrorMessage name="comments" />
                </div>
                <p id="declrtn"> DECLARATION and TERMS OF SERVICE</p>
                <div className="terms-container">
                  <Field
                    type="checkbox"
                    name="agreeToTerms"
                    id="agreeToTerms"
                    className="checkbox"
                    readOnly
                  />
                  <label htmlFor="agreeToTerms" className="checkbox-label">
                    I have read and agree to the{" "}
                    <a
                      href={termsAndServicesURL}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Terms and Services
                    </a>
                  </label>
                </div>
                <div className="checkout">
                  <div className="checkbox-container">
                    <Field
                      type="checkbox"
                      name="agreeToTerms"
                      id="agreeToTerms"
                      className="checkbox"
                    />
                    <label htmlFor="agreeToTerms" className="checkbox-label">
                      I, the applicant, in the capacity of do hereby declare
                      that what is stated above is true to the best of my
                      information and belief. I have read and agree to the Terms
                      and Conditions.
                    </label>
                  </div>

                  <label htmlFor="price">Amount</label>
                  <Field
                    name="myField"
                    type="text"
                    readOnly
                    placeholder="₹ 200"
                  />
                  <label htmlFor="price">Date</label>
                  <Field
                    name="myField"
                    type="text"
                    readOnly
                    placeholder={`${new Date().toLocaleDateString()}`}
                  />
                </div>
                <button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Submitting..." : "Submit"}
                </button>
              </Form>
            )}
          </Formik>
        </div>
      )}
    </div>
  );
}
