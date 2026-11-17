import { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Button,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import {
  addCustomer,
  deleteCustomer,
  listCustomers,
  renameCustomer,
  type Customer,
} from "../storage/customers";
import { useAppColors } from "../theme/useAppColors";

export default function CustomersScreen() {
  const colors = useAppColors();
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [draft, setDraft] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [ready, setReady] = useState(false);
  const [busy, setBusy] = useState(true);
  const [error, setError] = useState("");
  const [attempt, setAttempt] = useState(0);
  const locked = useRef(false);
  const mounted = useRef(false);

  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);

  useEffect(() => {
    let active = true;
    setBusy(true);
    setError("");
    async function load() {
      try {
        const data = await listCustomers();
        if (active) {
          setCustomers(data);
          setReady(true);
        }
      } catch (e: unknown) {
        if (active) {
          setReady(false);
          setError(e instanceof Error ? e.message : "Помилка бази.");
        }
      } finally {
        if (active) setBusy(false);
      }
    }
    void load();
    return () => {
      active = false;
    };
  }, [attempt]);

  async function mutate(action: () => Promise<void>, clearForm = false) {
    if (locked.current || busy || !ready) return;
    locked.current = true;
    setBusy(true);
    setError("");
    let committed = false;
    try {
      await action();
      committed = true;
      if (mounted.current && clearForm) {
        setDraft("");
        setEditingId(null);
      }
      // Запис у SQLite сам не змінює React state. Читаємо актуальний список.
      const data = await listCustomers();
      if (mounted.current) setCustomers(data);
    } catch (e: unknown) {
      if (mounted.current) {
        const text = e instanceof Error ? e.message : "Помилка бази.";
        setError(
          committed
            ? `Зміну збережено, але список не перечитано. Натисніть «Оновити список». ${text}`
            : text,
        );
        // Після помилки перечитування блокуємо нові зміни до відновлення списку.
        if (committed) setReady(false);
      }
    } finally {
      locked.current = false;
      if (mounted.current) setBusy(false);
    }
  }

  function confirmDelete(customer: Customer) {
    Alert.alert("Видалити клієнта?", `${customer.name} (ID ${customer.id})`, [
      { text: "Скасувати", style: "cancel" },
      {
        text: "Видалити",
        style: "destructive",
        onPress: () => {
          void mutate(
            () => deleteCustomer(customer.id),
            editingId === customer.id,
          );
        },
      },
    ]);
  }

  return (
    <View style={[styles.page, { backgroundColor: colors.background }]}>
      <Text style={[styles.heading, { color: colors.text }]}>
        Клієнти Little Lemon
      </Text>
      <Text style={{ color: colors.muted }}>
        {editingId === null ? "Новий клієнт" : `Редагування ID ${editingId}`}
      </Text>
      <TextInput
        accessibilityLabel="Ім’я клієнта"
        placeholder="Наприклад, Марія"
        placeholderTextColor={colors.muted}
        value={draft}
        onChangeText={setDraft}
        maxLength={80}
        editable={ready && !busy}
        style={[
          styles.input,
          {
            color: colors.text,
            backgroundColor: colors.surface,
            borderColor: colors.border,
          },
        ]}
      />
      <Button
        disabled={!ready || busy || draft.trim() === ""}
        title={editingId === null ? "Додати клієнта" : "Зберегти ім’я"}
        onPress={() => {
          void mutate(
            () =>
              editingId === null
                ? addCustomer(draft)
                : renameCustomer(editingId, draft),
            true,
          );
        }}
      />
      {editingId !== null && (
        <Button
          title="Скасувати редагування"
          disabled={busy}
          onPress={() => {
            setEditingId(null);
            setDraft("");
          }}
        />
      )}
      {busy && <ActivityIndicator accessibilityLabel="Робота з базою" />}
      {error !== "" && (
        <Text accessibilityLiveRegion="polite" style={{ color: colors.error }}>
          {error}
        </Text>
      )}
      <Button
        title="Оновити список"
        disabled={busy}
        onPress={() => setAttempt((n) => n + 1)}
      />
      <FlatList
        style={styles.list}
        data={customers}
        keyExtractor={(item) => String(item.id)}
        ListEmptyComponent={
          !busy && ready ? (
            <Text style={{ color: colors.text }}>Клієнтів поки немає.</Text>
          ) : undefined
        }
        renderItem={({ item }) => (
          <View style={[styles.row, { borderBottomColor: colors.border }]}>
            <Text style={[styles.name, { color: colors.text }]}>
              {item.name}
            </Text>
            <Text style={{ color: colors.muted }}>ID {item.id}</Text>
            <View style={styles.buttons}>
              <Button
                title="Редагувати"
                disabled={!ready || busy}
                onPress={() => {
                  setEditingId(item.id);
                  setDraft(item.name);
                }}
              />
              <Button
                title="Видалити"
                color="#9b2525"
                disabled={!ready || busy}
                onPress={() => confirmDelete(item)}
              />
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, padding: 18, gap: 10 },
  heading: { fontSize: 26, fontWeight: "700" },
  input: { borderWidth: 1, borderRadius: 4, padding: 12 },
  list: { flex: 1 },
  row: { paddingVertical: 16, borderBottomWidth: 1, gap: 8 },
  name: { fontSize: 18 },
  buttons: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
});
