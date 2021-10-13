import { useState } from "react";

const CellData = ({ data, setData, rowID, cellID, className }) => {
  const [isEditing, setIsEditing] = useState(false);
  return (
    <td
      onClick={() => {
        setIsEditing(true);
      }}
      onBlur={(e) => {
        setData(({ rows, headers }) => {
          rows[rowID][cellID] = e.target.innerText;
          return {
            headers,
            rows,
          };
        });
      }}
      contentEditable={isEditing}
      className={"border p-1 px-2 overflow-x-auto select-none " + className}
    >
      {data}
    </td>
  );
};

export default CellData;
