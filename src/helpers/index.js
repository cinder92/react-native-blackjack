export function shuffle(a){
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

export function calculatePoints(playerHand){
    /*let points = 0;
    arr.map((card,_index) => {
       //if(card.name == 'A' && card.name == 'J')
       points = points + card.value 
    });
    return points;*/
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