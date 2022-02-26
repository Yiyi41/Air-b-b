import {
  Text,
  View,
  ActivityIndicator,
  StyleSheet,
  ImageBackground,
  Image,
  Dimensions,
  ScrollView,
} from "react-native";

import axios from "axios";
import { useState, useEffect } from "react";
import StarRating from "react-native-star-rating";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";

export default function RoomScreen({ route }) {
  //   console.log(route);
  //   const navigation = useNavigation();
  const [offer, setOffer] = useState();
  const [isLoading, setIsloading] = useState(true);
  const id = route.params.id;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios(
          `https://express-airbnb-api.herokuapp.com/rooms/${id}`
        );
        // console.log(response.data.photos[0].url);
        setOffer(response.data);

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
    <ScrollView>
      <View style={styles.offerContainer}>
        <ImageBackground
          source={{ uri: offer.photos[0].url }}
          resizeMode="cover"
          style={styles.offerImg}
        >
          <View style={styles.priceView}>
            <Text style={styles.priceText}>{offer.price} €</Text>
          </View>
        </ImageBackground>

        {/* IMG CONTAINER: OFFER IMG + PRICE */}
        <View style={styles.infoContainer}>
          <View>
            <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
              {offer.title}
            </Text>

            {/* RATING INFO: RATING STARS AND REVIEWS TEXT */}
            <View style={styles.review_icon}>
              <StarRating
                maxStars={5}
                rating={offer.ratingValue}
                fullStarColor="#FFB000"
                emptyStarColor="#BBBBBB"
                starSize={20}
                emptyStar="star"
              />
              <Text style={styles.reviews_text}>{offer.reviews} reviews</Text>
            </View>
          </View>

          {/* USER IMG */}
          <Image
            source={{ uri: offer.user.account.photo.url }}
            resizeMode="contain"
            style={styles.userImg}
          />
        </View>
        <Text style={styles.description} numberOfLines={3} ellipsizeMode="tail">
          {offer.description}
        </Text>

        {/* MAP VIEW */}
        <MapView
          provider={PROVIDER_GOOGLE}
          initialRegion={{
            latitude: offer.location[1],
            longitude: offer.location[0],
            latitudeDelta: 0.1,
            longitudeDelta: 0.1,
          }}
          style={styles.map}
        >
          <MapView.Marker
            coordinate={{
              latitude: offer.location[1],
              longitude: offer.location[0],
            }}
          />
        </MapView>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  // OFFER CONTAINER
  offerContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },

  offerImg: {
    height: 200,
    width: Dimensions.get("window").width * 0.9,
    justifyContent: "flex-end",
    // alignItems: "center",
  },

  priceText: {
    color: "white",
    fontSize: 20,
  },

  priceView: {
    backgroundColor: "black",
    width: 100,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
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

  //   DESCRIPTION
  description: {
    width: 300,
    marginVertical: 5,
  },

  // MAP
  map: {
    height: 400,
    // width: Dimensions.get("window").width * 0.9,
    width: "100%",
  },
});
