import BrandTable from "@/app/components/BrandTable";
import UserTable from "@/app/components/UserTable";
import startDb from "@/app/lib/db";
import BrandModel from "@/app/models/BrandeModel";
import UserModel from "@/app/models/userModel";
import { redirect } from "next/navigation";
import React from "react";

interface Props {
  searchParams: { query: string; page: number };
}

const searchUsers = async (query: string, pageNo: number, perPage: number) => {
  const skipCount = (pageNo - 1) * perPage;
  await startDb();
  const users = await UserModel.find({
    $or: [
      { email: { $regex: query, $options: "i" } },
      { name: { $regex: query, $options: "i" } },
    ],
  })
    .sort("-createdAt")
    .skip(skipCount)
    .limit(perPage);

  const results = users.map(({ id, avatar, name, role, email }) => {
    return {
      id,
      avatar: avatar?.url,
      name,
      role,
      email,
    };
  });

  return JSON.stringify(results);
};

const USERS_PER_PAGE = 100;

export default async function AdminSearch({ searchParams }: Props) {
  const { query } = searchParams;
  const { page = "1" } = searchParams;

  if (isNaN(+page)) return redirect("/404");

  let hasMore = true;

  const results = JSON.parse(await searchUsers(query, +page, USERS_PER_PAGE));
  if (results.length < USERS_PER_PAGE) hasMore = false;
  else hasMore = true;

  return (
    <div>
      <UserTable
        users={results}
        showPageNavigator={false}
        currentPageNo={+page}
        hasMore={hasMore}
      />
    </div>
  );
}
