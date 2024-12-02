function highlightQueryMatches(content: string, query: string): string {
  if (!query || !content) return content;

  // Escape special regex characters to prevent regex injection
  const escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

  // Create case-insensitive regex
  const regex = new RegExp(`(${escapedQuery})`, "gi");

  // Replace matches with highlighted span
  return content.replace(regex, "<mark>$1</mark>");
}

export default highlightQueryMatches;
