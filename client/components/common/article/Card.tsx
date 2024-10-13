import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Clock9, Eye, Feather } from "lucide-react";
import Link from "next/link";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function ArticleCard({ article }: { article: any }) {
  return (
    <Link href={`/articles/${article.title}-${article.id}`}>
      <Card className="cursor-pointer hover:bg-card-hover">
        <CardHeader>
          <CardTitle className="truncate">{article.title}</CardTitle>
          <CardDescription className="text-justify line-clamp-3">
            ভোর ৪:৩৮ এ বাস নামিয়ে দিলো চান্দিনা। এত তাড়াতাড়ি চলে আসবো ভাবতেও
            পারিনি। ফজরের জামাত ৬:১০ এ। এখনো প্রায় দেড় ঘন্টা বাকি। কি করবো বুঝে
            উঠতে পারছিলাম না। রামমোহন রোডের মাথায় গিয়ে দেখলাম একটা সিএনজি
            দাঁড়িয়ে আছে। ভাড়া চাইলো দেড়শো। ১২০ পর্যন্ত বলে একটা চায়ের দোকানে এসে
            বসলাম। পরোটা ভাজছে সাথে চলছে স্পিকারে কাওয়ালি গান। ভাবলাম এই ভাড়ায়
            না গেলে ফজর পর্যন্ত চুপচাপ এখানেই বসে থাকবো। ড্রাইভারও এসে দাঁড়ালো।
            অনেক্ষণ চুপচাপ বসে থাকার পর আরেকজন সিএনজির ড্রাইভার এসে বসলো। কই
            যাবেন? ইত্যারপুর। কত দিবেন? ১২০ বলছি উনাকে। উনি ড্রাইভারকে জিজ্ঞেস
            করলেন, আপনি যাবেন? না গেলে আমিই যাই? ড্রাইভার কিছুক্ষণ গাইগুই করে
            রাজি হলেন। রাস্তা পুরো ফাঁকা, ১০ মিনিটের মাথায় বাড়ির সামনে নামিয়ে
            দিলেন।
          </CardDescription>
        </CardHeader>
        <CardFooter className="flex flex-col items-start">
          <div className="flex gap-4 items-center">
            <p className="flex text-sm items-center gap-2">
              <Clock9 size={15} /> 14 MIN READ
            </p>
            <p className="flex text-sm items-center gap-2">
              <Eye size={15} /> 232
            </p>
          </div>
          <p className="flex text-sm items-center gap-2 mt-3">
            <Feather size={15} /> Asif Adnan
          </p>
        </CardFooter>
      </Card>
    </Link>
  );
}
