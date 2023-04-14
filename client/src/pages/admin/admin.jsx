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
        // const salesResponse = await axios.get(
        //   "/sales"
        // );
        // setTotalSales(salesResponse.data);

        const ordersResponse = await axios.get("/orders");
        console.log(ordersResponse);
        setCurrentOrders(ordersResponse.data);
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
      await axios.delete(`/orders/${clientId}`);
      // Refresh the orders list after deleting the user
      const ordersResponse = await axios.get("/orders");
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

  const toggleDetails = () => {
    setShowOrders(!currentOrders);
  };

  
  return (
    <div className="adminContainer">
      <div className="sales-info">
        <p>Total Sales: INR {totalSales}</p>
      </div>
      <div className="current-orders">
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
                <div className="order-header">
                  <p>Order ID: {order.clientId}</p>
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
                    Order Amount: &#8377;{order.amount} | Paid Amount: &#8377;{" "}
                    {order.paymentAmount}{" "}
                  </p>
                  <p>Payment Status: {order.paymentStatus}</p>
                </div>
                <div className="order-actions">
                  <button onClick={() => downloadFile(order.files[0].url)}>
                    {" "}
                    Download file{" "}
                  </button>
                  <button onClick={() => handleDelete(order.clientId)}>
                    Delete
                  </button>
                  <button>WhatsApp </button>
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
