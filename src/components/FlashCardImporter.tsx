import React, { useState } from 'react';
import { Github, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router';

const FlashCardImporter: React.FC = ({  }) => {
  const navigate = useNavigate();
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

  const handleImport = async () => {
    if (!repoUrl.trim()) return;

    setLoading(true);
    setError('');

    try {
      // Can we parse this url, if yes, send over to flash cards
      parseGitHubUrl(repoUrl);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to import flashcards');
    } finally {
      setLoading(false);
      navigate(`/study?flashcards=${repoUrl}`)
    }
  };

  return (
      <div className="flex bg-white w-full">
        <div className="flex items-end w-full text-left">
          <div className='w-full'>
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
          <div>
            <button
              onClick={handleImport}
              disabled={loading || !repoUrl.trim()}
              className="flex-1 py-3 px-4 whitespace-nowrap ml-5 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
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