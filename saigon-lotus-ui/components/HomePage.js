import { useState } from "react";
import UniqueNumberModal from "./UniqueNumberModal";
import { CheckInEmployee } from "@/lib/authenticate";
import ClockinClockOut from "./ClockinClockout";

export default function HomePage() {
  const [showModal, setShowModal] = useState(false);
  const [uniqueNumber, setUniqueNumber] = useState(""); // State to store the unique number
  const [selection, setSelection] = useState("");
  const [showSecondModal, setShowSecondModal] = useState(false);

  // Function to handle input change for unique number
  const handleUniqueNumberChange = (number) => {
    setUniqueNumber(uniqueNumber + number);
  };

  // Function to handle selection from employees
  const handleSelectionChange = (e) => {
    const employeeChoice = e.target.value;
    setSelection(employeeChoice);
  };

  // Function to handle removing each digit for unique number
  const removeTheLastDigit = () => {
    setUniqueNumber(uniqueNumber.slice(0, -1));
  };

  // Function to handle first modal submission
  const handleFirstSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission behavior
    setShowModal(false); // Close the first modal after submission
    setShowSecondModal(true); // Open the second modal
  };

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    setShowSecondModal(false);
    try {
      const result = await CheckInEmployee(uniqueNumber, selection);
      console.log("The message:", result);
      // Reset the unique number and selection
      setUniqueNumber("");
      setSelection("");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-4xl font-mono text-white font-bold">
          SAIGON LOTUS
        </h1>
        <br />
        <button
          type="button"
          className="py-2.5 px-5 me-2 mb-2 text-sm font-medium 
          text-gray-900 focus:outline-none bg-white rounded-full border 
          border-gray-200 hover:bg-gray-100 hover:text-violet-700 focus:z-10 
          focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 
          dark:hover:text-white dark:hover:bg-gray-700"
          onClick={() => setShowModal(true)}
        >
          Get started
        </button>
      </div>
      {showModal && (
        <UniqueNumberModal
          uniqueNumber={uniqueNumber}
          handleSubmit={handleFirstSubmit}
          isHandleNumberChangeClicked={handleUniqueNumberChange}
          isRemoveDigitClicked={removeTheLastDigit}
          isCancelClicked={() => setShowModal(false)}
        />
      )}
      {showSecondModal && (
        <ClockinClockOut
          handleSecondSubmit={handleSubmit}
          handleSelectionChange={handleSelectionChange}
          isCancelButtonClicked={() => setShowSecondModal(false)}
        />
      )}
    </>
  );
}
