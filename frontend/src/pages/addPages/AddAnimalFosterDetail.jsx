import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const AddAnimalFosterDetail = () => {
  const navigate = useNavigate();
  const backendURL = "http://classwork.engr.oregonstate.edu:63033";

  const [allFosters, setAllFosters] = useState([])
  const [allAnimals, setAllAnimals] = useState([])
  const [form, setForm] = useState({
    fosterID: "",
    animalID: "",
    startDate: "",
    endDate: ""
  });

  // Gets the fosters data from the database to fill the dropdown
  useEffect(() => {
    fetch(backendURL + "/fosters")
      .then(res => res.json())
      .then(data => {
        // if no fosters is found return an error
        if (!data) {
          console.error("No fosters found");
          return;
        }

        // set fosterss to hook to use in form
        setAllFosters(data)
      })
      .catch(err => console.error("Error loading fosters:", err));
  }, []);

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
      // sends the request to the server to create a new adopter
      const response = await fetch(
        backendURL + "/animalFosterDetails/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(form),
        }
      );
      // if the update went through send the user to the foster details page
      if (response.ok) {
        navigate("/animals-fosters");
      }
    } catch (error) {
      console.error('Error adding an adopter to the database', error);
    }
    
  }

  return (
    <div>
      <h2>Add Animal Foster</h2>

      <form onSubmit={handleSubmit}>

        <p>
          <label>
            Foster Name and ID:
            <select
              name="fosterID"
              value={form.fosterID}
              onChange={onChange}
              required
            >
              <option value="">Select foster</option>

              {allFosters.map((foster) => (
                <option
                  key={foster.fosterID}
                  value={String(foster.fosterID)}
                >
                  {foster.name}: {foster.fosterID}
                </option>
              ))}
            </select>
          </label>
        </p>

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
            Start Date:
            
            <input
              name="startDate"
              type="datetime-local"
              value={form.startDate}
              onChange={onChange}
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
              onChange={onChange}
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