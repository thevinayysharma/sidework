import "./forms.css";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";

// generate random orderID
const generateOrderId = () => {
  let clientId = "";
  clientId += Math.floor(Math.random() * 900000) + 100000;
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

export default function RcCorrection() {
  const [clientId, setclientId] = useState(null);
  const [dataSubmitted, setdataSubmitted] = useState(false);

  const navigate = useNavigate();
  const refData = { amount: 249, clientId: clientId };

  //yup validation
  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("Required"),
    lastName: Yup.string().required("Required"),
    middleName: Yup.string().notRequired(),
    dob: Yup.string()
    .matches(/^\d{2}-\d{2}-\d{4}$/, "Invalid date format, use dd-mm-yyyy")
    .required("Required dob"),
    gender: Yup.string().oneOf(["male", "female"]).required("Required Gender"),
    email: Yup.string()
      .email("Invalid email addresss")
      .required("Required email"),
    phone: Yup.string()
      .required("Required")
      .matches(phoneRegExp, "Invalid phone number"),
    files: Yup.mixed()
      .test("fileSize", "File Size is too large", (value) => {
        if (value && value?.length > 0) {
          for (let i = 0; i < value.length; i++) {
            if (value[i].size > 7242880) {
              return false;
            }
          }
        }
        return true;
      })
      .test("fileType", "Unsupported File Format", (value) => {
        if (value && value.length > 0) {
          for (let i = 0; i < value.length; i++) {
            if (
              value[i].type != "image/png" &&
              value[i].type != "image/jpg" &&
              value[i].type != "application/pdf" &&
              value[i].type != "image/jpeg"
            ) {
              return false;
            }
          }
        }
        return true;
      }),
    comments: Yup.string().required("required aadhar number"),
  });

  useEffect(() => {
    const orderId = generateOrderId();
    setclientId(orderId);
  }, []);

  const handleSubmit = async (values, { setSubmitting }) => {
    const formData = new FormData();
    for (let key in values) {
      const fileList = values[key];
      for (let i = 0; i < fileList.length; i++) {
        formData.append("files", fileList[i]);
      }
      formData.append(key, values[key]);
    }
    formData.append("clientId", clientId);
    formData.append("amount", 399);
    formData.append("work", "RC Correction- change of address");
    console.log(values);
    setSubmitting(false);

    //give relevant headers and check for backend work
    try {
      const response = await axios.post("/orders/create", formData);
      if (response.status >= 200 && response.status < 300) {
        //console.log(JSON.stringify(response));
        setdataSubmitted(!dataSubmitted);
        navigate("/payment", { state: refData });
      }
    } catch (error) {
      alert(error);
      console.error(error); // handle error
    }
    // resetForm({ values: "" });
  };

  return (
    <div className="form-container">
      <div className="form_title">
        <h2>RC Correction</h2>
        <p className="direction">Home → RC Correction (change of address) </p>
        <p>
          Your OrderID: <span className="orderId">{clientId}</span>
        </p>
      </div>
      {dataSubmitted ? (
        <p>
          Data Submitted <b>Successfully</b>You are being redirected to the
          payment page. If you are not redirected in a few seconds, please click
          the button below:
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
                  <ErrorMessage
                    component="div"
                    className="error"
                    name="firstName"
                  />
                </div>

                <div>
                  <label htmlFor="lastName">Last Name</label>
                  <Field name="lastName" type="text" />
                  <ErrorMessage
                    component="div"
                    className="error"
                    name="lastName"
                  />
                </div>

                <div>
                  <label htmlFor="middleName">Middle Name</label>
                  <Field name="middleName" type="text" />
                  <ErrorMessage
                    component="div"
                    className="error"
                    name="middleName"
                  />
                </div>

                <div>
                  <label htmlFor="dob">Date of Birth</label>
                  <Field name="dob" placeholder="dd-mm-yyyy" inputMode="numeric"/>
                  <ErrorMessage component="div" className="error" name="dob" />
                </div>

                <div>
                  <label htmlFor="gender">Gender</label>
                  <Field name="gender" as="select">
                    <option value="">Select</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </Field>
                  <ErrorMessage
                    component="div"
                    className="error"
                    name="gender"
                  />
                </div>
                <div>
                  <div className="col-25">
                    <label htmlFor="phone">Phone Number</label>
                    <Field name="phone" type="text" />
                    <ErrorMessage
                      component="div"
                      className="error"
                      name="phone"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="email">Email Address</label>
                  <Field
                    name="email"
                    type="email"
                    placeholder="name@gmail.com"
                  />
                  <ErrorMessage
                    component="div"
                    className="error"
                    name="email"
                  />
                </div>

                <div>
                  <label htmlFor="files">Files (PDF or image)</label>
                  <Field
                    name="files" //values.files
                    type="file"
                    multiple
                    value={undefined}
                    onChange={(event) =>
                      setFieldValue("files", event.currentTarget.files)
                    }
                  />
                  <ErrorMessage
                    component="div"
                    className="error"
                    name="files"
                  />
                </div>
                <div>
                  <label htmlFor="comments">Comments (Any Message)</label>
                  <Field name="comments" type="text" as="textarea" placeholder="Your 12 digit Aadhar Number" />
                  <ErrorMessage component="div" className="error" name="comments" />
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
                    <Link to="/t&c">Terms & Conditions</Link>
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
                    placeholder="₹ 399"
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
