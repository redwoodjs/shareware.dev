import { link } from "../../../shared/links";

const AdminNav = () => {
  return (
    <aside className="aside-nav">
      <ul className="font-chicago flex flex-col gap-y-3">
        <li>
          <a href={link("/admin/")}>Add Ons</a>
        </li>
        <li>
          <a href={link("/admin/users")}>Users</a>
        </li>
      </ul>
    </aside>
  );
};

export { AdminNav };
