"use client";

import { useEffect, useState } from "react";
import { AddMemoryModal } from "./components/AddMemoryModal";
import { Card, CardItem } from "./components/CardItem";
import { supabase } from "./lib/supabase";

export default function Home() {
  const [cards, setCards] = useState<Card[]>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    supabase
      .from("memories")
      .select("*")
      .order("timestamp", { ascending: false })
      .then(({ data }) => setCards(data ?? []));
  }, []);

  async function addCard(card: Card) {
    const { error } = await supabase.from("memories").insert({
      id: card.id,
      title: card.title,
      content: card.content,
      timestamp: card.timestamp,
    });

    if (error) {
      console.error(error);
      return;
    }

    await fetchCards(); // 🔥 fonte da verdade
  }

  async function fetchCards() {
    const { data, error } = await supabase
      .from("memories")
      .select("*")
      .order("timestamp", { ascending: false });

    if (error) {
      console.error(error);
      return;
    }

    setCards(data ?? []);
  }

  useEffect(() => {
    fetchCards();
  }, []);

  return (
    <main className="flex items-center justify-center min-h-screen bg-white p-6">
      <div className="w-full max-w-md bg-white/80 backdrop-blur-xl border border-red-200/60 rounded-3xl shadow-[0_20px_60px_rgba(220,38,38,0.08)] flex flex-col">
        <div className="flex-1 flex flex-col gap-4 p-6 overflow-y-auto">
          {cards.map((card) => (
            <CardItem key={card.id} card={card} />
          ))}
        </div>

        {/* Botão */}
        <div className="p-4 border-t border-red-100">
          <button
            onClick={() => setOpen(true)}
            className="w-full bg-red-600  rounded-xl py-3 font-medium hover:bg-red-700 transition"
          >
            Adicionar memória
          </button>
        </div>
      </div>

      <AddMemoryModal
        open={open}
        onClose={() => setOpen(false)}
        onSave={addCard}
      />
    </main>
  );
}
