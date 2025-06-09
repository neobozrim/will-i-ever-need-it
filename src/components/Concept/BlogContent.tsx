import React from 'react';

interface BlogContentProps {
  content: string;
}

const BlogContent: React.FC<BlogContentProps> = ({ content }) => {
  // Simple markdown-like formatting
  const formatContent = (text: string) => {
    return text
      .split('\n')
      .map((line, index) => {
        // Headers
        if (line.startsWith('# ')) {
          return (
            <h1 key={index} className="text-3xl font-bold text-gray-900 mb-6 mt-8 first:mt-0">
              {line.substring(2)}
            </h1>
          );
        }
        if (line.startsWith('## ')) {
          return (
            <h2 key={index} className="text-2xl font-bold text-gray-900 mb-4 mt-6">
              {line.substring(3)}
            </h2>
          );
        }
        if (line.startsWith('### ')) {
          return (
            <h3 key={index} className="text-xl font-semibold text-gray-900 mb-3 mt-4">
              {line.substring(4)}
            </h3>
          );
        }
        
        // Bold text
        if (line.includes('**')) {
          const parts = line.split('**');
          return (
            <p key={index} className="text-gray-700 mb-4 leading-relaxed">
              {parts.map((part, i) => 
                i % 2 === 1 ? <strong key={i} className="font-semibold text-gray-900">{part}</strong> : part
              )}
            </p>
          );
        }
        
        // Regular paragraphs
        if (line.trim() && !line.startsWith('-')) {
          return (
            <p key={index} className="text-gray-700 mb-4 leading-relaxed">
              {line}
            </p>
          );
        }
        
        // List items
        if (line.startsWith('- ')) {
          return (
            <li key={index} className="text-gray-700 mb-2 ml-4">
              {line.substring(2)}
            </li>
          );
        }
        
        return null;
      })
      .filter(Boolean);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
      <div className="prose prose-lg max-w-none">
        {formatContent(content)}
      </div>
      
      {/* Interactive elements placeholder */}
      <div className="mt-8 p-6 bg-blue-50 rounded-lg border border-blue-200">
        <h4 className="text-lg font-semibold text-blue-900 mb-3">Try It Yourself</h4>
        <p className="text-blue-800 mb-4">
          Practice what you've learned with interactive exercises and real-time feedback.
        </p>
        <button className="bg-blue-500 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-600 transition-colors duration-200">
          Start Practice
        </button>
      </div>
    </div>
  );
};

export default BlogContent;