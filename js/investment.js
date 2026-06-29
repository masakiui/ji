```javascript
/*=========================================
 人生というゲーム
 investment.js Ver.1.0
=========================================*/

const investmentData = {

    VTI: {

        name: "VTI",

        currentPrice: 0,

        monthlyInvestment: 0,

        shares: 0,

        totalInvestment: 0

    },

    ORUKAN: {

        name: "オルカン",

        currentPrice: 0,

        monthlyInvestment: 0,

        shares: 0,

        totalInvestment: 0

    }

};


/*==========================
 APIから価格取得
==========================*/

async function loadMarketPrice(){

    try{

        // 後でAPIへ変更
        // 現在はテスト価格

        investmentData.VTI.currentPrice = 305.42;

        investmentData.ORUKAN.currentPrice = 268.11;

        updateInvestmentUI();

    }

    catch(error){

        console.error(error);

    }

}


/*==========================
 UI更新
==========================*/

function updateInvestmentUI(){

    document.getElementById("vtiPrice").textContent =
        "$" + investmentData.VTI.currentPrice.toFixed(2);

    document.getElementById("orukanPrice").textContent =
        "$" + investmentData.ORUKAN.currentPrice.toFixed(2);

}


/*==========================
 積立設定
==========================*/

function startInvestment(type){

    const amount = Number(prompt("毎月の積立金額（円）"));

    if(isNaN(amount) || amount <= 0){

        alert("正しい金額を入力してください。");

        return;

    }

    investmentData[type].monthlyInvestment = amount;

    alert(

        investmentData[type].name +

        "へ毎月" +

        amount.toLocaleString() +

        "円積み立てます。"

    );

}


/*==========================
 月末処理
==========================*/

function monthlyInvestment(){

    Object.keys(investmentData).forEach(type=>{

        const data = investmentData[type];

        if(data.monthlyInvestment<=0) return;

        data.totalInvestment += data.monthlyInvestment;

        data.shares +=
            data.monthlyInvestment /
            data.currentPrice;

    });

}


/*==========================
 評価額
==========================*/

function getValue(type){

    return investmentData[type].shares *

           investmentData[type].currentPrice;

}


/*==========================
 初期化
==========================*/

window.addEventListener(

    "load",

    loadMarketPrice

);
```
