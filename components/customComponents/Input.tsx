import { FC, useState } from 'react';
import {StyleSheet, Text, View, TextInput, Animated, TouchableOpacity} from 'react-native';
import colors from "../../helpers/colorVariables";

type Props = {
    inputLabel: string,
    buttonFunction?: Function
};

const formBorderRadius = 4;

const Input: FC<Props> = ({inputLabel, buttonFunction}) => {

    const [focused, setFocused] = useState<boolean>(false);
    const focusTransition: any = new Animated.Value(0);

    let borderColor = focusTransition.interpolate({
        inputRange: [0, 1],
        outputRange: [colors.inputDefault, colors.inputFocus]
    });

    const onFocus = () => {
        Animated.timing(focusTransition, {
            useNativeDriver: false,
            duration: 200,
            toValue: 1,
        }).start(() => setFocused(true))
    }

    const onInputBlur = () => {
        Animated.timing(focusTransition, {
            useNativeDriver: false,
            toValue: 0,
            duration: 1
        }).start(() => setFocused(false))
    }

    return (
        <View style={styles.form}>
            <Text style={styles.inputLabel}>
                {inputLabel}
            </Text>

            <View style={styles.wrapper}>
                <Animated.View
                    style={[styles.inputWrapper,
                        {
                            borderColor: borderColor,
                            borderBottomRightRadius: buttonFunction ? 0 : 4,
                            borderTopRightRadius: buttonFunction ? 0 : 4,
                            borderRightWidth: buttonFunction ? 0 : 1.5,
                        }]}
                >
                    <TextInput
                        onBlur={() => onInputBlur()}
                        onFocus={() => onFocus()}
                        style={[styles.input]}
                    />
                </Animated.View>
                {buttonFunction && (
                    <TouchableOpacity style={styles.inputBtn}>
                        <Text style={styles.inputBtnText}>Застосувати</Text>
                    </TouchableOpacity>
                )}
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    form: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%'
    },
    wrapper: {
        display: 'flex',
        flexDirection: 'row',
    },
    inputWrapper: {
        flex: 1,
        borderBottomLeftRadius: formBorderRadius,
        borderTopLeftRadius: formBorderRadius,
        borderWidth: 1.5,
    },
    inputBtn: {
        backgroundColor: colors.ctaPrimary,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 12,
        paddingRight: 12,
        borderBottomRightRadius: 4,
        borderTopRightRadius: 4,
    },
    inputBtnText: {
        fontFamily: 'Primary-SemiBold',
        color: colors.light,
        fontSize: 13,
    },
    input: {
        width: '100%',
        height: 42,
        paddingLeft: 12,
        fontSize: 15,
        fontFamily: 'Primary-Medium'
    },
    inputLabel: {
        fontFamily: 'Secondary-SemiBold',
        fontSize: 14,
        letterSpacing: 0.2,
        paddingBottom: 4,
    }
})

export default Input;
