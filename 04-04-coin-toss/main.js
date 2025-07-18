// コインを1回投げて「表」か「裏」を返す関数
function coinToss() {
  // Math.random()は0以上1未満のランダムな数を生成
  // 0.5以上なら「表」、それ以外は「裏」
  return Math.random() >= 0.5 ? '表' : '裏';
}

console.log(`コインを投げた結果: ${coinToss()}`);