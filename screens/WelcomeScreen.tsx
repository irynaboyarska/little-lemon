import { useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
} from "react-native";
import type { Palette } from "../theme/palette";

type WelcomeScreenProps = {
  colors: Palette;
  email: string;
  onExit: () => void;
};

export default function WelcomeScreen({
  colors,
  email,
  onExit,
}: WelcomeScreenProps) {
  const [name, setName] = useState("");
  const trimmedName = name.trim();

  return (
    <KeyboardAvoidingView
      style={styles.screen}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
      >
        <Image
          source={require("../assets/images/logo.png")}
          style={styles.logo}
          resizeMode="contain"
          accessible={true}
          accessibilityLabel="Логотип Little Lemon"
        />
        <Text style={[styles.title, { color: colors.text }]}>
          Ласкаво просимо до Little Lemon
        </Text>
        <Text style={[styles.notice, { color: colors.muted }]}>
          Дані перевірено локально. Відкрито навчальний екран для {email}.
        </Text>

        <Text style={[styles.label, { color: colors.text }]}>Ваше ім’я</Text>
        <TextInput
          style={[
            styles.input,
            {
              color: colors.text,
              backgroundColor: colors.surface,
              borderColor: colors.border,
            },
          ]}
          value={name}
          onChangeText={setName}
          placeholder="Введіть ім’я"
          placeholderTextColor={colors.muted}
          accessibilityLabel="Ваше ім’я"
        />
        <Text style={[styles.greeting, { color: colors.text }]}>
          {trimmedName ? `Вітаємо, ${trimmedName}!` : "Введіть ім’я."}
        </Text>

        <Text style={[styles.sectionTitle, { color: colors.text }]}>
          Наша кухня
        </Text>
        <Text style={[styles.paragraph, { color: colors.muted }]}>
          Little Lemon — невелике бістро середземноморської кухні. У меню є
          свіжі салати з овочами та оливковою олією, домашня паста, запечена
          риба з лимоном і травами, а також грецькі та італійські закуски.
          Кожного дня ми готуємо кілька страв дня із сезонних продуктів.
        </Text>

        <Text style={[styles.sectionTitle, { color: colors.text }]}>
          Чим ми вирізняємося
        </Text>
        <Text style={[styles.paragraph, { color: colors.muted }]}>
          Ми працюємо з місцевими фермерами та беремо овочі, зелень і сир лише
          зі свіжих поставок. Тісто для пасти й хліб ми робимо щоранку самі.
          Фірмовий напій закладу — домашній лимонад із м’ятою та імбиром, за
          рецептом нашої родини.
        </Text>

        <Text style={[styles.sectionTitle, { color: colors.text }]}>
          Коли ми працюємо
        </Text>
        <Text style={[styles.paragraph, { color: colors.muted }]}>
          Бістро відчинене щодня з 9:00 до 22:00. Уранці ми подаємо сніданки та
          каву, а з обіду до вечора — повне меню. У вихідні дні можна замовити
          столик заздалегідь.
        </Text>

        <Text style={[styles.sectionTitle, { color: colors.text }]}>
          Для кого наш заклад
        </Text>
        <Text style={[styles.paragraph, { color: colors.muted }]}>
          Little Lemon підходить для сімейних обідів, зустрічей із друзями та
          ділових перерв. Для дітей є окреме меню, а для гостей, які не вживають
          м’ясо, ми пропонуємо вегетаріанські та веганські страви.
        </Text>

        <Pressable
          accessibilityRole="button"
          onPress={onExit}
          style={({ pressed }) => [
            styles.button,
            { backgroundColor: colors.accent },
            pressed && styles.buttonPressed,
          ]}
        >
          <Text style={[styles.buttonText, { color: colors.onAccent }]}>
            Повернутися до форми
          </Text>
        </Pressable>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  scroll: { flex: 1 },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 32,
  },
  logo: {
    width: 120,
    height: 140,
    alignSelf: "center",
    marginBottom: 16,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 8,
  },
  notice: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 6,
  },
  input: {
    fontSize: 16,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  greeting: {
    fontSize: 18,
    marginTop: 12,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginTop: 8,
    marginBottom: 6,
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 12,
  },
  button: {
    minHeight: 48,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 16,
  },
  buttonPressed: { opacity: 0.75 },
  buttonText: { fontSize: 18, fontWeight: "600", textAlign: "center" },
});
