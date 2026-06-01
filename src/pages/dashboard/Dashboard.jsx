import { useEffect } from "react";
import {useDispatch, useSelector} from "react-redux";
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

  const { loginUser } = useSelector((state) => state.loginReducer);

  const {
    transactions,
    dashboardSummary,
    chartData,
    isLoading
  } = useSelector((state) => state.transactionReducer);

  useEffect(() => {
    dispatch(transactionActions.getUserDashboard());
    dispatch(transactionActions.getTransactionReport());
  }, [dispatch]);

  const balance = dashboardSummary?.balance || 0;
  const totalIncome = dashboardSummary?.total_income || 0;
  const totalExpense = dashboardSummary?.total_expense || 0;

  const recentTransactions = transactions
      .filter(
          (tx) => tx.sender_id === loginUser?.id || tx.receiver_id === loginUser?.id,
      )
      .slice(0, 4);

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 pb-10">
        <div className="lg:col-span-8 xl:col-span-9 flex flex-col gap-6 lg:gap-8 min-w-0">
          <div className="grid grid-cols-3 gap-2 sm:gap-4">
            <CardBalance
              title="Balance"
              balance={balance}
              children={<Balance className="w-6 h-6" />}
              Icon={ArrowGrowth}
              iconStyle="text-success"
              growthIndicators="+2%"
              growthPeriod="3 Days Ago"
            />
            <CardBalance
              title="Income"
              balance={totalIncome}
              children={<MoneyWithdraw className="w-6 h-6" />}
              Icon={ArrowGrowth}
              iconStyle="text-success"
              growthIndicators="+11.01%"
              growthPeriod="Today"
            />
            <CardBalance
              title="Expense"
              balance={totalExpense}
              children={<MoneyWithdraw className="rotate-180 w-6 h-6" />}
              Icon={ArrowGrowth}
              iconStyle="rotate-180 text-danger"
              growthIndicators="-5.06%"
              growthPeriod="Today"
            />
          </div>

          <div className="flex sm:flex-row justify-between items-center gap-4 sm:border sm:border-grey-light sm:rounded-xl sm:p-4 sm:px-6 sm:bg-white sm:shadow-sm">
            <h3 className="hidden sm:block font-bold text-black text-lg">
              Fast Service
            </h3>
            <div className="flex gap-3 w-full sm:w-auto">
              <Button
                variant="rectangelBlue"
                isHaveIcon={true}
                Icon={IconTopUp}
                iconClassName={"w-6 h-6"}
                className="flex-1 sm:flex-none h-11 px-4 sm:px-6 text-xs sm:text-sm whitespace-nowrap"
                onClick={() => navigate("/topup")}
              >
                Top Up
              </Button>
              <Button
                variant="rectangelBlue"
                isHaveIcon={true}
                Icon={IconTransfer}
                iconClassName={"w-6 h-6"}
                className="flex-1 sm:flex-none h-11 px-4 sm:px-6 text-xs sm:text-sm whitespace-nowrap"
                onClick={() => navigate("/transfer")}
              >
                Transfer
              </Button>
            </div>
          </div>

          <div className="w-full">
            {isLoading ? (
              <div className="w-full h-87.5 sm:h-100 bg-white rounded-xl flex items-center justify-center border border-grey-light shadow-sm">
                <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : (
              <IncomeChart data={chartData} />
            )}
          </div>
        </div>

        <div className=" lg:col-span-4 xl:col-span-3 bg-white border border-grey-light rounded-xl p-5 shadow-sm flex flex-col h-full">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-black text-sm">
              Transaction History
            </h3>
            <button
              className="text-primary text-xs xl:text-sm font-medium hover:underline cursor-pointer whitespace-nowrap"
              onClick={() => navigate("/history")}
            >
              See All
            </button>
          </div>

          <div
            className="flex flex-col gap-5 overflow-y-auto pr-1 [&::-webkit-scrollbar]:w-1.5
            [&::-webkit-scrollbar-track]:bg-transparent
            [&::-webkit-scrollbar-thumb]:bg-gray-50
            [&::-webkit-scrollbar-thumb]:rounded-full
            hover:[&::-webkit-scrollbar-thumb]:bg-gray-300"
          >
            {recentTransactions.length > 0 ? (
                recentTransactions.map((tx) => {
                  const isSender = tx.sender_id === loginUser?.id;

                  const displayName = isSender
                      ? tx.receiver_name || "Recipient"
                      : tx.sender_name || "Sender";

                  const displayAvatar = isSender
                      ? tx.receiver_avatar
                      : tx.sender_avatar;

                  return (
                      <CardHistory
                          key={tx.id}
                          name={displayName}
                          status="Transfer"
                          imageSrc={displayAvatar}
                          amount={
                            <span className={isSender ? "text-danger" : "text-success"}>
                        {isSender ? "-" : "+"}Rp{" "}
                              {(tx.amount || 0).toLocaleString("id-ID")}
                      </span>
                          }
                      />
                  );
                })
            ) : (
                <p className="text-grey text-sm text-center py-8 italic m-auto">
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
