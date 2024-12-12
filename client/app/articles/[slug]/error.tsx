"use client";

import { Separator } from "@/components/ui/separator";
import { primaryFont, secondaryFont } from "@/lib/fonts";
import React from "react";

export default function Error() {
  return (
    <div className="mt-16 min-h-[75vh]">
      <h1 className={`${primaryFont.className} text-5xl text-center `}>
        ঊম্মাহর চিন্তাহ
      </h1>
      <p
        className={`leading-7 ${secondaryFont.className} text-pretty text-center mt-6 text-lg md:text-2xl mb-8`}
      >
        এই ওয়েবসাইটের মূল উদ্দেশ্য হলো বিভিন্ন ইসলামিক লেখকের লেখাগুলোকে এক
        প্ল্যাটফর্মে নিয়ে আসা, যাতে পাঠকরা সহজেই লেখাগুলো খুঁজে পেতে এবং পড়তে
        পারেন।
      </p>

      <Separator />

      <div className="flex justify-center items-center h-[80vh] overflow-hidden">
        <h1>Sorry ! Backend is sleeping</h1>
      </div>
    </div>
  );
}
