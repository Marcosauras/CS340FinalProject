import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const EditAnimalFosterDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const backendURL = "http://classwork.engr.oregonstate.edu:63033";

    const [allAnimals, setAllAnimals] = useState([])
    const [allFosters, setAllAdopters] = useState([])

    const [form, setForm] = useState({
        animalID: "",
        fosterID: "",
        startDate: "",
        endDate: "",
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

    // Gets the animal data from the database to fill the dropdown
    useEffect(() => {
        fetch(backendURL + "/fosters")
            .then(res => res.json())
            .then(data => {
                // if no animals are found return an error
                if (!data) {
                    console.error("No animals found");
                    return;
                }

                // set animals to hook to use in form
                setAllAdopters(data)
            })
            .catch(err => console.error("Error loading animal:", err));
    }, []);

    useEffect(() => {
        fetch(backendURL + "/animalFosterDetails")
            .then(res => res.json())
            .then(data => {
                const animalFosterDetailID = Number(id);
                const found = data.find((a) => a.animalFosterDetailID === animalFosterDetailID);

                if (!found) {
                    console.error("Animal Foster Details not found")
                }

                // citation for formating date
                // Date: 03/09/2026
                // Adapted from:
                // Source URL: https://www.w3schools.com/jsref/jsref_toisostring.asp
                // Source URL: https://stackoverflow.com/questions/10830357/javascript-toisostring-ignores-timezone-offset
                const formattedStartDate = found.startDate ? new Date(found.startDate).toISOString().slice(0, 16) : "";
                const formattedEndDate = found.endDate ? new Date(found.endDate).toISOString().slice(0, 16) : "";

                // Sets the form inputs with info found on the medical record
                setForm({
                    animalID: String(found.animalID),
                    fosterID: String(found.fosterID),
                    startDate: formattedStartDate,
                    endDate: formattedEndDate ?? "",
                });
            })
        // Auto fills the Form with the info from the table row the Edit was clicked on

    }, []);

    const onChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(backendURL + "/animalFosterDetails/update", {
                method: "POST",
                headers: { "Content-Type": "application/json" },

                body: JSON.stringify({
                    animalFosterDetailID: Number(id),
                    animalID: Number(form.animalID),
                    fosterID: Number(form.fosterID),
                    startDate: form.startDate,
                    endDate: form.startDate,
                }),
            });
            // if the response from doesn't go well return an error
            if (!response.ok) {
                console.error("Server error:");
                return;
            }
            // Load the animal foster page to show the updated database
            navigate("/animals-fosters");
        } catch (err) {
            console.error("Animal Foster Details Update failed", err);
        }

        
    };
    return (
        <div>
            <h2>Edit Animal's Foster Details</h2>
            <p>
                <Link to="/animals-fosters"> Back</Link>
            </p>
            {/*Maps out all the animal options with their IDS and names so that the user can know what they are doing*/}
            <form onSubmit={onSubmit}>
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
                {/*Maps out all the fosters options with their IDS and names so that the user can know what they are doing*/}
                <div>
                    <label>
                        Foster Name and ID:
                        <select
                            name="fosterID"
                            value={form.fosterID}
                            onChange={onChange}
                            required
                        >
                            <option value="">Select Foster</option>

                            {allFosters.map((foster) => (
                                <option
                                    key={`foster-${foster.fosterID}`}
                                    value={String(foster.fosterID)}
                                >
                                    {foster.name}: {foster.fosterID}
                                </option>
                            ))}
                        </select>
                    </label>
                </div>

                <div>
                    <label>
                        Start Date{" "}
                        <input
                            name="startDate"
                            value={form.startDate}
                            onChange={onChange}
                            placeholder="YYYY-MM-DD HH:MM:SS"
                            type="datetime-local"
                            required
                        />
                    </label>
                </div>

                <div>
                    <label>
                        End Date{" "}
                        <input
                            name="endDate"
                            value={form.endDate}
                            onChange={onChange}
                            type="datetime-local"
                        />
                    </label>
                </div>

                <button type="submit">Save</button>{" "}
                <button type="button" onClick={() => navigate("/animals-fosters")}>
                    Cancel
                </button>
            </form>
        </div>
    );
};

export default EditAnimalFosterDetail;
