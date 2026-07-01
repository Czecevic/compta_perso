"use client";

import { userProps } from "@/interface";

export const UserView = ({ users, id }: userProps) => {
  const payed = (id: number) => {
    console.log(id);
  };
  return (
    <div>
      {users.map((user) => (
        <div className="flex w-full items-center gap-3" key={user.id}>
          <input
            type="checkbox"
            name="id"
            value={id}
            id={`ticket-${id}-user-${user.id}`}
            onClick={() => payed(id)}
          />
          <label
            htmlFor={`ticket-${id}-user-${user.id}`}
            className="cursor-pointer"
          >
            {user.name}
          </label>
        </div>
      ))}
    </div>
  );
};
