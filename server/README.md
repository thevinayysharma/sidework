POST http://localhost:5001/orders
Content-Type: application/json
{
    "firstName": "testvinay-1",
    "lastName": "sharma",
    "middleName": "kr",
    "age": "24",
    "comments": "",
    "dob": "23",
    "gender": "M",
    "email": "test@email.com",
    "phone": "9999900000",    
    "orderId": "abc856",
}

//connecting backend
https://codepen.io/soumitraghosh99/pen/xxameKJ?editors=1100  ''f f


//react js stying guide airbnb

simple file upload: https://codesandbox.io/s/lkkjpr5r7?file=/index.js


//multiple files
//REST formik form button: https://reacthustle.com/blog/tutorial-how-to-reset-formik-form



//multer multi file upload: https://www.bezkoder.com/node-js-upload-store-images-mongodb/
<img src={process.env.PUBLIC_URL + '/logo.png'} alt="Logo" />  for public assets storing small bundle size




       // Redirect to Razorpay checkout page
        const paymentUrl = await axios.post("http://localhost:5000/payment/");; // get the payment URL from the backend //for the given orderID
        setPaymentUrl(paymentUrl);
        window.location.href = paymentUrl; // redirect the user to the payment URL






/* eslint-disable no-undef */
function search(query, cb) {
    return fetch(`orders?q=${query}`, {
      accept: "application/json"
    })
      .then(checkStatus)
      .then(parseJSON)
      .then(cb);
  }
  
  function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
      return response;
    }
    const error = new Error(`HTTP Error ${response.statusText}`);
    error.status = response.statusText;
    error.response = response;
    console.log(error); // eslint-disable-line no-console
    throw error;
  }
  
  function parseJSON(response) {
    return response.json();
  }
  
  const Client = { search };
  export default Client;

