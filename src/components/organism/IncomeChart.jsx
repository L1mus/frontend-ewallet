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

  const activeDataKey  = selectedType === "Income" ? "total_income" : "total_expense";
  const activeBarColor = selectedType === "Income" ? "#2b4aff" : "#EF4444";
  const chartData      = Array.isArray(data) ? data : [];

  return (
      <div
          ref={chartRef}
          className="w-full bg-white sm:border sm:border-grey-light rounded-xl p-4 sm:p-6 shadow-sm flex flex-col"
      >
        <div className="flex justify-between items-center mb-8">
          <h3 className="font-bold text-black text-base sm:text-lg">
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
                  className="flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 border border-grey-light rounded-xl text-xs sm:text-sm font-semibold text-grey hover:bg-gray-50 transition-colors cursor-pointer"
              >
                {selectedPeriod}
                <ChevronDown className="w-4 h-4 text-grey" />
              </button>
              {isPeriodOpen && (
                  <div className="absolute right-0 mt-2 w-32 sm:w-40 bg-white border border-grey-light rounded-xl shadow-lg py-1 z-50 overflow-hidden animate-in fade-in slide-in-from-top-1 duration-200">
                    {["Weekly", "Monthly", "Yearly"].map((opt) => (
                        <div
                            key={opt}
                            onClick={() => {
                              setSelectedPeriod(opt);
                              setIsPeriodOpen(false);
                            }}
                            className="px-3 py-2 text-sm hover:bg-primary/10 cursor-pointer text-grey font-medium"
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
                  className="flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 border border-grey-light rounded-xl text-xs sm:text-sm font-semibold text-grey hover:bg-gray-50 transition-colors cursor-pointer"
              >
                {selectedType}
                <ChevronDown className="w-4 h-4 text-grey" />
              </button>
              {isTypeOpen && (
                  <div className="absolute right-0 mt-2 w-32 sm:w-40 bg-white border border-grey-light rounded-xl shadow-lg py-1 z-50 overflow-hidden animate-in fade-in slide-in-from-top-1 duration-200">
                    {["Income", "Expense"].map((opt) => (
                        <div
                            key={opt}
                            onClick={() => {
                              setSelectedType(opt);
                              setIsTypeOpen(false);
                            }}
                            className="px-3 py-2 text-sm hover:bg-primary/10 cursor-pointer text-grey font-medium"
                        >
                          {opt}
                        </div>
                    ))}
                  </div>
              )}
            </div>
          </div>
        </div>

        <div className="w-full h-75 sm:h-87.5 md:h-100">
          {chartData.length === 0 ? (
              <div className="w-full h-full flex items-center justify-center text-grey text-sm italic">
                No data available for this period.
              </div>
          ) : (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                    data={chartData}
                    barSize={40}
                    margin={{ top: 10, right: 0, left: 0, bottom: 20 }}
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