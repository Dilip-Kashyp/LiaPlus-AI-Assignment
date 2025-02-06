import asyncHandler from "../utils/asyncHandler.js";
import {
  RESPONSE_ERROR,
  RESPONSE_SUCCESS_FETCH_SCHOLARSHIPS,
  RESPONSE_SUCCESS_APPLY_SCHOLARSHIP,
  RESPONSE_NO_SCHOLARSHIPS_FOUND,
} from "../constants/constants.js";
import { models } from "../schema/index.js";



const getAllScholarships = asyncHandler(async (req, res) => {
  try {
    const scholarships = await models.Scholarship.findAll();

    if (!scholarships || scholarships.length === 0) {
      return res.status(404).json({
        success: false,
        message: RESPONSE_NO_SCHOLARSHIPS_FOUND,
      });
    }

    res.status(200).json({
      success: true,
      message: RESPONSE_SUCCESS_FETCH_SCHOLARSHIPS,
      data: scholarships,
    });
  } catch (error) {
    console.error("Error in getAllScholarships:", error);
    res.status(500).json({
      success: false,
      message: RESPONSE_ERROR,
      error: error.message,
    });
  }
});

function applyScholarship(req, res) {
  res.status(200).json({
    message: RESPONSE_SUCCESS_APPLY_SCHOLARSHIP,
  });
}

export { getAllScholarships, applyScholarship };
