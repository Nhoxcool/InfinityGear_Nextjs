// "use client";
// import React, { useState } from "react";
// import { Button, Input } from "@material-tailwind/react";
// import ProfileAvatarInput from "@components/ProfileAvatarInput";

// interface Props {
//   avatar: string;
//   name: string;
//   email: string;
//   id: string;
// }

// export default function ProfileForm({ name, avatar, email }: Props) {
//   const [avatarFile, setAvatarFile] = useState<File>();
//   const [userName, setUserName] = useState(name);

//   const avatarSource = avatarFile ? URL.createObjectURL(avatarFile) : avatar;
//   const showSubmitButton = avatarSource !== avatar || userName !== name;

//   return (
//     <form className="space-y-6">
//       <ProfileAvatarInput
//         onChange={setAvatarFile}
//         nameInitial={name[0]}
//         avatar={avatarSource}
//       />
//       <div className="text-sm">Email: {email}</div>
//       <Input
//         onChange={({ target }) => setUserName(target.value)}
//         label="Name"
//         value={userName}
//         className="font-semibold"
//       />
//       {showSubmitButton ? (
//         <Button
//           type="submit"
//           className="w-full shadow-none hover:shadow-none hover:scale-[0.98]"
//           color="blue"
//         >
//           Submit
//         </Button>
//       ) : null}
//     </form>
//   );
// }
