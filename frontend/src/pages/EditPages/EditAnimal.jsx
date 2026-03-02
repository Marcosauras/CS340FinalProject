import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const EditAnimal = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    // Example of what is expecting from the SELECT query
    const animals = [
        {
            animalID: 1,
            name: "Roman",
            species: "dog",
            breed: "greyhound",
            sex: "male",
            age: 2
        },
        {
            animalID: 2,
            name: "Calliope",
            species: "cat",
            breed: null,
            sex: "female",
            age: null
        },
        {
            animalID: 3,
            name: "Arthur Pendragon",
            species: null,
            breed: null,
            sex: "male",
            age: 3
        },
        {
            animalID: 4,
            name: "Bella",
            species: null,
            breed: null,
            sex: null,
            age: null
        },
    ];

    const [form, setForm] = useState({
        name: "",
        species: "",
        breed: "",
        sex: "",
        age: "",
    });

    useEffect(() => {
        const animalID = Number(id);
        const found = animals.find((a) => a.animalID === animalID);

        // Auto fills the form and sets to empty if nothing is found (if it's NULL)
        setForm({
            name: found.name ?? "",
            species: found.species ?? "",
            breed: found.breed ?? "",
            sex: found.sex ?? "",
            age: found.age ?? "",
        });
    }, [id]);

    const onChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const onSubmit = (e) => {
        e.preventDefault();
        navigate("/animals");
    };


    return (
        <div>
            <h2>Edit Animal</h2>

            <p>
                <Link to="/animals">← Back</Link>
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
                        Species{" "}
                        <input
                            name="species"
                            value={form.species}
                            onChange={onChange}
                        />
                    </label>
                </div>

                <div>
                    <label>
                        Breed{" "}
                        <input
                            name="breed"
                            value={form.breed}
                            onChange={onChange}
                        />
                    </label>
                </div>

                <div>
                    <label>
                        Sex{" "}
                        <input
                            name="sex"
                            value={form.sex}
                            onChange={onChange}
                        />
                    </label>
                </div>

                <div>
                    <label>
                        Age{" "}
                        <input
                            name="age"
                            type="number"
                            min="0"
                            value={form.age}
                            onChange={onChange}
                        />
                    </label>
                </div>

                <button type="submit">Save</button>{" "}
                <button type="button" onClick={() => navigate("/animals")}>
                    Cancel
                </button>
            </form>
        </div>
    );
};

export default EditAnimal;