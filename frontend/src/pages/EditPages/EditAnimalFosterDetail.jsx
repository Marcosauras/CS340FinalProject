import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const EditAnimalFosterDetail = () => {
    const navigate = useNavigate();
    const { animalID, fosterID } = useParams();

    // Example of the SELECT results
    const animalFosterDetails = [
        {
            animalID: 1,
            fosterID: 1,
            startDate: "2026-01-10 10:30:00",
            endDate: "2026-01-20 10:30:00"
        },
        {
            animalID: 1,
            fosterID: 2,
            startDate: "2026-02-04 10:30:00",
            endDate: null
        },
        {
            animalID: 2,
            fosterID: 2,
            startDate: "2026-01-01 10:30:00",
            endDate: null
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

    // SELECT of * Foster IDS and names
    const allFosters = [
        {
            fosterID: 1,
            name: "Joey",
        },
        {
            fosterID: 2,
            name: "Lannie",
        },
        {
            fosterID: 3,
            name: "Donna",
        }
    ];

    const [original, setOriginal] = useState({ animalID: "", fosterID: "" });

    const [form, setForm] = useState({
        animalID: "",
        fosterID: "",
        startDate: "",
        endDate: "",
    });

    useEffect(() => {
        const aniID = Number(animalID);
        const fosID = Number(fosterID);

        const found = animalFosterDetails.find(
            (row) => row.animalID === aniID && row.fosterID === fosID
        );

        setOriginal({ animalID: String(found.animalID), fosterID: String(found.fosterID) });
        // Auto fills the Form with the info from the table row the Edit was clicked on
        setForm({
            animalID: String(found.animalID),
            fosterID: String(found.fosterID),
            startDate: found.startDate ?? "",
            endDate: found.endDate ?? "",
        });
    }, [animalID, fosterID]);

    const onChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const onSubmit = (e) => {
        e.preventDefault();
        navigate("/animals-fosters");
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
