/*=========================================
 人生というゲーム
 game.js
 Ver1.0 Part1-1
=========================================*/

// =========================================
// プレイヤーデータ
// =========================================

const player = {

    // 基本情報
    name: "主人公",
    age: 24,
    gender: "男性",

    // 職業
    job: "地方の準社員",
    hourly: 1040,

    // お金
    money: 30000,
    saving: 0,
    investment: 0,

    // 投資商品
    portfolio:{

        VTI:0,
        ORLC:0,

        SII:0,
        SIC:0,
        SIJ:0,

        hospitality:0

    },

    // ステータス
    hp:100,
    happy:50,
    knowledge:1,

    // PDCA
    plan:0,
    doCount:0,
    check:0,
    act:0,

    // フラグ
    hiddenRoute:false

};

// =========================================
// ゲームデータ
// =========================================

const game ={

    year:1,

    month:4,

    day:1,

    week:0,

    season:"春",

    gameOver:false,

    clear:false

};

// =========================================
// 曜日
// =========================================

const weekList=[

"月曜日",
"火曜日",
"水曜日",
"木曜日",
"金曜日",
"土曜日",
"日曜日"

];

// =========================================
// 季節
// =========================================

function updateSeason(){

    if(game.month>=3 && game.month<=5){

        game.season="春";

    }

    else if(game.month>=6 && game.month<=8){

        game.season="夏";

    }

    else if(game.month>=9 && game.month<=11){

        game.season="秋";

    }

    else{

        game.season="冬";

    }

}

// =========================================
// 初期化
// =========================================

document.addEventListener("DOMContentLoaded",()=>{

    console.log("GAME START");

    loadPlayer();

    checkHiddenRoute();

    updateSeason();

    updateStatus();

    updateDate();

    bindButtons();

    addLog("ゲーム開始");

    setQuest(
        "人生の始まり",
        "今日から君の人生が始まる。まずは最初の一歩を踏み出そう。"
    );

});

// =========================================
// 名前読み込み
// =========================================

function loadPlayer(){

    const name=localStorage.getItem("playerName");

    if(name){

        player.name=name;

    }

}

// =========================================
// 隠しルート
// =========================================

function checkHiddenRoute(){

    if(player.name==="一輝"){

        player.hiddenRoute=true;

        player.money+=110000;

        player.portfolio.VTI=110000;

        addLog("隠しルート解放");

    }

}

// =========================================
// ステータス更新
// =========================================

function updateStatus(){

    document.getElementById("playerName").textContent=player.name;

    document.getElementById("age").textContent=
    player.age+"歳";

    document.getElementById("job").textContent=
    player.job;

    document.getElementById("hourly").textContent=
    player.hourly.toLocaleString()+"円";

    document.getElementById("money").textContent=
    player.money.toLocaleString()+"円";

    document.getElementById("saving").textContent=
    player.saving.toLocaleString()+"円";

    player.investment=

        player.portfolio.VTI+

        player.portfolio.ORLC+

        player.portfolio.SII+

        player.portfolio.SIC+

        player.portfolio.SIJ+

        player.portfolio.hospitality;

    document.getElementById("investmentMoney").textContent=

    player.investment.toLocaleString()+"円";

    document.getElementById("hp").textContent=
    player.hp;

    document.getElementById("happy").textContent=
    player.happy;

    document.getElementById("knowledge").textContent=
    player.knowledge;

}
