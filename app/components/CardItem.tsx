export interface Card {
  id: string;
  title?: string;
  content: string;
  timestamp: string;
}

interface CardItemProps {
  card: Card;
}

export function CardItem({ card }: CardItemProps) {
  const date = new Date(card.timestamp);

  return (
    <div
      className="
        bg-white/90
        backdrop-blur-md
        border border-red-200/70
        rounded-2xl
        p-5
        shadow-[0_8px_30px_rgba(220,38,38,0.08)]
        hover:shadow-[0_12px_40px_rgba(220,38,38,0.15)]
        transition-all
      "
    >
      {card.title && (
        <h2
          className="
            font-playfair
            text-lg
            text-red-800
            mb-2
            tracking-wide
          "
        >
          {card.title}
        </h2>
      )}

      <p
        className="
          text-sm
          text-red-900/80
          leading-relaxed
          whitespace-pre-wrap
        "
      >
        {card.content}
      </p>

      <div className="mt-4 text-xs text-red-400 italic">
        {date.toLocaleDateString("pt-BR")} ·{" "}
        {date.toLocaleTimeString("pt-BR", {
          hour: "2-digit",
          minute: "2-digit",
        })}
      </div>
    </div>
  );
}
