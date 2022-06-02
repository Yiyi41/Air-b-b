import { useRoute, useNavigation } from "@react-navigation/core";
import {
  Text,
  View,
  ActivityIndicator,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  Image,
  Dimensions,
  ScrollView,
  Button,
} from "react-native";
import axios from "axios";
import { useState, useEffect } from "react";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";

export default function ProfileScreen({
  setUserToken,
  setUserId,
  userToken,
  userId,
}) {
  //console.log(token);
  //const { params } = useRoute();
  //console.log(userId);
  const [userProfil, setUserProfile] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigation();

  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);

  // GET PERMISSION TO ACCES TO MEDIA LIBRARY
  const getPermissionAndGetPicture = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    // console.log({ status });
    if (status === "granted") {
      const selectPhoto = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [1, 1],
      });
      console.log(selectPhoto);
      if (selectPhoto.cancelled === true) {
        alert("Pas de photo sélectionnée");
      } else {
        setImage(selectPhoto.uri);
      }
    } else {
      alert("Permision refusée");
    }
  };
  // GET PERMISSION TO ACCES TO CAMERA
  const getPermissionAndTakePicture = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    // console.log({ status });
    if (status === "granted") {
      const openCamera = await ImagePicker.launchCameraAsync();
      // console.log(openCamera.uri);
      setImage(openCamera.uri);
    } else {
      alert("Permission refusée");
    }
  };

  // SEND PHOTO
  const sendPicture = async () => {
    setUploading(true);
    const tab = image.split(".");
    try {
      const formData = new FormData();
      formData.append("photo", {
        uri: image,
        name: `photo.${tab[1]}`,
        type: `image.${tab[1]}`,
      });

      const response = await axios.put(
        "https://express-airbnb-api.herokuapp.com/user/upload_picture",
        formData,
        { headers: { authorization: `Bearer ${userToken}` } }
      );
      console.log(response.data);
      if (response.data) {
        setUploading(false);
        alert("envoyée");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const getProfilInfo = async () => {
      try {
        // console.log(token);
        // console.log(userId);
        const response = await axios.get(
          `https://express-airbnb-api.herokuapp.com/user/${userId}`,
          { headers: { authorization: `Bearer ${userToken}` } }
        );

        setUserProfile(response.data);
        setIsLoading(false);
        // console.log(response.data);
      } catch (error) {
        console.log(error.response.data);
      }
    };
    getProfilInfo();
  }, []);

  return isLoading ? (
    <ActivityIndicator
      size="large"
      color="#EB5A62"
      style={{ marginTop: 100 }}
    />
  ) : (
    <ScrollView>
      <View style={styles.container}>
        {/* PROFIL IMG BLOCK */}
        <View style={styles.imgContainer}>
          <View style={styles.user_Profil_container}>
            {userProfil.photo.url ? (
              <Image
                source={{ uri: userProfil.photo.url }}
                style={styles.imgProfil}
                resizeMode="cover"
              />
            ) : (
              <AntDesign name="user" size={100} color="gray" />
            )}
          </View>
          <View style={styles.select_Photo_Btn_Container}>
            {/* BUTTON FOR TAKING PICTURE */}
            <TouchableOpacity onPress={getPermissionAndTakePicture}>
              <Entypo name="camera" size={30} color="gray" />
            </TouchableOpacity>

            {/* BUTTON FOR CHOOSING PICTURE */}
            <TouchableOpacity onPress={getPermissionAndGetPicture}>
              <MaterialIcons name="photo-library" size={30} color="gray" />
            </TouchableOpacity>

            {/* BUTTON FOR UPLAOD PHOTO */}
            <TouchableOpacity onPress={sendPicture}>
              <AntDesign name="upload" size={30} color="gray" />
            </TouchableOpacity>
          </View>
        </View>

        {/* PROFIL_INFO BLOCK */}
        <View style={styles.infoTextContainer}>
          <View style={styles.infoText_Line}>
            <Text style={styles.infoText}>{userProfil.email}</Text>
          </View>
          <View style={styles.infoText_Line}>
            <Text style={styles.infoText}>{userProfil.username}</Text>
          </View>
          <View style={styles.infoText_Line}>
            <Text style={styles.infoText}>{userProfil.description}</Text>
          </View>
        </View>

        {/* BUTTONS BLOCK */}
        <View style={styles.btnContainer}>
          {/* <TouchableOpacity style={styles.btn} onPress={sendPicture}>
            <Text style={styles.btn_text}>Update Photo</Text>
          </TouchableOpacity> */}
          <TouchableOpacity
            style={styles.btn}
            onPress={() => {
              setUserToken(null);
              setUserId(null);
              AsyncStorage.removeItem("userToken");
              AsyncStorage.removeItem("userId");
            }}
          >
            <Text style={styles.btn_text}>Log out</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },

  // IMG CONTAINER
  imgContainer: {
    width: Dimensions.get("window").width * 0.9,
    marginVertical: 30,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  user_Profil_container: {
    borderRadius: 75,
    borderColor: "#EB5A62",
    borderWidth: 2,
    width: 150,
    height: 150,
    justifyContent: "center",
    alignItems: "center",
  },

  imgProfil: {
    height: 150,
    width: 150,
    borderRadius: 75,
  },

  select_Photo_Btn_Container: {
    height: 130,
    width: 100,
    justifyContent: "space-between",
    alignItems: "center",
  },
  // INFO CONTAINER
  infoTextContainer: {
    height: 150,
    width: Dimensions.get("window").width * 0.9,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
  },

  infoText_Line: {
    borderBottomWidth: 1,
    borderBottomColor: "#EB5A62",
    justifyContent: "flex-end",
    alignItems: "flex-start",
    height: 50,
    width: 250,
    fontSize: 18,
    marginVertical: 5,
  },

  infoText: {
    fontSize: 15,
  },

  // BUTTON CONTAINER
  btnContainer: {
    height: 200,
    width: Dimensions.get("window").width * 0.9,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
  },

  btn: {
    justifyContent: "center",
    width: "50%",
    alignItems: "center",
    padding: 15,
    borderRadius: 30,
    borderColor: "#EB5A62",
    borderWidth: 2,
    marginVertical: 5,
  },

  // edit_btn: {
  //   justifyContent: "center",
  //   width: "50%",
  //   alignItems: "center",
  //   padding: 15,
  //   borderRadius: 30,
  //   borderColor: "#EB5A62",
  //   borderWidth: 2,
  //   marginVertica,
  // },

  // btn_text: {
  //   fontSize: 20,
  //   color: "gray",
  // },

  // setUserPhotoContainer: {},
});
