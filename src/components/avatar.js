import { useUser } from '@clerk/nextjs';
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from 'src/components/ui/avatar';

const Avatars = ({ role = 'user' }) => {
  const { user } = useUser();
  return (
    <>
      {role === 'user' ? (
        <Avatar>
          <AvatarImage
            src={user?.imageUrl}
            alt={user?.firstName + ' ' + user?.lastName}
          />
          <AvatarFallback>
            {user?.firstName?.charAt(0).toUpperCase()}
            {user?.lastName?.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      ) : (
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      )}
    </>
  );
};

export default Avatars;
