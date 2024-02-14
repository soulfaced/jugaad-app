// pages/index.tsx
"use client";
import React, { useEffect, useState } from "react";
import "@/app/globals.css";

const IndexPage: React.FC = () => {
  
    return (
        <div className="flex background h-screen flex-col items-center">
          <h1 className="text-white font-bold text-3xl mt-2">
          Successfully submitted
          </h1>
          <button  className="shadow bg-orange-400 hover:bg-orange-600 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded ">
            <a href="/">Submit another form</a>
          </button>
          {/* <Leaderboard data={...data} /> */}
        </div>
      );
};

export default IndexPage;
