import React, { useState } from 'react';
import { Github, AlertCircle } from 'lucide-react';
import { FlashCardSet } from '../types';

interface FlashCardImporterProps {
  onImport: (flashcardSet: FlashCardSet) => void;
  onClose: () => void;
}

const FlashCardImporter: React.FC<FlashCardImporterProps> = ({ onImport, onClose }) => {
  const [repoUrl, setRepoUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const parseGitHubUrl = (url: string) => {
    const match = url.match(/github\.com\/([^\/]+)\/([^\/]+)/);
    if (!match) throw new Error('Invalid GitHub URL format');
    return {
      owner: match[1],
      repo: match[2].replace(/\.git$/, '')
    };
  };

  const fetchGitHubContents = async (owner: string, repo: string, path = '') => {
    const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${path}`);
    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }
    return response.json();
  };

  const findJsonFiles = async (owner: string, repo: string, path = ''): Promise<any[]> => {
    const contents = await fetchGitHubContents(owner, repo, path);
    const jsonFiles: any[] = [];

    for (const item of contents) {
      if (item.type === 'file' && item.name.endsWith('.json') && item.name === "quickflip.json") {
        const fileResponse = await fetch(item.download_url);
        const fileContent = await fileResponse.text();
        try {
          const jsonData = JSON.parse(fileContent);
          if (Array.isArray(jsonData)) {
            jsonFiles.push(...jsonData);
          } else if (jsonData.id && jsonData.question && jsonData.answer) {
            jsonFiles.push(jsonData);
          }
        } catch (e) {
          console.warn(`Could not parse ${item.name} as valid flashcard JSON`);
        }
      } else if (item.type === 'dir') {
        const subFiles = await findJsonFiles(owner, repo, item.path);
        jsonFiles.push(...subFiles);
      }
    }

    return jsonFiles;
  };

  const handleImport = async () => {
    if (!repoUrl.trim()) return;

    setLoading(true);
    setError('');

    try {
      const { owner, repo } = parseGitHubUrl(repoUrl);
      const flashcards = await findJsonFiles(owner, repo);

      if (flashcards.length === 0) {
        throw new Error('No valid flashcard JSON files found in repository');
      }
      const flashcardSet: FlashCardSet = {
        id: `${owner}-${repo}-${Date.now()}`,
        name: `${owner}/${repo}`,
        source: repoUrl,
        cards: flashcards,
        importedAt: new Date()
      };

      onImport(flashcardSet);
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to import flashcards');
    } finally {
      setLoading(false);
    }
  };

  return (
      <div className="bg-white">
        <div className="text-left">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Repository URL
            </label>
            <input
              type="text"
              value={repoUrl}
              onChange={(e) => setRepoUrl(e.target.value)}
              placeholder="https://github.com/username/repo"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              disabled={loading}
            />
          </div>

          {error && (
            <div className="flex items-center gap-2 text-red-600 bg-red-50 p-3 rounded-lg">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <span className="text-sm">{error}</span>
            </div>
          )}
          <div className="flex gap-3 pt-2">
            <button
              onClick={handleImport}
              disabled={loading || !repoUrl.trim()}
              className="flex-1 py-3 px-4 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                <Github className="w-5 h-5 text-white" />
                  Import from Github
                </>
              )}
            </button>
          </div>
        </div>
      </div>
  );
};

export default FlashCardImporter;