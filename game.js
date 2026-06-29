/*=========================================
 人生というゲーム
 game.js Ver.0.1
=========================================*/

const player = {
/*=========================================
  プレイヤー名の読み込み
=========================================*/

const savedName = localStorage.getItem("playerName");

if (savedName && savedName.trim() !== "") {
    player.name = savedName;
}

/*=========================================
  初回ゲーム開始判定
=========================================*/

function firstStart() {

    const opened = localStorage.getItem("openingPlayed");

    if (!opened) {

        alert(
`ようこそ、${player.name}。

ここは「人生というゲーム」。

君の選択が未来を変える。

正解はない。
あるのは、選んだ人生だけ。`
        );

        localStorage.setItem("openingPlayed", "true");
    }

}


    name:"主人公",

    age:24,

    job:"地方の準社員",

    hourly:1040,

    money:30000,

    saving:0,

    hp:100,

    happy:50,

    knowledge:1,

    finance:0,

    skill:0

};


/*=========================
 初期化
=========================*/

```javascript
window.onload = function(){

    loadGame();

    firstStart();

    updateStatus(```javascript
document.getElementById("playerName").textContent = player.name;
document.getElementById("age").textContent = player.age + "歳";
document.getElementById("job").textContent = player.job;
document.getElementById("hourly").textContent =
    player.hourly.toLocaleString() + "円";
```
);

}


/*=========================
 ステータス更新
=========================*/

function updateStatus(){

    document.getElementById("money").textContent =
    player.money.toLocaleString()+"円";

    document.getElementById("saving").textContent =
    player.saving.toLocaleString()+"円";

    document.getElementById("hp").textContent =
    player.hp;

    document.getElementById("happy").textContent =
    player.happy;

    document.getElementById("knowledge").textContent =
    player.knowledge;

}


/*=========================
 ログ
=========================*/

function addLog(text){

    const log=document.getElementById("log");

    log.innerHTML += "<br>"+text;

    log.scrollTop=log.scrollHeight;

}


/*=========================
 イベント表示
=========================*/

function eventText(text){

    document.getElementById("eventText").innerHTML=text;

}


/*=========================
 仕事
=========================*/

document.getElementById("work").onclick=function(){

    player.money+=player.hourly*8;

    player.hp-=20;

    player.happy-=2;

    addLog("仕事をした。");

    eventText("今日は真面目に働いた。");

    updateStatus();

}


/*=========================
 勉強
=========================*/

document.getElementById("study").onclick=function(){

    player.knowledge+=3;

    player.hp-=10;

    addLog("勉強した。");

    eventText("知識が少し身についた。");

    updateStatus();

}


/*=========================
 休む
=========================*/

document.getElementById("rest").onclick=function(){

    player.hp+=25;

    if(player.hp>100){

        player.hp=100;

    }

    addLog("ゆっくり休んだ。");

    eventText("体力が回復した。");

    updateStatus();

}


/*=========================
 買い物
=========================*/

document.getElementById("shopping").onclick=function(){

    if(player.money>=3000){

        player.money-=3000;

        player.happy+=8;

        addLog("買い物を楽しんだ。");

        eventText("少し贅沢をした。");

    }

    else{

        addLog("お金が足りない。");

        eventText("財布の中身を確認した。");

    }

    updateStatus();

}


/*=========================
 投資
=========================*/

document.getElementById("investment").onclick=function(){

    player.finance++;

    player.knowledge++;

    addLog("投資について学んだ。");

    eventText("リスクとリターンを学んだ。");

    updateStatus();

}


/*=========================
 資格
=========================*/

document.getElementById("skill").onclick=function(){

    player.skill++;

    player.knowledge+=2;

    player.hp-=8;

    addLog("資格取得に向けて勉強した。");

    eventText("少しずつ成長している。");

    updateStatus();

}


/*=========================
 セーブ
=========================*/

document.getElementById("save").onclick=function(){

    localStorage.setItem(

        "saveData",

        JSON.stringify(player)

    );

    addLog("セーブしました。");

}


/*=========================
 ロード
=========================*/

function loadGame(){

    const save=

    localStorage.getItem("saveData");

    if(save){

        Object.assign(

            player,

            JSON.parse(save)

        );

        addLog("セーブデータを読み込みました。");
const events = {
    grandmother: {
        weight: 0.1, // 発生率
        run: function () {

            const choice = confirm("👵祖母：知人の家まで付き添う？\nOK＝付き添う / キャンセル＝断る");

            if (choice) {

                player.money += 1000;
                alert("祖母と外出した。\n＋1,000円");

            } else {
                alert("何も起こらなかった。");
            }
        }
    },

    mother: {
        weight: 0.25, // 発生率
        run: function () {

            const go = confirm("👩母：ウィンドーショッピングに行く？");

            if (!go) {
                alert("今日は行かなかった。");
                return;
            }

            const buy = confirm("買い物する？\nOK＝する / キャンセル＝しない");

            if (buy) {

                const cost = Math.floor(Math.random() * 5000) + 1000;
                player.money -= cost;

                alert("買い物をした。\n－" + cost + "円");

            } else {
                alert("何も買わなかった。");
            }
        }
    }
};
function triggerDailyEvent() {

    // 祖母イベント判定
    if (Math.random() < events.grandmother.weight) {
        events.grandmother.run();
        return;
    }

    // 母イベント判定
    if (Math.random() < events.mother.weight) {
        events.mother.run();
        return;
    }

    // 何も起きない日
    console.log("平穏な一日");
}
    }

}
