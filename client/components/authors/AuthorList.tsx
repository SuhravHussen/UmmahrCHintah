import { getAuthors } from "@/actions/getAuthors";
import AuthorCard from "../common/author/AuthorCard";

export default async function AuthorList({
  currentPage,
}: {
  currentPage: number;
}) {
  const authors = [
    {
      id: "sdsdsdads",
      name: "Asif Adnan",
      image: "https://example.com/images/asif-adnan.jpg",
    },
    {
      id: "3423bkj23",
      name: "Suhrav Hussen",
      image: "https://example.com/images/suhrav-hussen.jpg",
    },
    {
      id: "34092bn93h",
      name: "Rahim Uddin",
      image: "https://example.com/images/rahim-uddin.jpg",
    },
    {
      id: "34092bn93qwrec4h",
      name: "Sara Akter",
      image: "https://example.com/images/sara-akter.jpg",
    },
    {
      id: "34092fvbn93h",
      name: "Mizanur Rahman",
      image: "https://example.com/images/mizanur-rahman.jpg",
    },
  ];

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const data = await getAuthors(currentPage);

  return (
    <div className="flex flex-wrap gap-2 mt-10 justify-center">
      {authors.map((author) => (
        <AuthorCard author={author} key={author.id} />
      ))}
    </div>
  );
}
