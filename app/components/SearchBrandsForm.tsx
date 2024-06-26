import { Input } from "@material-tailwind/react";
import React, { useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useRouter, useSearchParams } from "next/navigation";

export default function SearchBrandsForm() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (!query) return;
        router.push(`/brandes/search?query=${query}`);
      }}
      className="w-full md:w-72"
    >
      <Input
        label="Search"
        icon={
          <button>
            <MagnifyingGlassIcon className="h-5 w-5" />
          </button>
        }
        value={query}
        onChange={({ target }) => setQuery(target.value)}
      />
    </form>
  );
}
