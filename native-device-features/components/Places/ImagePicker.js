import { Pressable, View, Text, StyleSheet, Alert, Image } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Colors } from "../../constants/colors";
import { useState } from "react";
import OutlinedButton from "../UI/OutlinedButton";


function ImagePickerComponent({ onImageTake }) {
  const [cameraPermissionStatusInformation, requestPermission] =
    ImagePicker.useCameraPermissions();
  const [pickedImage, setPickedImage] = useState();

  async function verifyPermission() {
    if (
      cameraPermissionStatusInformation.status ===
      ImagePicker.PermissionStatus.UNDETERMINED
    ) {
      const permissionResponse = await requestPermission();
      return permissionResponse.granted;
    }

    if (
      cameraPermissionStatusInformation.status ===
      ImagePicker.PermissionStatus.DENIED
    ) {
      Alert.alert("Please enable camera permission to use this app.");
      const permissionResponse = await requestPermission();
      return false;
    }
    return true;
  }

  async function takeImageHandler() {
    const hasPermission = await verifyPermission();

    if (!hasPermission) {
      return;
    }

    const image = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });
    console.log(image.assets[0]);
      setPickedImage(image.assets[0]);
      onImageTake(image.assets[0]);
  }

  let imagePreview = <Text>Empty</Text>;
  if (pickedImage) {
    imagePreview = (
      <Image style={styles.image} source={{ uri: pickedImage.uri }} />
    );
  }

  return (
    <View>
      <View style={styles.imagePreview}>{imagePreview}</View>
      <OutlinedButton icon="camera" onPress={takeImageHandler}>
        Take Photo
      </OutlinedButton>
    </View>
  );
}

export default ImagePickerComponent;

const styles = StyleSheet.create({
    imagePreview: {
        width: '100%',
        height: 200,
        marginVertical: 8,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.primary100,
        borderRadius: 4,
        overflow: 'hidden'
    },
    image: {
        width: '100%',
        height: '100%',
    }
})