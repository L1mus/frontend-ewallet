import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import CardBalance from "../../components/organism/CardBalance";
import IncomeChart from "../../components/organism/IncomeChart";
import CardHistory from "../../components/organism/CardHistory";
import Button from "../../components/atoms/Button";
import IconTransfer from "../../assets/icons/Send.svg?react";
import IconTopUp from "../../assets/icons/Upload.svg?react";
import Balance from "../../assets/icons/balance.svg?react";
import MoneyWithdraw from "../../assets/icons/u_money-withdraw.svg?react";
import ArrowGrowth from "../../assets/icons/ArrowRise-s.svg?react";
import { transactionActions } from "../../redux/slice/transactionSlice";

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { transactions, dashboardSummary, chartData } = useSelector(
    (state) => state.transactionReducer,
  );

  useEffect(() => {
    dispatch(transactionActions.getUserDashboard());
    dispatch(transactionActions.getTransactionReport({ period: "week" }));
    dispatch(transactionActions.getTransactionHistory());
  }, [dispatch]);

  const balance = dashboardSummary?.balance ?? 0;
  const totalIncome = dashboardSummary?.total_income ?? 0;
  const totalExpense = dashboardSummary?.total_expenses ?? 0;
  const recentTransactions = (transactions ?? []).slice(0, 4);

  const formatBalance = (val) =>
    new Intl.NumberFormat("id-ID").format(val ?? 0);

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 gap-6 pb-10 lg:grid-cols-12 lg:gap-8">
        <div className="flex min-w-0 flex-col gap-6 lg:col-span-8 lg:gap-8 xl:col-span-9">
          <div className="grid grid-cols-3 gap-2 sm:gap-4">
            <CardBalance
              title="Balance"
              balance={formatBalance(balance)}
              children={<Balance className="h-6 w-6" />}
              Icon={ArrowGrowth}
              iconStyle="text-success"
              growthIndicators="+2%"
              growthPeriod="3 Days Ago"
            />
            <CardBalance
              title="Income"
              balance={formatBalance(totalIncome)}
              children={<MoneyWithdraw className="h-6 w-6" />}
              Icon={ArrowGrowth}
              iconStyle="text-success"
              growthIndicators="+11.01%"
              growthPeriod="Today"
            />
            <CardBalance
              title="Expense"
              balance={formatBalance(totalExpense)}
              children={<MoneyWithdraw className="h-6 w-6 rotate-180" />}
              Icon={ArrowGrowth}
              iconStyle="rotate-180 text-danger"
              growthIndicators="-5.06%"
              growthPeriod="Today"
            />
          </div>

          <div className="sm:border-grey-light flex items-center justify-between gap-4 sm:flex-row sm:rounded-xl sm:border sm:bg-white sm:p-4 sm:px-6 sm:shadow-sm">
            <h3 className="hidden text-lg font-bold text-black sm:block">
              Fast Service
            </h3>
            <div className="flex w-full gap-3 sm:w-auto">
              <Button
                variant="rectangelBlue"
                isHaveIcon={true}
                Icon={IconTopUp}
                iconClassName={"w-6 h-6"}
                className="h-11 flex-1 px-4 text-xs whitespace-nowrap sm:flex-none sm:px-6 sm:text-sm"
                onClick={() => navigate("/topup")}
              >
                Top Up
              </Button>
              <Button
                variant="rectangelBlue"
                isHaveIcon={true}
                Icon={IconTransfer}
                iconClassName={"w-6 h-6"}
                className="h-11 flex-1 px-4 text-xs whitespace-nowrap sm:flex-none sm:px-6 sm:text-sm"
                onClick={() => navigate("/transfer")}
              >
                Transfer
              </Button>
            </div>
          </div>

          <div className="w-full" style={{ minHeight: "420px" }}>
            <IncomeChart data={chartData} />
          </div>
        </div>

        <div className="border-grey-light flex h-full flex-col rounded-xl border bg-white p-5 shadow-sm lg:col-span-4 xl:col-span-3">
          <div className="mb-6 flex items-center justify-between">
            <h3 className="text-sm font-bold text-black">
              Transaction History
            </h3>
            <button
              className="text-primary cursor-pointer text-xs font-medium whitespace-nowrap hover:underline xl:text-sm"
              onClick={() => navigate("/history")}
            >
              See All
            </button>
          </div>

          <div className="flex flex-col gap-5 overflow-y-auto pr-1 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-50 hover:[&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-track]:bg-transparent">
            {recentTransactions.length > 0 ? (
              recentTransactions.map((tx) => {
                const isExpense = tx.type === "expense";

                const displayName =
                  tx.receiver_name || (isExpense ? "Recipient" : "Sender");

                const displayAvatar =
                  tx.profile_picture_url || "/defaultAvatar.jpg";

                return (
                  <CardHistory
                    key={tx.transaction_id}
                    name={displayName}
                    status={
                      tx.activity_type === "topup" ? "Top Up" : "Transfer"
                    }
                    imageSrc={displayAvatar}
                    amount={
                      <span
                        className={isExpense ? "text-danger" : "text-success"}
                      >
                        {isExpense ? "-" : "+"}Rp{" "}
                        {new Intl.NumberFormat("id-ID").format(tx.amount ?? 0)}
                      </span>
                    }
                  />
                );
              })
            ) : (
              <p className="text-grey m-auto py-8 text-center text-sm italic">
                No transactions yet.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
