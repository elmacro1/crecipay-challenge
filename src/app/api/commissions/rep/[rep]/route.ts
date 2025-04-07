import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

interface Params {
  params: Promise<{ rep: string }>;
}

export const GET = async (request: Request, { params }: Params) => {
  const { rep } = await params;
  const { searchParams } = new URL(request.url);
  const month = searchParams.get("month") || null;

  if (!rep)
    return NextResponse.json(
      { message: "No se proporciono un rep" },
      { status: 400 }
    );

  const supabase = await createClient();

  let query = supabase.from("commissions").select().eq("rep", rep);

  if (month) {
    query = query.like("deal_date", `${month}%`);
  }

  const { data, error } = await query;

  if (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error al buscar el comision" },
      { status: 500 }
    );
  }

  return NextResponse.json(data);
};
