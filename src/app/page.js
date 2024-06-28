"use client";

import { useState } from "react";
import axios from "axios";

export default function Home() {
  const [apkgFile, setApkgFile] = useState();

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    setApkgFile(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("apkg-file", apkgFile);

    try {
      const response = await axios.post(
        "http://localhost:4444/api/teste-apkg",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <header className="bg-[#002e5f] text-white font-bold flex items-center justify-center w-full max-h-[10vh] h-screen">
        <h1>Hello World</h1>
      </header>

      <main className="flex flex-col items-center justify-center w-full min-h-[75vh]">
        <section className="flex flex-col gap-2 items-center justify-center">
          <label className="font-semibold">Arquivo .apkg:</label>
          <input
            onChange={handleFileChange}
            type="file"
            accept=".apkg"
          />
        </section>

        <section className="mt-7">
          <button
            onClick={handleSubmit}
            className="bg-[#002e5f] text-white font-semibold h-[40px] w-[80px] rounded-md hover:bg-[#000e5f] transition ease-in-out 3.5"
          >
            Enviar
          </button>
        </section>
      </main>

      <footer className="bg-[#002e5f] text-white py-3.5 font-bold flex items-start justify-center w-full max-h-[15vh] h-screen">
        <p>Inmetro</p>
      </footer>
    </div>
  );
}
