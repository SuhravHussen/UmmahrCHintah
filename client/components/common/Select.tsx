"use client";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export function SelectComponent({
  placeholder,
  items,
  queryParam,
}: {
  placeholder: string;
  items: {
    label: string;
    value: string;
  }[];
  queryParam: string;
}) {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  const handleChange = (v: string) => {
    const params = new URLSearchParams(searchParams);
    params.set(queryParam, v);
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <Select onValueChange={(v) => handleChange(v)}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {items?.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
