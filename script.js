// 1. カードのデータ例（配列という仕組み）
/*const cards = ["攻撃カード", "防御カード", "回復カード", "ドローカード"];

// 2. 画面上の要素をプログラムから操作できるように「取得」しておく
const cardElement = document.getElementById("myCard");
const messageElement = document.getElementById("message");

// 3. カードがクリック（タップ）されたときの「イベント（合図）」を設定する
cardElement.addEventListener("click", () => {
  
  // 4. 配列の中からランダムに1つの要素を選ぶ計算
  const randomIndex = Math.floor(Math.random() * cards.length);
  const drawnCard = cards[randomIndex];
  
  // 5. 選ばれたカードの名前を、画面の文字として書き換える
  messageElement.textContent = `引いたカード: ${drawnCard}`;
});*/


const DAY_Deck = [3073,2001,2047,3078,6085,4049,4069,6052,2040,2073,3078,6085,4049,4069,6052,2040,2073,2069,4073,6072];
const NIGHT_Deck = [3073,2001,2047,3078,6085,4049,4069,6052,2040,2073,3078,6085,4049,4069,6052,2040,2073,2069,4073,6072];

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]; 
  }
}
shuffle(DAY_Deck);
shuffle(NIGHT_Deck);
console.log(DAY_Deck);

let random_card = Math.floor(Math.random() * DAY_Deck.length);
let targetId = DAY_Deck[random_card];
let cardData = cardList.find(card => card.Num === targetId);
console.log(cardData.name + cardData.music + "," + cardData.Num);

random_card = Math.floor(Math.random() * NIGHT_Deck.length);
targetId = NIGHT_Deck[random_card];
cardData = cardList.find(card => card.Num === targetId);
console.log(cardData.name + cardData.music + "," + cardData.Num);

const medalElement = document.getElementById('chronos_medal');

function move_ChronosMedal_to(deg) {
  deg = deg * 20 -180;
  const medal = document.getElementById('chronos_medal');
  medal.style.transform = `translate(-40%,-40%) rotate(${deg}deg) translateY(-115px)`;
}
function move_DAY_HP_Medal_to(yPos) {
  const medal = document.getElementById('DAY_HP_medal');
  medal.style.transform = `translate(0%, ${(110-yPos)/10*27}px)`;
}
function move_NIGHT_HP_Medal_to(yPos) {
  const medal = document.getElementById('NIGHT_HP_medal');
  medal.style.transform = `translate(0%, ${(110-yPos)/10*27}px)`;
}
move_ChronosMedal_to(0);
move_DAY_HP_Medal_to(100);
move_NIGHT_HP_Medal_to(100);

function createCardElement(cardData) {
  const cardDiv = document.createElement('div');
  cardDiv.classList.add('card');
  //属性に応じたクラスを追加する
  cardDiv.classList.add(`card_type_${cardData.type}`);
  //カードのステータスを書き込む
  cardDiv.innerHTML = `
    <div class="card-header">
      <span>${cardData.Time}</span>
    </div>
    <div class="card-Name">
      <span>${cardData.name}${cardData.music}</span>
    </div>
    <div class="card-Power">
      <span>NAY:${cardData.NIGHT || 0}</span>
      <span>DIGHT:${cardData.DAY || 0}</span>
    </div>
    <div class="card-name">
      <span>COST:${cardData.PC}</span>
    </div>
    <div class="card-StP">
      <span>StP:${cardData.StP}</span>
    </div>
  `;
  return cardDiv;
}
function createCardElement_opsite(cardData) {
  const cardDiv = document.createElement('div');
  cardDiv.classList.add('card');
  //属性に応じたクラスを追加する
  cardDiv.classList.add(`card_type_6`);
  return cardDiv;
}

function drowwFirstFiveCards() {
  const topFiveIds_NIGHT = NIGHT_Deck.slice(0,5);
  // 下の段のカード枠（A, B, C, デッキゾーンなど）を取得
  // HTMLのクラス名に応じて取得先を調整できます
  const targetZones_NIGHT = document.querySelectorAll('.hand-NIGHT-group .hand');

  topFiveIds_NIGHT.forEach((id,index) => {
    if(index < targetZones_NIGHT.length) {
      const cardData = cardList.find(card => card.Num === id);
      if(cardData) {
        const cardElement = createCardElement(cardData);
        targetZones_NIGHT[index].innerHTML ='';
        targetZones_NIGHT[index].appendChild(cardElement);
      }
    }
  });

  const topFiveIds_DAY = DAY_Deck.slice(0,5);
  const targetZones_DAY = document.querySelectorAll('.hand-DAY-group .hand');
  topFiveIds_DAY.forEach((id,index) => {
    if(index < targetZones_DAY.length) {
      const cardData = cardList.find(card => card.Num === id);
      if(cardData) {
        const cardElement = createCardElement_opsite(cardData);
        targetZones_DAY[index].innerHTML ='';
        targetZones_DAY[index].appendChild(cardElement);
      }
    }
  });
}

drowwFirstFiveCards();