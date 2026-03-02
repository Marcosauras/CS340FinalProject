import { Link, useNavigate } from "react-router-dom";

const AnimalFosterDetails = () => {
  const navigate = useNavigate();
  // how the data from animalFoster table will look
  const animalFosters = [
    {
      animalID: 1,
      animalName: "Roman",
      fosterID: 1,
      fosterName: "Joey",
      startDate: "2026-01-10 10:30:00",
      endDate: "2026-01-20 10:30:00"
    },
    {
      animalID: 1,
      animalName: "Roman",
      fosterID: 2,
      fosterName: "Lannie",
      startDate: "2026-02-04 10:30:00",
      endDate: null
    },
    {
      animalID: 2,
      animalName: "Calliope",
      fosterID: 2,
      fosterName: "Lannie",
      startDate: "2026-01-01 10:30:00",
      endDate: null
    }
  ];

  const animalAndFosterNames = [
    {
      
      
    },
        {
      animalName: "Roman",
      fosterName: "Joey"
    },
        {
      animalName: "Roman",
      fosterName: "Joey"
    }
  ]
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
            <tr key={`${animalFost.animalID}-${animalFost.fosterID}`}>
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