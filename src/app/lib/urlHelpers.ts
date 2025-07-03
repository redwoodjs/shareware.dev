export const useCurrentPath = (currentUrl: string) => {
  if (!currentUrl) return "";
  return "/" + currentUrl?.split("/").slice(3).join("/");
};
