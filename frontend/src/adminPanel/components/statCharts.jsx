import { TrendingUp, PieChart as PieIcon, BarChart3 } from "lucide-react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

function StatCharts({ growthData, partsData }) {
  return (
    <div className="p-6 bg-slate-50 min-h-screen">
      {/* 
        grid-cols-1 : Mobil va kichik ekranlarda 1 qatorda (ustma-ust)
        xl:grid-cols-2 : Katta ekranlarda yonma-yon (2 ustun)
      */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* 1. StatGrowth - Line Chart */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div className="flex items-center gap-2 mb-6">
            <TrendingUp className="w-6 h-6 text-blue-600" />
            <h2 className="text-lg font-bold text-slate-800">
              Yillar bo'yicha o'sish dinamikasi (StatGrowth)
            </h2>
          </div>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={growthData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="year" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#fff",
                    borderRadius: "12px",
                    borderColor: "#e2e8f0",
                  }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="amount"
                  name="Miqdor"
                  stroke="#2563eb"
                  strokeWidth={3}
                  dot={{ r: 6 }}
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 2. StatParts - Bar Chart */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div className="flex items-center gap-2 mb-6">
            <BarChart3 className="w-6 h-6 text-emerald-600" />
            <h2 className="text-lg font-bold text-slate-800">
              Qismlar va umumiy hajmlar (StatParts)
            </h2>
          </div>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={partsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="year" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#fff",
                    borderRadius: "12px",
                    borderColor: "#e2e8f0",
                  }}
                />
                <Legend />
                <Bar
                  dataKey="first"
                  name="1-bosqich"
                  fill="#3b82f6"
                  radius={[4, 4, 0, 0]}
                />
                <Bar
                  dataKey="second"
                  name="2-bosqich"
                  fill="#10b981"
                  radius={[4, 4, 0, 0]}
                />
                <Bar
                  dataKey="third"
                  name="3-bosqich"
                  fill="#f59e0b"
                  radius={[4, 4, 0, 0]}
                />
                <Bar
                  dataKey="amount"
                  name="G'oliblar"
                  fill="#6366f1"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StatCharts;
