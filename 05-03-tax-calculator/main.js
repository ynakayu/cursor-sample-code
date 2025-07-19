function calculateTax() {
    // 要素の取得
    const amountInput = document.getElementById('amount');
    const resultDiv = document.getElementById('result');
    const taxRateInputs = document.getElementsByName('taxRate');
    
    // 入力値の取得
    const amount = parseFloat(amountInput.value);
    let selectedTaxRate = 0;
    
    // 選択された税率を取得
    for (let input of taxRateInputs) {
        if (input.checked) {
            selectedTaxRate = parseFloat(input.value);
            break;
        }
    }
    
    // 入力値の検証
    if (!amountInput.value.trim()) {
        showError('金額を入力してください。');
        return;
    }
    
    if (isNaN(amount) || amount < 0) {
        showError('有効な正の数値を入力してください。');
        return;
    }
    
    // 計算実行
    const taxAmount = Math.floor(amount * selectedTaxRate / 100);
    const totalAmount = amount + taxAmount;
    
    // 結果表示
    showResult(amount, selectedTaxRate, taxAmount, totalAmount);
}

function showResult(originalAmount, taxRate, taxAmount, totalAmount) {
    const resultDiv = document.getElementById('result');
    
    resultDiv.innerHTML = `
        <div class="success">
            <div>税込価格: <span style="font-size: 24px;">¥${totalAmount.toLocaleString()}</span></div>
            <div class="calculation-details">
                税抜価格: ¥${originalAmount.toLocaleString()}<br>
                消費税 (${taxRate}%): ¥${taxAmount.toLocaleString()}<br>
                税込価格: ¥${totalAmount.toLocaleString()}
            </div>
        </div>
    `;
    
    resultDiv.style.display = 'block';
}

function showError(message) {
    const resultDiv = document.getElementById('result');
    
    resultDiv.innerHTML = `
        <div class="error">
            ${message}
        </div>
    `;
    
    resultDiv.style.display = 'block';
}

// Enterキーでも計算できるようにする
document.addEventListener('DOMContentLoaded', function() {
    const amountInput = document.getElementById('amount');
    
    amountInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            calculateTax();
        }
    });
});
