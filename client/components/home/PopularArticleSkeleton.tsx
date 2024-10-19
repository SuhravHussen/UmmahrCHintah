import { secondaryFont } from "@/lib/fonts";
import { Feather } from "lucide-react";
import React from "react";

export default function PopularArticleSkeleton() {
  return (
    <div className="mt-8">
      <h1
        className={`${secondaryFont.className} text-xl md:text-2xl flex gap-2 items-center`}
      >
        জনপ্রিয় প্রবন্ধসমূহ <Feather />
      </h1>
      <div className="flex flex-col gap-4 mt-4">
        {Array(5)
          .fill("")
          .map((_, index) => (
            <div
              key={index}
              className="animate-pulse flex flex-col gap-2 p-4 border border-gray-200 rounded-lg bg-gray-100"
            >
              <div className="h-6 bg-gray-200 rounded w-1/3"></div>
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            </div>
          ))}
      </div>
    </div>
  );
}
