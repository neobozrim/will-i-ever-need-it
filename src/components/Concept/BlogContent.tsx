import React from 'react';

interface BlogContentProps {
  content: string;
}

const BlogContent: React.FC<BlogContentProps> = ({ content }) => {
  // Function to remove emojis from text
  const removeEmojis = (text: string) => {
    return text.replace(/[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E0}-\u{1F1FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/gu, '');
  };

  // Simple markdown-like formatting
  const formatContent = (text: string) => {
    return text
      .split('\n')
      .map((line, index) => {
        // Remove emojis from the line
        const cleanLine = removeEmojis(line);
        
        // Headers
        if (cleanLine.startsWith('# ')) {
          return (
            <h1 key={index} className="font-barriecito text-3xl text-gray-900 mb-6 mt-8 first:mt-0">
              {cleanLine.substring(2)}
            </h1>
          );
        }
        if (cleanLine.startsWith('## ')) {
          return (
            <h2 key={index} className="font-barriecito text-2xl text-gray-900 mb-4 mt-6">
              {cleanLine.substring(3)}
            </h2>
          );
        }
        if (cleanLine.startsWith('### ')) {
          return (
            <h3 key={index} className="font-barriecito text-xl text-gray-900 mb-3 mt-4">
              {cleanLine.substring(4)}
            </h3>
          );
        }
        
        // Bold text
        if (cleanLine.includes('**')) {
          const parts = cleanLine.split('**');
          return (
            <p key={index} className="font-nunito text-gray-700 mb-4 leading-relaxed">
              {parts.map((part, i) => 
                i % 2 === 1 ? <strong key={i} className="font-semibold text-gray-900">{part}</strong> : part
              )}
            </p>
          );
        }
        
        // Regular paragraphs
        if (cleanLine.trim() && !cleanLine.startsWith('-')) {
          return (
            <p key={index} className="font-nunito text-gray-700 mb-4 leading-relaxed">
              {cleanLine}
            </p>
          );
        }
        
        // List items
        if (cleanLine.startsWith('- ')) {
          return (
            <li key={index} className="font-nunito text-gray-700 mb-2 ml-4">
              {cleanLine.substring(2)}
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
    </div>
  );
};

export default BlogContent;