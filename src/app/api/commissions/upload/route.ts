import { NextResponse } from "next/server";
import { parse } from "csv-parse/sync";
import { createClient } from "@/utils/supabase/server";
import { type Deal, STATUS } from "@/types/deals";

const COMISION_BASE = 5;
const COMISION_BONO = 1;
const COMISION_PENALIZACION = 0.5;
const MONTO_LIMITE = 20000;

export const POST = async (request: Request) => {
  const formData = await request.formData();
  const file = formData.get("file") as File;

  if (!file)
    return NextResponse.json(
      { message: "No se subio un archivo" },
      { status: 400 }
    );

  const supabase = await createClient();
  const bytes = await file.arrayBuffer();
  const text = Buffer.from(bytes).toString("utf-8");

  const dealList = parse(text, {
    columns: true,
    skip_empty_lines: true,
  }) as Deal[];

  const now = new Date();

  const results = dealList.map((deal) => {
    if (deal.status !== STATUS.COMPLETED) return { ...deal, commission: 0 };

    let porcentage = COMISION_BASE;
    const date = new Date(deal.deal_date);
    const isOld =
      date.getMonth() < now.getMonth() ||
      date.getFullYear() < now.getFullYear();

    if (deal.deal_amount > MONTO_LIMITE) porcentage += COMISION_BONO;
    if (isOld) porcentage -= COMISION_PENALIZACION;

    const commission = ((deal.deal_amount * porcentage) / 100).toFixed(2);

    return { ...deal, commission };
  });

  const { error } = await supabase.from("commissions").upsert(results);

  if (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error al subir el archivo" },
      { status: 500 }
    );
  }

  return NextResponse.json({ message: "Archivo procesado con exito!" });
};
