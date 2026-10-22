import type { Message } from "@/api/message";
import { useMessages } from "@/hooks/useMessages";
import { useState } from "react";
import {
  Button,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

export default function Messages() {
  const { messages, error, add, edit, remove } = useMessages();

  const [user, setUser] = useState("");
  const [content, setContent] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);

  const resetForm = () => {
    setUser("");
    setContent("");
    setEditingId(null);
  };

  const handleSubmit = async () => {
    if (!user.trim() || !content.trim()) return;

    if (editingId === null) {
      await add(user, content);
    } else {
      await edit(editingId, user, content);
    }
    resetForm();
  };

  const startEdit = (message: Message) => {
    setEditingId(message.id);
    setUser(message.user);
    setContent(message.content);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {editingId === null ? "Ny besked" : `Rediger besked #${editingId}`}
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Navn"
        value={user}
        onChangeText={setUser}
      />
      <TextInput
        style={styles.input}
        placeholder="Besked"
        value={content}
        onChangeText={setContent}
      />

      <Button
        title={editingId === null ? "Tilføj" : "Gem ændring"}
        onPress={handleSubmit}
      />
      {editingId !== null && <Button title="Annuller" onPress={resetForm} />}

      {error !== "" && <Text style={styles.error}>{error}</Text>}

      <FlatList
        style={styles.list}
        data={messages}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.user}>{item.user}</Text>
            <Text>{item.content}</Text>
            <View style={styles.actions}>
              <Button title="Rediger" onPress={() => startEdit(item)} />
              <Button
                title="Slet"
                color="red"
                onPress={() => remove(item.id)}
              />
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 16, paddingHorizontal: 16 },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 8 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 8,
  },
  error: { color: "red", marginTop: 8 },
  list: { marginTop: 16 },
  card: {
    padding: 12,
    marginBottom: 8,
    borderRadius: 8,
    backgroundColor: "#f2f2f2",
  },
  user: { fontWeight: "bold" },
  actions: { flexDirection: "row", gap: 12, marginTop: 8 },
});
