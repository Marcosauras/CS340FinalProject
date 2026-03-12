import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const EditAdopter = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const backendURL = "http://classwork.engr.oregonstate.edu:63033";

  // Set the form to empty strings
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    note: "",
  });

  useEffect(() => {
    fetch(backendURL + "/adopters")
      .then(res => res.json())
      .then(data => {
        const adopterID = Number(id);
        const found = data.find((a) => a.adopterID === adopterID);
        // if the adopter is not found than console log an error
        if (!found) {
          console.error("Adopter not found");
          return;
        }
        // set the form with the details from the adopters ID selected
        setForm({
          name: found.name ?? "",
          phone: found.phone ?? "",
          email: found.email ?? "",
          note: found.note ?? "",
        });
      })
      .catch(err => console.error("Error loading adopters:", err));
  }, [id]);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    //send the updated values to the sql database
    try {
      const response = await fetch(backendURL + "/adopters/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // set values that are allowed to be null to null if it is not found
        body: JSON.stringify({
          adopterID: Number(id),
          name: form.name,
          phone: form.phone,
          email: form.email,
          note: form.note || null,
        })
      })

      // Load the adopters page to show the updated database
      navigate("/adopters");
    } catch (err) {
      // catch the error for any debugging needed
      console.error("Adopter Update failed", err)
    }
  };

  // form to put the updated adopter info into
  return (
    <div>
      <h2>Edit Adopter</h2>
      <p>
        <Link to="/adopters">← Back</Link>
      </p>

      <form onSubmit={onSubmit}>
        <div>
          <label>
            Name{" "}
            <input
              name="name"
              value={form.name}
              onChange={onChange}
              required
            />
          </label>
        </div>

        <div>
          <label>
            Phone{" "}
            <input
              name="phone"
              value={form.phone}
              onChange={onChange}
              required
            />
          </label>
        </div>

        <div >
          <label>
            Email{" "}
            <input
              name="email"
              value={form.email}
              onChange={onChange}
              required
            />
          </label>
        </div>

        <div>
          <label>
            Note{" "}
            <textarea
              name="note"
              value={form.note}
              onChange={onChange}
              placeholder="add notes about the Adopter here"
            />
          </label>
        </div>

        <button type="submit">Save</button>{" "}
        <button type="button" onClick={() => navigate("/adopters")}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default EditAdopter;