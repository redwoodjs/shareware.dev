"use client";

import { useEffect, useState } from "react";
import { AddOnRow } from "./AddOnRow";
import { Reorder } from "motion/react";
import { AddOnWithCategoryAndStatus } from "../DashboardPage";
import { Category } from "@generated/prisma";
import { updateAddOnOrder } from "../actions";
import { toast } from "sonner";

const AddOnTable = ({
  addOns,
  categories,
}: {
  addOns: AddOnWithCategoryAndStatus[];
  categories: Category[];
}) => {
  const [addons, setAddons] = useState(addOns);

  const handleReorder = async (newOrder: AddOnWithCategoryAndStatus[]) => {
    setAddons(newOrder);

    // Extract just the IDs in the new order
    const addOnIds = newOrder.map((addon) => addon.id);
    console.log({ addOnIds });

    try {
      const result = await updateAddOnOrder(addOnIds);
      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success("Order updated successfully");
      }
    } catch (error) {
      toast.error("Failed to update order");
    }
  };

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
        onReorder={handleReorder}
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
