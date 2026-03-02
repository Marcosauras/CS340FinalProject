import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const EditFoster = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    // Example of the expected result from the SELECT query
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
        },
    ];

    const [form, setForm] = useState({
        name: "",
        phone: "",
        email: "",
        capacity: "",
    });

    const [error, setError] = useState("");
    
    useEffect(() => {
        const fosterID = Number(id);
        // Confirms that the foster is the correct one
        const found = fosters.find(f => f.fosterID === fosterID);

        if (!found) {
            setError(`No foster found with ID ${id}`);
            return;
        }
        
        // Auto fills the form from inputted info
        setForm({
            name: found.name ?? "",
            phone: found.phone ?? "",
            email: found.email ?? "",
            capacity: String(found.capacity ?? ""),
        });
    }, [id]);

    const onChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const onSubmit = (e) => {
        e.preventDefault();
        navigate("/fosters");
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