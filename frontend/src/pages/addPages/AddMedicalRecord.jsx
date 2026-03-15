import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const AddMedicalRecord = () => {
  const navigate = useNavigate();

  const backendURL = "http://classwork.engr.oregonstate.edu:63033";
  const [allAnimals, setAllAnimals] = useState([])
  const [form, setForm] = useState({
    animalID: "",
    
    note: ""
  });

  // Fetch animals from database
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




  function onChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
        try {
      // sends the request to the server to create a new foster
      const response = await fetch(
        backendURL + "/medicalRecords/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(form),
        }
      );
      // if the update went through send the user to the fosters page
      if (response.ok) {
        navigate("/medical-records");
      }
    } catch (error) {
      console.error('Error adding a foster to the database', error);
    }
  }

  return (
    <div>
      <h2>Add Medical Record</h2>

      <form onSubmit={handleSubmit}>

        <p>
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
        </p>

        <p>
          <label>
            Appointment Date:

            <input
              name="appointmentDate"
              type="datetime-local"
              value={form.appointmentDate}
              onChange={onChange}
            />
          </label>
        </p>

        <p>
          <label>
            Note:

            <textarea
              name="note"
              value={form.note}
              onChange={onChange}
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