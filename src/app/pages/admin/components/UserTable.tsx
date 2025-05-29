"use client";

import { UserWithRole } from "@/worker";
import { UserRow } from "./UserRow";
import { Role } from "@generated/prisma";

const UserTable = ({
  users,
  roles,
}: {
  users: UserWithRole[];
  roles: Role[];
}) => {
  return (
    <div className="admin-users-table">
      {/* table header */}
      <div>Name</div>
      <div>Email</div>
      <div>Role</div>
      <div></div>

      {users.map((user) => (
        <UserRow key={user.id} user={user} roles={roles} />
      ))}
    </div>
  );
};

export { UserTable };
