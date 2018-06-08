import React from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    Text
} from 'react-native';

const ActionButton = props => {
    return(
        <TouchableOpacity
            onPress={() => {
                if(props.onPress) props.onPress()
            }}
        >
            <View style={[
                props.direction == 'right' ? styles.rightDirection : 
                props.direction == 'left' ? styles.leftDirection : {},
                styles.wrap,
                props.style
            ]}>
                <Text style={styles.text}>{props.text.replace(" ",'\n')}</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    wrap : {
        padding : 6,
        backgroundColor : "rgba(255,255,255,0.7)",
        borderColor : "rgba(255,255,255,0.9)",
        borderWidth : 2,
        marginBottom : 12
    },
    rightDirection : {
        borderTopRightRadius : 6,
        borderBottomRightRadius : 6
    },
    leftDirection : {
        borderTopLeftRadius : 6,
        borderBottomLeftRadius : 6
    },
    text : {
        color : "white",
        fontWeight : "bold",
        fontSize : 14,
        textAlign : "center"
    }
});

export default ActionButton;