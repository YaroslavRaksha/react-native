import {FC, useState, useRef} from 'react';
import { Image, Text, View, StyleSheet, Animated, TouchableOpacity } from 'react-native';
import colors from "../../helpers/colorVariables";
import {CartItemType} from '../../helpers/customTypings';
import ImageLoading from "../loading/ImageLoading";
import {useDispatch} from "react-redux";
import {removeCartItem, setCartItemQuantity} from "../../store/reducers/cartData";

type Props = {
    key: string,
    item: CartItemType,
    firstItemUnderline: boolean,
    notLastItemUnderline: boolean,
}


const CartItem: FC<Props> = ({item, firstItemUnderline, notLastItemUnderline}) => {
    const dispatch = useDispatch();

    const [imageLoaded, setImageLoaded] = useState<boolean>(true);
    const { id, title, price, storage, count } = item;

    const setQuantity = (isPlus:boolean) => {
        /*  we need to check if item quantity set is available */
        const maxQuantity = 3;

        if(isPlus && !(item.count + 1 > maxQuantity)) {
            dispatch(setCartItemQuantity({changedCountItemId: id, newCount: item.count + 1}))
        }
        else if(!isPlus && !(item.count - 1 < 1)) {
            dispatch(setCartItemQuantity({changedCountItemId: id, newCount: item.count - 1}))
        }
    };

    const fadeOut: any = new Animated.Value(1);

    const removeItem = () => {

        Animated.timing(fadeOut, {
            toValue:  0,
            duration:  300,
            useNativeDriver: true,
        }).start(() => dispatch(removeCartItem({removedItemId: item.id})));

    };


    return (
        <Animated.View
            style={[
                {opacity: fadeOut},
                styles.productWrapper,
                firstItemUnderline || notLastItemUnderline ? styles.underline : {}]}
        >
            <View style={styles.productImage}>
                { imageLoaded ? null : <ImageLoading /> }
                <Image
                    onLoadStart={() => setImageLoaded(false)}
                    onLoadEnd={() => setImageLoaded(true)}
                    source={require('../../assets/iphone.png')}
                    resizeMode="contain"
                    style={{flex: 1, height: undefined, width: undefined }}
                />
            </View>

            <View style={{flex: 1}}>
                <View style={styles.productHeader}>
                    <Text style={styles.productTitle}>{title}</Text>
                    <TouchableOpacity onPress={() => removeItem()}>
                        <Image
                            style={styles.removeItemIcon}
                            source={require('../../assets/icons/trash.png')}
                        />
                    </TouchableOpacity>
                </View>
                <Text style={styles.productPrice}>{price.toLocaleString()} грн</Text>
                <View style={styles.descriptionItem}>
                    <Text style={styles.descriptionLabel}>Колір:</Text>
                    <Image style={styles.colorEllipse} source={require('../../assets/ellipse.png')} />
                </View>
                <View style={styles.descriptionItem}>
                    <Text style={styles.descriptionLabel}>Пам'ять:</Text>
                    <Text style={styles.descriptionValue}>{storage}</Text>
                </View>
                <View style={[styles.descriptionItem, { marginTop: 8}]}>
                    <Text style={styles.descriptionLabel}>Кількість:</Text>
                    <View style={styles.productCount}>
                        <TouchableOpacity onPress={() => setQuantity(false)}>
                            <Image source={require('../../assets/icons/cart/minus.png')} style={{ width: 30, height: 30, marginRight: 8 }} />
                        </TouchableOpacity>
                        <Text style={styles.descriptionValue}>{count}</Text>
                        <TouchableOpacity onPress={() => setQuantity(true)}>
                            <Image source={require('../../assets/icons/cart/plus.png')} style={{ width: 30, height: 30, marginLeft: 8 }} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Animated.View>
    )
};

export default CartItem;

const styles = StyleSheet.create({
    removeItemIcon: {
      width: 20,
      height: 20,
    },
    productWrapper: {
        paddingBottom: 16,
        marginBottom: 16,
        height: 164,
        display: 'flex',
        flexDirection: 'row',
    },
    productImage: {
        position: 'relative',
        backgroundColor: colors.imgBackground,
        height: '100%',
        width: 130,
        marginRight: 16,
        paddingLeft: 4,
        paddingRight: 4,
    },
    productHeader: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    productTitle: {
        fontFamily: 'Secondary-Bold',
        fontSize: 15,
    },
    productPrice: {
        marginBottom: 10,
        marginTop: 4,
        fontFamily: 'Primary-SemiBold',
        fontSize: 13,
    },
    descriptionItem: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
    },
    descriptionLabel: {
        width: 60,
        marginRight: 16,
        fontFamily: 'Primary-Regular',
        fontSize: 12,
        color: colors.dark
    },
    descriptionValue: {
        fontSize: 12,
        fontFamily: 'Primary-Medium',
        color: colors.gray
    },
    colorEllipse: {
        width: 16,
        height: 16,
        borderRadius: 50,
        borderWidth: 1,
        borderColor: colors.lightGray
    },
    productRemove: {
        marginTop: -2,
        display: 'flex',
    },
    productCount: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    underline: {
        borderBottomWidth: 1,
        borderColor: 'rgb(224,224,224)'
    }
})
