import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const AddFoster = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    capacity: ""
  });

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    navigate("/fosters");
  }

  return (
    <div>
      <h2>Add Foster</h2>

      <form onSubmit={handleSubmit}>
        <p>
          <label>
            Name:
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
            />
          </label>
        </p>

        <p>
          <label>
            Phone:
            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
            />
          </label>
        </p>

        <p>
          <label>
            Email:
            <input
              name="email"
              value={form.email}
              onChange={handleChange}
            />
          </label>
        </p>

        <p>
          <label>
            Capacity:
            <input
              name="capacity"
              type="number"
              value={form.capacity}
              onChange={handleChange}
            />
          </label>
        </p>

        <button type="submit">Save</button>
      </form>

      <Link to="/fosters">Back</Link>
    </div>
  );
}

export default AddFoster