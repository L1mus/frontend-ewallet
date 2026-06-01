import { useMemo } from "react";
import { useSearchParams, useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { Search, Star } from "lucide-react";
import Table from "../../components/organism/Table";
import TableContent from "../../components/molecules/TableContent";
import Avatar from "../../components/atoms/Avatar";
import Stepper from "../../components/molecules/Stepper";
import Send from "../../assets/icons/Send.svg?react";
import Input from "../../components/atoms/Input";

const Transfer = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get("search") || "";
  const navigate = useNavigate();

  const { loginUser } = useSelector((state) => state.loginReducer);
  const { registerUser } = useSelector((state) => state.registerReducer);

  const allUsers = useMemo(() => {
    const userMap = new Map();
    if (Array.isArray(registerUser)) {
      registerUser.forEach((u) => {
        if (u.email) userMap.set(u.email, u);
      });
    }
    return Array.from(userMap.values());
  }, [registerUser]);

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
        <div className="hidden md:flex items-center gap-2 mb-6 text-primary">
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

      <div className="w-full bg-white md:border md:border-grey-light md:rounded-xl md:shadow-sm p-3 md:p-8">
        <div className="flex flex-col md:flex-row md:items-start justify-between mb-8 px-4 md:px-0 gap-4">
          <div>
            <h2 className="font-bold text-black text-lg">Find People</h2>
            <p className="text-sm font-medium text-grey mt-1">
              {filteredPeople.length} Result Found
              {searchQuery && `For ${searchQuery}`}
            </p>
          </div>
          <div className="relative w-full md:w-87.5">
            <Input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Enter Number Or Full Name"
            />
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-grey w-4 h-4" />
          </div>
        </div>
        <div className="w-full overflow-x-auto">
          <Table>
            {filteredPeople.length > 0 ? (
              filteredPeople.map((item, index) => (
                <TableContent
                  key={index}
                  onClick={() => navigate("/transfer/detail", { state: { receiver: item } })}
                  className={`cursor-pointer hover:bg-primary/5 transition-colors ${index % 2 === 0 ? "bg-gray-100" : "bg-white"}`}
                >
                  <td className="px-2 py-4 md:px-6">
                    <div className="flex items-center gap-3 md:gap-6">
                      <Avatar
                        imageSrc={item.profile_picture_url}
                        className="w-12 h-12 rounded-lg shrink-0"
                      />
                      <div className="flex flex-row justify-between items-center flex-1">
                        <span className="text-grey font-bold md:font-medium">
                          {item.full_name}
                        </span>
                        <span className="text-grey text-sm mt-0.5">
                          {item.phone || `-`}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="hidden md:table-cellpx-2 py-4 md:px-6 text-grey text-center">
                    {item.phone || "-"}
                  </td>
                  <td className="px-2 py-4 md:px-6 text-right">
                    <Star className="text-gray-400 hover:text-yellow-400 w-5 h-5 ml-auto" />
                  </td>
                </TableContent>
              ))
            ) : (
              <tr className="bg-white">
                <td colSpan="3" className="py-20 text-center text-grey italic">
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
