## Hello!

### run client

```
yarn start
```

### run server

```
yarn run dev
```


## Issue in Payment

1. Client side Issue : need help.
- Goto: `http://localhost:3000/payment` on browser.
- Click `pay` button
- check console for below error:/

```
Response {type: 'cors', url: 'http://localhost:5001/razorpay', redirected: false, status: 404, ok: false, …}
```
Possible sol:
- axios urls
- proxy errors

2. Related code_files for issues

- Code for client:
`src/pages/payment/payment.jsx` for the above file

- code for server
`routes/payment.js`


<!-- //connecting backend
https://codepen.io/soumitraghosh99/pen/xxameKJ?editors=1100  ''f f


//react js stying guide airbnb
simple file upload: https://codesandbox.io/s/lkkjpr5r7?file=/index.js

//multiple files
//REST formik form button: https://reacthustle.com/blog/tutorial-how-to-reset-formik-form

//multer multi file upload: https://www.bezkoder.com/node-js-upload-store-images-mongodb/
<img src={process.env.PUBLIC_URL + '/logo.png'} alt="Logo" />  for public assets storing small bundle size -->
