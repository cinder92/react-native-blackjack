import React from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';

const FloatingText = props => {
    return(
        <View style={styles.indicator}>
            <Text style={styles.indicatorTxt}>{props.text}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    indicator : {
        backgroundColor : "rgba(0,0,0,0.6)",
        borderColor : "rgba(0,0,0,0.9)",
        padding : 8,
        alignItems : "center",
        marginTop : 8,
        marginBottom : 8,
        borderRadius : 4
    },
    indicatorTxt : {
        color : "white",
        fontSize : 12
    }
});

export default FloatingText;