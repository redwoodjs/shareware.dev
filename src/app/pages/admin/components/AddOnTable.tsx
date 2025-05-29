"use client";

import { useState } from "react";
import { AddOnRow } from "./AddOnRow";
import { Reorder } from "motion/react";
import { AddOnWithCategoryAndStatus } from "../DashboardPage";
import { Category } from "@generated/prisma";

const AddOnTable = ({
  addOns,
  categories,
}: {
  addOns: AddOnWithCategoryAndStatus[];
  categories: Category[];
}) => {
  const [addons, setAddons] = useState(addOns);

  return (
    <div className="admin-addons-table">
      {/* table header */}
      <div></div>
      <div>Name</div>
      <div>Repo</div>
      <div>Category</div>
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
            <AddOnRow addon={addon} categories={categories} />
          </Reorder.Item>
        ))}
      </Reorder.Group>
    </div>
  );
};

export { AddOnTable };
