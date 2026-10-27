import { StyleSheet, Text, View } from "react-native";
import type { MenuItem } from "../types/menu";

type MenuItemRowProps = {
  item: MenuItem;
};

export function MenuItemRow({ item }: MenuItemRowProps) {
  return (
    <View style={styles.row}>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.price}>{item.price.toFixed(2)} грн</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
  },
  name: {
    flex: 1,
    marginRight: 12,
    color: "#FFFFFF",
    fontSize: 17,
  },
  price: {
    color: "#EE9972",
    fontSize: 17,
    fontWeight: "600",
  },
});
