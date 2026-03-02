import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const EditApplication = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    // Example of the expected output from the SELECT query
    const applications = [
        {
            applicationID: 1,
            adopterID: 1,
            animalID: 4,
            applicationDate: "2026-02-01 10:14:00",
            status: "pending",
            adoptedDate: null
        },
        {
            applicationID: 2,
            adopterID: 3,
            animalID: 3,
            applicationDate: "2026-01-05 06:02:00",
            status: "approved",
            adoptedDate: "2026-01-10 06:15:00"
        },
        {
            applicationID: 3,
            adopterID: 2,
            animalID: 3,
            applicationDate: "2026-01-10 11:00:00",
            status: "denied",
            adoptedDate: null
        },
        {
            applicationID: 4,
            adopterID: 2,
            animalID: 4,
            applicationDate: "2026-02-02 11:30:00",
            status: "pending",
            adoptedDate: null
        },
    ];

    // SELECT of * Animal IDS and names
    const allAnimals = [
        {
            animalID: 1,
            name: "Roman",
        },

        {
            animalID: 2,
            name: "Calliope",
        },

        {
            animalID: 3,
            name: "Arthur Pendragon",
        },

        {
            animalID: 4,
            name: "Bella",
        }
    ];

    // SELECT of * Adopter IDS and names
    const allAdopters = [
        {
            adopterID: 1,
            name: "Ben"
        },
        {
            adopterID: 2,
            name: "Lancelot"
        },
        {
            adopterID: 3,
            name: "Merlin"
        }
    ];

    const [form, setForm] = useState({
        adopterID: "",
        animalID: "",
        applicationDate: "",
        status: "",
        adoptedDate: "",
    });


    useEffect(() => {
        const appID = Number(id);
        const found = applications.find(a => a.applicationID === appID);

        if (!found) {
            setError(`No application found with ID ${id}`);
            return;
        }

        // auto fills the form with the info that was found
        setForm({
            adopterID: String(found.adopterID),
            animalID: String(found.animalID),
            applicationDate: found.applicationDate ?? "",
            status: found.status ?? "",
            adoptedDate: found.adoptedDate ?? "",
        });
    }, [id]);

    const onChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const onSubmit = (e) => {
        e.preventDefault();
        navigate("/applications");
    };


    return (
        <div>
            <h2>Edit Application</h2>

            <p>
                <Link to="/applications">← Back</Link>
            </p>

            <form onSubmit={onSubmit}>
                <div>
                    <label>
                        Adopter Name and ID:
                        <select
                            name="adopterID"
                            value={form.adopterID}
                            onChange={onChange}
                            required
                        >
                            <option value="">Select Adopter</option>

                            {allAdopters.map((adopter) => (
                                <option
                                    key={`adopter-${adopter.adopterID}`}
                                    value={String(adopter.adopterID)}
                                >
                                    {adopter.name}: {adopter.adopterID}
                                </option>
                            ))}
                        </select>
                    </label>
                </div>

                <div>
                    <label>
                        Animal Name and ID:
                        <select
                            name="animalID"
                            value={form.animalID}
                            onChange={onChange}
                            required
                        >
                            <option value="">Select Animal</option>

                            {allAnimals.map((animal) => (
                                <option
                                    key={`animal-${animal.animalID}`}
                                    value={String(animal.animalID)}
                                >
                                    {animal.name}: {animal.animalID}
                                </option>
                            ))}
                        </select>
                    </label>
                </div>

                <div>
                    <label>
                        Application Date{" "}
                        <input
                            name="applicationDate"
                            value={form.applicationDate}
                            onChange={onChange}
                            type="datetime-local"
                            required
                        />
                    </label>
                </div>

                <div>
                    <label>
                        Status{" "}
                        <select name="status" value={form.status} onChange={onChange} required>
                            <option value="">-- choose --</option>
                            <option value="pending">pending</option>
                            <option value="approved">approved</option>
                            <option value="denied">denied</option>
                            <option value="withdrawn">withdrawn</option>
                        </select>
                    </label>
                </div>

                <div>
                    <label>
                        Adopted Date{" "}
                        <input
                            name="adoptedDate"
                            value={form.adoptedDate}
                            onChange={onChange}
                            type="datetime-local"
                        />
                    </label>
                </div>

                <button type="submit">Save</button>{" "}
                <button type="button" onClick={() => navigate("/applications")}>
                    Cancel
                </button>
            </form>
        </div>
    );
};

export default EditApplication;