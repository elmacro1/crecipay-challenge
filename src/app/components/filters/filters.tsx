"use client";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { type Deal } from "@/types/deals";

interface Props {
  data: Deal[];
}

const Filters = ({ data }: Props) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const reps = Array.from(new Set(data.map((deal) => deal.rep)));

  const handleSelectRep = (value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set("rep", value);
    } else {
      params.delete("rep");
    }
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleSelectMonth = (value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set("month", value);
    } else {
      params.delete("month");
    }
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex flex-col gap-4 items-center">
      <p>Filtrar por representante</p>
      <div className="flex gap-10">
        <select
          className="border border-gray-200 rounded px-2 py-1 bg-transparent cursor-pointer"
          onChange={(e) => handleSelectRep(e.target.value)}
        >
          <option value="">Todos</option>
          {reps.map((rep) => (
            <option key={rep} value={rep}>
              {rep}
            </option>
          ))}
        </select>
        <input
          type="month"
          onChange={(e) => handleSelectMonth(e.target.value)}
          className="border border-gray-200 rounded px-2 py-1 bg-transparent cursor-pointer"
        />
        <button
          type="button"
          className="bg-blue-500 text-white py-2 px-4 rounded cursor-pointer"
          onClick={() => router.push(pathname)}
        >
          Reiniciar
        </button>
      </div>
    </div>
  );
};

export default Filters;
