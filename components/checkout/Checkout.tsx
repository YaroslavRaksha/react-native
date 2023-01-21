import {FC, useEffect, useState} from 'react';
import {View, TouchableWithoutFeedback, Keyboard, StyleSheet, Text} from 'react-native';
import colors from "../../helpers/colorVariables";
import Input from "../customComponents/Input";
import CheckoutProgressBar from "./CheckoutProgressBar";
import CtaButton from "../customComponents/CtaButton";
import {useNavigation} from "@react-navigation/native";
import { ProgressItemsType } from '../../helpers/customTypings';
import BackButton from "../customComponents/BackButton";



const Checkout: FC = ({navigation, route}: any) => {

    const { navigate }: any = useNavigation();
    const currentPageIndex = route?.params?.nextPage || 0;

    useEffect(() => {

        /* If we are on first page, return back to cart. If not, go back to previous progress item */
        const goBackFunction = () =>
            currentPageIndex ? navigate('Замовлення', { nextPage: currentPageIndex - 1 }) : navigate('Кошик');

        navigation.setOptions({
            headerTitle: `Замовлення ${currentPageIndex + 1}/${progressItems.length}`,
            headerLeft: () =>
                <BackButton
                    onPress={() => goBackFunction()}
                />

        })
    }, [currentPageIndex]);

    const [progressItems, setProgressItems] = useState<ProgressItemsType[]>([
        {
            progressBarTitle: 'ФІО',
            title: 'ФІО отримувача',
            inputs: [{ label: "Ім'я" }, { label: "Прізвище" }, {label: "Номер телефону"}]
        },
        {
            title: 'Адреса',
            inputs: [{ label: "Місто" }, { label: "Відділення Нової Пошти" }]
        },
        {
            title: 'Оплата',
            inputs: [{ label: "Ім'я" }, { label: "Прізвище" }]
        }
    ]);

    if(currentPageIndex > progressItems.length - 1) {
        /* End of Checkout */
        return false;
    }

    const selectedProgress = progressItems[currentPageIndex];

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={styles.wrapper}>
                <View style={styles.progressBar}>
                    <CheckoutProgressBar
                        progressItems={progressItems}
                        currentPageIndex={currentPageIndex}
                    />
                </View>

                <View>
                    <Text style={styles.checkoutTitle}>{selectedProgress!.title}</Text>
                    {selectedProgress!.inputs!.map((input, index) =>
                        <View key={index} style={styles.checkoutInput}>
                            <Input inputLabel={input.label} />
                        </View>
                    )}

                </View>

                <View style={{marginTop: 12}}>
                    <CtaButton
                        text='Далі'
                        onPress={() =>
                            navigate('Замовлення', { nextPage: currentPageIndex + 1 })}
                    />
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
};

const styles = StyleSheet.create({
    wrapper: {
        paddingLeft: 18,
        paddingRight: 18,
        paddingTop: 24,
        backgroundColor: colors.light,
        height: '100%'
    },
    progressBar: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 32,
        marginLeft: -12,
        marginRight: -12,
    },
    checkoutInput: {
        marginBottom: 20,
    },
    checkoutTitle: {
        textAlign: 'center',
        marginBottom: 16,
        fontFamily: 'Primary-SemiBold',
        fontSize: 16,
    }
})

export default Checkout;
