import { Link, useNavigate } from "react-router-dom";

const Fosters = () => {
  const navigate = useNavigate();

  // How the data will look once Database is hooked up
  const fosters = [
    {
      fosterID: 1,
      name: "Joey",
      phone: "804-832-2424",
      email: "JoeyFosters@example.com",
      capacity: 1
    },
    {
      fosterID: 2,
      name: "Lannie",
      phone: "621-321-1256",
      email: "NotACat@example.come",
      capacity: 4
    },
    {
      fosterID: 3,
      name: "Donna",
      phone: "292-291-2033",
      email: "Donna@example.com",
      capacity: 2
    }
  ];

  // Handles the editing of the current row
  function handleEdit(fosterID) {
    navigate(`/fosters/edit/${fosterID}`);
  }

  // Will delete the values in the current row
  function handleDelete() {
    const ok = window.confirm("Later this will delete the Foster in this row");
    if (!ok) return;
  }

  return (
    <div>
      <h3>Fosters</h3>

      <nav>
        <Link to="/fosters/add">Add Foster</Link>
      </nav>

      <table border="1">
        <thead>
          <tr>
            <th>Foster ID</th>
            <th>Name</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Capacity</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {fosters.map((foster) => (
            <tr key={foster.fosterID}>
              <td>{foster.fosterID}</td>
              <td>{foster.name}</td>
              <td>{foster.phone}</td>
              <td>{foster.email}</td>
              <td>{foster.capacity}</td>
              <td>
                <button onClick={() => handleEdit(foster.fosterID)}>Edit</button>{" "}
                <button onClick={() => handleDelete(foster.fosterID)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Fosters