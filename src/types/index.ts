export type MediaSubType = 'image' | 'video' | 'audio' | 'contact' | 'generic';

export type MessageType = 'message' | 'media' | 'deleted' | 'system' | MediaSubType;

export interface ParsedMessage {
   date: string;
   time: string;
   sender: string;
   content: string;
   type: MessageType;
}

export type Delimiter = '*' | '**' | '_' | '__' | '~' | '~~';