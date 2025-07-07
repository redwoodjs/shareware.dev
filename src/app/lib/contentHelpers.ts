import { slugify } from "./urlHelpers";

export const getHeadings = (html: string) => {
  const headings = [];
  if (html) {
    // Simple regex-based parsing for h1 and h2 tags
    const headingRegex = /<h([12])[^>]*>(.*?)<\/h\1>/gi;
    let match;
    let index = 1;
    while ((match = headingRegex.exec(html)) !== null) {
      const level = parseInt(match[1]);
      const text = match[2].replace(/<[^>]*>/g, "").trim(); // Remove any nested HTML tags
      const id = slugify(text);
      headings.push({
        level,
        text,
        id,
      });
      index++;
    }
  }
  return headings;
};

export const injectIdsToHeadings = (html: string) => {
  const headings = getHeadings(html);
  headings.forEach((heading) => {
    html = html.replace(
      `<h${heading.level}>${heading.text}</h${heading.level}>`,
      `<h${heading.level} id="${heading.id}">${heading.text}</h${heading.level}>`
    );
  });
  return html;
};
