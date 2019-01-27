import React from "react";
import { StyleSheet, Text, View, Slider } from "react-native";
import AddEntry from "./components/AddEntry";
import History from "./components/History";
import { createStore } from "redux";
import { Provider } from "react-redux";
import reducer from "./reducers";
import { createBottomTabNavigator, createAppContainer } from "react-navigation";
import { purple, white } from "./utils/colors";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { Platform } from "expo-core";

const Tabs = createBottomTabNavigator(
  {
    History: History,
    AddEntry: AddEntry
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ tintColor }) => {
        const { routeName } = navigation.state;
        return routeName === "History" ? (
          <Ionicons name="ios-bookmarks" size={30} color={tintColor} />
        ) : (
          <FontAwesome name="plus-square" size={30} color={tintColor} />
        );
      }
    }),
    tabBarOptions: {
      showIcon: true,
      activeTintColor: Platform.OS === "ios" ? purple : white,
      style: {
        height: 56,
        backgroundColor: Platform.OS === "ios" ? white : purple,
        shadowColor: "rgba(0,0,0,0.24)",
        shadowOffset: {
          width: 0,
          height: 3
        },
        shadowRadius: 6,
        shadowOpacity: 1
      }
    }
  }
);

const TabsContainer = createAppContainer(Tabs);

export default class App extends React.Component {
  render() {
    return (
      <Provider store={createStore(reducer)}>
        <View style={{ flex: 1 }}>
          <View style={{ height: 20 }} />
          <TabsContainer />
        </View>
      </Provider>
    );
  }
}
