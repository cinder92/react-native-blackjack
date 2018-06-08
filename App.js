import React,{Component} from 'react';
import { 
  View,
  StyleSheet,
  ImageBackground,
  UIManager,
  StatusBar,
  NativeModules,
  AppState,
  Platform
} from 'react-native';
import cardsDeck from './src/data/cards';
import {shuffle, calculatePoints} from './src/helpers';
import {Overlay,ChipSelector, UserControls,FloatingText} from './src/components';
import boardBg from './src/assets/board.png';
const {AudioPlayer} = NativeModules;

class App extends Component{

  constructor(){
    super();

    if(Platform.OS === 'android'){
      UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
    }

    this.state = {
      totalBet : 0,
      amount : 5000,
      playerHand : [],
      dealerHand : [],
      gameover : false,
      cardCount : 0,
      gameMessage : "",
      appState: AppState.currentState
    }
  }

  componentDidMount(){
    if(Platform.OS === "ios"){
      //sound.mp3
      AudioPlayer.loadAudio('sound.mp3');
      AudioPlayer.canPlay((canPlay) => {
        if(canPlay) AudioPlayer.play();
      });
    }
    AppState.addEventListener('change', this._handleAppStateChange);
    this.newGame();
  }

  _handleAppStateChange = (nextAppState) => {
    const {appState} = this.state;

    if(nextAppState === 'active'){

      if(Platform.OS === "android"){
        AudioPlayer.loadAudio('audio/sound.mp3',
        (message) => {
          if(message){
            AudioPlayer.play();
          }
        });
      }
    }else{
      AudioPlayer.pause();
    }

    this.setState({appState: nextAppState});
  }

  render(){
    const {totalBet, amount, playerHand, dealerHand, gameover, gameMessage} = this.state;
    return(
      <ImageBackground 
        source={boardBg}
        style={styles.container}>

        <StatusBar backgroundColor={"green"} translucent={true} />

        <View style={styles.bottom}>

          <UserControls 
            playerHand={playerHand}
            dealerHand={dealerHand}
            newGame={() => this.newGame()}
            hit={() => this.hit()}
            doubleGame={() => this.doubleGame()}
            endgame={() => this.endgame()}
            gameover={gameover}
            totalBet={totalBet}
            moreMoney={() => this.moreMoney()}
          />

          <View style={styles.center}>
            <FloatingText 
              text={`Total Bet $ ${totalBet}`}
            />
          </View>
          <ChipSelector 
            onSelect={(chipValue) => {
              if(!gameover){
                if(chipValue <= amount){
                  this.setState({
                    totalBet : (totalBet + chipValue),
                    amount : (amount - chipValue)
                  })
                }
              }else{
                if(amount > 0){
                  this.newGame();
                  this.setState({
                    totalBet : (totalBet + chipValue),
                    amount : (amount - chipValue)
                  })
                }
              }
            }}
          />
          <View style={styles.center}>
            <FloatingText 
              text={`Available $ ${amount}`}
            />
          </View>

          {gameover && gameMessage != "" && <Overlay text={gameMessage} onClose={() => { this.newGame() }} />}

        </View>
      </ImageBackground>
    )
  }

  newGame(){
    let cardCount = 0;
    shuffle(cardsDeck);
    
    let playerHand = [],
    dealerHand = [];

    for(let i = 0; i < 2; i++){
      playerHand.push(cardsDeck[cardCount]);
      cardCount++;
      dealerHand.push(cardsDeck[cardCount]);
      cardCount++;
    }

    this.setState({
      playerHand,
      dealerHand,
      gameover:false,
      cardCount,
      gameMessage : ""
    });
  }

  hit(){
    const {playerHand, cardCount, totalBet} = this.state;

      playerHand.push(cardsDeck[cardCount]);

      let userPoints = this.checkTotalPlayerPoints(playerHand);

      this.setState({
        playerHand,
        cardCount : (cardCount + 1)
      });

      if(userPoints > 21){
        this.endgame();
        return;
      }
  }

  doubleGame(){
    this.hit();
    this.endgame();
  }

  endgame(){
    const {playerHand, dealerHand, cardCount, totalBet, amount} = this.state;

    let _cardCount = cardCount;

    let dealerPoints = this.checkTotalPlayerPoints(dealerHand),
    playerPoints = this.checkTotalPlayerPoints(playerHand);
    //alert(dealerPoints)
    while(dealerPoints < 17){
      dealerHand.push(cardsDeck[_cardCount]);
      _cardCount++;
      dealerPoints = this.checkTotalPlayerPoints(dealerHand);
    }

    let betValue = totalBet * 1.5;

    //who won
    if(playerPoints == 21 && playerHand.length == 2){
      //multiplicar su apuesta x 1.5
      let newAmount = totalBet * 1.5;
      this.setState({
        amount : newAmount,
        totalBet : 0,
        gameover : true,
        gameMessage : "Player BlackJack!"
      });
    }

    if(
      (playerPoints < 22 && dealerPoints < playerPoints) || 
      (dealerPoints > 21 && playerPoints < 22)
    ){
      this.setState({
        amount : (amount + betValue),
        totalBet : 0,
        gameover : true,
        gameMessage : "You Win $ "+ betValue
      });
    }else if(dealerPoints > 21 && playerPoints < 22){
      this.setState({
        amount : (amount + betValue),
        totalBet : 0,
        gameover : true,
        gameMessage : "You Win $ "+ betValue
      });
    }
    else if(playerPoints > 21 && dealerPoints <= 21){
      this.setState({
        dealerHand,
        cardCount : _cardCount,
        gameover : true,
        totalBet : 0,
        gameMessage : "Bust!"
      });
    }else if(playerPoints == dealerPoints){
      this.setState({
        totalBet : 0,
        amount : (amount + totalBet),
        gameover : true,
        gameMessage : "Push!"
      });
    }else{
      this.setState({
        totalBet : 0,
        gameover : true,
        gameMessage : "Dealer Wins, You Lost"
      });
    }
  }

  moreMoney(){
    const {amount} = this.state;
    this.setState({
      amount : (amount + 5000)
    });
  }

  checkTotalPlayerPoints(playerHand){
    let aceAdjuts = false,
    points = 0;

    playerHand.map((card,_index) => {
      if(card.name == 'A' && !aceAdjuts) {
        aceAdjuts = true;
        points = points + 10;
      }
      points = points + card.value;
    });

    if(aceAdjuts && points > 21){
      points = points - 10;
    }

    return points;
  }
}

const styles = StyleSheet.create({
  container : {
    flex : 1
  },
  center : {
    alignItems : "center"
  },

  bottom : {
    position : "absolute",
    left : 0,
    right : 0,
    bottom : 0,
    zIndex : 2
  }
});

export default App;