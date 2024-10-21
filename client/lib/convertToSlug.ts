const convertToSlug = (text: string) => {
  return text
    .toLowerCase() // Convert to lowercase
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/[^\u0980-\u09FF\w\-]+/g, ""); // Remove non-word characters, but keep Bangla letters
};

export default convertToSlug;
