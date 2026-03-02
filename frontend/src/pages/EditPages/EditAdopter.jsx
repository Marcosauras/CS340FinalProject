import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const EditAdopter = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Example of the expected SELECT results
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
    },
  ];

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    note: "",
  });

  // Form will map out the results from the SELECT and prefill the results that are not NULL
  useEffect(() => {
    const adopterID = Number(id);
    const found = adopters.find((a) => a.adopterID === adopterID);

    setForm({
      name: found.name ?? "",
      phone: found.phone ?? "",
      email: found.email ?? "",
      note: found.note ?? "",
    });
  }, [id]);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    navigate("/adopters");
  };


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
              placeholder="(Optional)"
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