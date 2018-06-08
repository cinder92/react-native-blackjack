import React,{Component} from 'react';
import {
    View,
    ScrollView,
    StyleSheet,
    Image,
    Text,
    TouchableOpacity,
    Dimensions
} from 'react-native';

import chips from '../data/chips';

const {width} = Dimensions.get('window');
const PADDING_WRAP = 8;
const MARGIN_SIDE = 20;
const CHIPS_SHOWN = 7;
const CHIP_WIDTH = (width / CHIPS_SHOWN) - ((MARGIN_SIDE / 2) * 2);

class ChipSelector extends Component{

    render(){
        const {onSelect} = this.props;
        return(
            <View style={styles.chipsWrapper}>
                <ScrollView 
                    horizontal={true}
                    contentContainerStyle={styles.scrollableContent}
                    showsHorizontalScrollIndicator={false}
                >
                    {chips && chips.length > 0 && chips.map((chip,_index) => (
                        <TouchableOpacity 
                            key={_index}
                            onPress={() => onSelect(chip.value)}
                        >
                            <View style={
                                _index < (chips.length-1) ? styles.chipWrap : {}
                            }>
                                <Image 
                                    source={chip.image}
                                    resizeMode={'cover'}
                                    style={styles.chip}
                                />
                            </View>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    chipsWrapper : {
        backgroundColor : "#8A5D3C",
        borderColor : "#AF7B56",
        borderTopWidth : 2,
        borderBottomWidth : 2,
        /*elevation : 5,
        position : "absolute",
        bottom : 0,
        left : 0,
        right : 0,
        zIndex : 3*/
    },
    scrollableContent:{
        padding : PADDING_WRAP
    },
    chipWrap: {
        marginRight : MARGIN_SIDE
    },
    chip : {
        width : CHIP_WIDTH, 
        height: CHIP_WIDTH
    }
})

export default ChipSelector;