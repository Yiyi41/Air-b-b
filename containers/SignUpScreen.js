import Constants from "expo-constants";
import {
  Platform,
  TouchableOpacity,
  Text,
  TextInput,
  View,
  Alert,
  StyleSheet,
  Image,
} from "react-native";
import { useState } from "react";
import axios from "axios";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useNavigation } from "@react-navigation/core";
import { SafeAreaView } from "react-native-safe-area-context";
export default function SignUpScreen({ setUserData }) {
  const navigation = useNavigation();

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [description, setDescription] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handlePress = async (event) => {
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
          setUserData(response.data.token, response.data.id);
          Alert.alert("Succesful!!");
        }
      } catch (error) {
        // console.log(error.response.data.error);
        console.log(error.message);
        Alert.alert(error.response.data.error);
      }
    } else {
      Alert.alert("Passwords must be the same");
    }
  };

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <KeyboardAwareScrollView>
        <View>
          <View style={styles.header}>
            {/* HEADER VIEW: LOGO-IMG + TITLE */}

            <Image
              source={require("../assets/img/Airbnb-Logo.png")}
              resizeMode="contain"
              style={styles.logo}
            />
            <Text style={styles.title}>Sign up</Text>
          </View>

          {/* //INPUTS VIEW */}
          <View style={styles.inputBlock}>
            <TextInput
              style={styles.input}
              placeholder="email"
              onChangeText={(text) => {
                setEmail(text.toLowerCase());
              }}
              value={email}
            />

            <TextInput
              style={styles.input}
              placeholder="Username"
              onChangeText={(text) => {
                setUsername(text);
              }}
              value={username}
            />

            <TextInput
              style={styles.input}
              placeholder="Describe yourself in a few words"
              onChangeText={(text) => {
                setDescription(text);
              }}
              value={description}
            />

            <TextInput
              style={styles.input}
              placeholder="Password"
              secureTextEntry={true}
              onChangeText={(text) => {
                setPassword(text.toLowerCase());
              }}
              value={password}
            />

            <TextInput
              style={styles.input}
              placeholder="confirm password"
              secureTextEntry={true}
              onChangeText={(text) => {
                setConfirmPassword(text.toLowerCase());
              }}
              value={confirmPassword}
            />
          </View>

          <View style={styles.btn_Block}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.btn}
              onPress={handlePress}
            >
              <Text style={styles.btn_text}>Sign up</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("SignIp");
              }}
            >
              <Text style={styles.register_text}>
                Already have an account? Sign in
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeAreaView: {
    marginTop: Platform.OS === "android" ? Constants.StatusBarHeight : 0,
    justifyContent: "center",
    alignItems: "center",
  },

  // HEADER: LOGO AND TITLE
  header: {
    height: 200,
    justifyContent: "center",
    alignItems: "center",
  },

  logo: {
    height: 200,
    width: 200,
  },

  title: {
    fontSize: 30,
    color: "#717171",
  },

  // INPUTS BLOCK
  inputBlock: {
    paddingVertical: 50,
  },

  input: {
    height: 50,
    width: 300,
    borderBottomWidth: 1,
    borderBottomColor: "#EB5A62",
  },

  // BTN BLOCK
  btn_Block: {
    alignItems: "center",
  },

  btn: {
    justifyContent: "center",

    width: "70%",
    alignItems: "center",
    padding: 15,
    borderRadius: 30,
    borderColor: "#EB5A62",
    borderWidth: 2,
  },

  btn_text: {
    color: "#717171",
    fontSize: 20,
  },

  register_text: {
    marginTop: 15,
  },
});
