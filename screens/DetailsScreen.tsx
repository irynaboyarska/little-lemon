import { ScrollView, StyleSheet, Text } from "react-native";
import { categories, menuItems } from "../data/menu";
import { useAppColors } from "../theme/useAppColors";

type DetailsScreenProps = {
  itemId: string;
};

export default function DetailsScreen({ itemId }: DetailsScreenProps) {
  const colors = useAppColors();
  const item = menuItems.find((candidate) => candidate.id === itemId);

  if (item === undefined) {
    return (
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={[styles.title, { color: colors.error }]}>
          Страву не знайдено
        </Text>
        <Text style={[styles.text, { color: colors.muted }]}>
          Страви з ідентифікатором «{itemId}» немає в меню.
        </Text>
      </ScrollView>
    );
  }

  const category = categories.find((entry) => entry.key === item.category);

  return (
    <ScrollView contentContainerStyle={styles.content}>
      <Text style={[styles.title, { color: colors.text }]}>{item.name}</Text>
      <Text style={[styles.text, { color: colors.muted }]}>
        Категорія: {category ? category.title : item.category}
      </Text>
      <Text style={[styles.price, { color: colors.text }]}>
        {item.price.toFixed(2)} грн
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 12,
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 12,
  },
  price: {
    fontSize: 22,
    fontWeight: "600",
  },
});
