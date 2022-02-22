import { useNavigation } from "@react-navigation/core";
import {
  Button,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useState } from "react";
import axios from "axios";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function SignInScreen({ setToken }) {
  const navigation = useNavigation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handlePress = async (event) => {
    event.preventDefault();
    if (username || password) {
      try {
        const response = await axios.post(
          "https://express-airbnb-api.herokuapp.com/user/log_in",
          {
            username: username,
            password: password,
          }
        );
        // console.log(response.data); j'arrive pas à console log respons.data
        if (response.data.token) {
          setToken(response.data.token);
        }
      } catch (error) {
        console.log(error.message);
      }
    } else {
      Alert.alert("Please fill all fields");
    }
  };

  return (
    <KeyboardAwareScrollView>
      <View>
        <Text>Name: </Text>
        <TextInput
          placeholder="Username"
          onChangeText={(text) => {
            setUsername(text);
          }}
          value={username}
        />
        <Text>Password: </Text>
        <TextInput
          placeholder="Password"
          secureTextEntry={true}
          onChangeText={(text) => {
            setPassword(text);
          }}
          value={password}
        />
        <Button title="Sign in" onPress={handlePress} />
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("SignUp");
          }}
        >
          <Text>No account? Register</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>
  );
}
