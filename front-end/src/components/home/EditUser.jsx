import { useEffect, useState } from "react";
import React from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { useSnackbar } from "notistack";

const EditUserModal = ({ userId, onClose }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (userId) {
      setLoading(true);
      axios
        .get(`http://localhost:5000/signup/${userId}`)
        .then((response) => {
          setFirstName(response.data.firstName);
          setLastName(response.data.lastName);
          setEmail(response.data.email);
          setPassword(response.data.password);
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
          enqueueSnackbar("Error fetching user data", { variant: "error" });
          console.error("Error fetching user data:", error);
        });
    }
  }, [userId]);

  const handleEditUser = () => {
    const data = { firstName, lastName, email, password };
    setLoading(true);

    axios
      .put(`http://localhost:5000/signup/${userId}`, data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar("User updated successfully", { variant: "success" });
        onClose(); // Close modal after success
        window.location.reload()
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar("Error updating user", { variant: "error" });
        console.error("Error updating user:", error);
      });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg w-96 p-6 relative">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-black"
          onClick={onClose}
        >
          &times;
        </button>
        <h2 className="text-2xl font-semibold mb-4">Edit User</h2>
        {loading && <p>Loading...</p>}
        {!loading && (
          <>
            <div className="mb-4">
              <label className="block text-gray-700">First Name</label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="border border-gray-300 p-2 rounded-md w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Last Name</label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="border border-gray-300 p-2 rounded-md w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border border-gray-300 p-2 rounded-md w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border border-gray-300 p-2 rounded-md w-full"
              />
            </div>
            <div className="flex justify-end">
              <button
                className="px-4 py-2 bg-gray-200 rounded-lg mr-2"
                onClick={onClose}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded-lg"
                onClick={handleEditUser}
                disabled={loading}
              >
                {loading ? "Saving..." : "Save"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

EditUserModal.propTypes = {
  userId: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default EditUserModal;
