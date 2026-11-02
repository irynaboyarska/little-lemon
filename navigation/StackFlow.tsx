import { createNativeStackNavigator } from "@react-navigation/native-stack";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import ScreenFrame from "../components/ScreenFrame";
import DetailsScreen from "../screens/DetailsScreen";
import LoginScreen from "../screens/LoginScreen";
import MenuFlatScreen from "../screens/MenuFlatScreen";
import WelcomeScreen from "../screens/WelcomeScreen";
import { useAppColors } from "../theme/useAppColors";
import type { StackParamList } from "./types";

const Stack = createNativeStackNavigator<StackParamList>();

type LoginProps = NativeStackScreenProps<StackParamList, "Login">;
type WelcomeProps = NativeStackScreenProps<StackParamList, "Welcome">;
type MenuProps = NativeStackScreenProps<StackParamList, "Menu">;
type DetailsProps = NativeStackScreenProps<StackParamList, "Details">;

function LoginRoute({ navigation }: LoginProps) {
  const colors = useAppColors();
  return (
    <ScreenFrame colors={colors}>
      <LoginScreen
        colors={colors}
        onContinue={(email) => navigation.navigate("Welcome", { email })}
      />
    </ScreenFrame>
  );
}

function WelcomeRoute({ navigation, route }: WelcomeProps) {
  const colors = useAppColors();
  return (
    <ScreenFrame colors={colors}>
      <WelcomeScreen
        colors={colors}
        email={route.params.email}
        onExit={() => navigation.goBack()}
        onOpenMenu={() => navigation.navigate("Menu")}
      />
    </ScreenFrame>
  );
}

function MenuRoute({ navigation }: MenuProps) {
  const colors = useAppColors();
  return (
    <ScreenFrame colors={colors}>
      <MenuFlatScreen
        onSelectItem={(itemId) => navigation.navigate("Details", { itemId })}
      />
    </ScreenFrame>
  );
}

function DetailsRoute({ route }: DetailsProps) {
  const colors = useAppColors();
  return (
    <ScreenFrame colors={colors}>
      <DetailsScreen itemId={route.params.itemId} />
    </ScreenFrame>
  );
}

export default function StackFlow() {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="Login"
        component={LoginRoute}
        options={{ title: "Навчальна форма" }}
      />
      <Stack.Screen
        name="Welcome"
        component={WelcomeRoute}
        options={{ title: "Привітання" }}
      />
      <Stack.Screen
        name="Menu"
        component={MenuRoute}
        options={{ title: "Меню" }}
      />
      <Stack.Screen
        name="Details"
        component={DetailsRoute}
        options={{ title: "Деталі страви" }}
      />
    </Stack.Navigator>
  );
}
