const player = {
    name: "主人公",
    age: 24,
    job: "地方の準社員",
    hourly: 1040,

    money: 30000,
    saving: 0,

    hp: 100,
    happy: 50,
    knowledge: 1
};

// ====================
// 初期化
// ====================
document.addEventListener("DOMContentLoaded", function () {

    console.log("GAME JS 起動");

    loadPlayerName();
    updateUI();
    bindButtons();

    setEvent("今日も静かな朝を迎えた。君はどうする？");
});

// ====================
// データ読み込み
// ====================
function loadPlayerName() {

    const saved = localStorage.getItem("playerName");

    if (saved) {
        player.name = saved;
    }
}

// ====================
// UI更新
// ====================
function updateUI() {

    document.getElementById("playerName").textContent = player.name;
    document.getElementById("age").textContent = player.age + "歳";
    document.getElementById("job").textContent = player.job;
    document.getElementById("hourly").textContent = player.hourly + "円";

    document.getElementById("money").textContent = player.money.toLocaleString() + "円";
    document.getElementById("saving").textContent = player.saving.toLocaleString() + "円";

    document.getElementById("hp").textContent = player.hp;
    document.getElementById("happy").textContent = player.happy;
    document.getElementById("knowledge").textContent = player.knowledge;
}

// ====================
// ログ・イベント
// ====================
function addLog(text) {

    const log = document.getElementById("log");

    log.innerHTML = text + "<br>" + log.innerHTML;
}

function setEvent(text) {

    document.getElementById("eventText").innerHTML = text;
}

// ====================
// ボタン紐付け
// ====================
function bindButtons() {

    document.getElementById("work").onclick = work;
    document.getElementById("study").onclick = study;
    document.getElementById("rest").onclick = rest;
    document.getElementById("shopping").onclick = shopping;
    document.getElementById("investment").onclick = investment;
    document.getElementById("skill").onclick = skill;
    document.getElementById("save").onclick = saveGame;
}

// ====================
// 行動：仕事
// ====================
function work() {

    const income = player.hourly * 8;

    player.money += income;
    player.hp -= 10;

    setEvent("仕事へ向かった。疲れたが収入を得た。");
    addLog(`仕事 +${income}円`);

    updateUI();
}

// ====================
// 行動：勉強
// ====================
function study() {

    player.knowledge += 1;
    player.hp -= 5;

    setEvent("集中して勉強した。知識が少し増えた。");
    addLog("勉強 +知識1");

    updateUI();
}
function changeEvent(title, text){

    document.getElementById("eventText").innerHTML =
    "<strong>" + title + "</strong><br><br>" + text;

}
// ====================
// 行動：休む
// ====================
function rest() {

    player.hp += 20;
    if (player.hp > 100) player.hp = 100;

    setEvent("ゆっくり休んだ。体力回復。");
    addLog("休憩 HP回復");

    updateUI();
}

// ====================
// 行動：買い物
// ====================
function shopping() {

    const cost = Math.floor(Math.random() * 5000) + 1000;

    player.money -= cost;

    setEvent("買い物をした。少しお金を使った。");
    addLog(`買い物 -${cost}円`);

    updateUI();
}

// ====================
// 行動：投資
// ====================
function investment() {

    setEvent("投資について学んだ（まだ実行はできない）");
    player.knowledge += 1;

    addLog("投資学習 +知識1");

    updateUI();
}

// ====================
// 行動：資格
// ====================
function skill() {

    player.knowledge += 2;

    setEvent("資格の勉強をした。成長した気がする。");
    addLog("資格学習 +知識2");

    updateUI();
}

// ====================
// セーブ
// ====================
function saveGame() {

    localStorage.setItem("saveData", JSON.stringify(player));

    addLog("セーブ完了");
    alert("セーブしました");
}
