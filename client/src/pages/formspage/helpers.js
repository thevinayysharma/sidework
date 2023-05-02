//generate random Client Id
export const generateOrderId = () => {
    let clientId = "";
    clientId += Math.floor(Math.random() * 900000) + 100000;
    return clientId;
  };
  

  //yup  inital values
  export const initialValues = {
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