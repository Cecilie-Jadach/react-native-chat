const BASE_URL = process.env.EXPO_PUBLIC_BACKEND_URL;

export type Message = {
  id: number;
  user: string;
  content: string;
  created_at: string;
};

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${BASE_URL}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });

  if (!response.ok) {
    throw new Error(`Error status: ${response.status}`);
  }

  const text = await response.text();
  return (text ? JSON.parse(text) : undefined) as T;
}

export async function getMessages(): Promise<Message[]> {
  return request<Message[]>("/messages");
}

export async function getMessageById(id: number): Promise<Message> {
  return request<Message>(`/messages/${id}`);
}

export async function createMessage(
  user: string,
  content: string,
): Promise<Message> {
  return request<Message>("/messages", {
    method: "POST",
    body: JSON.stringify({ user, content }),
  });
}

// export async function updateMessagePut(
//   id: number,
//   user: string,
//   content: string,
// ): Promise<Message> {
//   return request<Message>(`/messages/${id}`, {
//     method: "PUT",
//     body: JSON.stringify({ user, content }),
//   });
// }

export async function updateMessagePatch(
  id: number,
  data: Partial<Pick<Message, "user" | "content">>,
): Promise<Message> {
  return request<Message>(`/messages/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });
}

export async function deleteMessage(id: number): Promise<void> {
  return request<void>(`/messages/${id}`, { method: "DELETE" });
}
