import { useRoute } from "@react-navigation/core";
import { Text, View } from "react-native";

export default function ProfileScreen({ userToken }) {
  console.log(userToken);
  const { params } = useRoute();

  return (
    <View>
      {/* <Text>user id : {params.userId}</Text> */}
      <Text>profile screen</Text>
    </View>
  );
}
