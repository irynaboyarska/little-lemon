import { useState } from "react";
import { FlatList, StyleSheet, Text, TextInput, View } from "react-native";
import type { MenuItem } from "../types/menu";
import { menuItems } from "../data/menu";
import { MenuItemRow } from "../components/MenuItemRow";
import { useAppColors } from "../theme/useAppColors";

type MenuFlatScreenProps = {
  onSelectItem?: (itemId: string) => void;
};

export default function MenuFlatScreen({ onSelectItem }: MenuFlatScreenProps) {
  const colors = useAppColors();
  const [query, setQuery] = useState("");
  const normalizedQuery = query.trim().toLocaleLowerCase("uk-UA");
  const visibleItems = menuItems.filter((item) =>
    item.name.toLocaleLowerCase("uk-UA").includes(normalizedQuery),
  );

  return (
    <View style={styles.screen}>
      <View style={styles.searchBox}>
        <TextInput
          style={[
            styles.input,
            {
              color: colors.text,
              backgroundColor: colors.surface,
              borderColor: colors.border,
            },
          ]}
          value={query}
          onChangeText={setQuery}
          placeholder="Пошук страви"
          placeholderTextColor={colors.muted}
          accessibilityLabel="Пошук страви"
          autoCorrect={false}
        />
      </View>
      <FlatList<MenuItem>
        style={styles.list}
        contentContainerStyle={styles.content}
        data={visibleItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <MenuItemRow item={item} onPress={onSelectItem} />
        )}
        ListHeaderComponent={
          <Text style={[styles.heading, { color: colors.text }]}>
            Наше меню
          </Text>
        }
        ItemSeparatorComponent={() => (
          <View
            style={[styles.separator, { backgroundColor: colors.border }]}
          />
        )}
        ListEmptyComponent={
          <Text style={[styles.empty, { color: colors.muted }]}>
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
    fontSize: 16,
    borderWidth: 1,
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
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 8,
  },
  separator: {
    height: 1,
    opacity: 0.4,
  },
  empty: {
    fontSize: 16,
    paddingVertical: 16,
  },
});
