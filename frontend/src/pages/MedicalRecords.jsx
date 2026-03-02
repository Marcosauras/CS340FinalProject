import { Link, useNavigate } from "react-router-dom";

const MedicalRecords = () => {
  const navigate = useNavigate();
  const animalRecords = [
    {
      medicalRecordID: 1,
      animalID: 1,
      animalName: "Roman",
      appointmentDate: "2026-01-20 10:30:00",
      note: "Stomach pains"
    },
    {
      medicalRecordID: 2,
      animalID: 1,
      animalName: "Roman",
      appointmentDate: "2026-01-27 10:30:00",
      note: null
    },
    {
      medicalRecordID: 3,
      animalID: 4,
      animalName: "Bella",
      appointmentDate: null,
      note: "Bella is limping — schedule vet"
    }
  ];


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