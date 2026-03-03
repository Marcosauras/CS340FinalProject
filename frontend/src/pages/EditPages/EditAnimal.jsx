import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

const EditAnimal = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const backendURL = 'http://classwork.engr.oregonstate.edu:63037';

  // form state for the animal being edited

  const [form, setForm] = useState({
    name: '',
    species: '',
    breed: '',
    sex: '',
    age: '',
  });

  useEffect(() => {
    if (!id) {
      console.warn('EditAnimal: missing id param');
      return;
    }

    async function fetchAnimal() {
      console.log(`Fetching animal ${id}`);
      try {
        const res = await fetch(`${backendURL}/animals/${id}`);
        console.log('fetch response status', res.status);
        if (res.ok) {
          const data = await res.json();
          console.log('animal data', data);
          setForm({
            name: data.name ?? '',
            species: data.species ?? '',
            breed: data.breed ?? '',
            sex: data.sex ?? '',
            age: data.age ?? '',
          });
        } else {
          console.error('Failed to load animal', res.status);
        }
      } catch (err) {
        console.error('Error fetching animal:', err);
      }
    }

    fetchAnimal();
  }, [id]);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const payload = { ...form, animalID: id };
    if (payload.age === '') {
      payload.age = null;
    } else {
      payload.age = Number(payload.age);
      if (isNaN(payload.age)) payload.age = null;
    }

    try {
      const response = await fetch(`${backendURL}/animals/update`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        console.log('Animal updated successfully.');
        navigate('/animals');
      } else {
        const text = await response.text();
        console.error('Error updating animal:', response.status, text);
      }
    } catch (error) {
      console.error('Error during form submission:', error);
    }
  };

  return (
    <div>
      <h2>Edit Animal</h2>

      <p>
        <Link to="/animals">← Back</Link>
      </p>

      <form onSubmit={onSubmit}>
        <div>
          <label>
            Name{' '}
            <input name="name" value={form.name} onChange={onChange} required />
          </label>
        </div>
        <div>
          <label>
            Species{' '}
            <input name="species" value={form.species} onChange={onChange} />
          </label>
        </div>
        <div>
          <label>
            Breed <input name="breed" value={form.breed} onChange={onChange} />
          </label>
        </div>
        <div>
          <label>
            Sex <input name="sex" value={form.sex} onChange={onChange} />
          </label>
        </div>
        <div>
          <label>
            Age{' '}
            <input
              name="age"
              type="number"
              min="0"
              value={form.age}
              onChange={onChange}
            />
          </label>
        </div>
        <button type="submit">Save</button>{' '}
        <button type="button" onClick={() => navigate('/animals')}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default EditAnimal;
