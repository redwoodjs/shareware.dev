export const useCurrentPath = (currentUrl: string) => {
  if (!currentUrl) return "";
  return "/" + currentUrl?.split("/").slice(3).join("/");
};

export const slugify = (text: string) => {
  return text
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^a-z0-9-]/g, "");
};
