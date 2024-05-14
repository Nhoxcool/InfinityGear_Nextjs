import { Avatar } from "@material-tailwind/react";
import { PencilIcon } from "@heroicons/react/24/solid";

interface ProfileAvatarProps {
  avatar?: string;
  nameInitial: string;
  onChange?(file: File): void;
}

export function ProfileAvatarInput({
  avatar,
  nameInitial,
  onChange,
}: ProfileAvatarProps) {
  return (
    <div className="flex items-center space-x-4">
      <div className="relative inline-block">
        {avatar ? (
          <Avatar src={avatar} className="w-28 h-28" />
        ) : (
          <Avatar
            src="https://th.bing.com/th/id/OIP.lkVN1WDlcV2jQCq-9LT7-wHaIJ?rs=1&pid=ImgDetMain"
            className="w-28 h-28"
          />
        )}
        <label
          className="absolute top-2 right-0 rounded-full bg-white"
          htmlFor="avatar"
        >
          <input
            onChange={({ target }) => {
              const { files } = target;
              if (files) onChange && onChange(files[0]);
            }}
            type="file"
            id="avatar"
            hidden
            accept="image/*"
          />
          <PencilIcon className="h-6 w-6 p-1 cursor-pointer" />
        </label>
      </div>
    </div>
  );
}
