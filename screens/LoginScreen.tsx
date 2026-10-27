import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
} from "react-native";

function isEmailFormatValid(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailTouched, setEmailTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);

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

  return (
    <KeyboardAvoidingView
      style={styles.screen}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={styles.form}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        indicatorStyle="white"
      >
        <Text style={styles.title}>Вхід до Little Lemon</Text>
        <Text style={styles.description}>Введіть email і пароль.</Text>

        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          onBlur={handleEmailBlur}
          placeholder="name@example.com"
          placeholderTextColor="#777777"
          accessibilityLabel="Email"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
        />
        {emailMessage !== "" && (
          <Text style={emailIsError ? styles.errorText : styles.infoText}>
            {emailMessage}
          </Text>
        )}

        <Text style={styles.label}>Пароль</Text>
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          onBlur={() => setPasswordTouched(true)}
          placeholder="Введіть пароль"
          placeholderTextColor="#777777"
          accessibilityLabel="Пароль"
          secureTextEntry
          autoCapitalize="none"
          autoCorrect={false}
          returnKeyType="done"
          submitBehavior="blurAndSubmit"
        />
        {passwordMessage !== "" && (
          <Text style={passwordIsError ? styles.errorText : styles.infoText}>
            {passwordMessage}
          </Text>
        )}
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
    color: "#EE9972",
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 8,
  },
  description: {
    color: "#EDEFEE",
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 20,
  },
  label: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
    marginTop: 12,
    marginBottom: 6,
  },
  input: {
    backgroundColor: "#FFFFFF",
    color: "#333333",
    fontSize: 16,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  infoText: {
    color: "#EDEFEE",
    fontSize: 14,
    marginTop: 6,
  },
  errorText: {
    color: "#EE9972",
    fontSize: 14,
    marginTop: 6,
  },
});
