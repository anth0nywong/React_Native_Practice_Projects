import { ScrollView, Text, StyleSheet, TextInput } from 'react-native';
import { useCallback, useState } from 'react';
import { Colors } from '../../constants/colors';
import ImagePickerComponent from "./ImagePicker";
import LocationPickerComponent from './LocationPicker';
import Button from '../UI/Button';
import { Place } from '../../models/place';

function PlaceForm({onCreatePlace}) {
    const [enteredTitle, setEnteredTitle] = useState('');
    const [pickedLocation, setPickedLocation] = useState();
    const [selectedImage, setSelectedImage] = useState();

    function changeTitleHandler(enteredText) {
        setEnteredTitle(enteredText);
    }

    function ImageTakenHandler(image) {
        setSelectedImage(image)
     }

    const pickLocationHandler = useCallback((location) => {
        setPickedLocation(location);
     }, [])

    function savePlaceHandler() {
        console.log(selectedImage);
        const data = new Place(enteredTitle, selectedImage.uri, pickedLocation);
        onCreatePlace(data);
    }

    return (
      <ScrollView style={styles.form}>
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.input}
          onChangeText={changeTitleHandler}
          value={enteredTitle}
        />
        <ImagePickerComponent onImageTake={ImageTakenHandler} />
        <LocationPickerComponent onLocationPick={pickLocationHandler} />
        <Button onPress={savePlaceHandler}>Add Place</Button>
      </ScrollView>
    );
}

export default PlaceForm;

const styles = StyleSheet.create({
    form: {
        flex: 1,
        padding: 24
    },
    label: {
        fontWeight: 'bold',
        marginBottom: 4,
        color: Colors.primary500
    },
    input: {
        marginVertical: 8,
        paddingHorizontal: 4,
        paddingVertical: 8,
        fontSize: 16,
        borderBottomColor: Colors.primary700,
        borderWidth: 2,
        backgroundColor: Colors.primary100
    }
});