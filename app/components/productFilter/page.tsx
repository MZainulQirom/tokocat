"use client";

import { useState } from "react";

type Props = {
  onSearch: (value: string) => void;
};

export default function ProductFilter({ onSearch }: Props) {
  const [search, setSearch] = useState("");

  return (
    <div className="flex md:justify-between flex-col md:flex-row gap-4 mb-6 text-gray-600">
      
      {/* Search */}
      <input
        type="text"
        placeholder="Cari cat..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          onSearch(e.target.value);
        }}
        className="border border-gray-500 p-2 rounded-lg w-full md:w-1/3 outline-none "
      />

      {/* Filter */}
      <select
        className="border border-gray-500 p-2 rounded-lg outline-none "
        onChange={(e) => onSearch(e.target.value)}
      >
        <option value="">Semua Kategori</option>
        <option value="tembok">Cat Tembok</option>
        <option value="kayu">Cat Kayu</option>
        <option value="besi">Cat Besi</option>
      </select>
    </div>
  );
}