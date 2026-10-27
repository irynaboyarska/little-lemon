import { StyleSheet, Text, View } from "react-native";
import type { Palette } from "../theme/palette";

type LittleLemonFooterProps = {
  colors: Palette;
};

function LittleLemonFooter({ colors }: LittleLemonFooterProps) {
  const year = new Date().getFullYear();

  return (
    <View style={[styles.footer, { backgroundColor: colors.surface }]}>
      <Text style={[styles.footerText, { color: colors.text }]}>
        © {year} Little Lemon
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    paddingVertical: 14,
    paddingHorizontal: 20,
    alignItems: "center",
  },
  footerText: {
    fontSize: 14,
  },
});

export default LittleLemonFooter;
