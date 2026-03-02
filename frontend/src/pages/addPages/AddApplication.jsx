import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const AddApplication = () => {
  const navigate = useNavigate();

  const adopterOptions = [
    "Ben ID: 1",
    "Lancelot ID: 2",
    "Merlin ID: 3"
  ];

  const animalOptions = [
    "Roman ID: 1",
    "Calliope ID: 2",
    "Arthur Pendragon ID: 3",
    "Bella ID: 4"
  ];
  const [form, setForm] = useState({
    adopter: "",
    animal: ""
  });

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    navigate("/applications");
  }
  return (
    <div>
      <h2>Add Application</h2>

      <form onSubmit={handleSubmit}>
        <p>
          <label>
            Animal:
            <select
              name="animal"
              value={form.animal}
              onChange={handleChange}
            >
              <option value="">Select Animal</option>
              {animalOptions.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </label>
        </p>

        <p>
          <label>
            Animal:
            <select
              name="adopter"
              value={form.adopter}
              onChange={handleChange}
            >
              <option value="">Select Adopter</option>
              {adopterOptions.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </label>
        </p>

        <button type="submit">Save</button>
      </form>

      <Link to="/applications">Back</Link>
    </div>
  );
}

export default AddApplication