import React, { useState, useMemo } from "react";
import { Search, RotateCcw } from "lucide-react";

export default function ScholarsFilter({ data , onFilterChange }) {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [category, setCategory] = useState("");
  const [regYear, setRegYear] = useState("all");

  // Ro'yxatdan o'tgan yillar ro'yxatini avtomatik shakllantirish
const availableYears = useMemo(() => {
  const years = data
    .map((item) => {
      const dateVal = item.enteredYear;
      if (!dateVal) return null;

      // Qiymatni butun songa o'tkazamiz
      const year = Number(parseInt(dateVal, 10));

      // Mantiqiy yil diapazonida (masalan, 1900-2100) va NaN emasligini tekshiramiz
      return !isNaN(year) && year > 1900 && year < 2100 ? year : null;
    })
    .filter(Boolean);

  return Array.from(new Set(years)).sort((a, b) => b - a);
}, [data]);

  // Filtrlash mantig'i
  const filteredData = useMemo(() => {
    return data.filter((item) => {
      // 1. Search (F.I.SH yoki Login bo'yicha)
      const matchesSearch =
        search.trim() === "" ||
        item.fullName?.toLowerCase().includes(search.toLowerCase()) ||
        item.login?.toLowerCase().includes(search.toLowerCase());

      // 2. Status (active, suspended, graduated)
      const matchesStatus = status === "all" || item.status === status;

      // 3. Category (matn ko'rinishida search/contains)
      const matchesCategory =
        category.trim() === "" ||
        item.category?.toLowerCase().includes(category.toLowerCase());

      // 4. Registration Year
      const itemYear = new Date(
        item.createdAt || item.registeredAt || item.registrationYear
      ).getFullYear();
      const matchesYear =
        regYear === "all" || itemYear.toString() === regYear.toString();

      return matchesSearch && matchesStatus && matchesCategory && matchesYear;
    });
  }, [data, search, status, category, regYear]);

  // Har bir o'zgarishda natijani ota-komponentga uzatish
  React.useEffect(() => {
    if (onFilterChange) {
      onFilterChange(filteredData);
    }
  }, [filteredData]);

  // Filtrlarni nolga tushirish (Reset)
  const handleReset = () => {
    setSearch("");
    setStatus("all");
    setCategory("");
    setRegYear("all");
  };

  return (
    <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs mb-6 space-y-3">
      {/* Search Input */}
      <div className="relative w-full">
        <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          placeholder="Qidirish (F.I.SH yoki Login)..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition"
        />
      </div>

      {/* Filter Elementlari Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 pt-1">
        {/* Status Filter */}
        <div>
          <label className="block text-[11px] font-semibold text-slate-500 mb-1">
            Status
          </label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-700 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition"
          >
            <option value="all">Barchasi</option>
            <option value="active">Active</option>
            <option value="suspended">Suspended</option>
            <option value="graduated">Graduated</option>
          </select>
        </div>

        {/* Category Filter (Text) */}
        <div>
          <label className="block text-[11px] font-semibold text-slate-500 mb-1">
            Kategoriya
          </label>
          <input
            type="text"
            placeholder="Kategoriya..."
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-700 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition"
          />
        </div>

        {/* Registration Year Filter */}
        <div>
          <label className="block text-[11px] font-semibold text-slate-500 mb-1">
            Ro'yxatdan o'tgan yili
          </label>
          <select
            value={regYear}
            onChange={(e) => setRegYear(e.target.value)}
            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-700 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition"
          >
            <option value="all">Barcha yillar</option>
            {availableYears.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>

        {/* Reset Button */}
        <div className="flex items-end">
          <button
            type="button"
            onClick={handleReset}
            className="w-full flex items-center justify-center gap-1.5 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl text-sm font-medium transition cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Tozalash
          </button>
        </div>
      </div>
    </div>
  );
}