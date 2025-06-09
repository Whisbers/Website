// components/MarkdownPreview.tsx
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export function MarkdownPreview({ content }: { content: string }) {
  return (
    <div className="prose prose-invert max-w-none text-default-400 [&>a]:text-primary-500 [&>a:hover]:underline [&>code]:bg-[#1e1e22] [&>code]:text-orange-400 [&>pre]:bg-[#1e1e22] [&>pre]:p-4 [&>pre]:rounded-lg">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>
        {content}
      </ReactMarkdown>
    </div>
  );
}