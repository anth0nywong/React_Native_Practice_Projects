import {
  StyleSheet,
  Text,
    View,
    Pressable 
} from "react-native";

const GoalItem = (props) => {

    return (
      <View style={style.goalItem}>
        <Pressable
          android_ripple={{ color: "#dddddd" }}
                onPress={props.deleteGoalHandler.bind(this, props.id)}
                style={({pressed}) => {
                    return pressed && style.pressedItem
                }}
        >
          <Text style={style.goalItemText}>{props.itemData.item.text}</Text>
        </Pressable>
      </View>
    );
};

export default GoalItem;

const style = StyleSheet.create({
  goalItem: {
    margin: 8,
    marginBottom: 1,
    borderRadius: 6,
    backgroundColor: "#5e0acc",
    },
    pressedItem: {
        opacity: 0.5
    },
  goalItemText: {
    padding: 8,
    color: "white",
  },
});
