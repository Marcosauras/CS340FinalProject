import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const EditApplication = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const backendURL = "http://classwork.engr.oregonstate.edu:63033";

    const [allAnimals, setAllAnimals] = useState([])
    const [allAdopters, setAllAdopters] = useState([])

    const [form, setForm] = useState({
        adopterID: "",
        animalID: "",
        applicationDate: "",
        status: "",
        adoptedDate: "",
    });

    // Gets the animal data from the database to fill the dropdown
    useEffect(() => {
        fetch(backendURL + "/animals")
            .then(res => res.json())
            .then(data => {
                // if no animals are found return an error
                if (!data) {
                    console.error("No Animals found");
                    return;
                }

                // set animals to hook to use in form
                setAllAnimals(data)
            })
            .catch(err => console.error("Error loading animal:", err));
    }, []);

    // Gets the adopters data from the database to fill the dropdown
    useEffect(() => {
        fetch(backendURL + "/adopters")
            .then(res => res.json())
            .then(data => {
                // if no adopter is found return an error
                if (!data) {
                    console.error("No Adopters found");
                    return;
                }

                // set adopters to hook to use in form
                setAllAdopters(data)
            })
            .catch(err => console.error("Error loading animal:", err));
    }, []);

    useEffect(() => {
        fetch(backendURL + "/applications")
            .then(res => res.json())
            .then(data => {
                const applicationID = Number(id);
                const found = data.find((a) => a.applicationID === applicationID);

                if (!found) {
                    console.error("application not found");
                    return;
                }

                // citation for formating date
                // Date: 03/09/2026
                // Adapted from:
                // Source URL: https://www.w3schools.com/jsref/jsref_toisostring.asp
                // Source URL: https://stackoverflow.com/questions/10830357/javascript-toisostring-ignores-timezone-offset
                const formattedAppDate = found.applicationDate ? new Date(found.applicationDate).toISOString().slice(0, 16) : "";
                const formattedAdoptDate = found.adoptedDate ? new Date(found.adoptedDate).toISOString().slice(0, 16) : "";

                // Sets the form inputs with info found on the medical record
                setForm({
                    applicationID: String(found.applicationID),
                    adopterID: String(found.adopterID),
                    animalID: String(found.animalID),
                    applicationDate: formattedAppDate,
                    status: found.status,
                    adoptedDate: formattedAdoptDate ?? "",
                });
            })
            .catch(err => console.error("Error loading Medical Record", err))


    }, [id]);

    const onChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(backendURL + "/applications/update", {
                method: "POST",
                headers: { "Content-Type": "application/json" },

                body: JSON.stringify({
                    applicationID: Number(id),
                    adopterID: Number(form.adopterID),
                    animalID: Number(form.animalID),
                    applicationDate: form.applicationDate,
                    status: form.status,
                    adoptedDate: form.adoptedDate || null,
                }),
            });

            navigate("/applications");
        } catch (err) {
            console.error("Medical Record Update failed", err);
        }

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