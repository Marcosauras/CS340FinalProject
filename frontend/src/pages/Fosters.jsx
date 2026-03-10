import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Fosters = () => {
  const navigate = useNavigate();
  const [fosters, setFosters] = useState([]);

  const backendURL = "http://classwork.engr.oregonstate.edu:63033";

  // Fetch fosters from database
  useEffect(() => {
    fetch(`${backendURL}/fosters`)
      .then(res => res.json())
      .then(data => setFosters(data))
      .catch(err => console.error("Error fetching fosters:", err));
  }, []);

  // Handles the editing of the current row
  function handleEdit(fosterID) {
    navigate(`/fosters/edit/${fosterID}`);
  }

  // Will delete the values in the current row
  function handleDelete(fosterDeleteId) {
    const ok = window.confirm("Are you sure you want to delete this Foster?");
    if (!ok) return;

    fetch(backendURL + "/fosters/delete", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fosterID: fosterDeleteId })
    })
      .then(() => {
        // reloads the page to show updated database
        return fetch(backendURL + "/fosters");
      })
      .then(res => res.json())
      .then(data => setFosters(data))
      .catch(err => console.error("Delete failed:", err));
  }

  return (
    <div>
      <h3>Fosters</h3>

      <nav>
        <Link to="/fosters/add">Add Foster</Link>
      </nav>

      <table border="1">
        <thead>
          <tr>
            <th>Foster ID</th>
            <th>Name</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Capacity</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {fosters.map((foster) => (
            <tr key={foster.fosterID}>
              <td>{foster.fosterID}</td>
              <td>{foster.name}</td>
              <td>{foster.phone}</td>
              <td>{foster.email}</td>
              <td>{foster.capacity}</td>
              <td>
                <button onClick={() => handleEdit(foster.fosterID)}>Edit</button>{" "}
                <button onClick={() => handleDelete(foster.fosterID)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Fosters