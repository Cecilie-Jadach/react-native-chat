import { useState } from "react";
import { Button, FlatList, StyleSheet, Text, View } from "react-native";

const Message = () => {
  type Message = {
    id: number;
    user: string;
    content: string;
    created_at: string;
  };
  const [data, setData] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const baseurl = "http://127.0.0.1:8080";

  const handleFetch = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${baseurl}/messages`);

      if (!response.ok) {
        throw new Error(`Error status: ${response.status}`);
      }

      const data = await response.json();

      setData(data);
      console.log("data >>", JSON.stringify(data, null, 2));
    } catch (error: any) {
      console.log("error", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  console.log("data >>", data);

  //   useEffect(() => {
  //     handleFetch();
  //   }, []);

  return (
    <View>
      <Button title="View messages" onPress={handleFetch} />
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <View>
            <Text>{item?.user}</Text>
            <Text>{item?.content}</Text>
            <Text>{item?.created_at}</Text>
          </View>
        )}
      ></FlatList>
    </View>
  );
};

export default Message;

const styles = StyleSheet.create({});
