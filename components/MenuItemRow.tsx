import { Pressable, StyleSheet, Text, View } from "react-native";
import type { MenuItem } from "../types/menu";
import { useAppColors } from "../theme/useAppColors";

type MenuItemRowProps = {
  item: MenuItem;
  onPress?: (id: string) => void;
};

export function MenuItemRow({ item, onPress }: MenuItemRowProps) {
  const colors = useAppColors();

  const content = (
    <>
      <Text style={[styles.name, { color: colors.text }]}>{item.name}</Text>
      <Text style={[styles.price, { color: colors.muted }]}>
        {item.price.toFixed(2)} грн
      </Text>
    </>
  );

  if (onPress === undefined) {
    return <View style={styles.row}>{content}</View>;
  }

  return (
    <Pressable
      accessibilityRole="button"
      onPress={() => onPress(item.id)}
      style={({ pressed }) => [styles.row, pressed && styles.rowPressed]}
    >
      {content}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
  },
  rowPressed: { opacity: 0.6 },
  name: {
    flex: 1,
    marginRight: 12,
    fontSize: 17,
  },
  price: {
    fontSize: 17,
    fontWeight: "600",
  },
});
