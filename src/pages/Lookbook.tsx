import { useState } from "react";
import { ChevronDown } from "lucide-react";

const lookbooks = [
  {
    season: "Весна/Лето 25",
    images: [
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1920&q=80",
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=1920&q=80"
    ]
  },
  {
    season: "Осень/Зима 25-26",
    images: [
      "https://images.unsplash.com/photo-1558769132-cb1aea5f6ae8?w=1920&q=80",
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1920&q=80"
    ]
  }
];

const Lookbook = () => {
  const [selectedSeason, setSelectedSeason] = useState("Весна/Лето 25");
  const [currentLookbook] = lookbooks.filter(lb => lb.season === selectedSeason);

  return (
    <div className="min-h-screen">
      <div className="border-b border-border py-4 px-8 flex justify-end">
        <div className="relative">
          <select
            value={selectedSeason}
            onChange={(e) => setSelectedSeason(e.target.value)}
            className="appearance-none bg-transparent pr-8 text-sm tracking-wide cursor-pointer focus:outline-none"
          >
            {lookbooks.map((lb) => (
              <option key={lb.season} value={lb.season}>
                LookBook / {lb.season}
              </option>
            ))}
          </select>
          <ChevronDown className="w-4 h-4 absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>
      </div>

      <div className="grid grid-cols-2">
        {currentLookbook?.images.map((image, idx) => (
          <div key={idx} className="aspect-[3/4] relative overflow-hidden group">
            <img
              src={image}
              alt={`Lookbook ${idx + 1}`}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
          </div>
        ))}
      </div>

      <div className="py-16 text-center">
        <p className="text-sm tracking-wide text-muted-foreground">
          Фотография: Имя Фотографа
        </p>
      </div>
    </div>
  );
};

export default Lookbook;
