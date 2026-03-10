import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const EditMedicalRecord = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const backendURL = "http://classwork.engr.oregonstate.edu:63033";

  const [allAnimals, setAllAnimals] = useState([])
  const [form, setForm] = useState({
    animalID: "",
    appointmentDate: "",
    note: "",
  });

  
  // Gets the animal data from the database to fill the dropdown
  useEffect(() => {
    fetch(backendURL + "/animals")
      .then(res => res.json())
      .then(data => {
        // if no animals are found return an error
        if (!data) {
          console.error("Animal not found");
          return;
        }
        // set animals to hook to use in form
        setAllAnimals(data)
      })
      .catch(err => console.error("Error loading animal:", err));
  }, []);

  useEffect(() => {
    fetch(backendURL + "/medicalRecords")
      .then(res => res.json())
      .then(data => {
        const medicalRecordID = Number(id);
        const found = data.find((m) => m.medicalRecordID === medicalRecordID);

        if (!found) {
          console.error("Medical Record not found");
          return;
        }
        
        // citation for formating date
        // Date: 03/09/2026
        // Adapted from:
        // Source URL: https://www.w3schools.com/jsref/jsref_toisostring.asp
        // Source URL: https://stackoverflow.com/questions/10830357/javascript-toisostring-ignores-timezone-offset
        const formattedDate = found.appointmentDate ? new Date(found.appointmentDate).toISOString().slice(0, 16): "";

        // Sets the form inputs with info found on the medical record
        setForm({
          animalID: String(found.animalID ?? ""),
          appointmentDate: formattedDate ?? "",
          note: found.note ?? "",
        });
      })
      .catch(err => console.error("Error loading Medical Record", err))


  }, [id]);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(backendURL + "/medicalRecords/update", {
        method: "POST",
        headers: { "Content-Type": "application/json"},

        body: JSON.stringify({
          medicalRecordID: Number(id),
          animalID: Number(form.animalID),
          appointmentDate: form.appointmentDate,
          note: form.note || null,
        }),
      });

      navigate("/medical-records");
    } catch (err) {
      console.error("Medical Record Update failed", err);
    }

    
  };


  return (
    <div>
      <h2>Edit Medical Record</h2>

      <p>
        <Link to="/medical-records">← Back</Link>
      </p>

      <form onSubmit={onSubmit}>
        <div>
          <label>
            Animal Name and ID:
            <select
              name="animalID"
              value={form.animalID}
              onChange={onChange}
              required
            >
              <option value="">Select Animal</option>

              {allAnimals.map((animal) => (
                <option
                  key={animal.animalID}
                  value={animal.animalID}>
                  {animal.name}: {animal.animalID}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div>
          <label>
            Appointment Date{" "}
            <input
              name="appointmentDate"
              value={form.appointmentDate}
              onChange={onChange}
              type="datetime-local"
            />
          </label>
        </div>

        <div>
          <label>
            Note{" "}
            <textarea
              name="note"
              value={form.note}
              onChange={onChange}
              rows="3"
            />
          </label>
        </div>

        <button type="submit">Save</button>{" "}
        <button type="button" onClick={() => navigate("/medical-records")}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default EditMedicalRecord;