import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const AnimalFosterDetails = () => {
  const navigate = useNavigate();
  const [animalFosters, setAnimalFosters] = useState([]);

  const backendURL = "http://classwork.engr.oregonstate.edu:63033";

  // Fetch all the animal foster details from database
  useEffect(() => {
    fetch(`${backendURL}/animalFosterDetails`)
      .then((res) => res.json())
      .then((data) => setAnimalFosters(data))
      .catch((err) => console.error("Error fetching animal foster details:", err));
  }, []);


  // This will send the user to the edit page
  function handleEdit(animalFosterDetailID) {
    navigate(`/animals-fosters/edit/${animalFosterDetailID}`);
  }

  // this will delete the AnimalFoster Data from the current row
  function handleDelete(animalFosterDetailID) {
    const ok = window.confirm("Are you sure you want to delete this Foster?");
    if (!ok) return;

    fetch(backendURL + "/animalFosterDetails/delete", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ animalFosterDetailID: animalFosterDetailID })
    })
      .then(() => {
        // reloads the page to show updated database
        return fetch(backendURL + "/animalFosterDetails");
      })
      .then(res => res.json())
      .then(data => setAnimalFosters(data))
      .catch(err => console.error("Delete failed:", err));
  }

  return (
    <div>
      <h3>Animal Foster Details</h3>

      <nav>
        <Link to="/animals-fosters/add">Add Animal Foster Details</Link>
      </nav>

      <table border="1">
        <thead>
          <tr>
            <th>Animal Name and ID</th>
            <th>Foster Name and ID</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {animalFosters.map((animalFost) => (
            <tr key={
              animalFost.animalFosterDetailID ??
              `${animalFosterDetailID}`
            }>
              <td>{animalFost.animalName}: {animalFost.animalID}</td>
              <td>{animalFost.fosterName}: {animalFost.fosterID}</td>
              <td>{animalFost.startDate}</td>
              <td>{animalFost.endDate ?? "NULL"}</td>
              <td>
                <button onClick={() => handleEdit(animalFost.animalFosterDetailID)}>Edit</button>{" "}
                <button onClick={() => handleDelete(animalFost.animalFosterDetailID)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AnimalFosterDetails