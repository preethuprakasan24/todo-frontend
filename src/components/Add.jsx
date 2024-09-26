import React, { useContext, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { addTaskApi } from "../services/allApi";
import { addResponseContext } from "../context/ContextShare";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Add() {
  const { setAddResponse } = useContext(addResponseContext);
  // const { getResponse, setGetResponse } = useContext(getResponseContext);
  const [taskData, setTaskData] = useState({
    task: "",
    priority: "",
  });

  console.log(taskData);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleAdd = async () => {
    const result = await addTaskApi(taskData);
    if (result.status >= 200 && result.status < 300) {
      setAddResponse(result.data);
      // toast.success("Added successfully");
      handleClose();
    } else {
      toast.error("Something went wrong");
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-between mt-3 mb-5">
        <button className="btn btn-success  rounded-0" onClick={handleShow}>
          Add new Task
        </button>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mb-3">
            <input
              type="text"
              className="w-100 form-control"
              placeholder="Enter your Task"
              onChange={(e) =>
                setTaskData({ ...taskData, task: e.target.value })
              }
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              className="w-100 form-control"
              placeholder="Priority"
              onChange={(e) =>
                setTaskData({ ...taskData, priority: e.target.value })
              }
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleAdd}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer autoClose={2000} theme="colored" position="top-center" />
    </div>
  );
}

export default Add;
