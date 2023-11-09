import { useEffect, useLayoutEffect } from "react";
import { StyleSheet, FlatList, View, Text } from "react-native";
// import { useRoute } from '@react-navigation/native'

import { MEALS, CATEGORIES } from "../data/dummy-data";
import MealItem from "../components/MealItem";

function MealsOverviewScreen({ route, navigation }) {
  // in screen components we could use the route props

  // const route = useRoute()
  // route.params => this is good for use when we dont have an screen that is on Stack.Screen
  const catId = route.params.categoryId;

  const displayedMeals = MEALS.filter((mealItem) => {
    return mealItem.categoryIds.indexOf(catId) >= 0;
  });

  useLayoutEffect(() => {
    const categoryTitle = CATEGORIES.find(
      (category) => category.id === catId
    ).title;
    navigation.setOptions({
      title: categoryTitle,
    });
  }, [catId, navigation]);

  function renderMealItem({ item }) {
    return (
      <MealItem
        id={item.id}
        title={item.title}
        imageUrl={item.imageUrl}
        duration={item.duration}
        affordability={item.affordability}
        complexity={item.complexity}
      />
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={displayedMeals}
        keyExtractor={(item) => item.id}
        renderItem={renderMealItem}
      />
    </View>
  );
}

export default MealsOverviewScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});
