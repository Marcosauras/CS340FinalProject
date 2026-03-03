import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const MedicalRecords = () => {
  const navigate = useNavigate();
  const [animalRecords, setAnimalRecords] = useState([]);

  const backendURL = "http://classwork.engr.oregonstate.edu:63033";

  // Grab all the medical records from database
  useEffect(() => {
    fetch(`${backendURL}/medicalRecords`)
      .then(res => res.json())
      .then(data => setAnimalRecords(data))
      .catch(err => console.error("Error fetching medical records:", err));
  }, []);

  // This will send the user to the edit page
  function handleEdit(medicalRecordID) {
    navigate(`/medical-records/edit/${medicalRecordID}`);
  }

  // this will delete the AnimalFoster Data from the current row
  function handleDelete() {
    const ok = window.confirm("Later this will delete the Medical Record Data in this row");
    if (!ok) return;
  }

  return (
    <div>
      <h3>MedicalRecords</h3>

      <nav>
        <Link to="/medical-records/add"> Add Medical Record</Link>
      </nav>

      <table border="1">
        <thead>
          <tr>
            <th>MedicalRecord ID</th>
            <th>Animal Name and ID</th>
            <th>Appointment Date</th>
            <th>Note</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {animalRecords.map((medicalRec) => (
            <tr key={medicalRec.medicalRecordID}>
              <td>{medicalRec.medicalRecordID}</td>
              <td>{medicalRec.animalName}: {medicalRec.animalID}</td>
              <td>{medicalRec.appointmentDate ?? "NULL"}</td>
              <td>{medicalRec.note ?? "NULL"}</td>
              <td>
                <button onClick={() => handleEdit(medicalRec.medicalRecordID)}>Edit</button>{" "}
                <button onClick={() => handleDelete()}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MedicalRecords