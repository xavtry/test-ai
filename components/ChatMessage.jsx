import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';

export default function ChatMessage({ message }) {
  const isUser = message.role === "user";

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`max-w-2xl p-4 rounded-2xl ${isUser ? 'bg-purple-600' : 'bg-gray-800'} 
                      shadow-2xl border-4 ${isUser ? 'border-pink-500' : 'border-green-500'}`}>
        <ReactMarkdown 
          components={{
            code({node, inline, className, children, ...props}) {
              const match = /language-(\w+)/.exec(className || '');
              return !inline && match ? (
                <SyntaxHighlighter style={tomorrow} language={match[1]} PreTag="div">
                  {String(children).replace(/\n$/, '')}
                </SyntaxHighlighter>
              ) : (
                <code className="bg-black px-2 py-1 rounded">{children}</code>
              );
            }
          }}
        >
          {message.content}
        </ReactMarkdown>
      </div>
    </div>
  );
}
