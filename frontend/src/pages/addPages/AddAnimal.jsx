import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const AddAnimal = () => {
  const navigate = useNavigate();
  const backendURL = "http://classwork.engr.oregonstate.edu:63033";
  const [form, setForm] = useState({
    name: '',
    species: '',
    breed: '',
    sex: '',
    age: '',
  });

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

  try {
    const response = await fetch(
      backendURL + "/animals/create",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form),
      }
    );
    // if the update went through send the user to the animals page
      if (response.ok) {
        navigate('/animals');
      }
    } catch (error) {
      console.error('Error adding an animal to the database', error);
    }
  }

  return (
    <div>
      <h2>Add Animal</h2>

      <form onSubmit={handleSubmit}>
        <p>
          <label>
            Name:
            <input name="name" value={form.name} onChange={handleChange} />
          </label>
        </p>

        <p>
          <label>
            Species:
            <input
              name="species"
              value={form.species}
              onChange={handleChange}
            />
          </label>
        </p>

        <p>
          <label>
            Breed:
            <input
              name="breed"
              value={form.breed}
              onChange={handleChange}
            />
          </label>
        </p>
        <p>
          <label>
            Sex:
            <input name="sex" value={form.sex} onChange={handleChange} />
          </label>
        </p>
        <p>
          <label>
            age:
            <input
              name="age"
              type="number"
              value={form.age}
              onChange={handleChange}
            />
          </label>
        </p>

        <button type="submit">Save</button>
      </form>

      <Link to="/animals">Back</Link>
    </div>
  );
};

export default AddAnimal;
