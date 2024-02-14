// pages/index.tsx
"use client";
import React, { useEffect, useState } from "react";
import "@/app/globals.css";

const IndexPage: React.FC = () => {
  const [leaderboardData, setLeaderboardData] = useState<any[]>([]);

  useEffect(() => {
    // Fetch data from your API endpoint
    fetch("/api/leaderboard") // Replace with your API endpoint
      .then((response) => response.json())
      .then((data) => {
        setLeaderboardData(data.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  leaderboardData.sort((a, b) => b.maxTotalMoney - a.maxTotalMoney);

  return (
    // <div>
    //   <h1>Leaderboard</h1>
    //   <table>
    //     <thead>
    //       <tr>
    //         <th>Rank</th>
    //         <th>Team Name</th>
    //         <th>Total Money</th>
    //       </tr>
    //     </thead>
    //     <tbody>
    //       {leaderboardData.map((team, index) => (
    //         <tr key={team.teamName}>
    //           <td>{index + 1}</td>
    //           <td>{team.teamName}</td>
    //           <td>{team.maxTotalMoney}</td>
    //         </tr>
    //       ))}
    //     </tbody>
    //   </table>
    // </div>
    <div className="flex flex-col items-center h-screen background text-white shadow-md rounded">
      <h1 className="text-white font-bold text-3xl mt-2">Leaderboard</h1>
      <table className="min-w-max w-full table-auto">
        <thead>
          <tr className=" text-white uppercase text-sm leading-normal">
            <th className="py-3 px-6 text-left">Rank</th>
            <th className="py-3 px-6 text-left">Team name</th>
            <th className="py-3 px-6 text-center">Total profits</th>
          </tr>
        </thead>
        <tbody className="text-white text-sm font-light">
          {leaderboardData.slice(0, 10).map((team, index) => (
            <tr
              key={team.teamName}
              className="border-b border-gray-200 hover:bg-gray-100"
            >
              <td className="py-3 px-6 text-left whitespace-nowrap">
                {index + 1}
              </td>
              <td className="py-3 px-6 text-left">
                <div className="flex items-center">
                  <div className="mr-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="feather feather-user"
                    >
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                  </div>
                  <span>{team.teamName}</span>
                </div>
              </td>
              <td className="py-3 px-6 text-center">
                <div className="flex items-center justify-center">
                  {team.maxTotalMoney}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default IndexPage;
