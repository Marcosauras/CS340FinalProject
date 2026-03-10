import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const EditFoster = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const backendURL = "http://classwork.engr.oregonstate.edu:63033";

    // Set the form to empty strings
    const [form, setForm] = useState({
        name: "",
        phone: "",
        email: "",
        capacity: "",
    });

    useEffect(() => {
        fetch(backendURL + "/fosters")
        .then(res => res.json())
        .then(data => {
            const fosterID = Number(id);
            // Confirms that the foster is the correct one
            const found = data.find(f => f.fosterID === fosterID);
            if (!found) {
                console.error("Animal not found");
                return;
            }
            // sets the form inputs with info found on the animal or leaves it empty if nothing is found
            setForm({
                name: found.name ?? "",
                phone: found.phone ?? "",
                email: found.email ?? "",
                capacity: String(found.capacity ?? ""),
            });
        })
        .catch(err => console.error("Error loading Fosters"))
    }, [id]);

    const onChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(backendURL + "/fosters/update", {
                method: "POST",
                header: {"Content-Type": "aaplication/json"},
                body: JSON.stringify({
                    fosterID: Number(id),
                    name: form.name,
                    phone: form.phone,
                    email: form.email,
                    capacity: form.capacity,
                }),
            });

            // Load the fosters page to show the updated database
            navigate("/fosters");
        } catch (err) {
            console.error("Foster Update failed", err)
        }
    };

    return (
        <div>
            <h2>Edit Foster</h2>

            <p>
                <Link to="/fosters">← Back</Link>
            </p>

            <form onSubmit={onSubmit}>
                <div>
                    <label>
                        Name:
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
                        Phone:
                        <input
                            name="phone"
                            value={form.phone}
                            onChange={onChange}
                            required
                        />
                    </label>
                </div>

                <div>
                    <label>
                        Email:
                        <input
                            name="email"
                            type="email"
                            value={form.email}
                            onChange={onChange}
                            required
                        />
                    </label>
                </div>

                <div>
                    <label>
                        Capacity:
                        <input
                            name="capacity"
                            type="number"
                            min="0"
                            value={form.capacity}
                            onChange={onChange}
                            required
                        />
                    </label>
                </div>

                <button type="submit">Save</button>{" "}
                <button type="button" onClick={() => navigate("/fosters")}>
                    Cancel
                </button>
            </form>
        </div>
    );
};

export default EditFoster;