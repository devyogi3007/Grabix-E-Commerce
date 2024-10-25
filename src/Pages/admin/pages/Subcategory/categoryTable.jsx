import React from "react";

const TreeTable = ({ data }) => {
  // Function to find children of a given parent
  const findChildren = (parentId) => {
    return data.filter((item) => item.parentCategoryId === parentId);
  };

  // Recursive function to render tree rows
  const renderRows = (parentId, level = 0) => {
    const children = findChildren(parentId);

    return children.map((item) => (
      <React.Fragment key={item.id}>
        <tr>
          {/* Adjust padding based on tree level */}
          <td className={`pl-${level * 4} py-2 border-b`}>{item.name}</td>
        </tr>
        {/* Recursively render children */}
        {renderRows(item.parentCategoryId, level + 1)}
      </React.Fragment>
    ));
  };

  return (
    <div className="container mx-auto mt-6">
      <table className="min-w-full table-auto border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="bg-gray-100 text-left px-4 py-2 border-b">
              Category
            </th>
          </tr>
        </thead>
        <tbody>
          {/* Render the root categories (parentCategoryId = null) */}
          {renderRows("")}
        </tbody>
      </table>
    </div>
  );
};
export default TreeTable;
