"use client";
import {
  Typography,
  CardBody,
  CardFooter,
  Avatar,
  IconButton,
  Button,
} from "@material-tailwind/react";
import truncate from "truncate";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "react-toastify";
import { updateRole } from "../(admin)/users/action";
import SearchForm from "./SearchForm";
import DeleteUserModal from "./DeleteUserModel";

export interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  avatar?: string;
}

interface Props {
  users: User[];
  currentPageNo: number;
  hasMore?: boolean;
  showPageNavigator?: boolean;
}

export default function UserTable(props: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [selectedRole, setSelectedRole] = useState<string>("all");
  const [selectedRoles, setSelectedRoles] = useState<{
    [userId: string]: string;
  }>({});
  let TABLE_HEAD = ["Email", "Name", "Role", "DELETE"];
  const {
    users: users = [],
    currentPageNo,
    hasMore,
    showPageNavigator = true,
  } = props;

  const filteredUsers =
    selectedRole === "all"
      ? users
      : users.filter((user) => user.role === selectedRole);

  const handleRoleSort = (role: string) => {
    setSelectedRole(role);
  };

  const handleRoleChange = async (
    userId: string,
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { value } = event.target;
    await updateRole(userId, value);
    toast.success("Update role successfully!");
    router.refresh();
  };

  const handleOnPrevPress = () => {
    const prevPage = currentPageNo - 1;
    if (prevPage > 0) router.push(`/brandes?page=${prevPage}`);
  };

  const handleOnNextPress = () => {
    const nextPage = currentPageNo + 1;
    router.push(`/brandes?page=${nextPage}`);
  };

  return (
    <div className="py-5">
      <div className="mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center">
        <div>
          <Typography variant="h5" color="blue-gray">
            User
          </Typography>
        </div>
        <div className="flex w-full shrink-0 gap-2 md:w-max">
          <SearchForm />
          <Button
            onClick={() => handleRoleSort("all")}
            color={selectedRole === "all" ? "blue" : "gray"}
          >
            All
          </Button>
          <Button
            onClick={() => handleRoleSort("user")}
            color={selectedRole === "user" ? "blue" : "gray"}
          >
            User
          </Button>
          <Button
            onClick={() => handleRoleSort("admin")}
            color={selectedRole === "admin" ? "blue" : "gray"}
          >
            Admin
          </Button>
        </div>
      </div>
      <CardBody className="px-0">
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((item, index) => {
              const { id, email, avatar, name, role } = item;
              const isLast = index === users.length - 1;
              const classes = isLast
                ? "p-4"
                : "p-4 border-b border-blue-gray-50";

              return (
                <tr key={id}>
                  <td className={classes}>
                    <div className="flex items-center gap-3">
                      <Avatar
                        src={
                          avatar
                            ? avatar
                            : "https://th.bing.com/th/id/OIP.lkVN1WDlcV2jQCq-9LT7-wHaIJ?rs=1&pid=ImgDetMain"
                        }
                        alt={avatar}
                        size="sm"
                        variant="circular"
                      />
                      <>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-bold"
                        >
                          {truncate(email, 30)}
                        </Typography>
                      </>
                    </div>
                  </td>
                  <td className={classes}>
                    <div className="w-max">
                      <Typography variant="small" color="blue-gray">
                        {name}
                      </Typography>
                    </div>
                  </td>
                  <td className={classes}>
                    <div className="w-max">
                      <select
                        value={selectedRoles[id] || role}
                        disabled={isPending}
                        onChange={(e) => {
                          startTransition(async () => handleRoleChange(id, e));
                        }}
                        className="rounded-lg px-3 py-2 border border-gray-300 bg-white shadow-sm focus:outline-none focus:border-blue-400 focus:ring focus:ring-blue-400 focus:ring-opacity-50"
                      >
                        <option value="admin">Admin</option>
                        <option value="user">User</option>
                      </select>
                    </div>
                  </td>

                  <td className={classes}>
                    <DeleteUserModal userId={id} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </CardBody>
      {showPageNavigator ? (
        <CardFooter className="flex items-center justify-center border-t border-blue-gray-50 p-4">
          <div className="flex items-center gap-2">
            <Button
              disabled={currentPageNo === 1}
              onClick={handleOnPrevPress}
              variant="text"
            >
              Previous
            </Button>
            <Button
              disabled={!hasMore}
              onClick={handleOnNextPress}
              variant="text"
            >
              Next
            </Button>
          </div>
        </CardFooter>
      ) : null}
    </div>
  );
}
