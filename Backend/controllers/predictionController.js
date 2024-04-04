const { spawn } = require("child_process");

const getPrediction = async (req, res) => {
  try {
    const { team1_id, team2_id } = req.body;

    // Replace 'path_to_your_script' with the actual path to the Python script
    const pythonProcess = spawn("python", [
      "/Users/Muneeb1/Desktop/NBA_Stats/ml_model/predict.py",
      team1_id,
      team2_id,
    ]);

    pythonProcess.stdout.on("data", (data) => {
      // Capture and send back the prediction result
      res.status(200).json({ prediction: data.toString().trim() });
    });

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
