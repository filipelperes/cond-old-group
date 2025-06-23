import { parse } from 'date-fns';

export function formatDateString(date: string, time: string): string {
   const dateTimeStr = `${date} ${time}`;
   const formats = [
      'dd/MM/yy HH:mm',
      'd/M/yy HH:mm',
      'dd/MM/yyyy HH:mm',
      'd/M/yyyy HH:mm',
      'M/d/yy HH:mm',
      'M/d/yyyy HH:mm',
      'dd/MM/yy HH:mm:ss',
      'd/M/yy HH:mm:ss',
      'd/M/yy h:mm a',
      'd/M/yyyy h:mm a',
      'M/d/yy h:mm a',
   ];;

   for (const fmt of formats) {
      try {
         const parsed = parse(dateTimeStr, fmt, new Date());
         if (!isNaN(parsed.getTime())) return parsed.toLocaleString("pt-BR", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
         });
      } catch (error) {
         console.warn(`Erro ao tentar parsear "${dateTimeStr}" com formato "${fmt}"`, error);
         continue;
      }
   }

   return time;
}
