"use client";
import React, { useState } from "react";

interface NutritionData {
  sizeCategory: string;
  cupsPerDay: string;
  caloriesPerDay: string;
}

const NutritionCalculator: React.FC = () => {
  const [weight, setWeight] = useState<number | "">("");
  const [age, setAge] = useState<number | "">("");
  const [nutritionData, setNutritionData] = useState<NutritionData | null>(
    null
  );

  const calculateNutrition = () => {
    if (typeof weight === "number") {
      let sizeCategory = "";
      let cupsPerDay = "";
      let caloriesPerDay = "";

      if (weight <= 3) {
        sizeCategory = "Toy";
        cupsPerDay = "1/3 cup";
        caloriesPerDay = "139 calories";
      } else if (weight <= 6) {
        sizeCategory = "Toy";
        cupsPerDay = "1/2 cup";
        caloriesPerDay = "233 calories";
      } else if (weight <= 10) {
        sizeCategory = "Small";
        cupsPerDay = "3/4 cup";
        caloriesPerDay = "342 calories";
      } else if (weight <= 15) {
        sizeCategory = "Small";
        cupsPerDay = "1 cup";
        caloriesPerDay = "464 calories";
      } else if (weight <= 30) {
        sizeCategory = "Medium";
        cupsPerDay = "1 3/4 cups";
        caloriesPerDay = "781 calories";
      } else if (weight <= 40) {
        sizeCategory = "Medium";
        cupsPerDay = "2 1/4 cups";
        caloriesPerDay = "969 calories";
      } else if (weight <= 60) {
        sizeCategory = "Large";
        cupsPerDay = "3 cups";
        caloriesPerDay = "1313 calories";
      } else if (weight <= 80) {
        sizeCategory = "Large";
        cupsPerDay = "3 3/4 cups";
        caloriesPerDay = "1629 calories";
      } else {
        sizeCategory = "Large";
        cupsPerDay = "4 1/4 cups";
        caloriesPerDay = "1926 calories";
      }

      const data = {
        sizeCategory,
        cupsPerDay,
        caloriesPerDay,
      };
      setNutritionData(data);
    } else {
      alert("Please enter valid weight.");
    }
  };

  const printPDF = () => {
    const printContents = document.getElementById("nutrition-chart")?.innerHTML;
    if (printContents) {
      const originalContents = document.body.innerHTML;

      // Create a new window with just the content you want to print
      document.body.innerHTML = printContents;

      window.print();

      // Restore original contents after printing
      document.body.innerHTML = originalContents;
    } else {
      alert("Could not find the nutrition chart to print.");
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Nutrition Calculator</h2>
      <div className="mb-4">
        <label className="block mb-2 text-lg font-semibold">Weight (kg):</label>
        <input
          type="number"
          value={weight}
          onChange={(e) =>
            setWeight(e.target.value === "" ? "" : parseFloat(e.target.value))
          }
          className="border border-gray-300 rounded p-2 w-full"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2 text-lg font-semibold">Age (years):</label>
        <input
          type="number"
          value={age}
          onChange={(e) =>
            setAge(e.target.value === "" ? "" : parseFloat(e.target.value))
          }
          className="border border-gray-300 rounded p-2 w-full"
        />
      </div>
      <button
        onClick={calculateNutrition}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold px-4 py-2 rounded"
      >
        Calculate Nutrition
      </button>

      {nutritionData && (
        <div className="mt-8">
          <div
            id="nutrition-chart"
            className="p-6 border border-gray-300 rounded-lg shadow-md bg-white"
          >
            <h3 className="text-xl font-bold mb-4 text-center">
              Recommended Feeding Chart
            </h3>
            <div className="grid grid-cols-2 gap-4 text-lg">
              <div>
                <strong>Size Category:</strong>
              </div>
              <div>{nutritionData.sizeCategory}</div>
              <div>
                <strong>Weight:</strong>
              </div>
              <div>{weight} kg</div>
              <div>
                <strong>Cups per Day:</strong>
              </div>
              <div>{nutritionData.cupsPerDay}</div>
              <div>
                <strong>Calories per Day:</strong>
              </div>
              <div>{nutritionData.caloriesPerDay}</div>
            </div>
          </div>
          <button
            onClick={printPDF}
            className="bg-green-500 hover:bg-green-700 text-white font-bold px-4 py-2 rounded mt-4"
          >
            Download as PDF
          </button>
        </div>
      )}
    </div>
  );
};

export default NutritionCalculator;
