const backendURL = "http://classwork.engr.oregonstate.edu:63037";

const Home = () => {

    const handleReset = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to reset the database?"
    );

    if (!confirmed) return;
    try {
      const response = await fetch(`${backendURL}/reset`, {
        method: "POST",
      });
    } catch (err) {
      console.error(err);
    }
  };


  return (
    <div>
      <p><strong>Animals:</strong> will take you to all animals in the system.</p>
      
      <p><strong>Fosters:</strong> will take you to all the people that have agreed to foster animals.</p>
      
      <p><strong>Adopters:</strong> will take you to all the people that have or want to adopt an animal.</p>
      
      <p><strong>Medical Records:</strong> will take you to all medical record concerning the animals.</p>
      
      <p><strong>Applications:</strong> Will take you to all the applications that have been put in for animals.</p>
      
      <p><strong>Animal Foster Details:</strong> Will take you to animals records of animals that are with a foster family or have been.</p>

        <button
        onClick={handleReset}> Reset Database
      </button>

    </div>
  )
}

export default Home