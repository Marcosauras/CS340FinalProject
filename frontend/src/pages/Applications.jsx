import { Link, useNavigate } from "react-router-dom";

const Applications = () => {
  const navigate = useNavigate();

  const applications = [
    {
      applicationID: 1,
      adopterID: 1,
      adopterName: "Ben",
      animalID: 4,
      animalName: "Bella",
      applicationDate: "2026-02-01 10:14:00",
      status: "pending",
      adoptedDate: null
    },
    {
      applicationID: 2,
      adopterID: 3,
      adopterName: "Ben",
      animalID: 3,
      animalName: "Arthur Pendragon",
      applicationDate: "2026-01-05 6:02:00",
      status: "approved",
      adoptedDate: "2026-01-10"
    },
    {
      applicationID: 3,
      adopterID: 2,
      adopterName: "Lancelot",
      animalID: 3,
      animalName: "Arthur Pendragon",
      applicationDate: "2026-01-10 11:00:00",
      status: "denied",
      adoptedDate: null
    },
    {
      applicationID: 4,
      adopterID: 2,
      adopterName: "Lancelot",
      animalID: 4,
      animalName: "Bella",
      applicationDate: "2026-02-02 11:30:00",
      status: "pending",
      adoptedDate: null
    }
  ];

  // This will send the user to the edit page
  function handleEdit(appID) {
    navigate(`/applications/edit/${appID}`);
  }

  // this will delete the AnimalFoster Data from the current row
  function handleDelete() {
    const ok = window.confirm("Later this will delete the Application Data in this row");
    if (!ok) return;
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
              <td>{application.adopterName}: {application.adopterID}</td>
              <td>{application.animalName}: {application.animalID}</td>
              <td>{application.applicationDate}</td>
              <td>{application.status}</td>
              <td>{application.adoptedDate ?? "NULL"}</td>
              <td>
                <button onClick={() => handleEdit(application.applicationID)}>Edit</button>{" "}
                <button onClick={() => handleDelete()}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Applications