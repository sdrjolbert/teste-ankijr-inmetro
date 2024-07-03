"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
  const [bearer, setBearer] = useState("");
  const [apkgFile, setApkgFile] = useState();
  const [message, setMessage] = useState(
    "Nada ainda, envie um arquivo .apkg para importar!"
  );
  const [isLoading, setLoading] = useState();

  const handleBearerChange = async (e) => {
    setBearer(e.target.value);
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    setApkgFile(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("apkg-file", apkgFile);

    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:4444/api/apkg/import",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${bearer}`,
          },
        }
      );
      setTimeout(() => {
        setMessage(response.data.success);
        setLoading(false);
      }, 3000);

      console.log(response.data.success);
    } catch (err) {
      setTimeout(() => {
        setMessage(err.response.data.error);
        setLoading(false);
      }, 3000);

      console.log(err.response.data.error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <header className="bg-[#002e5f] text-white font-bold flex items-center justify-center w-full max-h-[10vh] h-screen">
        <h1>Hello World</h1>
      </header>

      <main className="flex flex-col items-center justify-center w-full min-h-[75vh]">
        <div className="relative !mb-4">
          <input
            onChange={handleBearerChange}
            value={bearer}
            type="text"
            placeholder="Bearer"
            className="input__class block w-full bg-clip-padding text-inmetro font-normal text-base leading-tight min-h-[calc(3.5rem_+_2px)] h-[calc(3.5rem_+_2px)] border px-3 py-4 rounded-md border-solid transition[colors, shadow] duration-150 ease-in-out"
          />
          <label className="label__input label__class transition[opacity, transform] duration-300 ease-in-out">
            Bearer
          </label>
        </div>

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
            className="flex flex-row flex-nowrap gap-1.5 items-center text-xl font-normal leading-normal text-center no-underline align-middle cursor-pointer select-none border bg-secondary text-white px-4 py-2 rounded-lg border-solid border-secondary hover:border-inmetro hover:bg-inmetro transition-[colors, shadow] duration-[400ms] ease-in-out"
          >
            Enviar
          </button>
        </section>

        <section className="mt-4 flex flex-col items-center justify-center gap-4">
          <p>Mensagem: {isLoading ? "Carregando..." : message}</p>
        </section>
      </main>

      <footer className="bg-[#002e5f] text-white py-3.5 font-bold flex items-start justify-center w-full max-h-[15vh] h-screen">
        <p>Inmetro</p>
      </footer>
    </div>
  );
}
