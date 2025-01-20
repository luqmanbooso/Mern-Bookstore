import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Card, Typography } from "@material-tailwind/react";
import axios from "axios";
import SideBar from "../components/home/SideBar";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import ViewUser from "../components/home/ViewUser";
import EditUser from "../components/home/EditUser";
import DeleteUser from "../components/home/DeleteUser";

const TABLE_HEAD = ["#", "First Name", "Last Name", "Email", "Operations"];

const UserHome = () => {
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [users, setUsers] = useState([]);

  const openModal = (type, id) => {
    setSelectedUserId(id);
    if (type === "view") {
      setViewModalOpen(true);
    } else if (type === "edit") {
      setEditModalOpen(true);
    }
    else if (type === "delete") {
      setDeleteModalOpen(true);
    }
  };

  const closeModal = () => {
    setSelectedUserId(null);
    setViewModalOpen(false);
    setEditModalOpen(false);
    setDeleteModalOpen(false)
  };

  useEffect(() => {
    axios
      .get("http://localhost:5000/signup")
      .then((response) => {
        setUsers(response.data.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  if (!users || users.length === 0) {
    return <Typography>No users to display</Typography>;
  }

  return (
    <>
      <SideBar />
      <Card className="h-full min-w-fit overflow-scroll items-center">
        <table className="w-full table-auto text-left rounded-lg">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className="border-b border-gray-400 bg-slate-200 font-bold p-4"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => {
              const classes = "p-4 border-b border-blue-gray-50";

              return (
                <tr
                  key={user._id}
                  className="hover:scale-105 transition-transform duration-300"
                >
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {index + 1}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {user.firstName}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {user.lastName}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {user.email}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <div className="flex gap-x-4">
                      <button onClick={() => openModal("view", user._id)}>
                        <BsInfoCircle className="text-2xl text-green-800" />
                      </button>
                      <button onClick={() => openModal("edit", user._id)}>
                        <AiOutlineEdit className="text-2xl text-yellow-400" />
                      </button>
                      
                      <button onClick={() => openModal("delete", user._id)}>
                        <MdOutlineDelete className="text-2xl text-red-400" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Card>
      {viewModalOpen && (
        <ViewUser userId={selectedUserId} onClose={closeModal} />
      )}
      {editModalOpen && (
        <EditUser userId={selectedUserId} onClose={closeModal} />
      )}
      {deleteModalOpen && (
        <DeleteUser id={selectedUserId} onClose={closeModal} />
      )}
    </>
  );
};

UserHome.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      firstName: PropTypes.string.isRequired,
      lastName: PropTypes.string.isRequired,
    })
  ),
};

export default UserHome;
