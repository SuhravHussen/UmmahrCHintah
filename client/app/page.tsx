import PopularArticles from "@/components/home/PopularArticles";
import PopularArticleSkeleton from "@/components/home/PopularArticleSkeleton";
import RecentArticles from "@/components/home/RecentArticles";
import RecentArticleSkeleton from "@/components/home/RecentArticleSkeleton";

import { Separator } from "@/components/ui/separator";
import { primaryFont, secondaryFont } from "@/lib/fonts";
import { Suspense } from "react";

export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <div className="mt-16">
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
      <Suspense fallback={<PopularArticleSkeleton />}>
        <PopularArticles />
      </Suspense>
      <Suspense fallback={<RecentArticleSkeleton />}>
        <RecentArticles />
      </Suspense>
    </div>
  );
}
