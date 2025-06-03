require("dotenv").config();
const axios = require("axios");
const User = require("../models/user.model");
const { preprocessUserData } = require("../utils/recommendation.util");

exports.getRecommendations = async (targetStudent) => {
  try {
    // get all other users
    const students = await User.find({ _id: { $ne: targetStudent._id } });

    // preprocess data according to py server
    const target = preprocessUserData([targetStudent]);
    const processedStudents = preprocessUserData(students);

    const data = {
      target_student: target[0],
      students: processedStudents,
    };
    // call the python endpoint
    const response = await axios.post(
      `${process.env.PYTHON_API}/recommend`,
      data
    );

    console.dir(response.data);
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};
