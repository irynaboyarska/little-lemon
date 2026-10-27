import { useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
} from "react-native";
import type { Palette } from "../theme/palette";

type LoginScreenProps = {
  colors: Palette;
  onContinue: (email: string) => void;
};

function isEmailFormatValid(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

export default function LoginScreen({ colors, onContinue }: LoginScreenProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailTouched, setEmailTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [error, setError] = useState<string | null>(null);

  let emailMessage = "";
  let emailIsError = false;
  if (email.trim() === "") {
    if (emailTouched) {
      emailMessage = "Введіть email.";
      emailIsError = true;
    }
  } else if (isEmailFormatValid(email)) {
    emailMessage = "Формат email коректний.";
  } else {
    emailMessage = "Email має неправильний формат.";
    emailIsError = true;
  }

  let passwordMessage = "";
  let passwordIsError = false;
  if (password === "") {
    if (passwordTouched) {
      passwordMessage = "Введіть пароль.";
      passwordIsError = true;
    }
  } else {
    passwordMessage = "Пароль введено.";
  }

  function handleEmailBlur() {
    const normalized = email.trim();
    setEmail(normalized);
    setEmailTouched(true);
  }

  function handleContinue() {
    const normalizedEmail = email.trim();
    const emailLooksValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail);

    if (!emailLooksValid) {
      setError("Введіть email у форматі name@example.com.");
      return;
    }
    if (password.length === 0) {
      setError("Введіть навчальний пароль.");
      return;
    }

    setError(null);
    Keyboard.dismiss();
    setPassword("");
    onContinue(normalizedEmail);
  }

  const inputStyle = [
    styles.input,
    {
      color: colors.text,
      backgroundColor: colors.surface,
      borderColor: colors.border,
    },
  ];

  return (
    <KeyboardAvoidingView
      style={styles.screen}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={styles.form}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
      >
        <Text style={[styles.title, { color: colors.text }]}>
          Вхід до Little Lemon
        </Text>
        <Text style={[styles.description, { color: colors.muted }]}>
          Введіть вигаданий email і пароль. Це навчальна форма: дані нікуди не
          надсилаються й не зберігаються.
        </Text>

        <Text style={[styles.label, { color: colors.text }]}>Email</Text>
        <TextInput
          style={inputStyle}
          value={email}
          onChangeText={setEmail}
          onBlur={handleEmailBlur}
          placeholder="name@example.com"
          placeholderTextColor={colors.muted}
          accessibilityLabel="Email"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
        />
        {emailMessage !== "" && (
          <Text
            style={[
              styles.hint,
              { color: emailIsError ? colors.error : colors.muted },
            ]}
          >
            {emailMessage}
          </Text>
        )}

        <Text style={[styles.label, { color: colors.text }]}>Пароль</Text>
        <TextInput
          style={inputStyle}
          value={password}
          onChangeText={setPassword}
          onBlur={() => setPasswordTouched(true)}
          placeholder="Введіть пароль"
          placeholderTextColor={colors.muted}
          accessibilityLabel="Пароль"
          secureTextEntry
          autoCapitalize="none"
          autoCorrect={false}
          returnKeyType="done"
          submitBehavior="blurAndSubmit"
        />
        {passwordMessage !== "" && (
          <Text
            style={[
              styles.hint,
              { color: passwordIsError ? colors.error : colors.muted },
            ]}
          >
            {passwordMessage}
          </Text>
        )}

        {error !== null && (
          <Text style={[styles.message, { color: colors.error }]}>{error}</Text>
        )}

        <Pressable
          accessibilityRole="button"
          onPress={handleContinue}
          style={({ pressed }) => [
            styles.button,
            { backgroundColor: colors.accent },
            pressed && styles.buttonPressed,
          ]}
        >
          <Text style={[styles.buttonText, { color: colors.onAccent }]}>
            Увійти (демо)
          </Text>
        </Pressable>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  form: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 32,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 12,
    marginBottom: 6,
  },
  input: {
    fontSize: 16,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  hint: {
    fontSize: 14,
    marginTop: 6,
  },
  message: { fontSize: 16, lineHeight: 24, marginVertical: 12 },
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
