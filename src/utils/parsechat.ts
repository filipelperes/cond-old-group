import type { ParsedMessage } from "@/types";

export function parseChat(text: string) {
   const lines = text.split('\n');

   const messageRegex =
      /^(\d{1,2}\/\d{1,2}\/\d{2,4}), (\d{1,2}:\d{2}(?::\d{2})?(?:\s?[APMapm]{2})?) - (.*?)(?:: (.*))?$/;

   const messages = lines.reduce((acc, line) => {
      const match = line.match(messageRegex);

      if (match) {
         const [, date, time, sender, rawContent] = match;

         const content = rawContent || sender;
         const isSystem = !rawContent;

         let type: ParsedMessage["type"] = "message";

         if (isSystem) {
            type = "system";
         } else if (content === "This message was deleted") {
            type = "deleted";
         } else if (
            content === "<Media omitted>" ||
            content.includes("(file attached)") ||
            /\.(opus|jpg|jpeg|png|mp4|vcf|webp)$/i.test(content)
         ) {
            const ext = content.split('.').pop()?.toLowerCase();

            switch (ext) {
               case "jpg":
               case "jpeg":
               case "png":
               case "webp":
                  type = "image";
                  break;
               case "mp4":
                  type = "video";
                  break;
               case "opus":
                  type = "audio";
                  break;
               case "vcf":
                  type = "contact";
                  break;
               default:
                  type = "generic";
            }
         }

         acc.push({
            date,
            time,
            sender: isSystem ? "system" : sender,
            content,
            type,
         });
      } else if (acc.length > 0) {
         acc[acc.length - 1].content += '\n' + line.trim();
      }

      return acc;
   }, [] as ParsedMessage[]);

   return messages;
}