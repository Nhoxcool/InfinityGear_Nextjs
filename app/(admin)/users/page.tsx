import UserTable, { User } from '@/app/components/UserTable';
import startDb from '@/app/lib/db';
import BrandModel from '@/app/models/BrandeModel';
import UserModel from '@/app/models/userModel';
import { redirect } from 'next/navigation';
import React from 'react';

const fetchUsers = async (pageNo: number, perPage: number): Promise<User[]> => {
  const skipCount = (pageNo - 1) * perPage;
  await startDb();
  const users = await UserModel.find()
    .sort('-createdAt')
    .skip(skipCount)
    .limit(perPage);
  return users.map((users) => {
    return {
      id: users._id.toString(),
      avatar: users.avatar?.url,
      email: users.email,
      name: users.name,
      role: users.role,
    };
  });
};

const USER_PER_PAGE = 10;

interface Props {
  searchParams: { page: string };
}

export default async function Brandes({ searchParams }: Props) {
  const { page = '1' } = searchParams;

  if (isNaN(+page)) return redirect('/404');

  const users = await fetchUsers(+page, USER_PER_PAGE);
  let hasMore = true;

  if (users.length < USER_PER_PAGE) hasMore = false;
  else hasMore = true;

  return (
    <div>
      <UserTable users={users} currentPageNo={+page} hasMore={hasMore} />
    </div>
  );
}
