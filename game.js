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

// --------------------
// 初期化
// --------------------
window.onload = function () {

    loadPlayerName();
    updateUI();
    bindButtons();
};

// --------------------
// 名前読み込み
// --------------------
function loadPlayerName() {
    const saved = localStorage.getItem("playerName");
    if (saved) player.name = saved;
}

// --------------------
// UI更新
// --------------------
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

// --------------------
// ログ追加
// --------------------
function addLog(text) {

    const log = document.getElementById("log");

    log.innerHTML = text + "<br>" + log.innerHTML;
}

// --------------------
// ボタン紐付け
// --------------------
function bindButtons() {

    document.getElementById("work").onclick = work;
    document.getElementById("study").onclick = study;
    document.getElementById("rest").onclick = rest;
    document.getElementById("shopping").onclick = shopping;
    document.getElementById("investment").onclick = investment;
    document.getElementById("skill").onclick = skill;
    document.getElementById("save").onclick = saveGame;
}

// --------------------
// 行動
// --------------------
function work() {

    const income = player.hourly * 8;

    player.money += income;
    player.hp -= 10;

    addLog(`仕事をした +${income}円`);
    nextDay();
}

function study() {

    player.knowledge += 1;
    player.hp -= 5;

    addLog("勉強した +知識1");
    nextDay();
}

function rest() {

    player.hp += 20;
    if (player.hp > 100) player.hp = 100;

    addLog("休んだ HP回復");
    nextDay();
}

function shopping() {

    const cost = Math.floor(Math.random() * 5000) + 1000;

    player.money -= cost;

    addLog(`買い物 -${cost}円`);
    nextDay();
}

function investment() {

    addLog("投資について学んだ");
    player.knowledge += 1;
    nextDay();
}

function skill() {

    player.knowledge += 2;

    addLog("資格取得の勉強");
    nextDay();
}

// --------------------
// 1日進行
// --------------------
function nextDay() {

    triggerEvent();
    updateUI();
}

// --------------------
// イベント（祖母・母）
// --------------------
function triggerEvent() {

    const r = Math.random();

    if (r < 0.1) {

        const ok = confirm("祖母：付き添う？");

        if (ok) {
            player.money += 1000;
            addLog("祖母イベント +1000円");
        }

    } else if (r < 0.3) {

        const go = confirm("母：買い物に行く？");

        if (go) {

            const buy = confirm("買う？");

            if (buy) {

                const cost = Math.floor(Math.random() * 5000) + 1000;
                player.money -= cost;

                addLog(`母イベント -${cost}円`);
            }
        }
    }
}

// --------------------
// セーブ
// --------------------
function saveGame() {

    localStorage.setItem("saveData", JSON.stringify(player));

    alert("セーブしました");
}
