import './App.css';
import { Routes, Route, Link } from "react-router-dom";

import Home from './pages/Home.jsx';
import Animals from './pages/Animals.jsx';
import Fosters from './pages/Fosters.jsx';
import Adopters from './pages/Adopters.jsx';
import MedicalRecords from "./pages/MedicalRecords.jsx";
import Applications from "./pages/Applications.jsx";
import AnimalFosterDetails from "./pages/AnimalFosterDetails.jsx";

// These pages will be used to hold the input feilds to add data to the database
import AddAdopter from "./pages/addPages/AddAdopter.jsx";
import AddAnimal from "./pages/addPages/AddAnimal";
import AddFoster from "./pages/addPages/AddFoster";
import AddApplication from "./pages/addPages/AddApplication";
import AddMedicalRecord from "./pages/addPages/AddMedicalRecord";
import AddAnimalFosterDetail from "./pages/addPages/AddAnimalFosterDetail.jsx";

// These pages will be used for edit forms
import EditAnimal from "./pages/EditPages/EditAnimal.jsx";
import EditFoster from "./pages/EditPages/EditFoster.jsx"
import EditAdopter from "./pages/EditPages/EditAdopter.jsx";
import EditMedicalRecord from "./pages/EditPages/EditMedicalRecords.jsx"
import EditApplication from "./pages/EditPages/EditApplication.jsx";
import EditAnimalFosterDetail from "./pages/EditPages/EditAnimalFosterDetail.jsx";

// Define the backend port and URL for API requests
// const backendPort = 63037;  // Use the port you assigned to the backend server, this would normally go in .env file
// const backendURL = `http://classwork.engr.oregonstate.edu:${backendPort}/`;

function App() {
  return (
    <div>
      <header>
        <h1>Animal Rescue:</h1>
        <p>Keep track of your animals to help them find a new home</p>
      </header>

      <nav>
        <Link to="/">Home</Link>
        <Link to="/animals">Animals</Link>
        <Link to="/fosters">Fosters</Link>
        <Link to="/adopters">Adopters</Link>
        <Link to="/medical-records">Medical Records</Link>
        <Link to="/applications">Applications</Link>
        <Link to="/animals-fosters">Animal Foster Details</Link>
      </nav>

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/animals" element={<Animals />} />
          <Route path="/fosters" element={<Fosters />} />
          <Route path="/adopters" element={<Adopters />} />
          <Route path="/medical-records" element={<MedicalRecords />} />
          <Route path="/applications" element={<Applications />} />
          <Route path="/animals-fosters" element={<AnimalFosterDetails />} />

          {/*Add forms */}
          <Route path="/animals/add" element={<AddAnimal />} />
          <Route path="/fosters/add" element={<AddFoster />} />
          <Route path="/adopters/add" element={<AddAdopter />} />
          <Route path="/medical-records/add" element={<AddMedicalRecord />} />
          <Route path="/applications/add" element={<AddApplication />} />
          <Route path="/animals-fosters/add" element={<AddAnimalFosterDetail />} />

          {/*Edit forms */}
          <Route path="/animals/edit/:id" element={<EditAnimal />} />
          <Route path="/fosters/edit/:id" element={<EditFoster />}/>
          <Route path="/adopters/edit/:id" element={<EditAdopter />} />
          <Route path="/medical-records/edit/:id" element={<EditMedicalRecord />} />
          <Route path="/applications/edit/:id" element={<EditApplication />} />
          <Route path="/animals-fosters/edit/:animalID/:fosterID" element={<EditAnimalFosterDetail />} />
        </Routes>
      </main>

    </div>

  );

} export default App;