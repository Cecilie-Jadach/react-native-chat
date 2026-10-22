import {
  createMessage,
  deleteMessage,
  getMessages,
  updateMessagePatch,
  type Message,
} from "@/api/message";
import { useCallback, useEffect, useState } from "react";

export function useMessages() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    try {
      setMessages(await getMessages());
      setError("");
    } catch (e: any) {
      setError(e.message);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const add = async (user: string, content: string) => {
    await createMessage(user, content);
    await load();
  };

  const edit = async (id: number, user: string, content: string) => {
    await updateMessagePatch(id, { user, content });
    await load();
  };

  const remove = async (id: number) => {
    await deleteMessage(id);
    await load();
  };

  return { messages, error, load, add, edit, remove };
}
