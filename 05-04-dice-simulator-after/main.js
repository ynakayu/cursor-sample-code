document.getElementById('rollBtn').addEventListener('click', function() {
  // サイコロの数を取得
  const diceCount = parseInt(document.getElementById('diceCount').value);
  
  // サイコロの出目を格納する配列
  const results = [];
  
  // 指定された数のサイコロを振る
  for (let i = 0; i < diceCount; i++) {
    const dice = Math.floor(Math.random() * 6) + 1;
    results.push(dice);
  }
  
  // 出目をコンマ区切りで表示
  document.getElementById('resultArea').textContent = `出た目: ${results.join(', ')}`;
  
  // 合計値を計算して表示
  const total = results.reduce((sum, value) => sum + value, 0);
  document.getElementById('totalArea').textContent = `合計: ${total}`;
});