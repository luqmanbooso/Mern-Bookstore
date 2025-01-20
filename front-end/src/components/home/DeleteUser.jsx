import React, { useState } from "react";
import PropTypes from "prop-types";
import Spinner from "../Spinner";
import axios from "axios";
import { useSnackbar } from "notistack";

const DeleteUser = ({ id, onClose }) => {
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const handleDelete = () => {
    setLoading(true);
    axios
      .delete(`http://localhost:5000/signup/${id}`)
      .then(() => {
        setLoading(false);
        enqueueSnackbar("user Deleted Successfully", { variant: "success" });
        
        window.location.reload()
        onClose(); // Close modal
        
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar("Error deleting the user", { variant: "error" });
        console.error("Error deleting the user:", error);
      });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-[400px] p-6 relative shadow-lg">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-black"
          onClick={onClose}
        >
          &times;
        </button>
        <h2 className="text-2xl font-semibold mb-4">Delete user</h2>
        {loading ? (
          <Spinner />
        ) : (
          <div>
            <p className="text-gray-700 mb-4">
              Are you sure you want to delete this user?
            </p>
            <div className="flex justify-end">
              <button
                className="px-4 py-2 bg-gray-200 rounded-lg mr-2"
                onClick={onClose}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-600 text-white rounded-lg"
                onClick={handleDelete}
              >
                Delete
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

DeleteUser.propTypes = {
  id: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  onDeleteSuccess: PropTypes.func.isRequired,
};

export default DeleteUser;
