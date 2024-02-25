import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Student = () => {
  const [student, setStudent] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/`)
      .then((res) => setStudent(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/student/` + id);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
      <div className="w-50 bg-white rounded p-3">
        <Link to="/create" className="btn btn-success">
          Add +
        </Link>
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {student.map((st, i) => (
              <tr key={i}>
                <td>{st.Name}</td>
                <td>{st.Email}</td>
                <td>
                  <Link to={`/update/${st.ID}`} className="btn btn-primary">
                    Update
                  </Link>
                  <button
                    className="btn btn-danger ms-2"
                    onClick={(e) => handleDelete(st.ID)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Student;
