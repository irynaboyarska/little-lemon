import type { ReactNode } from "react";
import { StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import type { Palette } from "../theme/palette";
import LittleLemonFooter from "./LittleLemonFooter";

type ScreenFrameProps = {
  colors: Palette;
  children: ReactNode;
  bottomInset?: boolean;
};

function ScreenFrame({
  colors,
  children,
  bottomInset = true,
}: ScreenFrameProps) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.frame, { backgroundColor: colors.background }]}>
      <View style={styles.content}>{children}</View>
      <View
        style={{
          backgroundColor: colors.surface,
          paddingBottom: bottomInset ? insets.bottom : 0,
        }}
      >
        <LittleLemonFooter colors={colors} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  frame: { flex: 1 },
  content: { flex: 1 },
});

export default ScreenFrame;
