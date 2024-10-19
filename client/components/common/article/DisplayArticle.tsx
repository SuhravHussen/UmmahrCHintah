import DOMPurify from "isomorphic-dompurify";

export default function DisplayArticle({ article }: { article: string }) {
  return (
    <section
      className="blog-content overflow-hidden  mt-6"
      dangerouslySetInnerHTML={{
        __html: DOMPurify.sanitize(article),
      }}
    ></section>
  );
}
