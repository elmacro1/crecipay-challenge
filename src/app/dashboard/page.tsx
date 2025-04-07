import { createClient } from "@/utils/supabase/server";
import DealsTable from "../components/deals-table/deals-table";
import Filters from "../components/filters/filters";

interface SearchParams {
  searchParams: Promise<{ rep: string; month: string }>;
}

const DashboardPage = async ({ searchParams }: SearchParams) => {
  const { rep, month } = await searchParams;
  const supabase = await createClient();
  let query = supabase.from("commissions").select();

  if (rep) {
    query = query.eq("rep", rep);
  }

  if (month) {
    query = query.like("deal_date", `${month}%`);
  }

  const { data, error } = await query;

  if (error) {
    console.error(error);
  }

  return (
    <main className="flex flex-col gap-4 items-center">
      <h2 className="text-2xl font-bold">Dashboard</h2>
      <Filters data={data || []} />
      {data && data.length > 0 ? (
        <>
          <DealsTable data={data} />
        </>
      ) : (
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
          No hay datos disponibles
        </div>
      )}
    </main>
  );
};

export default DashboardPage;
