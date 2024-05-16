"use client";
// "use client";

// import { useState } from "react";
import {
  MultiFileDropzone,
  type FileState,
} from "@/components/multi-file-dropzone";
import { SingleImageDropzone } from "@/components/single-image-dropzone";
import { useEdgeStore } from "@/lib/edgestore";
import Link from "next/link";
import { useState, useEffect } from "react";
import jugaad from "./jugaadnew.png";
import Image from "next/image";
import "./globals.css";
import { Route } from "next"; 
import { useRouter } from "next/navigation";
// import Leaderboard from "@/components/leaderboard";

// import { promises as fs } from 'fs';

// const file = await fs.readFile(process.cwd() + '/src/app/teams.json', 'utf8');
// const data = JSON.parse(file);
// const fs = require('fs');

// // Load the JSON data from the file
// const teamsData = JSON.parse(fs.readFileSync('teams.json'));

// function verifyTeamNameAndPassword(teamName: string | number, password: any) {
//   if (teamsData[teamName] && teamsData[teamName].password === password) {
//     return true; // Team name and password match
//   }
//   return false; // Team name or password is incorrect
// }

export default function Page() {
  const [fileStates, setFileStates] = useState<FileState[]>([]);
  // const [urls, setUrls] = useState<string[]>([]);
  // const [isSubmitted, setIsSubmitted] = useState(false);
  const [isCancelled, setIsCancelled] = useState(false);
  const { edgestore } = useEdgeStore();
  const [file, setFile] = useState<File>();
  const [progress, setProgress] = useState(0);
  const router = useRouter();
  const [urls, setUrls] = useState<{
    url: string;
    thumbnailUrl: string | null;
  }>();
  // const handleRefresh = () => {
  //   router.push();
  // };
  // const { edgestore } = useEdgeStore();
  const [formData, setFormData] = useState({
    teamName: "",
    password: "",
    profitLoss: "",
    description: "",
    location: "",
    imageLink: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [validationErrors, setValidationErrors] = useState({
    teamName: "",
    password: "",
    profitLoss: "",
    description: "",
    location: "",
    imageLink: "",
  });

  const [teams, setTeams] = useState([]);

  // useEffect(() => {
  //   // Fetch the teams data from the API route
  //   fetch('/api/read-teams')
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setTeams(data.teams)
  //       console.log(teams)
  //     })
  //     .catch((error) => console.error('Error fetching teams:', error));
  // }, []);
  // console.log(teams)

  const handleChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    setIsLoading(true);

    // Reset previous validation errors
    setValidationErrors({
      teamName: "",
      password: "",
      profitLoss: "",
      description: "",
      location: "",
      imageLink: "",
    });

    // if (!verifyTeamNameAndPassword(formData.teamName, formData.password)) {
    //   // setValidationErrors({
    //   //   // teamName: "Team name and password do not match.",
    //   //   // password: "Team name and password do not match.",
    //   // });
    //   setIsLoading(false);
    //   return; // Prevent form submission
    // }

    try {
      const response1 = await fetch(
        "https://jugaadecell.onrender.com/api/teams"
      );

      if (!response1.ok) {
        throw new Error(`Error fetching teams: ${response1.statusText}`);
      }
      const data = await response1.json();
      console.log("yo11");
      console.log(data.data[formData.teamName]);
      console.log("yo2");
      console.log(data.data[formData.teamName].password);
      console.log("yo3");
      console.log(formData.password);
      console.log("yo4");
      // console.log(`${formData.teamName} ${data[formData.teamName].password} ${formData.password}`)
      // console.log("yo5")
      // Check if the team name and password match
      if (data.data[formData.teamName]) {
        console.log("yo42");
        if (data.data[formData.teamName].password == formData.password) {
          console.log("yo45");
          const response = await fetch("/api/register", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          });
          if (response.status === 201) {
            const data = await response.json();
            console.log("User registered:", data.user);
            setIsSubmitted(true);
          } else if (response.status === 400) {
            const data = await response.json();
            if (data.errors) {
              // Set validation error messages based on the server response
              setValidationErrors(data.errors);
            }
          } else {
            console.error("Registration failed:", response.statusText);
          }
        }
        // await edgestore.myPublicImages.upload({  // Use myPublicImages here
        //   file,
        // });
        else {
          setValidationErrors({
            teamName: "Team name and password do not match.",
            password: "Team name and password do not match.",
            profitLoss: "",
            description: "",
            location: "",
            imageLink: "",
          });
        }
      } else {
        setValidationErrors({
          teamName: "Team name and password do not match.",
          password: "",
          profitLoss: "",
          description: "",
          location: "",
          imageLink: "",
        });
      }
    } catch (error) {
      console.error("Error during registration:", error);
    } finally {
      setIsLoading(false);
    }
  };

  function updateFileProgress(key: string, progress: FileState["progress"]) {
    setFileStates((fileStates) => {
      const newFileStates = structuredClone(fileStates);
      const fileState = newFileStates.find(
        (fileState) => fileState.key === key
      );
      if (fileState) {
        fileState.progress = progress;
      }
      return newFileStates;
    });
  }

  if (isSubmitted) {
    return (
      <div className="h-screen flex background top-1/2 justify-center flex-col  items-center">
        <h1 className="text-white font-bold text-3xl mt-2">
        Successfully submitted
        </h1>
        <h1 className="text-white font-bold text-lg mt-2">
          Regresh the page to submit another form
        </h1>
        {/* <Leaderboard data={...data} /> */}
      </div>
    );
  }
  if (isCancelled) {
    return <div className="flex flex-col items-center m-6">CANCELLED!!!</div>;
  }

  return (
    <div className="background bg-blend-luminosity bg-no-repeat bg-center bg-cover grid grid-cols-1 justify-center items-center">
      <div className=" grid grid-cols-1 items-center m-6">
        <Image
          src={jugaad}
          alt="jugaad"
          className="items-center justify-center"
        />
        Submissions are close for now
        <div className="justify-center text-center items-center">
          <SingleImageDropzone
            width={200}
            height={200}
            value={file}
            dropzoneOptions={{
              maxSize: 1024 * 1024 * 5, // 1MB
            }}
            onChange={(file) => {
              setFile(file);
            }}
            className="justify-center left-[22%] items-center my-2"
          />
          <div className="h-[6px] border rounded overflow-hidden my-2">
            <div
              className="h-full bg-white transition-all duration-150"
              style={{
                width: `${progress}%`,
              }}
            />
          </div>
          <button
            className="bg-white mb-2 text-black rounded px-2 hover:opacity-80"
            onClick={async () => {
              if (file) {
                const res = await edgestore.myPublicImages.upload({
                  file,
                  input: { type: "post" },
                  onProgressChange: (progress) => {
                    setProgress(progress);
                  },
                });
                // save your data here
                setUrls({
                  url: res.url,
                  thumbnailUrl: res.thumbnailUrl,
                });
                setFormData({
                  ...formData,
                  imageLink: res.url,
                });
              }
            }}
          >
            upload image
          </button>
        </div>
        {/* {urls?.url && (
          <Link href={urls.url} target="_blank">
            URL
          </Link>
        )}
        {urls?.thumbnailUrl && (
          <Link href={urls.thumbnailUrl} target="_blank">
            THUMBNAIL
          </Link>
        )} */}
        {/* Just a dummy form for demo purposes */}
        <div className="grid grid-cols-1 gap-2">
          <div>
            {isSubmitted ? (
              <>
                <div>success</div>
              </>
            ) : (
              <>
                <div className="m-[auto] max-w-xs">
                  <form
                    onSubmit={handleSubmit}
                    className=" shadow-md rounded px-8 pt-6 pb-8 mb-4"
                  >
                    {/* Team Name */}
                    <div className="mb-4 text-white">
                      <label className="block text-white text-sm font-bold mb-2">
                        Team Name:
                        <input
                          className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                            validationErrors.teamName ? "border-red-500" : ""
                          }`}
                          type="text"
                          name="teamName"
                          placeholder="Team Name"
                          value={formData.teamName}
                          onChange={handleChange}
                          required
                        />
                      </label>
                      {validationErrors.teamName && (
                        <p className="text-red-500 text-xs italic">
                          {validationErrors.teamName}
                        </p>
                      )}
                    </div>

                    {/* Password */}
                    <div className="mb-4">
                      <label className="block text-white text-sm font-bold mb-2">
                        Password:
                        <input
                          className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                            validationErrors.password ? "border-red-500" : ""
                          }`}
                          type="password"
                          name="password"
                          placeholder="Password"
                          value={formData.password}
                          onChange={handleChange}
                          required
                        />
                      </label>
                      {validationErrors.password && (
                        <p className="text-red-500 text-xs italic">
                          {validationErrors.password}
                        </p>
                      )}
                    </div>

                    {/* Profit/Loss */}
                    <div className="mb-4">
                      <label className="block text-white text-sm font-bold mb-2">
                        Profit/Loss:
                        <input
                          className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                            validationErrors.profitLoss ? "border-red-500" : ""
                          }`}
                          type="text"
                          name="profitLoss"
                          placeholder="Profit/Loss"
                          value={formData.profitLoss}
                          onChange={handleChange}
                          required
                        />
                      </label>
                      {validationErrors.profitLoss && (
                        <p className="text-red-500 text-xs italic">
                          {validationErrors.profitLoss}
                        </p>
                      )}
                    </div>

                    {/* Description */}
                    <div className="mb-4">
                      <label className="block text-white text-sm font-bold mb-2">
                        Description:
                        <input
                          className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                            validationErrors.description ? "border-red-500" : ""
                          }`}
                          type="text"
                          name="description"
                          placeholder="Description"
                          value={formData.description}
                          onChange={handleChange}
                          required
                        />
                      </label>
                      {validationErrors.description && (
                        <p className="text-red-500 text-xs italic">
                          {validationErrors.description}
                        </p>
                      )}
                    </div>

                    {/* Total Money */}
                    <div className="mb-4">
                      <label className="block text-white text-sm font-bold mb-2">
                        Location:
                        <input
                          className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                            validationErrors.location ? "border-red-500" : ""
                          }`}
                          type="text"
                          name="location"
                          placeholder="Location"
                          value={formData.location}
                          onChange={handleChange}
                          required
                        />
                      </label>
                      {validationErrors.location && (
                        <p className="text-red-500 text-xs italic">
                          {validationErrors.location}
                        </p>
                      )}
                    </div>

                    <button
                      className={`shadow bg-orange-400 hover:bg-orange-600 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded ${
                        isLoading ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                      type="submit"
                      disabled={isLoading || progress != 100}
                      // disabled={}
                      onClick={handleSubmit}
                    >
                      {isLoading ? (
                        <>
                          <svg
                            className="animate-spin inline-block h-4 w-4 mr-2"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm6 9a8 8 0 010-16V0h4a8 8 0 000 16h-4v-4zm10-3a8 8 0 00-8-8v-4a12 12 0 0112 12h-4z"
                            ></path>
                          </svg>
                          Loading...
                        </>
                      ) : progress != 100 ? (
                        "upload image first"
                      ) : (
                        "submit"
                      )}
                    </button>
                  </form>
                </div>
              </>
            )}
          </div>
          <div className="flex justify-end mt-2 gap-2"></div>
        </div>
      </div>
    </div>
  );
}

function TextField(props: {
  name?: string;
  onChange?: (value: string) => void;
}) {
  return (
    <input
      type="text"
      name={props.name}
      className="bg-zinc-900 border border-zinc-600 rounded px-2 py-1"
      onChange={(e) => props.onChange?.(e.target.value)}
    />
  );
}
