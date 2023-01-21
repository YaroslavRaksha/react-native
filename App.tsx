
import { NavigationContainer } from '@react-navigation/native';
import BottomNavigation from "./components/navigation/BottomNavigation";
import { useFonts } from 'expo-font';
import customFonts from "./helpers/customFonts";
import StartAppLoading from "./components/loading/StartAppLoading";
import { Provider } from 'react-redux';
import store from './store';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Checkout from "./components/checkout/Checkout";
import colors from "./helpers/colorVariables";
import BackButton from "./components/customComponents/BackButton";


const Stack = createNativeStackNavigator();

export default function App() {

    const [fontsLoaded] = useFonts(customFonts);

    if (!fontsLoaded) {
        return <StartAppLoading />
    }

    const screenOptions: {} = {
        headerStyle: {
            backgroundColor: colors.light,
            borderWidth: 0
        },
        headerTitleAlign: 'center',
        headerTitleAlign: 'center',
        headerTitleStyle: {
            fontFamily: 'Primary-SemiBold',
            fontSize: 17,
        },
        headerShadowVisible: false,
        headerBackTitleVisible: false,
    };


    return (
        <Provider store={store}>
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen
                        name='_Main'
                        component={BottomNavigation}
                        initialParams={{screenOptions: screenOptions}}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name='Замовлення'
                        component={Checkout}
                        options={{
                            ...screenOptions,
                            headerBackTitleVisible: false,
                            headerLeft: () => <BackButton />,
                        }}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </Provider>
    );
}
