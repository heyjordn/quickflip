import yaml from "yaml";

const parseGitHubUrl = (url: string) => {
    const match = url.match(/github\.com\/([^\/]+)\/([^\/]+)/);
    if (!match) throw new Error('Invalid GitHub URL format');
    return {
        owner: match[1],
        repo: match[2].replace(/\.git$/, '')
    };
};
  
const fetchGitHubContents = async (owner: string, repo: string) => {
    const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/`);
    if (!response.ok) {
        throw new Error(`GitHub API error: ${response.status}`);
    }
    return response.json();
};

const findQuickFlipYamlFile = async (owner: string, repo: string): Promise<any[]> => {
    const contents = await fetchGitHubContents(owner, repo);

    for (const item of contents) {
        if (item.type === 'file' && item.name.endsWith('.yaml') && item.name === "quickflip.yaml") {
        
            const fileResponse = await fetch(item.download_url);
            const fileContent = await fileResponse.text();
            try {
                const yamlData = yaml.parse(fileContent);
                if (Array.isArray(yamlData)) {
                    return yamlData;
                } 
            } catch (error) {
                console.error(`Could not parse ${item.name} as valid flashcard yaml. \nError: ${JSON.stringify(error)}`);
                return [];
            }
            
        }
    }
    return [];
};

export {findQuickFlipYamlFile, fetchGitHubContents, parseGitHubUrl}