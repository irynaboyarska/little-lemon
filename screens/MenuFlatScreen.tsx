import { useState } from "react";
import { FlatList, StyleSheet, Text, TextInput, View } from "react-native";
import type { MenuItem } from "../types/menu";
import { menuItems } from "../data/menu";
import { MenuItemRow } from "../components/MenuItemRow";

function Separator() {
  return <View style={styles.separator} />;
}

export default function MenuFlatScreen() {
  const [query, setQuery] = useState("");
  const normalizedQuery = query.trim().toLocaleLowerCase("uk-UA");
  const visibleItems = menuItems.filter((item) =>
    item.name.toLocaleLowerCase("uk-UA").includes(normalizedQuery),
  );

  return (
    <View style={styles.screen}>
      <View style={styles.searchBox}>
        <TextInput
          style={styles.input}
          value={query}
          onChangeText={setQuery}
          placeholder="Пошук страви"
          placeholderTextColor="#777777"
          accessibilityLabel="Пошук страви"
          autoCorrect={false}
        />
      </View>
      <FlatList<MenuItem>
        style={styles.list}
        contentContainerStyle={styles.content}
        data={visibleItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <MenuItemRow item={item} />}
        ListHeaderComponent={<Text style={styles.heading}>Наше меню</Text>}
        ItemSeparatorComponent={Separator}
        ListEmptyComponent={
          <Text style={styles.empty}>
            {normalizedQuery ? "Нічого не знайдено." : "Меню поки порожнє."}
          </Text>
        }
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  searchBox: {
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  input: {
    backgroundColor: "#FFFFFF",
    color: "#333333",
    fontSize: 16,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  list: { flex: 1 },
  content: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 32,
  },
  heading: {
    color: "#EE9972",
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 8,
  },
  separator: {
    height: 1,
    backgroundColor: "#EDEFEE",
    opacity: 0.3,
  },
  empty: {
    color: "#EDEFEE",
    fontSize: 16,
    paddingVertical: 16,
  },
});
