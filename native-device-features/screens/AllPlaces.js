import PlaceList from "../components/Places/PlaceList";
import { useEffect, useState } from "react";
import { useIsFocused } from "@react-navigation/native";
import { fetchPlaces } from "../util/database";
function AllPlaces({  }) {

    const isFocused = useIsFocused();
    const [places, setPlaces] = useState([]);

    useEffect(() => {

        async function loadPlaces() {
            const loadedPlaces = await fetchPlaces();
            setPlaces(loadedPlaces);
        }


        if (isFocused) {
            loadPlaces();
            //setPlaces((currentPlace) => [...currentPlace, route.params.place])
        }
    }, [isFocused]);

    return <PlaceList places={ places } />;
}

export default AllPlaces;