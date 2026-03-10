import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Adopters = () => {
  // Example of how the data would look coming in
  const navigate = useNavigate();
  const [adopters, setAdopters] = useState([]);

  const backendURL = "http://classwork.engr.oregonstate.edu:63033";

  // Fetch applications from database
  useEffect(() => {
    fetch(`${backendURL}/adopters`)
      .then(res => res.json())
      .then(data => setAdopters(data))
      .catch(err => console.error("Error fetching adopters:", err));
  }, []);

  // This will send the user to the edit page
  function handleEdit(AdopterID) {
    navigate(`/adopters/edit/${AdopterID}`);
  }

  // this will delete the adopter from the current row
  function handleDelete(adopterDeleteID) {
    const ok = window.confirm("Are you sure you want to delete this adopter?");
    if (!ok) return;

    fetch(backendURL + "/adopters/delete", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ adopterID: adopterDeleteID })
    })
      .then(() => {
        // reloads the page to show updated database
        return fetch(backendURL + "/adopters");
      })
      .then(res => res.json())
      .then(data => setAdopters(data))
      .catch(err => console.error("Delete failed:", err));
  }
  return (
    <div>
      <h2>Adopters</h2>

      <Link to="/adopters/add">Add Adopter</Link>

      <table border="1">
        <thead>
          <tr>
            <th>Adopter ID</th>
            <th>Name</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Note</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {adopters.map((adopter) => (
            <tr key={adopter.adopterID}>
              <td>{adopter.adopterID}</td>
              <td>{adopter.name}</td>
              <td>{adopter.phone}</td>
              <td>{adopter.email}</td>
              {/* If the adopter.note is empty write NULL */}
              <td>{adopter.note ?? "NULL"}</td>
              <td>
                <button type="button" onClick={() => handleEdit(adopter.adopterID)}>
                  Edit
                </button>{" "}
                <button type="button" onClick={() => handleDelete()}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Adopters