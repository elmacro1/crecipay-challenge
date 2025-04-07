type Status = "completed" | "in process" | "cancelled";

export interface Deal {
  deal_id: string;
  rep: string;
  car_model: string;
  deal_amount: number;
  deal_date: string;
  status: Status;
  commission?: number;
}

export enum STATUS {
  COMPLETED = "completed",
  IN_PROCESS = "in process",
  CANCELLED = "cancelled",
}
