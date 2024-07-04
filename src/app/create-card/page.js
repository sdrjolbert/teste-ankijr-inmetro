"use client";

import { useState } from "react";
import axios from "axios";

export default function Home() {
  const [token, setToken] = useState("");
  const [deckName, setDeckName] = useState("");
  const [frontCard, setFrontCard] = useState("");
  const [backCard, setBackCard] = useState("");
  const [message, setMessage] = useState(
    "Nada ainda, digite o seu token e o nome do deck para criar!"
  );
  const [isLoading, setLoading] = useState();

  const handleTokenChange = async (e) => {
    setToken(e.target.value);
  };

  const handleDeckName = async (e) => {
    setDeckName(e.target.value);
  };

  const handleFrontCardChange = async (e) => {
    setFrontCard(e.target.value);
  };

  const handleBackCardChange = async (e) => {
    setBackCard(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:4444/api/deck/get-deck",
        deckName,
        {
          headers: {
            "Content-Type": "text/plain",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const { jsonData } = response.data;

      try {
        const response = await axios.post(
          "http://localhost:4444/api/apkg/create-deck",
          { deckName, frontCard, backCard, jsonData },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setMessage(response.data.success);
        setLoading(false);

        console.log(response.data.success);
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
            onChange={handleTokenChange}
            value={token}
            type="text"
            placeholder="Token"
            className="input__class block w-full bg-clip-padding text-inmetro font-normal text-base leading-tight min-h-[calc(3.5rem_+_2px)] h-[calc(3.5rem_+_2px)] border px-3 py-4 rounded-md border-solid transition[colors, shadow] duration-150 ease-in-out"
          />
          <label className="label__input label__class transition[opacity, transform] duration-300 ease-in-out">
            Token
          </label>
        </div>

        <div className="relative !mb-4">
          <input
            onChange={handleDeckName}
            value={deckName}
            type="text"
            placeholder="Nome do deck"
            className="input__class block w-full bg-clip-padding text-inmetro font-normal text-base leading-tight min-h-[calc(3.5rem_+_2px)] h-[calc(3.5rem_+_2px)] border px-3 py-4 rounded-md border-solid transition[colors, shadow] duration-150 ease-in-out"
          />
          <label className="label__input label__class transition[opacity, transform] duration-300 ease-in-out">
            Nome do deck
          </label>
        </div>

        <div className="relative !mb-4">
          <input
            onChange={handleFrontCardChange}
            value={frontCard}
            type="text"
            placeholder="Front do card"
            className="input__class block w-full bg-clip-padding text-inmetro font-normal text-base leading-tight min-h-[calc(3.5rem_+_2px)] h-[calc(3.5rem_+_2px)] border px-3 py-4 rounded-md border-solid transition[colors, shadow] duration-150 ease-in-out"
          />
          <label className="label__input label__class transition[opacity, transform] duration-300 ease-in-out">
            Frente do card
          </label>
        </div>

        <div className="relative !mb-4">
          <input
            onChange={handleBackCardChange}
            value={backCard}
            type="text"
            placeholder="Back do card"
            className="input__class block w-full bg-clip-padding text-inmetro font-normal text-base leading-tight min-h-[calc(3.5rem_+_2px)] h-[calc(3.5rem_+_2px)] border px-3 py-4 rounded-md border-solid transition[colors, shadow] duration-150 ease-in-out"
          />
          <label className="label__input label__class transition[opacity, transform] duration-300 ease-in-out">
            Back do card
          </label>
        </div>

        <section className="mt-7">
          <button
            onClick={handleSubmit}
            className="flex flex-row flex-nowrap gap-1.5 items-center text-xl font-normal leading-normal text-center no-underline align-middle cursor-pointer select-none border bg-secondary text-white px-4 py-2 rounded-lg border-solid border-secondary hover:border-inmetro hover:bg-inmetro transition-[colors, shadow] duration-[400ms] ease-in-out"
          >
            Criar Card
          </button>
        </section>

        <section className="mt-4 flex flex-col items-center justify-center gap-4 max-w-[800px] w-full">
          <p>Mensagem: {isLoading ? "Carregando..." : message}</p>
        </section>
      </main>

      <footer className="bg-[#002e5f] text-white py-3.5 font-bold flex items-start justify-center w-full max-h-[15vh] h-screen">
        <p>Inmetro</p>
      </footer>
    </div>
  );
}
