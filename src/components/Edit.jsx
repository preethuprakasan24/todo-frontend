import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { editTaskApi } from "../services/allApi";
import { editResponseContext } from "../context/ContextShare";

function Edit({ item }) {
    const{setEditResponse} = useContext(editResponseContext)
  const [editDetails, setEditDetails] = useState({
    task: item.task,
    priority: item.priority,
  });
  
  console.log(editDetails);
  

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleEdit = async()=>{
    const result = await editTaskApi(item.id, editDetails)
    console.log(result);
    if(result.status>=200 && result.status<300){
        // toast.success("Editted successfully")
        handleClose()
        setEditResponse(result.data) 
    }
    
  }
  return (
    <>
      <div>
          <FontAwesomeIcon
            icon={faPenToSquare}
            className="me-3 text-warning"
            onClick={handleShow}
          />
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mb-3">
            <input
              type="text"
              value={editDetails.task}
              className="w-100 form-control"
              placeholder="Enter your Task"
              onChange={(e) =>
                setEditDetails({ ...editDetails, task: e.target.value })
              }
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              value={editDetails.priority}
              className="w-100 form-control"
              placeholder="Priority"
              onChange={(e) =>
                setEditDetails({ ...editDetails, priority: e.target.value })
              }
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleEdit}>
            Edit
          </Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer autoClose={2000} theme="colored" position="top-center" />
    </>
  );
}

export default Edit;
