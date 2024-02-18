import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import UsersScreen from "./screens/1.users/users.screen";
import PhotosScreen from "./screens/2.photos/photos.screen";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { IUsers } from "./screens/1.users/query/users.types";
import { createStackNavigator } from "@react-navigation/stack";
import { View } from "react-native";
import useTheme from "./utils/theme";

export type RootStackParamList = {
  Home: undefined;
  Photos: {item: IUsers};
};

const Stack = createStackNavigator<RootStackParamList>();

export default function StackNav() {
    const { colors, colorScheme } = useTheme();
    return (
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Home" component={UsersScreen} />
            <Stack.Screen name="Photos" component={PhotosScreen} />
          </Stack.Navigator>
        </NavigationContainer>
    );
  }