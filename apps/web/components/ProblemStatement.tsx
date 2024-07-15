import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

export function ProblemStatement({ description }: { description: string }) {
  return (
    <div className="prose lg:prose-xl  dark:prose-h2:text-white dark:prose-h4:text-white text-black dark:text-white ">
      <Markdown remarkPlugins={[remarkGfm]}>{description}</Markdown>
    </div>
  );
}
