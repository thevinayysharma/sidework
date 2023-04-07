import React, { useState, useEffect } from "react";
import axios from "axios";
import "./admin.css";

const Admin = () => {
  const [totalSales, setTotalSales] = useState(0);
  const [currentOrders, setCurrentOrders] = useState([]);
  const [showOrders, setShowOrders] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const salesResponse = await axios.get(
          "http://localhost:5000/orders/sales"
        );
        setTotalSales(salesResponse.data.totalSales);

        const ordersResponse = await axios.get("http://localhost:5000/orders");
        setCurrentOrders(ordersResponse.data.currentOrders);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const toggleOrders = () => {
    setShowOrders(!showOrders);
  };

  const downloadFile = async (fileUrl) => {
    try {
      const response = await axios.get(fileUrl, {
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.download = fileUrl.substring(url.lastIndexOf("/") + 1);
      link.click();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteUser = async (clientId) => {
    try {
      await axios.delete(`http://localhost:5000/orders/${clientId}`);
      // Refresh the orders list after deleting the user
      const ordersResponse = await axios.get("http://localhost:5000/orders");
      setCurrentOrders(ordersResponse.data.currentOrders);
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
    <div className="user-box">
      <div className="sales-info">
        <p>Total Sales: INR {totalSales}</p>
      </div>
      <div className="current-orders">
        <h4>Current Orders</h4>
        <div className="order-toggle">
          <button onClick={toggleOrders}>
            {showOrders ? "Hide Orders" : "Show Orders"}
          </button>
        </div>
        {showOrders && (
          <div className="order-list">
            <h4>Current Orders</h4>
            {currentOrders.map((order) => (
              <div className="order-box" key={order.clientId}>
                <div>
                  <p>Order ID: {order.clientId}</p>
                  <p>Work:{order.work}</p>
                  <p>firstName:{order.firstName}</p>
                  <p>lastName:{order.lastName}</p>
                  <p>Last Name: {order.lastName}</p>
                  <p>Middle Name: {order.middleName}</p>
                  <p>Age: {order.age}</p>
                  <p>DOB: {order.dob}</p>
                  <p>Gender: {order.gender}</p>
                  <p>Email: {order.email}</p>
                  <p>Phone: {order.phone}</p>
                  <p>Payment Status: {order.paymentStatus}</p>
                  <p>Amount: INR {order.amount}</p>
                  <p>Payment Amount: INR {order.paymentAmount}</p>
                  <button onClick={() => downloadFile(order.files[0].url)}> Download file </button>
                </div>
                <div className="order-actions">
                  <button onClick={() => handleDelete(order.clientId)}>Delete</button>
                  <button>WhatsApp Integration</button>
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
