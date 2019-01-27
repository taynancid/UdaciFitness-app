import React from "react";
import { View, Platform, StatusBar } from "react-native";
import AddEntry from "./components/AddEntry";
import History from "./components/History";
import { createStore } from "redux";
import { Provider } from "react-redux";
import reducer from "./reducers";
import { createBottomTabNavigator, createAppContainer } from "react-navigation";
import { purple, white } from "./utils/colors";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { Constants } from "expo";

function UdaciStatusBar({ backgroundColor, ...props }) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  );
}

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
          <FontAwesome name="home" size={30} color={tintColor} />
        ) : (
          <Ionicons name="ios-bookmarks" size={30} color={tintColor} />
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
          <UdaciStatusBar backgroundColor={purple} barStyle="light-content" />
          <TabsContainer />
        </View>
      </Provider>
    );
  }
}
