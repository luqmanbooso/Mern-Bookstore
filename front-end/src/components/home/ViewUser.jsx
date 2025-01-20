import { useEffect, useState } from "react";
import React from "react";
import PropTypes from "prop-types";
import axios from "axios";

const ViewUser = ({ userId, onClose }) => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (userId) {
      setLoading(true);
      axios
        .get(`http://localhost:5000/signup/${userId}`)
        .then((response) => {
          setUser(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });
    }
  }, [userId]);

  if (!userId) return null; // Don't render the modal if no userId is passed

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg relative w-1/2">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-red-500 hover:text-red-700"
        >
          ✖
        </button>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <div>
            <h2 className="text-2xl font-bold mb-4">
              {user.firstName} {user.lastName}
            </h2>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            {/* <p>
              <strong>Password:</strong> {user.password}
            </p> */}
            <p>
              <strong>Created At:</strong>{" "}
              {user.createdAt
                ? new Date(user.createdAt).toLocaleString()
                : "N/A"}
            </p>
            <p>
              <strong>Updated At:</strong>{" "}
              {user.updatedAt
                ? new Date(user.updatedAt).toLocaleString()
                : "N/A"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

ViewUser.propTypes = {
  userId: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ViewUser;
