import type { JSX } from "react";

export const formatWhatsAppText = (text: string): (string | JSX.Element)[] => {
   const formatRegex = /(\*{1,2}|_{1,2}|~{1,2}|`{1,3})([\s\S]+?)\1/g;
   const urlRegex = /(https?:\/\/[^\s]+)/g;

   const parts: (string | JSX.Element)[] = [];
   let lastIndex = 0;
   let match: RegExpExecArray | null;

   while ((match = formatRegex.exec(text)) !== null) {
      const [fullMatch, delimiter, content] = match;
      const startIndex = match.index;

      if (startIndex > lastIndex) {
         parts.push(text.slice(lastIndex, startIndex));
      }

      const key = `fmt-${startIndex}-${delimiter}`;
      const trimmed = content.trim();
      if (!trimmed) {
         parts.push(fullMatch);
         lastIndex = startIndex + fullMatch.length;
         continue;
      }

      const classes: Record<string, string> = {
         '*': 'font-medium',
         '**': 'font-medium',
         '_': 'italic',
         '__': 'italic',
         '~': 'line-through',
         '~~': 'line-through',
      };

      if (delimiter === '`' || delimiter === '```') {
         parts.push(<code key={key}>{content}</code>);
      } else {
         parts.push(
            <span key={key} className={classes[delimiter] || ''}>
               {content}
            </span>
         );
      }

      lastIndex = startIndex + fullMatch.length;
   }

   if (lastIndex < text.length) {
      parts.push(text.slice(lastIndex));
   }

   // Agora, quebra links dentro de strings
   const finalParts = parts.flatMap((part, i) => {
      if (typeof part !== "string") return [part];

      return part.split(urlRegex).map((segment, j) => {
         const isLink = urlRegex.test(segment);
         return isLink ? (
            <a
               key={`link-${i}-${j}`}
               href={segment}
               target="_blank"
               rel="noopener noreferrer"
               className="!text-blue-600 underline hover:!text-blue-800"
            >
               {segment}
            </a>
         ) : (
            segment
         );
      });
   });

   return finalParts;
};
