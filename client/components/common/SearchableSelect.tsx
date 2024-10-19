"use client";

import * as React from "react";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { IAuthor } from "@/interfaces/Author.interface";

export function SearchableSelect({
  authors,
  selectedAuthor,
  setSelectedAuthor,
}: {
  authors: IAuthor[];
  selectedAuthor: IAuthor;
  setSelectedAuthor: React.Dispatch<React.SetStateAction<IAuthor>>;
}) {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {selectedAuthor.name ? selectedAuthor.name : "Select author..."}
          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search author..." className="h-9" />
          <CommandList>
            <CommandEmpty>No author found.</CommandEmpty>
            <CommandGroup>
              {authors.map((author) => (
                <CommandItem
                  key={author.id}
                  value={JSON.stringify({ id: author.id, name: author.name })}
                  onSelect={(currentValue) => {
                    const selected = JSON.parse(currentValue);
                    setSelectedAuthor(
                      selected.id === selectedAuthor.id
                        ? { name: "", id: "" }
                        : selected
                    );
                    setOpen(false);
                  }}
                >
                  {author.name}
                  <CheckIcon
                    className={cn(
                      "ml-auto h-4 w-4",
                      selectedAuthor.id === author.id
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
