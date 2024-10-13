import { Card } from "@/components/ui/card";
import { convertToLocalBangladeshTime } from "@/lib/convertTime";
import { secondaryFont } from "@/lib/fonts";
import { Calendar, Clock9, Feather, Hash } from "lucide-react";
import Link from "next/link";

const blog = {
  id: "1",
  title: "নমাজের গুরুত্ব এবং এর উপকারিতা",
  content: {
    text: "নমাজ ইসলাম ধর্মের একটি মৌলিক ইবাদত। প্রতিদিন পাঁচবার আল্লাহর সামনে দাঁড়িয়ে আমরা নমাজ আদায় করি। নমাজ আমাদের জীবনে শান্তি, প্রেরণা এবং সংগতি নিয়ে আসে। এটি আমাদেরকে আমাদের কাজের জন্য শক্তি জোগায় এবং মহান আল্লাহর সাথে আমাদের সম্পর্ককে আরও শক্তিশালী করে।",
    richText:
      "<p>নমাজ ইসলাম ধর্মের একটি মৌলিক ইবাদত। প্রতিদিন পাঁচবার আল্লাহর সামনে দাঁড়িয়ে আমরা নমাজ আদায় করি। নমাজ আমাদের জীবনে শান্তি, প্রেরণা এবং সংগতি নিয়ে আসে। এটি আমাদেরকে আমাদের কাজের জন্য শক্তি জোগায় এবং মহান আল্লাহর সাথে আমাদের সম্পর্ককে আরও শক্তিশালী করে।</p>",
  },
  dateWritten: "2024-10-13",
  readingTime: "5 মিনিট",
  keywords: ["নমাজ", "ইসলাম", "ইবাদত", "আল্লাহ"],
  originalPostLink: "https://example.com/articles/namazer-gorutto",
  authorId: "author-123",
  totalViews: 0,
  author: {
    name: "Asif adnan",
    image: "example.com",
  },
};

export default async function page({ params }: { params: { slug: string } }) {
  const id = params.slug.split("-").pop();

  return (
    <article className="mt-10">
      <Card className="p-4">
        <h1
          className={`text-center line-clamp-3 ${secondaryFont.className} text-2xl md:text-3xl`}
        >
          {blog.title}
        </h1>

        <div className="mt-6 flex flex-wrap gap-6 justify-center">
          <div className=" flex items-center gap-2 justify-center">
            <Feather /> <p>{blog.author.name}</p>
          </div>
          <div className=" flex items-center gap-2 justify-center">
            <Calendar />
            <p>{convertToLocalBangladeshTime(blog.dateWritten)}</p>
          </div>
          <div className=" flex items-center gap-2 justify-center">
            <Clock9 /> <p>{blog.readingTime}</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-x-6 gap-y-1 justify-center mt-6">
          {blog.keywords.map((key) => (
            <Link href={`/articles?page=1&query=${key}`} key={key}>
              <div className="flex items-center gap-1">
                <Hash size={18} /> <p>{key}</p>
              </div>
            </Link>
          ))}
        </div>
      </Card>
    </article>
  );
}
