import { useEffect, useMemo } from "react";
import { useSearchParams, useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { Search, Star } from "lucide-react";
import Table from "../../components/organism/Table";
import TableContent from "../../components/molecules/TableContent";
import Avatar from "../../components/atoms/Avatar";
import Stepper from "../../components/molecules/Stepper";
import Send from "../../assets/icons/Send.svg?react";
import Input from "../../components/atoms/Input";
import { transactionActions } from "../../redux/slice/transactionSlice";

const Transfer = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get("search") || "";
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loginUser } = useSelector((state) => state.authReducer);
  const { transferReceiver } = useSelector((state) => state.transactionReducer);

  useEffect(() => {
    dispatch(transactionActions.getDataReceiver());
  }, [dispatch]);

  const allUsers = useMemo(() => {
    if (!Array.isArray(transferReceiver)) return [];
    return transferReceiver;
  }, [transferReceiver]);

  const filteredPeople = useMemo(() => {
    return allUsers.filter((user) => {
      const isNotMe = user.email !== loginUser?.email;
      const query = searchQuery.toLowerCase();
      const matchName = user.full_name?.toLowerCase().includes(query);
      const matchPhone = user.phone?.includes(query);
      return isNotMe && (matchName || matchPhone);
    });
  }, [allUsers, loginUser, searchQuery]);

  const handleSearchChange = (e) => {
    const val = e.target.value;
    if (val) {
      setSearchParams({ search: val });
    } else {
      searchParams.delete("search");
      setSearchParams(searchParams);
    }
  };

  return (
    <div className="w-full pb-10">
      <div className="mb-6">
        <div className="text-primary mb-6 hidden items-center gap-2 md:flex">
          <Send className={"text-2xl font-bold"} />
          <h1 className="text-xl font-bold text-black">Transfer Money</h1>
        </div>
        <div>
          <Stepper
            steps={["Find People", "Set Nominal", "Finish"]}
            activeStep={0}
          />
        </div>
      </div>

      <div className="md:border-grey-light w-full bg-white p-3 md:rounded-xl md:border md:p-8 md:shadow-sm">
        <div className="mb-8 flex flex-col justify-between gap-4 px-4 md:flex-row md:items-start md:px-0">
          <div>
            <h2 className="text-lg font-bold text-black">Find People</h2>
            <p className="text-grey mt-1 text-sm font-medium">
              {filteredPeople.length} Result Found
              {searchQuery && ` For ${searchQuery}`}
            </p>
          </div>
          <div className="relative w-full md:w-87.5">
            <Input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Enter Number Or Full Name"
            />
            <Search className="text-grey absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2" />
          </div>
        </div>
        <div className="w-full overflow-x-auto">
          <Table>
            {filteredPeople.length > 0 ? (
              filteredPeople.map((item, index) => (
                <TableContent
                  key={index}
                  onClick={() =>
                    navigate("/transfer/detail", { state: { receiver: item } })
                  }
                  className={`hover:bg-primary/5 cursor-pointer transition-colors ${index % 2 === 0 ? "bg-gray-100" : "bg-white"}`}
                >
                  <td className="px-2 py-4 md:px-6">
                    <div className="flex items-center gap-3 md:gap-6">
                      <Avatar
                        imageSrc={item.profile_picture_url}
                        className="h-12 w-12 shrink-0 rounded-lg"
                      />
                      <div className="flex flex-1 flex-row items-center justify-between">
                        <span className="text-grey font-bold md:font-medium">
                          {item.full_name}
                        </span>
                        <span className="text-grey mt-0.5 text-sm">
                          {item.phone || `-`}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="text-grey hidden px-2 py-4 text-center md:table-cell md:px-6">
                    {item.phone || "-"}
                  </td>
                  <td className="px-2 py-4 text-right md:px-6">
                    <Star className="ml-auto h-5 w-5 text-gray-400 hover:text-yellow-400" />
                  </td>
                </TableContent>
              ))
            ) : (
              <tr className="bg-white">
                <td colSpan="3" className="text-grey py-20 text-center italic">
                  No people found
                </td>
              </tr>
            )}
          </Table>
        </div>
      </div>
    </div>
  );
};

export default Transfer;
