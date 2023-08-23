import { ScrollView, Image, View, StyleSheet, Text } from "react-native";
import OutlinedButton from "../components/UI/OutlinedButton";
import { Colors } from "../constants/colors";
import { useEffect, useState } from "react";
import { fetchPlaceDetails } from "../util/database";

function PlaceDetails({route, navigation}) {

    const selectedPlaceId = route.params.placeId;
    const [fetchPlace, setFetchPlace] = useState();
    function showOnMapHandler() {
        navigation.navigate("Map", {
          initialLat: fetchPlace.location.lat,
          initialLng: fetchPlace.location.lng,
        });
    }

    useEffect(() => {
      async function loadPlace() {
          const place = await fetchPlaceDetails(selectedPlaceId);
          setFetchPlace(place);
          navigation.setOptions({
              title: place.title,
          });
        };
      loadPlace();
    }, [selectedPlaceId]);

    if (!fetchPlace) {
        return (
          <View style={styles.fallback}>
            <Text>Loading place data...</Text>
          </View>
        );
    }

    return <ScrollView>
        <Image style={styles.image} source={ {uri: fetchPlace.imageUri} } />
        <View style={styles.locationContainer}>
            <View style={styles.addressContainer}>
                <Text style={styles.address}>{ fetchPlace.address }</Text>
                <OutlinedButton icon="map" onPress={showOnMapHandler}>
                    View on Map
                </OutlinedButton>
            </View>
        </View>
    </ScrollView>
}

export default PlaceDetails;

const styles = StyleSheet.create({
    fallback: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        height: '35%',
        minHeight: 300,
        width: '100%'
    },
    locationContainer: {
        justifyContent: 'center',
        alignItems:'center',
    },
    addressContainer: {
        padding:20
    },
    address: {
        color: Colors.primary500,
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 16
    }
})