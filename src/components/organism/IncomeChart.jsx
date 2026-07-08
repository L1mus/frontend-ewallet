import { useState, useRef, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { ChevronDown } from "lucide-react";
import { useDispatch } from "react-redux";
import { transactionActions } from "../../redux/slice/transactionSlice";

const IncomeChart = ({ data }) => {
  const dispatch = useDispatch();

  const [selectedPeriod, setSelectedPeriod] = useState("Weekly");
  const [selectedType, setSelectedType] = useState("Income");
  const [isPeriodOpen, setIsPeriodOpen] = useState(false);
  const [isTypeOpen, setIsTypeOpen] = useState(false);

  const chartRef = useRef(null);
  const isFirstRender = useRef(true);

  const periodMapping = {
    Weekly: "week",
    Monthly: "month",
    Yearly: "year",
  };

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    const apiPeriod = periodMapping[selectedPeriod];
    if (apiPeriod) {
      dispatch(transactionActions.getTransactionReport({ period: apiPeriod }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedPeriod]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (chartRef.current && !chartRef.current.contains(e.target)) {
        setIsPeriodOpen(false);
        setIsTypeOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const activeDataKey =
    selectedType === "Income" ? "total_income" : "total_expense";
  const activeBarColor = selectedType === "Income" ? "#2b4aff" : "#EF4444";
  const chartData = Array.isArray(data) ? data : [];

  return (
    <div
      ref={chartRef}
      className="sm:border-grey-light flex w-full flex-col rounded-xl bg-white p-4 shadow-sm sm:border sm:p-6"
    >
      <div className="mb-8 flex items-center justify-between">
        <h3 className="text-base font-bold text-black sm:text-lg">
          Income Analytics
        </h3>
        <div className="flex gap-2 sm:gap-4">
          {/* Dropdown Period */}
          <div className="relative">
            <button
              onClick={() => {
                setIsPeriodOpen(!isPeriodOpen);
                setIsTypeOpen(false);
              }}
              className="border-grey-light text-grey flex cursor-pointer items-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs font-semibold transition-colors hover:bg-gray-50 sm:px-4 sm:py-2 sm:text-sm"
            >
              {selectedPeriod}
              <ChevronDown className="text-grey h-4 w-4" />
            </button>
            {isPeriodOpen && (
              <div className="border-grey-light absolute right-0 z-50 mt-2 w-32 overflow-hidden rounded-xl border bg-white py-1 shadow-lg sm:w-40">
                {["Weekly", "Monthly", "Yearly"].map((opt) => (
                  <div
                    key={opt}
                    onClick={() => {
                      setSelectedPeriod(opt);
                      setIsPeriodOpen(false);
                    }}
                    className="hover:bg-primary/10 text-grey cursor-pointer px-3 py-2 text-sm font-medium"
                  >
                    {opt}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Dropdown Type */}
          <div className="relative">
            <button
              onClick={() => {
                setIsTypeOpen(!isTypeOpen);
                setIsPeriodOpen(false);
              }}
              className="border-grey-light text-grey flex cursor-pointer items-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs font-semibold transition-colors hover:bg-gray-50 sm:px-4 sm:py-2 sm:text-sm"
            >
              {selectedType}
              <ChevronDown className="text-grey h-4 w-4" />
            </button>
            {isTypeOpen && (
              <div className="border-grey-light absolute right-0 z-50 mt-2 w-32 overflow-hidden rounded-xl border bg-white py-1 shadow-lg sm:w-40">
                {["Income", "Expense"].map((opt) => (
                  <div
                    key={opt}
                    onClick={() => {
                      setSelectedType(opt);
                      setIsTypeOpen(false);
                    }}
                    className="hover:bg-primary/10 text-grey cursor-pointer px-3 py-2 text-sm font-medium"
                  >
                    {opt}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div style={{ width: "100%", height: 350 }}>
        {chartData.length === 0 ? (
          <div className="text-grey flex h-full w-full items-center justify-center text-sm italic">
            No data available for this period.
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              barSize={40}
              margin={{ top: 10, right: 10, left: 0, bottom: 20 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#E8E8E8"
              />
              <XAxis
                dataKey="period"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: "#808080" }}
                dy={15}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: "#808080" }}
                tickFormatter={(val) => (val >= 1000 ? `${val / 1000}k` : val)}
              />
              <Tooltip
                cursor={{ fill: "rgba(59, 130, 246, 0.05)", radius: 12 }}
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "1px solid #E8E8E8",
                  borderRadius: "12px",
                  boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)",
                }}
                formatter={(value) => [
                  `Rp. ${new Intl.NumberFormat("id-ID").format(value)}`,
                  selectedType,
                ]}
              />
              <Bar
                dataKey={activeDataKey}
                fill={activeBarColor}
                radius={[12, 12, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};

export default IncomeChart;
