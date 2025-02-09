import React, { useState, useEffect } from "react";
import { Card, Spinner } from "react-bootstrap";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

const ViewNotification = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  const colors = ["#4f364a","#4f364a"];

  
  const fetchNotifications = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:8080/resident/display-notifications", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setNotifications(response.data);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  return (
    <div className="container mt-4">
      <h4 className="text-center fw-bold " style={{ color: "teal" }}> Latest Notifications</h4>
      <div className="d-flex flex-column align-items-center mt-4">
        {loading ? (
          <Spinner animation="border" variant="primary" />
        ) : notifications.length === 0 ? (
          <p className="text-muted">No notifications available.</p>
        ) : (
          <AnimatePresence>
            {notifications.map((notification, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6, delay: index * 0.4 }}
              >
                <Card
                  className="mb-3 shadow"
                  style={{
                    width: "100%",
                    maxWidth: "500px",
                    backgroundColor: colors[index % colors.length], 
                    color:  "#FFFFFF",
                    borderRadius: "12px",
                    padding: "10px",
                    borderLeft: "6px solid #FF6F61", // Bold contrast accent (Coral Red)
                  }}
                >
                  <Card.Body>
                    <Card.Title className="fw-bold">{notification.title}</Card.Title>
                    <Card.Text>{notification.message}</Card.Text>
                    <small className="text-light">
                      🕒 {new Date(notification.sentDateTime).toLocaleString()}
                    </small>
                  </Card.Body>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </div>
    </div>
  );
};

export default ViewNotification;
