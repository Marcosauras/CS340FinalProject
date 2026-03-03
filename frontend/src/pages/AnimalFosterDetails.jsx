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
  function handleEdit(animalID, fosterID) {
    navigate(`/animals-fosters/edit/${animalID}/${fosterID}`);
  }

  // this will delete the AnimalFoster Data from the current row
  function handleDelete() {
    const ok = window.confirm("Later this will delete the AnimalFoster Data in this row");
    if (!ok) return;
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
              `${animalFost.animalID}-${animalFost.fosterID}-${animalFost.startDate}`
            }>
              <td>{animalFost.animalName}: {animalFost.animalID}</td>
              <td>{animalFost.fosterName}: {animalFost.fosterID}</td>
              <td>{animalFost.startDate}</td>
              <td>{animalFost.endDate ?? "NULL"}</td>
              <td>
                <button onClick={() => handleEdit(animalFost.animalID, animalFost.fosterID)}>Edit</button>{" "}
                <button onClick={() => handleDelete()}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AnimalFosterDetails