export function validateArticleBody(body: {
  title: string;
  content: { text: string; richText: string };
  dateWritten: string;
  keywords: string[];
  authorId: string;
  originalPostLink: string | undefined;
}) {
  const { title, content, dateWritten, keywords, authorId, originalPostLink } =
    body;

  // Check if required fields are not empty, null, or undefined
  if (
    !title ||
    !content?.text ||
    !content?.richText ||
    !dateWritten ||
    !keywords?.length ||
    !authorId
  ) {
    return false; // Invalid
  }

  // Check if originalPostLink is not null or undefined (it can be an empty string)
  if (originalPostLink === null) {
    return false; // Invalid
  }

  return true; // Valid
}
