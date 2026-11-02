import { StatusBar } from "expo-status-bar";
import { StyleSheet, useColorScheme } from "react-native";
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from "@react-navigation/native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import StackFlow from "./navigation/StackFlow";
import TabsFlow from "./navigation/TabsFlow";
import DrawerFlow from "./navigation/DrawerFlow";

const ActiveNavigator = StackFlow;

export default function App() {
  const isDark = useColorScheme() === "dark";

  return (
    <GestureHandlerRootView style={styles.root}>
      <SafeAreaProvider>
        <StatusBar style={isDark ? "light" : "dark"} />
        <NavigationContainer theme={isDark ? DarkTheme : DefaultTheme}>
          <ActiveNavigator />
        </NavigationContainer>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
});
