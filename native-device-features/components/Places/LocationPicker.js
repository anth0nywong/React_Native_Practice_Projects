import { View, StyleSheet, Image, Text } from 'react-native';

import {
  getCurrentPositionAsync,
  useForegroundPermissions,
  PermissionStatus,
} from "expo-location";

import OutlinedButton from '../UI/OutlinedButton'
import { Colors } from '../../constants/colors';
import { useEffect, useState } from 'react';
import { getMapPreview } from '../../util/location';
import { useNavigation, useRoute, useIsFocused } from '@react-navigation/native';
import { getAddress } from '../../util/location';
function LocationPickerComponent({ onLocationPick }) {
  const [pickedLocation, setPickedLocation] = useState();

  const [loadingLocation, setLoadingLocation] = useState(false);
  const [locationPermission, requestPermission] = useForegroundPermissions();

  const navigation = useNavigation();
  const route = useRoute();
  const isFocused = useIsFocused();

  useEffect(() => {

    async function handleLocation() {
      if (pickedLocation) {
        const address = await getAddress(
          pickedLocation.lat,
          pickedLocation.lng
        );
        onLocationPick({ ...pickedLocation, address: address });
      }}
    handleLocation();
  }, [pickedLocation, onLocationPick]);

  useEffect(() => {
    if (isFocused && route.params) {
      const mapPickedLocation = route.params && {
        lat: route.params.pickedLat,
        lng: route.params.pickedLng,
      };
      console.log(mapPickedLocation);
      setPickedLocation(mapPickedLocation);
    }
  }, [route, isFocused]);

  async function verifyPermission() {
    if (locationPermission.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestPermission();

      return permissionResponse.granted;
    }

    if (locationPermission.status === PermissionStatus.DENIED) {
      Alert.alert("Please enable location permission to use this app.");
      return false;
    }
    return true;
  }

  async function getLocationHandler() {
    setLoadingLocation(true);
    const hasPermission = await verifyPermission();
    if (!hasPermission) {
      setLoadingLocation(false);
      return;
    }

    const location = await getCurrentPositionAsync();
    setPickedLocation({
      lat: location.coords.latitude,
      lng: location.coords.longitude,
    });
    setLoadingLocation(false);
  }

  function pickOnMapHandler() {
    navigation.navigate("Map");
  }

  let locationPreview = <Text>No Location Picked Yet.</Text>;
  if (loadingLocation) locationPreview = <Text>Loading...</Text>;
  if (pickedLocation) {
    locationPreview = (
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={{
            uri: getMapPreview(pickedLocation.lat, pickedLocation.lng),
          }}
        />
      </View>
    );
  }

  return (
    <View>
      <View style={styles.mapPreview}>{locationPreview}</View>
      <View style={styles.actions}>
        <OutlinedButton icon="location" onPress={getLocationHandler}>
          GPS
        </OutlinedButton>
        <OutlinedButton icon="map" onPress={pickOnMapHandler}>
          Pick on Map
        </OutlinedButton>
      </View>
    </View>
  );
}

export default LocationPickerComponent;

const styles = StyleSheet.create({
  mapPreview: {
    width: "100%",
    height: 200,
    marginVertical: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary100,
    borderRadius: 4,
    overflow: "hidden",
  },
  actions: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  imageContainer: {
    width: 400,
    height: 200,
  },
});