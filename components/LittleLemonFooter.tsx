import { StyleSheet, Text, View } from "react-native";

export function LittleLemonFooter() {
  const year = new Date().getFullYear();

  return (
    <View style={styles.footer}>
      <Text style={styles.footerText}>© {year} Little Lemon</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    backgroundColor: "#EDEFEE",
    paddingVertical: 14,
    paddingHorizontal: 20,
    alignItems: "center",
  },
  footerText: {
    color: "#333333",
    fontSize: 14,
  },
});
