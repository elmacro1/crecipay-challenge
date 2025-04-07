import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

interface Params {
  params: Promise<{ deal_id: string }>;
}

export const GET = async (request: Request, { params }: Params) => {
  const { deal_id } = await params;

  if (!deal_id)
    return NextResponse.json(
      { message: "No se proporciono un id" },
      { status: 400 }
    );

  const supabase = await createClient();

  const { data, error } = await supabase
    .from("commissions")
    .select()
    .eq("deal_id", deal_id);

  if (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error al buscar el comision" },
      { status: 500 }
    );
  }

  if (!data.length) {
    return NextResponse.json(
      { message: "No se encontro el comision" },
      { status: 404 }
    );
  }

  const deal = data[0];

  return NextResponse.json(deal);
};
