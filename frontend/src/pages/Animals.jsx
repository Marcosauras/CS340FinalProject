import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Animals = () => {
  const navigate = useNavigate();
    const [animals, setAnimals] = useState([]);

  const backendURL = "http://classwork.engr.oregonstate.edu:63037";

  // Fetch animals from database
  useEffect(() => {
    fetch(`${backendURL}/animals`)
      .then(res => res.json())
      .then(data => setAnimals(data))
      .catch(err => console.error("Error fetching animals:", err));
  }, []);

  // Handles the editing of the current row
  function handleEdit(animalID) {
    navigate(`/animals/edit/${animalID}`);
  }
  
  // handles deleting the animal from the current row
  function handleDelete(animalID) {
    const ok = window.confirm("Delete this animal?");
    if (!ok) return;

    fetch(`${backendURL}/animals/delete`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ delete_animal_id: animalID })
    })
      .then(() => {
        // reloads the page to show updated database
        return fetch(`${backendURL}/animals`);
      })
      .then(res => res.json())
      .then(data => setAnimals(data))
      .catch(err => console.error("Delete failed:", err));
  }

  return (
    <div>
      <h3>Animals</h3>

      <nav>
        <Link to="/animals/add">Add Animal</Link>
      </nav>

      <table border="1">
        <thead>
          <tr>
            <th>Animal ID</th>
            <th>Name</th>
            <th>Species</th>
            <th>Breed</th>
            <th>Sex</th>
            <th>Age</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {animals.map((animal) => (
            <tr key={animal.animalID}>
              <td>{animal.animalID}</td>
              <td>{animal.name}</td>
              <td>{animal.species ?? "NULL"}</td>
              <td>{animal.breed ?? "NULL"}</td>
              <td>{animal.sex ?? "NULL"}</td>
              <td>{animal.age ?? "NULL"}</td>
              <td>
                <button onClick={() => handleEdit(animal.animalID)}>Edit</button>{" "}
                <button onClick={() => handleDelete(animal.animalID)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Animals