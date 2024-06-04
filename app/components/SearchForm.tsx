import { Input } from "@material-tailwind/react";
import React, { useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useRouter, useSearchParams } from "next/navigation";

interface Props {
  submitTo: string;
  onClose?: React.MouseEventHandler<SVGSVGElement>;
}

export default function SearchForm({ submitTo, onClose }: Props) {
  const [query, setQuery] = useState("");
  const router = useRouter();
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (!query) return;
        router.push(`${submitTo}${query}`);
      }}
      className="w-full"
    >
      <Input
        label="Search"
        icon={
          <button>
            <MagnifyingGlassIcon className="h-5 w-5" onClick={onClose} />
          </button>
        }
        value={query}
        onChange={({ target }) => setQuery(target.value)}
      />
    </form>
  );
}
