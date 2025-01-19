import React, { useState } from "react";

import type { Filters, TreeNodeProps } from "../../types";
  
  const TreeNode: React.FC<{ item: TreeNodeProps; filters: Filters }> = ({
    item,
    filters,
  }) => {
  const [expanded, setExpanded] = useState(false);

  const matchesFilters = () => {
    if (filters.text && !item.label.toLowerCase().includes(filters.text.toLowerCase())) {
        return false;
      }

    return true;
  };

  if (!matchesFilters()) return null;

  return (
    <div>
      <button onClick={() => setExpanded(!expanded)}>
        {expanded ? "-" : "+"} {item.label}
      </button>
      {expanded && item.children && (
        <div style={{ paddingLeft: "20px" }}>
          {item.children.map((child) => (
            <TreeNode key={child.id} item={child} filters={filters} />
          ))}
        </div>
      )}
    </div>
  );
};

export default TreeNode;