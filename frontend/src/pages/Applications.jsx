import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Applications = () => {
  const navigate = useNavigate();
  const [applications, setApplications] = useState([]);

  const backendURL = "http://classwork.engr.oregonstate.edu:63033";

  // Fetch applications from database
  useEffect(() => {
    fetch(`${backendURL}/applications`)
      .then(res => res.json())
      .then(data => setApplications(data))
      .catch(err => console.error("Error fetching applications:", err));
  }, []);

  // This will send the user to the edit page
  function handleEdit(appID) {
    navigate(`/applications/edit/${appID}`);
  }

  // this will delete the AnimalFoster Data from the current row
  function handleDelete(applicationID) {
    const ok = window.confirm("Are you sure you want to delete this Application?");
    if (!ok) return;

    fetch(backendURL + "/applications/delete", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ deleteApplicationID: applicationID })
    })
      .then(() => {
        // reloads the page to show updated database\
        return fetch(backendURL + "/applications");
      })
      .then(res => res.json())
      .then(data => setApplications(data))
      .catch(err => console.error("Delete failed:", err));
  }
  
  return (
    <div>
      <h3>Applications</h3>

      <nav>
        <Link to="/applications/add">Add Application</Link>
      </nav>

      <table border="1">
        <thead>
          <tr>
            <th>Application ID</th>
            <th>Adopter Name and ID</th>
            <th>Animal Name and ID</th>
            <th>Application Date</th>
            <th>Status</th>
            <th>Adopted Date</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {applications.map((application) => (
            <tr key={application.applicationID}>
              <td>{application.applicationID}</td>
              <td>{application.adopterID}: {application.adopterName}</td>
              <td>{application.animalID}: {application.animalName}</td>
              <td>{application.applicationDate}</td>
              <td>{application.status}</td>
              <td>{application.adoptedDate ?? "NULL"}</td>
              <td>
                <button onClick={() => handleEdit(application.applicationID)}>Edit</button>{" "}
                <button onClick={() => handleDelete(application.applicationID)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Applications