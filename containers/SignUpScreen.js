import { Button, Text, TextInput, View, Alert } from "react-native";
import { useState } from "react";
import axios from "axios";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function SignUpScreen({ setToken }) {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [description, setDescription] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handlePress = async (event) => {
    // const userToken = "secret-token";
    //   setToken(userToken);
    event.preventDefault();
    // console.log(email, username, description, password, confirmPassword);
    if (password == confirmPassword) {
      try {
        const response = await axios.post(
          "https://express-airbnb-api.herokuapp.com/user/sign_up",
          {
            email: email,
            username: username,
            description: description,
            password: password,
            confirmPassword: confirmPassword,
          }
        );
        // console.log(response.data);
        if (response.data.token) {
          setToken(response.data.token);
        }
      } catch (error) {
        console.log(error.message);
      }
    } else {
      Alert.alert("Passwords must be the same");
    }
  };

  return (
    <KeyboardAwareScrollView>
      <View>
        <Text>Email: </Text>
        <TextInput
          placeholder="email"
          onChangeText={(text) => {
            setEmail(text);
          }}
          value={email}
        />
        <Text>UserName: </Text>
        <TextInput
          placeholder="Username"
          onChangeText={(text) => {
            setUsername(text);
          }}
          value={username}
        />
        <Text>Description: </Text>
        <TextInput
          placeholder="Describe yourself in a few words"
          onChangeText={(text) => {
            setDescription(text);
          }}
          value={description}
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
        <Text>ConfirmPassword: </Text>
        <TextInput
          placeholder="confirm password"
          secureTextEntry={true}
          onChangeText={(text) => {
            setConfirmPassword(text);
          }}
          value={confirmPassword}
        />
        <Button title="Sign up" onPress={handlePress} />
        <Text> Already have an account? Sign in</Text>
      </View>
    </KeyboardAwareScrollView>
  );
}
