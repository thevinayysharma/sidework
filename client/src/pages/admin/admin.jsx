import React, { useState, useEffect } from "react";
import axios from "axios";
import "./admin.css";
import FileSaver from 'file-saver';

const Admin = ({ handleLogout }) => {
  const [totalSales, setTotalSales] = useState(0);
  const [currentOrders, setCurrentOrders] = useState([]);
  const [showOrders, setShowOrders] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const REACT_APP_API_URL = "http://localhost:3000";

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const salesResponse = await axios.get("/sales");
        // setTotalSales(salesResponse.data);

        const ordersResponse = await axios.get("/orders");
        setCurrentOrders(ordersResponse.data);
        console.log(ordersResponse);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const toggleShowAllOrders = () => {
    setShowOrders(!showOrders);
  };

  const toggleIndividualDetails = (order) => {
    setSelectedOrder(selectedOrder === order ? null : order);
  };


  // function downloadFile(filename) {
  //   const url = `${REACT_APP_API_URL}/orders/${filename}`;
  
  //   fetch(url)
  //     .then((response) => response.blob())
  //     .then((blob) => {
  //       const fileName = filename;
  //       const link = document.createElement("a");
  //       link.href = URL.createObjectURL(blob);
  //       link.download = fileName;
  //       link.click();
  //     })
  //     .catch((error) => {
  //       console.error('Error while downloading file:', error);
  //     });
  // }
  function downloadFile(filename) {
    
  fetch(`/orders/${filename}`)
  .then(response => {
    if (!response.ok) {
      throw new Error("File not found");
    }
    return response.blob();
  })
  .then(blob => {
    console.log(blob);
    const objectUrl = URL.createObjectURL(blob);
    const downloadLink = document.createElement("a");
    downloadLink.href = objectUrl;
    downloadLink.download = filename;
    downloadLink.click();
  })
  .catch(error => {
    console.error(error);
    const errorMessage = document.createElement("p");
    errorMessage.innerText = "File not found";
    document.body.appendChild(errorMessage);
  });
  }
  
  // function downloadFile(filename) {
  //   axios({
  //     method: "GET",
  //     url: `${REACT_APP_API_URL}/orders/${filename}`,
  //     responseType: "blob",
  //   })
  //     .then((response) => {
  //       FileSaver.saveAs(response.data, "file");
  //     })
  //     .then(() => {
  //       console.log("Completed");
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }

  const deleteUser = async (clientId) => {
    try {
      await axios.delete(`/orders/${clientId}`);
      // Refresh the orders list after deleting the user
      const ordersResponse = await axios.get("/orders");
      setCurrentOrders(ordersResponse.data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleDelete = (clientId) => {
    if (window.confirm("Are you sure you want to delete this user order?")) {
      deleteUser(clientId);
    }
  };
  return (
    <div className="adminContainer">
      <div className="sales-info">
        <p>Total Sales: INR {totalSales}</p>
      </div>
      <button onClick={handleLogout}>Logout</button>
      <div className="allcurrent-orders">
        <div className="order-toggle">
          <button onClick={toggleShowAllOrders}>
            {showOrders ? "Hide All Orders" : "Show All Orders"}
          </button>
        </div>
        {showOrders && (
          <div className="order-list-container">
            {currentOrders.map((order) => (
              <div className="order-box" key={order.clientId}>
                <div className="order-header">
                  <p>
                    Order ID: {order.clientId} 
                    <span
                      className="toggle-icon"
                      onClick={() => toggleIndividualDetails(order)}
                    >
                      {selectedOrder === order ? "-" : "+"}
                    </span>
                  </p>
                  {selectedOrder === order && (
                    <div>
                      <p>Work: {order.work}</p>
                      <p>First Name: {order.firstName}</p>
                      <p>Last Name: {order.lastName}</p>
                      <p>Middle Name: {order.middleName}</p>
                      <p>DoB: {order.dob}</p>
                      <p>Gender: {order.gender}</p>
                      <p>Email: {order.email}</p>
                      <p>Phone: {order.phone}</p>
                      <p>Payment Status: {order.paymentStatus}</p>
                      <p>
                        Order Amount: &#8377;{order.amount} | Paid Amount:
                        &#8377; {order.paymentAmount}{" "}
                      </p>
                      <p>Payment Status: {order.paymentStatus}</p>
                      {selectedOrder && selectedOrder === order && (
                        <div className="order-actions">
                          <p>Attachments:</p>
                          {order.files.map((file, index) => (
                            <div key={index}>
                              <button className="dwnld-btn"
                                onClick={() => downloadFile(file.filename)}
                              >
                                Download File {index + 1}
                              </button>
                            </div>
                          ))}
                          <button
                            className="deletebtn"
                            onClick={() => handleDelete(order.clientId)}
                          >
                            Delete Order
                          </button>
                          <button>Whatsapp</button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
