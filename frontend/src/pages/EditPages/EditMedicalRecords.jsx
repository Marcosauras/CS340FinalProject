import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const EditMedicalRecord = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Example of the expected info to be return from the SELECT query
  const animalRecords = [
    {
      medicalRecordID: 1,
      animalID: 1,
      appointmentDate: "2026-01-20 10:30:00",
      note: "Stomach pains"
    },
    {
      medicalRecordID: 2,
      animalID: 1,
      appointmentDate: "2026-01-27 10:30:00",
      note: null
    },
    {
      medicalRecordID: 3,
      animalID: 4,
      appointmentDate: null,
      note: "Bella is limping — schedule vet"
    },
  ];

  // SELECT of * Animal IDS and names
  const allAnimals = [
    {
      animalID: 1,
      name: "Roman",
    },

    {
      animalID: 2,
      name: "Calliope",
    },

    {
      animalID: 3,
      name: "Arthur Pendragon",
    },

    {
      animalID: 4,
      name: "Bella",
    }
  ];


  const [form, setForm] = useState({
    animalID: "",
    appointmentDate: "",
    note: "",
  });

  useEffect(() => {
    const recordID = Number(id);
    const found = animalRecords.find((r) => r.medicalRecordID === recordID);

    setForm({
      animalID: String(found.animalID ?? ""),
      appointmentDate: found.appointmentDate ?? "",
      note: found.note ?? "",
    });
  }, [id]);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    navigate("/medical-records");
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
                  key={`animal-${animal.animalID}`}
                  value={String(animal.animalID)}
                >
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