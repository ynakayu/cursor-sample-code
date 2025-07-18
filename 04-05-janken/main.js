// ランダムにじゃんけんの手を返す関数
function jankenHand() {
  const hands = ["Rock", "Scissors", "Paper"];
  const index = Math.floor(Math.random() * hands.length);
  return hands[index];
}

console.log(jankenHand());