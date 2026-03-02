import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const AddAnimalFosterDetail = () => {
  const navigate = useNavigate();

  // arrays to hold info for the drop downs
  const fosterOptions = [
    "Joey ID: 1",
    "Lannie ID: 2",
    "Donna ID: 3"
  ];

  const animalOptions = [
    "Roman ID: 1",
    "Calliope ID: 2",
    "Arthur Pendragon ID: 3",
    "Bella ID: 4"
  ];

  const [form, setForm] = useState({
    foster: "",
    animal: "",
    startDate: "",
    endDate: ""
  });

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    navigate("/animals-fosters");
  }

  return (
    <div>
      <h2>Add Animal Foster</h2>

      <form onSubmit={handleSubmit}>

        <p>
          <label>
            Foster:
            <select
              name="foster"
              value={form.foster}
              onChange={handleChange}
            >
              <option value="">Select foster</option>
              {fosterOptions.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </label>
        </p>

        <p>
          <label>
            Animal:
            
            <select
              name="animal"
              value={form.animal}
              onChange={handleChange}
            >
              <option value="">Select animal</option>
              {animalOptions.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </label>
        </p>

        <p>
          <label>
            Start Date:
            
            <input
              name="startDate"
              type="datetime-local"
              value={form.startDate}
              onChange={handleChange}
            />
          </label>
        </p>

        <p>
          <label>
            End Date:
            
            <input
              name="endDate"
              type="datetime-local"
              value={form.endDate}
              onChange={handleChange}
            />
          </label>
        </p>

        <button type="submit">Save</button>

      </form>

      
      <Link to="/animals-fosters">Back</Link>
    </div>
  );
};

export default AddAnimalFosterDetail;