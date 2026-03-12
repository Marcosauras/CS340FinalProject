import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function AddAdopter() {
  const navigate = useNavigate();
  const backendURL = "http://classwork.engr.oregonstate.edu:63033";
  
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    note: ""
  });

  function handleChange(e) {
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
        backendURL + "/adopters/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(form),
        }
      );
      // if the update went through send the user to the adopter page
      if (response.ok) {
        navigate('/adopters');
      }
    } catch (error) {
      console.error('Error adding an adopter to the database', error);
    }
  }

  return (
    <div>
      <h2>Add Adopter</h2>

      <form onSubmit={handleSubmit}>
        <p>
          <label>
            Name:
            <input
              name="name"
              value={form.name}
              onChange={handleChange} />
          </label>
        </p>

        <p>
          <label>
            Phone:
            <input name="phone"
              value={form.phone}
              onChange={handleChange} />
          </label>
        </p>

        <p>
          <label>
            Email:
            <input name="email"
              value={form.email}
              onChange={handleChange} />
          </label>
        </p>

        <p>
          <label>
            Note:
            <textarea name="note"
              value={form.note}
              onChange={handleChange} />
          </label>
        </p>

        <button type="submit">Save</button>
      </form>

      <Link to="/adopters">Back</Link>
    </div>
  );
}