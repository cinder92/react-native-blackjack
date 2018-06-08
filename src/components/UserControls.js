import React,{Component} from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Dimensions
} from 'react-native';
import {calculatePoints} from '../helpers';
import {ActionButton, FloatingText, CardDeck} from '../components';
const {width} = Dimensions.get('window');
const CIRCLE_BET_SIZE = (width / 4) - 20;

class UserControls extends Component{

    constructor(){
        super();

        this.state = {
            playerPoints : 0
        }
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.playerHand){
            this.setState({
                playerPoints : calculatePoints(nextProps.playerHand),
                dealerPoints : calculatePoints(nextProps.dealerHand)
            });
        }
    }

    render(){

        const {playerHand, dealerHand, newGame, hit, endgame, doubleGame, gameover, totalBet, moreMoney} = this.props;
        const {playerPoints, dealerPoints} = this.state;

        return(
            <View style={styles.centerView}>
                
                {/*<View>
                    <ActionButton 
                        direction={'right'}
                        text={"DOUBLE WIN"}
                    />
                </View>*/}

               <View style={styles.center}>
                    {gameover && <FloatingText text={dealerPoints} />}
                    <CardDeck 
                        cards={dealerHand}
                        isDealer={true}
                        gameover={gameover}
                    />
                </View>

                <View style={styles.center}>
                    <FloatingText text={playerPoints} />
                    <CardDeck 
                        cards={playerHand}
                    />
                </View>

                {totalBet == false && (<View style={styles.absoluteBtnRight}>
                    <ActionButton 
                        direction={'left'}
                        text={"NEW CARDS"}
                        onPress={() => newGame()}
                    />
                </View>)}

                {totalBet == false && (<View style={[styles.absoluteBtnRight,{top:60}]}>
                    <ActionButton 
                        direction={'left'}
                        text={"5K PLEASE"}
                        onPress={() => moreMoney()}
                    />
                </View>)}

                {!!totalBet && (<View style={[styles.absoluteBtnRight,{top:60}]}>
                    <ActionButton 
                        direction={'left'}
                        text={"HIT"}
                        onPress={() => hit()}
                    />
                </View>)}

                {!!totalBet && (<View style={[styles.absoluteBtnRight,{top:105}]}>
                    <ActionButton 
                        direction={'left'}
                        text={"DOUBLE"}
                        onPress={() => doubleGame()}
                    />
                </View>)}

                {!!totalBet && (<View style={[styles.absoluteBtnRight,{top:150}]}>
                    <ActionButton 
                        direction={'left'}
                        text={"DEAL"}
                        onPress={() => endgame()}
                    />
                </View>)}

            </View>
        )
    }
}

const styles = StyleSheet.create({
    centerView : {
        //flexDirection : "row",
        alignItems : "center",
        justifyContent : "space-around",
        paddingTop : 10,
        paddingBottom : 10
    },
    /*betCircle : {
        width : CIRCLE_BET_SIZE,
        height : CIRCLE_BET_SIZE,
        borderRadius : (CIRCLE_BET_SIZE / 2),
        borderColor : 'white',
        borderWidth : 1,
        padding : 2
    },*/
    betText : {
        color : "white",
        textAlign : "center"
    },
    center : {
        alignItems : "center",
        justifyContent : "center"
    },
    absoluteBtnRight : {
        position : "absolute",
        right : 0,
        zIndex : 2
    }
});

export default UserControls;