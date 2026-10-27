import { StyleSheet, Text, View } from "react-native";
import type { Palette } from "../theme/palette";

type LittleLemonHeaderProps = {
  colors: Palette;
};

function LittleLemonHeader({ colors }: LittleLemonHeaderProps) {
  return (
    <View style={[styles.header, { backgroundColor: colors.surface }]}>
      <Text style={[styles.title, { color: colors.text }]}>Little Lemon</Text>
      <Text style={[styles.subtitle, { color: colors.muted }]}>
        Невелике сімейне бістро
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 16,
    marginTop: 4,
  },
});

export default LittleLemonHeader;
