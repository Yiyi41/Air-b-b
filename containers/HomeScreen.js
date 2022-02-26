import { useNavigation } from "@react-navigation/core";
import StarRating from "react-native-star-rating";

import {
  Button,
  Text,
  View,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  Image,
  Dimensions,
} from "react-native";

import axios from "axios";
import { useState, useEffect } from "react";

export default function HomeScreen() {
  const navigation = useNavigation();
  const [offers, setOffers] = useState();
  const [isLoading, setIsloading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://express-airbnb-api.herokuapp.com/rooms"
        );
        // console.log(response.data);
        setOffers(response.data);
        setIsloading(false);
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchData();
  }, []);

  return isLoading ? (
    <ActivityIndicator
      size="large"
      color="#EB5A62"
      style={{ marginTop: 100 }}
    />
  ) : (
    <View>
      <FlatList
        data={offers}
        keyExtractor={(item) => String(item._id)}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              style={styles.offerContainer}
              onPress={() => {
                navigation.navigate("Room", { id: item._id });
              }}
            >
              {/* IMG CONTAINER: OFFER IMG + PRICE */}

              <ImageBackground
                source={{ uri: item.photos[0].url }}
                resizeMode="cover"
                style={styles.offerImg}
              >
                <View style={styles.priceView}>
                  <Text style={styles.priceText}>{item.price} €</Text>
                </View>
              </ImageBackground>

              {/*  OFFER INFO CONTAINER: USER IMG, OFFER TITLE,  STARS, REVIEWS*/}
              <View style={styles.infoContainer}>
                <View>
                  <Text
                    style={styles.title}
                    numberOfLines={1}
                    ellipsizeMode="tail"
                  >
                    {item.title}
                  </Text>

                  {/* RATING INFO: RATING STARS AND REVIEWS TEXT */}
                  <View style={styles.review_icon}>
                    <StarRating
                      maxStars={5}
                      rating={item.ratingValue}
                      fullStarColor="#FFB000"
                      emptyStarColor="#BBBBBB"
                      starSize={20}
                      emptyStar="star"
                    />
                    <Text style={styles.reviews_text}>
                      {item.reviews} reviews
                    </Text>
                  </View>
                </View>

                {/* USER IMG */}
                <Image
                  source={{ uri: item.user.account.photo.url }}
                  resizeMode="contain"
                  style={styles.userImg}
                />
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  // OFFER CONTAINER
  offerContainer: {
    alignItems: "center",
    marginBottom: 10,
    // width: Dimensions.get("window").width * 0.9,
  },

  offerImg: {
    height: 200,
    width: Dimensions.get("window").width * 0.9,
    // marginBottom: 10,
    justifyContent: "flex-end",
  },

  priceView: {
    backgroundColor: "black",
    width: 80,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },

  priceText: {
    color: "white",
    fontSize: 20,
  },

  // OFFER INFO CONTAINER: USER IMG, OFFER TITLE, RATE

  infoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  userImg: {
    height: 50,
    width: 50,
    borderRadius: 50,
    marginVertical: 5,
  },

  title: {
    fontSize: 15,
    width: 250,
    marginVertical: 5,
  },

  review_icon: {
    flexDirection: "row",
  },

  reviews_text: {
    color: "#BBBBBB",
    marginLeft: 10,
  },
});
