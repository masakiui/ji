console.log("① JS読み込みOK");
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
/*=========================================
 Ver1.0 Part1-2
 ログ・日付・クエスト
=========================================*/

// =========================================
// ログ追加
// =========================================

function addLog(text){

    const log=document.getElementById("log");

    if(!log) return;

    const now=
    `【${game.year}年 ${game.month}/${game.day}】`;

    log.innerHTML=
    now+" "+text+"<br>"+log.innerHTML;

}

// =========================================
// クエスト表示
// =========================================

function setQuest(title,text){

    const event=document.getElementById("eventText");

    if(!event) return;

    event.innerHTML=

    "<strong>"+title+"</strong><br><br>"+text;

}

// =========================================
// 日付更新
// =========================================

function updateDate(){

    document.getElementById("year").textContent=
    "第"+game.year+"年";

    document.getElementById("month").textContent=
    game.month+"月";

    document.getElementById("day").textContent=
    game.day+"日";

    document.getElementById("season").textContent=
    game.season;

    document.getElementById("week").textContent=
    weekList[game.week];

}

// =========================================
// 次の日
// =========================================

function nextDay(){

    game.day++;

    game.week++;

    if(game.week>=7){

        game.week=0;

    }

    // 月末

    if(game.day>30){

        game.day=1;

        game.month++;

    }

    // 年越し

    if(game.month>12){

        game.month=1;

        game.year++;

        player.age++;

    }

    updateSeason();

    updateDate();

    updateStatus();

    addLog("新しい一日が始まった。");

    randomQuest();

}

// =========================================
// クエスト抽選（土台）
// =========================================

function randomQuest(){

    const r=Math.random();

    if(r<0.25){

        setQuest(
        "ライフクエスト",
        "今日は何事もなく平和な一日だった。");

        return;

    }

    if(r<0.50){

        setQuest(
        "ライフクエスト",
        "車の調子が悪いようだ……。");

        return;

    }

    if(r<0.75){

        setQuest(
        "投資クエスト",
        "市場が少し下落している。");

        return;

    }

    setQuest(
    "勉強クエスト",
    "今日は学習する絶好の日だ。");

}
// ====================
// ボタン紐付け
// ====================
function bindButtons() {

    const workBtn = document.getElementById("work");
    if (workBtn) workBtn.addEventListener("click", work);

    const studyBtn = document.getElementById("study");
    if (studyBtn) studyBtn.addEventListener("click", study);

    const restBtn = document.getElementById("rest");
    if (restBtn) restBtn.addEventListener("click", rest);

    const shoppingBtn = document.getElementById("shopping");
    if (shoppingBtn) shoppingBtn.addEventListener("click", shopping);

    const investmentBtn = document.getElementById("investment");
    if (investmentBtn) investmentBtn.addEventListener("click", investment);

    const skillBtn = document.getElementById("skill");
    if (skillBtn) skillBtn.addEventListener("click", skill);

    const saveBtn = document.getElementById("save");
    if (saveBtn) saveBtn.addEventListener("click", saveGame);

    const nextDayBtn = document.getElementById("nextDay");
    if (nextDayBtn) nextDayBtn.addEventListener("click", nextDay);

}
/*=========================================
 行動システム（仕事・勉強・休む・買い物・投資・資格・セーブ）
=========================================*/

// ====================
// 仕事
// ====================
function work() {

    const income = player.hourly * 8;

    player.money += income;
    player.hp -= 10;
    player.happy -= 1;

    if (player.hp < 0) player.hp = 0;

    setQuest("仕事", "今日は仕事をこなした。");
    addLog("仕事 + " + income.toLocaleString() + "円");

    updateStatus();
}

// ====================
// 勉強
// ====================
function study() {

    player.knowledge += 1;
    player.hp -= 5;
    player.happy -= 1;

    if (player.hp < 0) player.hp = 0;

    setQuest("勉強", "知識を少し得た。");
    addLog("勉強 +知識1");

    updateStatus();
}

// ====================
// 休む
// ====================
function rest() {

    player.hp += 20;
    player.happy += 1;

    if (player.hp > 100) player.hp = 100;
    if (player.happy > 100) player.happy = 100;

    setQuest("休息", "しっかり休んだ。");
    addLog("休息 HP回復");

    updateStatus();
}

// ====================
// 買い物
// ====================
function shopping() {

    const cost = Math.floor(Math.random() * 5000) + 1000;

    player.money -= cost;

    setQuest("買い物", "少し出費した。");
    addLog("買い物 -" + cost.toLocaleString() + "円");

    updateStatus();
}

// ====================
// 投資（学習＋疑似運用）
// ====================
function investment() {

    const gain = Math.floor(Math.random() * 3000);

    player.investment += gain;
    player.knowledge += 1;

    setQuest("投資", "投資の理解が深まった。");
    addLog("投資学習 +知識1 / + " + gain + "円（仮想）");

    updateStatus();
}

// ====================
// 資格
// ====================
function skill() {

    player.knowledge += 2;
    player.happy += 1;

    setQuest("資格", "努力が実力になりつつある。");
    addLog("資格 +知識2");

    updateStatus();
}

// ====================
// セーブ
// ====================
function saveGame() {

    localStorage.setItem("saveData", JSON.stringify({
        player,
        game
    }));

    addLog("セーブ完了");
    alert("セーブしました");
}
