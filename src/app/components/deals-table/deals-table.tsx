import { type Deal } from "@/types/deals";

interface Props {
  data: Deal[];
}

const DealsTable = ({ data }: Props) => (
  <div className="overflow-x-auto">
    <table className="min-w-full bg-transparent border border-gray-200">
      <thead className="">
        <tr>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider">
            ID
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider">
            Representante
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider">
            Fecha
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider">
            Monto
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider">
            Estado
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider">
            Comisión
          </th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200">
        {data.map((deal, index) => (
          <tr key={index} className="hover:bg-gray-900">
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-200">
              {deal.deal_id}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-200">
              {deal.rep}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-200">
              {deal.deal_date}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-200">
              ${deal.deal_amount}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-200">
              {deal.status}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-200">
              ${deal.commission}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default DealsTable;
