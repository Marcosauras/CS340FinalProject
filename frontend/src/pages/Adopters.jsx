import { Link, useNavigate } from "react-router-dom";


const Adopters = () => {
  const navigate = useNavigate();

  // Example of how the data would look coming in
  const adopters = [
    {
      adopterID: 1,
      name: "Ben",
      phone: "832-123-8429",
      email: "Ben@example.com",
      note: "Looking for a small animal"
    },
    {
      adopterID: 2,
      name: "Lancelot",
      phone: "804-832-2932",
      email: "Lancelot@example.com",
      note: null
    },
    {
      adopterID: 3,
      name: "Merlin",
      phone: "804-832-7987",
      email: "CourtMagician@example.com",
      note: null
    }
  ];

  // This will send the user to the edit page
  function handleEdit(AdopterID) {
    navigate(`/adopters/edit/${AdopterID}`);
  }

  // this will delete the adopter from the current row
  function handleDelete() {
    const ok = window.confirm("Later this will delete the Adopter in this row");
    if (!ok) return;
  }
  return (
    <div>
      <h2>Adopters</h2>

      <Link to="/adopters/add">Add Adopter</Link>

      <table border="1">
        <thead>
          <tr>
            <th>Adopter ID</th>
            <th>Name</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Note</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {adopters.map((adopter) => (
            <tr key={adopter.adopterID}>
              <td>{adopter.adopterID}</td>
              <td>{adopter.name}</td>
              <td>{adopter.phone}</td>
              <td>{adopter.email}</td>
              {/* If the adopter.note is empty write NULL */}
              <td>{adopter.note ?? "NULL"}</td>
              <td>
                <button type="button" onClick={() => handleEdit(adopter.adopterID)}>
                  Edit
                </button>{" "}
                <button type="button" onClick={() => handleDelete()}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Adopters