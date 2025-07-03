import { marked } from "marked";

interface AddOnProps {
  repo: string;
  owner: string;
}

interface GitHubReadmeResponse {
  content: string;
  encoding: string;
  name: string;
  path: string;
  sha: string;
  size: number;
  url: string;
}

async function fetchReadme(owner: string, repo: string) {
  try {
    // Remove owner from repo if it's included
    const cleanRepo = repo.includes("/") ? repo.split("/").pop() : repo;

    const response = await fetch(
      `https://api.github.com/repos/${owner}/${cleanRepo}/readme`,
      {
        headers: {
          Accept: "application/vnd.github.v3+json",
          "User-Agent": "Shareware.dev",
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(
        `GitHub API error: ${response.status} ${response.statusText}${
          errorData ? ` - ${JSON.stringify(errorData)}` : ""
        }`
      );
    }

    const data = (await response.json()) as GitHubReadmeResponse;
    const content = atob(data.content);
    return marked(content);
  } catch (error) {
    console.error("Error fetching README:", error);
    throw error;
  }
}

const AddOnContent = async ({ repo, owner }: AddOnProps) => {
  try {
    const readmeHtml = await fetchReadme(owner, repo);

    return (
      <div className="prose max-w-none">
        <div dangerouslySetInnerHTML={{ __html: readmeHtml }} />
      </div>
    );
  } catch (error) {
    return (
      <div className="text-red-500">
        Error loading README:{" "}
        {error instanceof Error ? error.message : "Unknown error"}
      </div>
    );
  }
};

export { AddOnContent };
