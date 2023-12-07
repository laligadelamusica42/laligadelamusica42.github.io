import { Navbar } from "@/components/Navbar";
import React from "react";
import Image from "next/image";

const page = ({ params }) => {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <main>
        <h1 className="text-4xl font-bold text-center text-white">
          <span className="text-blue-500">Master</span>
          <span className="text-yellow-400">Class</span>
        </h1>
        <h3 className="text-2xl font-bold text-center text-white">
          Producción Musical
        </h3>
        <div className="collaborators">
          <img src="/logo.png" alt="laligadelamusica42_logo" />
          <img src="/42logo.png" alt="42school_logo" />
        </div>
      </main>
    </>
  );
};

export default page;
