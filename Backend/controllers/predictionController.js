const { spawn } = require("child_process");

// get prediction
const getPrediction = async (req, res) => {
  try {
    const { team1_id, team2_id } = req.body;
    console.log(team1_id);
    //  Spawns a Python process to run the predict.py script, passing in team IDs as arguments
    const pythonProcess = spawn("python", [
      "/Users/Muneeb1/Desktop/NBA_Stats/ml_model/predict.py",
      team1_id,
      team2_id,
    ]);

    // Event listener for the 'data' event on stdout (standard output)
    // This captures the output data (prediction result) from the Python script
    pythonProcess.stdout.on("data", (data) => {
      // Capture and send back the prediction result
      res.status(200).json({ prediction: data.toString().trim() });
    });

    // Event listener for the 'data' event on stderr (standard error)
    // This captures any error messages produced by the Python script
    pythonProcess.stderr.on("data", (data) => {
      console.error(`stderr: ${data}`);
    });

    pythonProcess.on("close", (code) => {
      console.log(`Child process exited with code ${code}`);
    });
  } catch (error) {
    res.status(500).send("Failed to fetch prediction: " + error.message);
  }
};

module.exports = {
  getPrediction,
};
