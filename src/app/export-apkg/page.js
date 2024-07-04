"use client";

import { useState } from "react";
import axios from "axios";

export default function Home() {
  const [bearer, setBearer] = useState("");
  const [filename, setFilename] = useState("");
  const [message, setMessage] = useState(
    "Nada ainda, digite o seu token bearer e o nome do arquivo para baixar!"
  );
  const [isLoading, setLoading] = useState();

  const handleBearerChange = async (e) => {
    setBearer(e.target.value);
  };

  const handleFilenameChange = async (e) => {
    setFilename(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:4444/api/deck/get-deck",
        filename,
        {
          headers: {
            "Content-Type": "text/plain",
            Authorization: `Bearer ${bearer}`,
          },
        }
      );

      const { jsonData } = response.data;

      try {
        const response = await axios.post(
          "http://localhost:4444/api/apkg/export",
          { jsonData, filename },
          {
            headers: {
              "Content-Type": "application/json",
            },
            responseType: "blob",
          }
        );

        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `${response.headers["x-filename"]}.apkg`);
        document.body.appendChild(link);
        link.click();

        link.parentNode.removeChild(link);

        setMessage(response.headers["x-success"]);
        setLoading(false);

        console.log(response.headers["x-success"]);
      } catch (err) {
        setMessage(err.response.data.error);
        setLoading(false);

        console.log(err.response.data.error);
      }
    } catch (err) {
      setMessage(err.response.data.error);
      setLoading(false);

      console.log(err.response.data.error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <header className="bg-[#002e5f] text-white font-bold flex items-center justify-center w-full max-h-[10vh] h-screen">
        <h1>Hello World</h1>
      </header>

      <main className="flex flex-col items-center justify-center w-full min-h-[75vh] gap-10 mb-5">
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

        <div className="relative !mb-4">
          <input
            onChange={handleFilenameChange}
            value={filename}
            type="text"
            placeholder="Filename"
            className="input__class block w-full bg-clip-padding text-inmetro font-normal text-base leading-tight min-h-[calc(3.5rem_+_2px)] h-[calc(3.5rem_+_2px)] border px-3 py-4 rounded-md border-solid transition[colors, shadow] duration-150 ease-in-out"
          />
          <label className="label__input label__class transition[opacity, transform] duration-300 ease-in-out">
            Filename
          </label>
        </div>

        <section className="mt-7">
          <button
            onClick={handleSubmit}
            className="flex flex-row flex-nowrap gap-1.5 items-center text-xl font-normal leading-normal text-center no-underline align-middle cursor-pointer select-none border bg-secondary text-white px-4 py-2 rounded-lg border-solid border-secondary hover:border-inmetro hover:bg-inmetro transition-[colors, shadow] duration-[400ms] ease-in-out"
          >
            Baixar .apkg
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
