import { useEffect, useRef, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  ActivityIndicator,
  Button,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  View,
} from "react-native";
import {
  defaults,
  readPreferences,
  removePreferences,
  writePreferences,
  type Preferences,
} from "../storage/preferences";
import { useAppColors } from "../theme/useAppColors";

const labels: Record<keyof Preferences, string> = {
  pushNotifications: "Push-сповіщення",
  emailMarketing: "Маркетингові листи",
  latestNews: "Новини ресторану",
  menuHints: "Показувати підказки меню",
};
const keys: (keyof Preferences)[] = [
  "pushNotifications",
  "emailMarketing",
  "latestNews",
  "menuHints",
];
const message = (e: unknown) =>
  e instanceof Error ? e.message : "Невідома помилка.";

export default function PreferencesScreen() {
  const colors = useAppColors();
  const [draft, setDraft] = useState<Preferences>({ ...defaults });
  const [ready, setReady] = useState(false);
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState("");
  const [attempt, setAttempt] = useState(0);
  const lock = useRef(false);
  const mounted = useRef(false);

  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);

  useEffect(() => {
    let active = true;
    setReady(false);
    setNotice("");
    setBusy(true);
    async function restore() {
      try {
        const saved = await readPreferences();
        if (active) {
          setDraft(saved);
          setReady(true);
        }
      } catch (e: unknown) {
        if (active) setNotice(message(e));
      } finally {
        if (active) setBusy(false);
      }
    }
    void restore();
    return () => {
      active = false;
    };
  }, [attempt]);

  async function persist(reset: boolean) {
    if (lock.current) return;
    lock.current = true;
    setBusy(true);
    setNotice("");
    try {
      if (reset) await removePreferences();
      else await writePreferences(draft);
      if (mounted.current) {
        if (reset) setDraft({ ...defaults });
        setReady(true);
        setNotice(
          reset
            ? "Власний ключ видалено. Діють стандартні значення."
            : "Налаштування збережено.",
        );
      }
    } catch (e: unknown) {
      if (mounted.current) setNotice(message(e));
    } finally {
      lock.current = false;
      if (mounted.current) setBusy(false);
    }
  }

  const enabled = keys.filter((key) => draft[key]).map((key) => labels[key]);
  const summary =
    enabled.length === 0
      ? "Усі параметри вимкнено."
      : `Увімкнено ${enabled.length} з ${keys.length}: ${enabled.join(", ")}.`;

  return (
    <View style={[styles.safe, { backgroundColor: colors.background }]}>
      <ScrollView contentContainerStyle={styles.page}>
        <Text style={[styles.heading, { color: colors.text }]}>
          Налаштування Little Lemon
        </Text>
        <Text style={{ color: colors.muted }}>
          Змініть параметри й натисніть «Зберегти».
        </Text>
        {busy && <ActivityIndicator accessibilityLabel="Робота зі сховищем" />}
        {ready &&
          keys.map((key) => (
            <View key={key} style={styles.row}>
              <Text style={[styles.label, { color: colors.text }]}>
                {labels[key]}
              </Text>
              <Switch
                accessibilityLabel={labels[key]}
                value={draft[key]}
                disabled={busy}
                onValueChange={(value) =>
                  setDraft((prev) => ({ ...prev, [key]: value }))
                }
              />
            </View>
          ))}
        {ready && <Text style={{ color: colors.muted }}>{summary}</Text>}
        {notice !== "" && (
          <Text
            accessibilityLiveRegion="polite"
            style={[styles.notice, { color: colors.text }]}
          >
            {notice}
          </Text>
        )}
        <Button
          title="Зберегти"
          disabled={!ready || busy}
          onPress={() => {
            void persist(false);
          }}
        />
        <Button
          title="Скинути власні налаштування"
          disabled={busy}
          onPress={() => {
            void persist(true);
          }}
        />
        {!ready && !busy && (
          <Button
            title="Повторити читання"
            onPress={() => setAttempt((n) => n + 1)}
          />
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  page: { padding: 20, gap: 14 },
  heading: { fontSize: 26, fontWeight: "700" },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
  },
  label: { flex: 1, fontSize: 16 },
  notice: { paddingVertical: 12 },
});
