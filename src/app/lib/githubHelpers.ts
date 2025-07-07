export const getGitHubAvatarUrl = (username: string, size: number = 40) => {
  return `https://github.com/${username}.png?size=${size}`;
};
