import React from "react";

const Table = ({ children }) => {
  return (
    <div className="custom-scrollbar w-full overflow-x-auto">
      <table className="w-full min-w-0 table-auto border-collapse md:min-w-175">
        <tbody>{children}</tbody>
      </table>
    </div>
  );
};

export default Table;
