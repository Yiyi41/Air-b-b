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
  const [email, setEmail] = useState("Toto@gmail.com");
  const [password, setPassword] = useState("");

  const handlePress = async (event) => {
    // console.log(1);
    event.preventDefault();
    if (email && password) {
      // console.log(2);
      try {
        const response = await axios.post(
          "https://express-airbnb-api.herokuapp.com/user/log_in",
          {
            email: email,
            password: password,
          }
        );

        console.log(response.data.token);
        if (response.data.token) {
          setToken(response.data.token);
          Alert.alert("☀️Connected☀️");
        } else {
          // setToken(null);
          console.log(2);
          Alert.alert("Connection failed");
        }
      } catch (error) {
        console.log(error.message);
        // console.log(error.response);
      }
    } else {
      // console.log("alert");
      Alert.alert("Please fill all fields");
    }
  };

  return (
    <KeyboardAwareScrollView>
      <View>
        <Text>Email: </Text>
        <TextInput
          placeholder="Email"
          onChangeText={(text) => {
            setEmail(text);
          }}
          value={email}
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
