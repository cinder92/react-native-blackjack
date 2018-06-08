import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Dimensions
} from 'react-native';

const {width,height} = Dimensions.get("window");
const Overlay = props =>{
    return(
        <View style={styles.overlay}>
            <Text style={styles.text}>{props.text}</Text>
            <TouchableOpacity onPress={() => props.onClose()}>
                <View style={styles.btn}>
                    <Text style={styles.continueBtn}>CONTINUE</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    overlay : {
        backgroundColor : "rgba(0,0,0,0.8)",
        position : "absolute",
        top : (height / 2) - 60,
        left : 0,
        right : 0,
        zIndex : 5,
        alignItems : "center",
        justifyContent : "center",
        padding : 12
    },

    text : {
        color : "#fff",
        fontSize : 40,
        textAlign : "center"
    },

    center : {
        alignItems : "center",
        justifyContent : "center"
    },

    btn : {
        marginTop : 10,
        borderWidth : 1,
        borderColor : "#fff",
        padding : 8
    },

    continueBtn : {
        color : "#fff",
        fontSize : 14,
        textAlign : "center"
    }
});

export default Overlay;