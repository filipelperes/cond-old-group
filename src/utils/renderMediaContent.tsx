import { formatWhatsAppText } from "./formatWhatsAppText";

const fileRegex = /\s*\(file attached\)\s*/gi;

export const renderMediaContent = (type: string, content: string) => {
   const cleaned = content.replace(fileRegex, '').trim();
   const ext = cleaned.split('.').pop()?.toLowerCase();
   const mediaPath = `${import.meta.env.BASE_URL}media/${cleaned}`;
   const downloadLink = (
      <div className="!mt-2 text-xs">
         <a
            href={mediaPath}
            download
            className="!text-blue-500 underline hover:!text-blue-800"
         >
            Baixar arquivo
         </a>
      </div>
   );

   if (type === "media" || content.match(fileRegex)) {
      if (["jpg", "jpeg", "png", "webp"].includes(ext || "")) {
         return (
            <>
               <img
                  src={mediaPath}
                  alt="imagem"
                  className="rounded-md max-w-xs"
               />
               {downloadLink}
            </>
         );
      }

      if (ext === "mp4") {
         return (
            <>
               <video controls className="max-w-xs rounded-md">
                  <source src={mediaPath} type="video/mp4" />
               </video>
               {downloadLink}
            </>
         );
      }

      if (ext === "opus") {
         return (
            <>
               <audio controls className="w-full">
                  <source src={mediaPath} type="audio/ogg" />
               </audio>
               {downloadLink}
            </>
         );
      }

      if (ext === "vcf") {
         return (
            <div>
               <p className="text-sm text-gray-600">Contato disponível:</p>
               {downloadLink}
            </div>
         );
      }

      return downloadLink;
   }

   if (content === "<Media omitted>") {
      return (
         <span className="italic text-gray-400">
            Mídia não exportada ou indisponível
         </span>
      );
   }

   return formatWhatsAppText(content);
};
