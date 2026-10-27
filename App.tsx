import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, StyleSheet } from "react-native";
import { LittleLemonHeader } from "./components/LittleLemonHeader";
import { WelcomeScreen } from "./components/WelcomeScreen";
import { LittleLemonFooter } from "./components/LittleLemonFooter";

export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.screen} edges={["top", "bottom"]}>
        <LittleLemonHeader />
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          indicatorStyle="white"
        >
          <WelcomeScreen />
        </ScrollView>
        <LittleLemonFooter />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#495E57" },
  scroll: { flex: 1 },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 32,
  },
});
