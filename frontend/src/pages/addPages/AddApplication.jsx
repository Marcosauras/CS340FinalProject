import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const AddApplication = () => {
  const navigate = useNavigate();
  const backendURL = "http://classwork.engr.oregonstate.edu:63033";
  
  const [allAnimals, setAllAnimals] = useState([])
  const [allAdopters, setAllAdopters] = useState([])

  const [form, setForm] = useState({
    adopterID: "",
    animalID: ""
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

  // Gets the adopters data from the database to fill the dropdown
  useEffect(() => {
    fetch(backendURL + "/adopters")
      .then(res => res.json())
      .then(data => {
        // if no adopter is found return an error
        if (!data) {
          console.error("No Adopters found");
          return;
        }

        // set adopters to hook to use in form
        setAllAdopters(data)
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
    
    const status = "pending"
    const applicationDate = new Date().toISOString();

    try {
      // sends the request to the server to create a new application
      const response = await fetch(
        backendURL + "/applications/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            animalID: Number(form.animalID),
            adopterID: Number(form.adopterID),
            status: status,
            applicationDate: applicationDate
          }),
        }
      );
      // if the update went through send the user to the applications page
      if (response.ok) {
        navigate("/applications");
      }
    } catch (error) {
      console.error('Error adding a foster to the database', error);
    }
  }
  return (
    <div>
      <h2>Add Application</h2>

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
            Adopter Name and ID:
            <select
              name="adopterID"
              value={form.adopterID}
              onChange={onChange}
              required
            >
              <option value="">Select Adopter</option>

              {allAdopters.map((adopter) => (
                <option
                  key={`adopter-${adopter.adopterID}`}
                  value={String(adopter.adopterID)}
                >
                  {adopter.name}: {adopter.adopterID}
                </option>
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