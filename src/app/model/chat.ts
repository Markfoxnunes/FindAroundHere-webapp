export class Chat {
    id: string;
    idFrom: string;
    idTo: string;
    timestamp: number;
    content: string;
    type: string;
    isread: boolean;
    itemId: string;
    itemName: string;
  }

  export class ChatHistory {
    id: string;
    chatID: string;
    chatWith: string;
    lastChat: string;
    badgeCount: number;
    inRoom: boolean;
    timestamp: Date;
    itemId: string;
    itemName: string;
  }