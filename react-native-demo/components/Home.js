import * as React from "react";
import { StyleSheet, Text, TextInput, View, Button, ScrollView, FlatList, Pressable } from "react-native";
import GoalItem from "./GoalItem";
import GoalInput from "./GoalInput";
import { StatusBar } from "expo-status-bar";

export default function HomeScreen() {

  const [courseGoals, setCourseGoals] = React.useState([]);
  const [modelIsVisible, setModal] = React.useState(false);

  function addGoalHandler(enteredGoalText) {
    setCourseGoals((currentCourseGoals) => [
      ...currentCourseGoals,
      {
        key: Math.random().toString(),
        text: enteredGoalText,
      },
    ]);
  };
  function toggleAddGoalModal() {
    setModal(!modelIsVisible);
  }
  function deleteGoalHandler(id) {
    setCourseGoals((currentCourseGoals) => {
      return currentCourseGoals.filter((item) => {
        return item.key != id;
      });
    });
  }
  return (
    <>
      <StatusBar style='dark'/>
      <View style={style.appContainer}>
        <Button
          title="Add New Goal"
          color="#5e0acc"
          onPress={toggleAddGoalModal}
        />

        <GoalInput
          addGoalHandler={addGoalHandler}
          toggleAddGoalModal={toggleAddGoalModal}
          visible={modelIsVisible}
        />

        <View style={style.goalContainer}>
          <FlatList
            alwaysBounceVertical={false}
            data={courseGoals}
            renderItem={(itemData) => (
              <GoalItem
                itemData={itemData}
                deleteGoalHandler={deleteGoalHandler}
                id={itemData.item.key}
              />
            )}
            keyExtractor={(item, index) => {
              return item.key;
            }}
          />
          {/* scroll view render all item even not shown */}
          {/* While flat List will render items when get closer */}
        </View>
      </View>
    </>
  );
}

const style = StyleSheet.create({
  appContainer: {
    flex: 1,
    padding: 50,
    paddingHorizontal: 36,
  },
  goalContainer: {
    flex: 4,
  }
});
