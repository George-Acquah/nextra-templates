import { getInitials } from '@/utils';
import Image from 'next/image';
import React from 'react';

interface AvatarProps {
  name: string
  size?: number
  imageUrl?: string
}

export const Avatar: React.FC<AvatarProps> = ({
  name,
  size = 96,
  imageUrl,
}) => {
  const initials = getInitials(name);

  return (
    <div className="flex items-center gap-2">
      {imageUrl ? (
        <Image
          width={size}
          height={size}
          src={imageUrl}
          alt={name}
          className="w-10 h-10 rounded-full object-cover"
        />
      ) : (
        <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-200 font-semibold">
          {initials}
        </div>
      )}
      <span className="text-sm font-medium sr-only">{name}</span>
    </div>
  );
};
