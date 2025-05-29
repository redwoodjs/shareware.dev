"use client";

import { useState } from "react";
import { AddOnRow } from "./AddOnRow";
import { Reorder } from "motion/react";

const AddOnTable = () => {
  const [addons, setAddons] = useState([
    { id: 1, name: "Addon 1" },
    { id: 2, name: "Addon 2" },
    { id: 3, name: "Addon 3" },
  ]);

  return (
    <div className="admin-addons-table">
      {/* table header */}
      <div></div>
      <div>Name</div>
      <div>Repo</div>
      <div>Tags</div>
      <div></div>

      {/* table body */}
      <Reorder.Group
        axis="y"
        values={addons}
        onReorder={setAddons}
        className="subgrid gap-y-3"
      >
        {addons.map((addon) => (
          <Reorder.Item key={addon.id} value={addon} className="subgrid">
            <AddOnRow addon={addon} />
          </Reorder.Item>
        ))}
      </Reorder.Group>
    </div>
  );
};

export { AddOnTable };
