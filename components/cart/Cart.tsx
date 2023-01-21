import {useSelector, useDispatch} from "react-redux";
import {ScrollView, StyleSheet, RefreshControl, Modal, TouchableOpacity, Text, View} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {FC, useState, useCallback, useEffect} from 'react';
import EmptyCart from "./EmptyCart";
import CartItem from "./CartItem";
import { setCartDataOnRefresh } from '../../store/reducers/cartData';
import colors from "../../helpers/colorVariables";
import InitialPageLoading from "../loading/InitialPageLoading";
import {RootState} from "../../store";
import {CartItemType} from '../../helpers/customTypings';
import CartFooter from "./CartFooter";

const mockResponse: CartItemType[] = [
    {
        id: 1,
        title: 'iPhone 14',
        price: 15000,
        storage: '512GB',
        count: 1,
    },
    {
        id: 2,
        title: 'iPhone 14',
        price: 20000,
        storage: '512GB',
        count: 1,
    },
    {
        id: 3,
        title: 'iPhone 14',
        price: 20000,
        storage: '512GB',
        count: 1,
    }
];

const Cart: FC = ({ route }: any) => {
    const dispatch = useDispatch();
    const { cartItems } = useSelector((state:RootState) => state.cartData);
    const [initialRefresh, setInitialRefresh] = useState<boolean>(false)
    const [refreshing, setRefreshing] = useState<boolean>(false);

    const getDataOnRefresh = (ifInitialRefresh?: boolean) => {
        ifInitialRefresh
            ? setInitialRefresh(true)
            : setRefreshing(true)

        setTimeout(() => {
            dispatch(setCartDataOnRefresh(mockResponse));
            ifInitialRefresh
                ? setInitialRefresh(false)
                : setRefreshing(false)

        }, 200);
    };

    useFocusEffect(
        useCallback(() => {
            getDataOnRefresh(true)
        }, [route.params.mount])
    );

    const onRefresh = useCallback(() => {
        getDataOnRefresh()
    }, []);

    if(cartItems.length === 0 && !initialRefresh) {
        return <EmptyCart />
    }

    if(initialRefresh) {
        return <InitialPageLoading />
    }
    return (
        <>
            <ScrollView
                refreshControl={ <RefreshControl refreshing={refreshing} onRefresh={onRefresh} /> }
                style={styles.wrapper}
            >
                {
                    cartItems.map((item:CartItemType, index:number) =>
                        <CartItem
                            key={index.toString()}
                            item={item}
                            firstItemUnderline={index === 0 && cartItems.length > 1}
                            notLastItemUnderline={index !== cartItems.length - 1}
                        />)
                }
            </ScrollView>
            <CartFooter />
        </>
    );
}

export default Cart;

const styles = StyleSheet.create({
    wrapper: {
        paddingLeft: 12,
        paddingRight: 12,
        paddingTop: 20,
        backgroundColor: colors.light,
    }
})
