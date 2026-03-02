import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const AddMedicalRecord = () => {
  const navigate = useNavigate();

  // temp but here so we can showcase the drop down options
  const animalOptions = [
    "Roman ID: 1",
    "Calliope ID: 2",
    "Arthur Pendragon ID: 3",
    "Bella ID: 4"
  ];

  const [form, setForm] = useState({
    animal: "",
    appointmentDate: "",
    note: ""
  });

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    navigate("/medical-records");
  }

  return (
    <div>
      <h2>Add Medical Record</h2>

      <form onSubmit={handleSubmit}>

        <p>
          <label>
            Animal:
            
            <select
              name="animal"
              value={form.animal}
              onChange={handleChange}
            >
              <option value="">Select an animal</option>
              {animalOptions.map((name) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </select>
          </label>
        </p>

        <p>
          <label>
            Appointment Date:
            
            <input
              name="appointmentDate"
              type="datetime-local"
              value={form.appointmentDate}
              onChange={handleChange}
            />
          </label>
        </p>

        <p>
          <label>
            Note:
            
            <textarea
              name="note"
              value={form.note}
              onChange={handleChange}
            />
          </label>
        </p>

        <button type="submit">Save</button>

      </form>

      
      <Link to="/medical-records">Back</Link>
    </div>
  );
};

export default AddMedicalRecord;