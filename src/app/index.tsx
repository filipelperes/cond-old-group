import Spinner from "@/components/Spinner";
import { useChatMessages } from "@/hooks/useChatMessages";
import { formatDateString } from "@/utils/formatDateString";
import { renderMediaContent } from "@/utils/renderMediaContent";
import { useEffect } from "react";

function App() {
   const { messages, isLoading, error } = useChatMessages(`${import.meta.env.BASE_URL}chat.txt`);

   useEffect(() => {
      if (error) alert("Failed do fetch files. Please reload window.");
   }, [error]);

   return isLoading ? <Spinner /> : (
      <div className="flex flex-col items-center overflow-y-auto w-full h-full sm:rounded-xl md:w-4/5 md:h-4/5 bg-emerald-300">
         {messages.map(({ sender, content, time, date, type }, i) => {
            return (
               <div key={i} className={`!my-2 !p-2 rounded-lg shadow max-w-11/12 ${sender === "system" ? "bg-gray-50 opacity-65" : "bg-white"}`}>
                  <div className={`text-sm text-gray-500 font-medium ${sender === "system" && "hidden"}`}>{sender}</div>
                  <div className={`text-base text-gray-900 ${sender === "system" && "text-sm font-medium"}`}>
                     {type === 'deleted' ? (
                        <span className="italic line-through font-light">Mensagem apagada</span>
                     ) : (
                        renderMediaContent(type, content)
                     )}
                  </div>
                  <div className="text-xs text-right text-gray-400 font-medium">{formatDateString(date, time)}</div>
               </div>
            );
         })}
      </div>
   );
}

export default App;
