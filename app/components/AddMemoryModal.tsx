import { useState } from "react";
import { Card } from "./CardItem";

interface Props {
  open: boolean;
  onClose: () => void;
  onSave: (card: Card) => void;
}

export function AddMemoryModal({ open, onClose, onSave }: Props) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  if (!open) return null;

  function handleSave() {
    if (!content.trim()) return;

    onSave({
      id: crypto.randomUUID(),
      title: title || undefined,
      content,
      timestamp: new Date().toISOString(),
    });

    setTitle("");
    setContent("");
    onClose();
  }

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-3xl w-full max-w-sm p-6 shadow-xl border border-red-200">
        <h2 className="font-playfair text-xl text-red-800 mb-4">
          Nova memória
        </h2>

        <input
          placeholder="Título (opcional)"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full mb-3 rounded-xl border border-red-200 px-4 py-2 text-black text-sm focus:outline-none focus:ring-2 focus:ring-red-300"
        />

        <textarea
          placeholder="Escreva sua memória..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={4}
          className="w-full rounded-xl border border-red-200 px-4 py-3 text-black text-sm resize-none focus:outline-none focus:ring-2 focus:ring-red-300"
        />

        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="text-red-500 hover:text-red-700 text-sm"
          >
            Cancelar
          </button>
          <button
            onClick={handleSave}
            className="bg-red-600 text-white rounded-xl px-5 py-2 text-sm hover:bg-red-700 transition"
          >
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
}
