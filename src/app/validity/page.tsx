"use client";

// pages/invalid-users.tsx

import React, { useEffect, useState } from "react";
import axios from "axios";


// const markAsVerified = (userId: any) => {
//   console.log(userId);
//   // Send a POST request to update the user's isVerified property
//   axios
//     .post(`/api/update/${userId}`, null, {
//       headers: {
//         "Content-Type": "application/json",
//       },
//     })
//     .then(() => {
//       // Remove the user from the invalidUsers state
//       refreshInvalidUsers();
//     })
//     .catch((error) => {
//       console.error("Error marking as verified:", error);
//     });
// };



const InvalidUsersPage: React.FC = () => {
  const [invalidUsers, setInvalidUsers] = useState<any[]>([]);
  const [verificationInProgress, setVerificationInProgress] = useState(false);

  const refreshInvalidUsers = () => {
    axios
      .get("/api/verify") // Adjust the URL as needed
      .then((response) => {
        setInvalidUsers(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching invalid users:", error);
      });
  };
  

  const markAsVerified = (userId: any) => {
    if (verificationInProgress) {
      return; // Do nothing if verification is already in progress
    }
    setVerificationInProgress(true);
    console.log("Verifying user with ID:", userId);
  
    axios
      .post(`/api/update/${userId}`, null, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then(() => {
        console.log("User verified successfully.");
        // Remove the user from the invalidUsers state
        setInvalidUsers((prevInvalidUsers: any[]) =>
          prevInvalidUsers.filter((user) => user._id !== userId)
        );
        refreshInvalidUsers();
      })
      .catch((error) => {
        console.error("Error marking as verified:", error);
      }) .finally(() => {
        setVerificationInProgress(false); // Reset verification status
      });;
  };

  useEffect(() => {
    // Make an HTTP GET request to fetch invalid users
    axios
      .get("/api/verify") // Adjust the URL as needed
      .then((response) => {
        setInvalidUsers(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching invalid users:", error);
      });
  }, []);


  return (
    <div className="p-4 justify-center items-center text-center">
      <h1 className="text-2xl font-semibold mb-4">Invalid Users</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="">
            <tr>
              <th className="px-4 py-2">Team Name</th>
              <th className="px-4 py-2">Profit Loss</th>
              <th className="px-4 py-2">Description</th>
              <th className="px-4 py-2">Time</th>
              <th className="px-4 py-2">Image</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {invalidUsers.map((user) => (
              <tr key={user._id}>
                <td className="px-4 py-2">{user.teamName}</td>
                <td className="px-4 py-2">{user.profitLoss}</td>
                <td className="px-4 py-2">{user.description}</td>
                <td className="px-4 py-2">{user.createdAt}</td>
                <td className="px-4 py-2">
                  {user.imageLink && (
                    <img
                      src={user.imageLink}
                      alt={user.teamName}
                      width={200}
                      height={200}
                    />
                  )}
                </td>
                <td className="px-4 py-2">
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => markAsVerified(user._id)}
                    disabled={verificationInProgress}
                  >
                    Verify
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InvalidUsersPage;
function setInvalidUsers(data: any) {
  throw new Error("Function not implemented.");
}
