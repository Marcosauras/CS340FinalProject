import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const AddAnimal = () => {
  const navigate = useNavigate();

  const [formData, setForm] = useState({
    name: '',
    species: '',
    breed: '',
    sex: '',
    age: '',
  });

  function handleChange(e) {
    setForm({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const response = await fetch(
        'http://classwork.engr.oregonstate.edu:63037/animals/create',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        }
      );

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
            <input name="name" value={formData.name} onChange={handleChange} />
          </label>
        </p>

        <p>
          <label>
            Species:
            <input
              name="species"
              value={formData.species}
              onChange={handleChange}
            />
          </label>
        </p>

        <p>
          <label>
            Breed:
            <input
              name="breed"
              value={formData.breed}
              onChange={handleChange}
            />
          </label>
        </p>
        <p>
          <label>
            Sex:
            <input name="sex" value={formData.sex} onChange={handleChange} />
          </label>
        </p>
        <p>
          <label>
            age:
            <input
              name="age"
              type="number"
              value={formData.age}
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
