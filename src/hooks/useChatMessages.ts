import { useEffect, useState } from 'react';
import { parseChat } from '@/utils/parsechat';
import type { ParsedMessage } from '@/types';

interface IUseChatMessages {
   messages: ParsedMessage[];
   isLoading: boolean;
   error: Error | null;
}


export function useChatMessages(chatFilePath: string): IUseChatMessages {
   const [messages, setMessages] = useState<ParsedMessage[]>([]);
   const [isLoading, setIsLoading] = useState<boolean>(true);
   const [error, setError] = useState<Error | null>(null);

   useEffect(() => {
      setIsLoading(true);
      setError(null);

      fetch(chatFilePath)
         .then(res => {
            if (!res.ok) throw new Error(`Failed to fetch chat file: ${res.statusText}`);
            return res.text();
         })
         .then(text => {
            const parsed = parseChat(text);
            setMessages(parsed);
         })
         .catch(err => {
            console.error("Error fetching or parsing chat:", err);
            setError(err as Error);
         })
         .finally(() => {
            setIsLoading(false);
         });

   }, [chatFilePath]);

   return { messages, isLoading, error };
}