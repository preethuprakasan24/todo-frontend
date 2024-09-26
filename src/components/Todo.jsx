import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Add from "./Add";
import {
  addResponseContext,
  editResponseContext,
  getResponseContext,
} from "../context/ContextShare";
import { deleteTaskApi, getAllTaskApi } from "../services/allApi";
import Edit from "./Edit";
import Dropdown from "react-bootstrap/Dropdown";

function Todo() {
  const { setGetResponse } = useContext(getResponseContext);
  const { addResponse } = useContext(addResponseContext);
  const { editResponse } = useContext(editResponseContext);

  const [taskResult, setTaskResult] = useState([]);

  const getTask = async () => {
    const result = await getAllTaskApi();
    setTaskResult(result.data);
    setGetResponse(result.data);
  };

  const handleDelete = async (id) => {
    console.log(id);
    await deleteTaskApi(id);
    getTask();
  };

  const sortByTask = () => {
    const sortedData = [...taskResult].sort((a, b) => {
      return a.task.localeCompare(b.task);
    });

    setTaskResult(sortedData);
  };

  const sortByPriority = () => {
    const sortedData = [...taskResult].sort((a, b) => {
      return a.priority.localeCompare(b.priority);
    });
    setTaskResult(sortedData);
  };

  useEffect(() => {
    getTask();
  }, [addResponse, editResponse]);

  return (
    <div
      className="row  "
      style={{
        height: "100vh",
        backgroundImage:
          'url("https://images.unsplash.com/photo-1652170226044-711dff674316?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dG8lMjBkbyUyMGxpc3R8ZW58MHx8MHx8fDA%3D")',
          backgroundRepeat:"no-repeat",
          backgroundSize:"cover",
          backgroundPosition:"top"
      }}
    >
      <h1 className="text-center text-warning pt-5">
        <b>TODO APP</b>
      </h1>
      <div className="col-md-3"></div>
      <div className="col-md-6 ">
        <div className="d-flex justify-content-between px-5 ">
          <Add />
          <Dropdown className="">
            <Dropdown.Toggle
              variant="success"
              id="dropdown-basic"
              className="border-0 mt-3"
            >
              Sort
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item href="#/action-1" onClick={sortByTask}>
                By Task
              </Dropdown.Item>
              <Dropdown.Item href="#/action-2" onClick={sortByPriority}>
                By Priority
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <Table striped  hover className="shadow">
          <thead>
            <tr>
              <th>#</th>
              <th>Task</th>
              <th>Priority</th>
              <th>Options</th>
            </tr>
          </thead>
          <tbody>
            {taskResult?.length > 0 ? (
              taskResult?.map((item, index) => (
                <tr>
                  <td>{index + 1}</td>
                  <td>{item.task}</td>
                  <td style={{color:item.priority=="high"?"red":item.priority=="medium"?"orange":"green"}}><b>{item.priority}</b></td>
                  <td className="d-flex">
                    <Edit item={item} />
                    <FontAwesomeIcon
                      icon={faTrash}
                      className="text-danger pt-1"
                      onClick={() => handleDelete(item.id)}
                    />
                  </td>
                </tr>
              ))
            ) : (
              <p>No task added </p>
            )}
          </tbody>
        </Table>
      </div>
      <div className="col-md-3"></div>
    </div>
  );
}

export default Todo;
