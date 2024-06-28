"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
  const [apkgFile, setApkgFile] = useState();
  const [front, setFront] = useState("Nada ainda!");
  const [back, setBack] = useState("Nada ainda!");
  const [isLoading, setLoading] = useState();

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
        "http://localhost:4444/api/teste-apkg",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // const deckData = response.data.deck;
      // const blob = new Blob([JSON.stringify(deckData)], {
      //   type: "application/json",
      // });
      // const url = URL.createObjectURL(blob);
      // const link = document.createElement("a");
      // link.href = url;
      // link.download = "deck.json";
      // document.body.appendChild(link);
      // link.click();
      // document.body.removeChild(link);
      // URL.revokeObjectURL(url);

      setTimeout(() => {
        setFront(response.data.deck.notes[0].sfld);
        setBack(response.data.deck.notes[0].flds.split("\u001f")[1]);
        setLoading(false);
      }, 3000);

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

        <section className="mt-4 flex flex-col items-center justify-center gap-4">
          <p>Front: {isLoading ? "Carregando..." : front}</p>

          <p>Back: {isLoading ? "Carregando..." : back}</p>
        </section>
      </main>

      <footer className="bg-[#002e5f] text-white py-3.5 font-bold flex items-start justify-center w-full max-h-[15vh] h-screen">
        <p>Inmetro</p>
      </footer>
    </div>
  );
}
