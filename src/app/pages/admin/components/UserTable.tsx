"use client";

import { UserRow } from "./UserRow";

const UserTable = () => {
  return (
    <div className="admin-users-table">
      {/* table header */}
      <div>Name</div>
      <div>Email</div>
      <div></div>

      <UserRow />
      <UserRow />
      <UserRow />
    </div>
  );
};

export { UserTable };
