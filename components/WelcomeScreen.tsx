import { StyleSheet, Text, View } from "react-native";

export function WelcomeScreen() {
  return (
    <View>
      <Text style={styles.title}>Ласкаво просимо до Little Lemon</Text>

      <Text style={styles.sectionTitle}>Наша кухня</Text>
      <Text style={styles.paragraph}>
        Little Lemon — невелике бістро середземноморської кухні. У меню є свіжі
        салати з овочами та оливковою олією, домашня паста, запечена риба з
        лимоном і травами, а також грецькі та італійські закуски. Кожного дня ми
        готуємо кілька страв дня із сезонних продуктів.
      </Text>

      <Text style={styles.sectionTitle}>Чим ми вирізняємося</Text>
      <Text style={styles.paragraph}>
        Ми працюємо з місцевими фермерами та беремо овочі, зелень і сир лише зі
        свіжих поставок. Тісто для пасти й хліб ми робимо щоранку самі. Фірмовий
        напій закладу — домашній лимонад із м’ятою та імбиром, за рецептом нашої
        родини.
      </Text>

      <Text style={styles.sectionTitle}>Коли ми працюємо</Text>
      <Text style={styles.paragraph}>
        Бістро відчинене щодня з 9:00 до 22:00. Уранці ми подаємо сніданки та
        каву, а з обіду до вечора — повне меню. У вихідні дні можна замовити
        столик заздалегідь.
      </Text>

      <Text style={styles.sectionTitle}>Для кого наш заклад</Text>
      <Text style={styles.paragraph}>
        Little Lemon підходить для сімейних обідів, зустрічей із друзями та
        ділових перерв. Для дітей є окреме меню, а для гостей, які не вживають
        м’ясо, ми пропонуємо вегетаріанські та веганські страви.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    color: "#EE9972",
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 16,
  },
  sectionTitle: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "600",
    marginTop: 8,
    marginBottom: 6,
  },
  paragraph: {
    color: "#EDEFEE",
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 12,
  },
});
