import { Button, Text, TextInput, View, Alert } from "react-native";
import { useState } from "react";
import axios from "axios";

export default function SignUpScreen({ setToken }) {
  const [email, setEmail] = useState("yy@gmail.com");
  const [username, setUsername] = useState("yiyi");
  const [description, setDescription] = useState("I am Yiyi");
  const [password, setPassword] = useState("reza");
  const [confirmPassword, setConfirmPassword] = useState("reza");

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
    <View>
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
    </View>
  );
}
