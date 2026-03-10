import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';


const EditAnimal = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const backendURL = "http://classwork.engr.oregonstate.edu:63033";

  // Set the form to empty strings
  const [form, setForm] = useState({
    name: "",
    species: "",
    breed: "",
    sex: "",
    age: "",
  });

  // Gets the animal data from the database to fill the form
  useEffect(() => {
    fetch(backendURL + "/animals")
      .then(res => res.json())
      .then(data => {
        const animalID = Number(id);
        const found = data.find((a) => a.animalID === animalID);

        if (!found) {
          console.error("Animal not found");
          return;
        }
        // sets the form inputs with info found on the animal or leaves it empty if nothing is found
        setForm({
          name: found.name ?? "",
          species: found.species ?? "",
          breed: found.breed ?? "",
          sex: found.sex ?? "",
          age: found.age ?? "",
        });
      })
      .catch(err => console.error("Error loading animal:", err));
  }, [id]);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    // send the updated values to the sql database 
    try {
      const response = await fetch(backendURL + "/animals/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // set values that are allowed to be null to null if it is not found
        body: JSON.stringify({
          animalID: Number(id),
          name: form.name,
          species: form.species || null,
          breed: form.breed || null,
          sex: form.sex || null,
          age: form.age === "" ? null : Number(form.age),
        }),
      });

      // Load the animals page to show the updated database
      navigate("/animals");
    } catch (err) {
      // catch the error for any debugging needed
      console.error("Animal Update failed", err);
    }
  };


  return (
    <div>
      <h2>Edit Animal</h2>

      <form onSubmit={onSubmit}>
        <div>
          <label>
            Name{" "}
            <input name="name" value={form.name} onChange={onChange} required />
          </label>
        </div>

        <div>
          <label>
            Species{" "}
            <input name="species" value={form.species} onChange={onChange} />
          </label>
        </div>

        <div>
          <label>
            Breed{" "}
            <input name="breed" value={form.breed} onChange={onChange} />
          </label>
        </div>

        <div>
          <label>
            Sex <input name="sex" value={form.sex} onChange={onChange} />
          </label>
        </div>

        <div>
          <label>
            Age{" "}
            <input
              name="age"
              type="number"
              min="0"
              value={form.age}
              onChange={onChange}
            />
          </label>
        </div>

        <button type="submit">Save</button>{" "}
        <button type="button" onClick={() => navigate("/animals")}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default EditAnimal;
