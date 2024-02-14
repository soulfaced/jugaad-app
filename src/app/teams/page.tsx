// pages/teams.tsx
"use client";
// pages/teams.tsx
// pages/teams.tsx
import React, { useState, useEffect } from "react";
import axios from "axios";

interface Team {
  _id: string;
  teamName: string;
  profitLoss: string;
  location: string;
  imageLink: string;
  createdAt: string;
  description: string;
}

const TeamsPage: React.FC = () => {
  const [data, setData] = useState<Team[]>([]);
  const [expandedTeam, setExpandedTeam] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get("/api/getAll")
      .then((response) => {
        // Sort the data by createdAt in ascending order
        const sortedData = response.data.data.sort(
          (
            a: { createdAt: string | number | Date },
            b: { createdAt: string | number | Date }
          ) => {
            return (
              new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
            );
          }
        );
        // setData(sortedData);
        const verifiedData = sortedData.filter(
          (item: { isVerified: any }) => item.isVerified
        );
        setData(verifiedData);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const convertToIST = (utcTime: string) => {
    const utcDate = new Date(utcTime);
    const istDate = new Date(
      utcDate.toLocaleString("en-US", { timeZone: "Asia/Kolkata" })
    );
    return istDate.toLocaleString();
  };

  // Organize the data by team name
  const teamDataMap = new Map<string, Team[]>();
  data.forEach((team) => {
    const teamName = team.teamName;
    if (!teamDataMap.has(teamName)) {
      teamDataMap.set(teamName, []);
    }
    teamDataMap.get(teamName)?.push(team);
  });

  return (
    // <div className="container mx-auto p-4">
    //   <h1 className="text-2xl font-semibold mb-4">Teams</h1>
    //   {[...teamDataMap.keys()].map((teamName) => (
    //     <div key={teamName} className="mb-4">
    //       <button
    //         className="text-xl font-semibold mb-2 focus:outline-none"
    //         onClick={() => {
    //           // Handle click to show/hide the table for this team
    //         }}
    //       >
    //         {teamName} Data
    //       </button>
    //       <table className="min-w-full divide-y divide-gray-200">
    //         <thead>
    //           <tr>
    //             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time (IST)</th>
    //             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Profit Loss</th>
    //             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">location</th>
    //             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">dicription</th>
    //             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Images</th>
    //           </tr>
    //         </thead>
    //         <tbody>
    //           {teamDataMap.get(teamName)?.map((team) => (
    //             <tr key={team._id}>
    //               <td className="px-6 py-4 whitespace-nowrap">{convertToIST(team.createdAt)}</td>
    //               <td className="px-6 py-4 whitespace-nowrap">{team.profitLoss}</td>
    //               <td className="px-6 py-4 whitespace-nowrap">{team.location}</td>
    //               <td className="px-6 py-4 whitespace-nowrap">{team.description}</td>
    //               <td className="px-6 py-4 whitespace-nowrap">
    //                 {team.imageLink && (
    //                   <img src={team.imageLink} alt={team.teamName} className="w-16 h-16" />
    //                 )}
    //               </td>
    //             </tr>
    //           ))}
    //         </tbody>
    //       </table>
    //     </div>
    //   ))}
    // </div>
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">Teams</h1>
      {[...teamDataMap.keys()].map((teamName) => (
        <div key={teamName} className="mb-4">
          <button
            className="text-xl font-semibold mb-2 focus:outline-none"
            onClick={() => {
              // Toggle the expanded state for the clicked team name
              setExpandedTeam((prevState) =>
                prevState === teamName ? null : teamName
              );
            }}
          >
            {teamName} Data
          </button>
          {expandedTeam === teamName && (
            <table className="min-w-full divide-y divide-gray-200">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Time (IST)
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Profit Loss
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      location
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      dicription
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Images
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {teamDataMap.get(teamName)?.map((team) => (
                    <tr key={team._id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {convertToIST(team.createdAt)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {team.profitLoss}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {team.location}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {team.description}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {team.imageLink && (
                          <img
                            src={team.imageLink}
                            alt={team.teamName}
                            className="w-16 h-16"
                          />
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </table>
          )}
        </div>
      ))}
    </div>
  );
};

export default TeamsPage;
