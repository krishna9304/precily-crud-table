import { useState } from "react";

const Header = ({ heading, setData, cellID }) => {
  const [isEditing, setIsEditing] = useState(false);
  return (
    <th
      onClick={() => {
        setIsEditing(true);
      }}
      onBlur={(e) => {
        setData(({ rows, headers }) => {
          headers[cellID] = e.target.innerText;
          return {
            headers,
            rows,
          };
        });
      }}
      contentEditable={isEditing}
      className="border p-1 px-2 overflow-x-auto select-none"
    >
      {heading}
    </th>
  );
};

export default Header;
