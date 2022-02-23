import Constants from "expo-constants";
import { useNavigation } from "@react-navigation/core";
import {
  Platform,
  Button,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Alert,
  Image,
  StyleSheet,
} from "react-native";
import { useState } from "react";
import axios from "axios";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SignInScreen({ setToken }) {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
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
        }
      } catch (error) {
        console.log(error.message);
        Alert.alert("Connection failed");
        // console.log(error.response);
      }
    } else {
      // console.log("alert");
      Alert.alert("Please fill all fields");
    }
  };

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <KeyboardAwareScrollView>
        {/* HEADER VIEW: LOGO-IMG + TITLE */}
        <View>
          <View style={styles.header}>
            <Image
              source={require("../assets/img/Airbnb-Logo.png")}
              resizeMode="contain"
              style={styles.logo}
            />
            <Text style={styles.title}>Sign in</Text>
          </View>

          {/* INPUTS VIEW: EMAIL + PASSWORD */}
          <View style={styles.inputBlock}>
            <TextInput
              value={email}
              style={styles.input}
              placeholder="Email"
              onChangeText={(text) => {
                setEmail(text);
              }}
            />

            <TextInput
              value={email}
              style={styles.input}
              placeholder="Password"
              secureTextEntry={true}
              onChangeText={(text) => {
                setPassword(text);
              }}
            />
          </View>

          {/* SIGN IN BTN BLOCK */}
          <View style={styles.btn_Block}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.btn}
              onPress={handlePress}
            >
              <Text style={styles.btn_text}>Sign in</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("SignUp");
              }}
            >
              <Text style={styles.register_text}>No account? Register</Text>
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
    // backgroundColor: "pink",
    // paddingVertical: 20,

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
