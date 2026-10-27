import { SectionList, StyleSheet, Text, View } from "react-native";
import type { SectionListData } from "react-native";
import type { CategoryInfo, MenuItem } from "../types/menu";
import { categories, menuItems } from "../data/menu";
import { MenuItemRow } from "../components/MenuItemRow";

const sections: SectionListData<MenuItem, CategoryInfo>[] = categories.map(
  (category) => ({
    ...category,
    data: menuItems.filter((item) => item.category === category.key),
  }),
);

function Separator() {
  return <View style={styles.separator} />;
}

export default function MenuGroupedScreen() {
  return (
    <SectionList<MenuItem, CategoryInfo>
      style={styles.list}
      contentContainerStyle={styles.content}
      sections={sections}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <MenuItemRow item={item} />}
      renderSectionHeader={({ section }) => (
        <Text style={styles.sectionTitle}>{section.title}</Text>
      )}
      ItemSeparatorComponent={Separator}
      stickySectionHeadersEnabled={true}
    />
  );
}

const styles = StyleSheet.create({
  list: { flex: 1 },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 32,
  },
  sectionTitle: {
    backgroundColor: "#495E57",
    color: "#EE9972",
    fontSize: 22,
    fontWeight: "bold",
    paddingVertical: 10,
  },
  separator: {
    height: 1,
    backgroundColor: "#EDEFEE",
    opacity: 0.3,
  },
});
