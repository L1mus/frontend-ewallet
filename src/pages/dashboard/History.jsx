import { useMemo, useState } from "react";
import { useSearchParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { Search, History as HistoryIcon, Trash2 } from "lucide-react";

import Table from "../../components/organism/Table";
import TableContent from "../../components/molecules/TableContent";
import Pagination from "../../components/molecules/Pagination";
import ModalConfirm from "../../components/organism/ModalConfirm";
import Avatar from "../../components/atoms/Avatar";
import cn from "../../utils/cn";
import { transactionActions } from "../../redux/slice/transactionSlice";

const History = () => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const [modalState, setModalState] = useState({ isOpen: false, id: null });

  const itemsPerPage = 10;
  const searchQuery = searchParams.get("search") || "";
  const currentPage = parseInt(searchParams.get("page") || "1", 10);

  const { transactions } = useSelector((state) => state.transactionReducer);
  const { loginUser } = useSelector((state) => state.authReducer);

  const userTransactions = useMemo(() => {
    if (!Array.isArray(transactions)) return [];
    return transactions
  }, [transactions, loginUser?.id]);

  const displayData = useMemo(() => {
    const formatted = userTransactions.map((tx) => {
      const displayName = tx.receiver_name
      const displayAvatar = tx.profile_picture_url
      const amountSign = tx.type === "expense" ? "-" : "+";
      const amountClass = tx.type ==="expense" ? "text-danger" : "text-success";

      return {
        ...tx,
        displayName,
        displayAvatar,
        amountSign,
        amountClass,
        searchString: `${displayName} ${tx.phone || ""}`.toLowerCase(),
      };
    });
    return formatted.filter((item) =>
        item.searchString.includes(searchQuery.toLowerCase()),
    );
  }, [userTransactions, loginUser?.id, searchQuery]);

  const totalItems = displayData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return displayData.slice(startIndex, startIndex + itemsPerPage);
  }, [displayData, currentPage]);

  const handlePageChange = (page) => {
    setSearchParams({ search: searchQuery, page: page.toString() });
  };

  const handleConfirmDelete = async () => {
    if (modalState.id) {
      try {
        await dispatch(transactionActions.deleteTransactionHistory(modalState.id)).unwrap();
        setModalState({ isOpen: false, id: null });
      } catch (error) {
        console.error("Failed to delete transaction:", error);
      }
    }
  };

  return (
    <div className="w-full pb-10">
      <div className="hidden md:flex items-center gap-2 mb-6 text-primary">
        <HistoryIcon size={24} />
        <h1 className="text-xl font-bold text-black">History Transaction</h1>
      </div>

      <div className="w-full bg-white md:border md:border-grey-light md:rounded-xl md:shadow-sm p-3 md:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4 px-4 md:px-0">
          <span className="font-bold text-black text-lg">Find Transaction</span>
          <div className="relative w-full md:w-87.5">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) =>
                  setSearchParams({ search: e.target.value, page: "1" })}
              placeholder="Enter Number Or Full Name"
              className="w-full border border-grey rounded-lg px-4 py-2.5 pr-10 outline-none text-sm text-grey font-medium focus:border-primary transition-all placeholder:text-grey placeholder:font-medium"
            />
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-grey w-4 h-4" />
          </div>
        </div>
        <div className="w-full overflow-x-auto">
          <Table>
            {paginatedData.length > 0 ? (
                paginatedData.map((item, index) => (
                <TableContent
                  key={index}
                  className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
                >
                  <td className="px-2 py-4 md:px-6">
                    <div className="flex items-center gap-3 md:gap-6">
                      <Avatar
                        imageSrc={item.displayAvatar}
                        className="hidden md:block w-12 h-12 rounded-lg shrink-0"
                      />
                      <span className="text-grey font-bold md:font-medium">
                        {item.displayName}
                      </span>
                    </div>
                  </td>
                  <td className="hidden md:table-cell px-2 py-4 md:px-6 text-grey font-normal">
                    {item.phone}
                  </td>
                  <td className="px-2 py-4 md:px-6 text-grey text-sm md:text-base font-medium">
                    {item.created_at
                        ? new Date(item.created_at).toLocaleDateString("id-ID", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })
                        : "-"}
                  </td>
                  <td className="px-2 py-4 md:px-6">
                    <span className={cn("text-sm md:text-base font-bold", item.amountClass)}>
                      {item.amountSign} Rp.{" "}
                      {new Intl.NumberFormat("id-ID").format(item.amount || 0)}
                    </span>
                  </td>
                  <td className="hidden md:table-cell px-2 py-4 md:px-6 text-right">
                    <button
                      onClick={() =>
                        setModalState({ isOpen: true, id: item.id })
                      }
                      className="p-1.5 rounded-lg hover:bg-danger/10 transition-colors group cursor-pointer"
                    >
                      <Trash2 className="w-5 h-5 text-danger opacity-80 group-hover:opacity-100" />
                    </button>
                  </td>
                </TableContent>
              ))
            ) : (
              <tr className="bg-white">
                <td
                  colSpan="4"
                  className="py-20 text-center text-grey-light italic"
                >
                  No history matches your search "{searchQuery}"
                </td>
              </tr>
            )}
          </Table>
        </div>

        {totalItems > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={totalItems}
            itemsPerPage={itemsPerPage}
            onPageChange={handlePageChange}
          />
        )}
      </div>

      <ModalConfirm
        isOpen={modalState.isOpen}
        onClose={() => setModalState({ isOpen: false, id: null })}
        onConfirm={handleConfirmDelete}
        title="Delete Transaction?"
        message="Are you sure you want to remove this record from your history? You can't undo this later."
        confirmText="Yes, Delete it"
        variant="danger"
      />
    </div>
  );
};

export default History;
