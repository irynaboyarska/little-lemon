import { StyleSheet, Text, View } from "react-native";

function LittleLemonHeader() {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>Little Lemon</Text>
      <Text style={styles.subtitle}>Невелике сімейне бістро</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#495E57",
    paddingVertical: 16,
    paddingHorizontal: 20,
    alignItems: "center",
  },
  title: {
    color: "#FFFFFF",
    fontSize: 28,
    fontWeight: "bold",
  },
  subtitle: {
    color: "#EDEFEE",
    fontSize: 16,
    marginTop: 4,
  },
});

export default LittleLemonHeader;
