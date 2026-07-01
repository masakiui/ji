/*=========================================
 人生というゲーム
 game.js（Single Stable Build）
=========================================*/

// ====================
// プレイヤー
// ====================
const player = {
    name: "主人公",
    age: 24,
    gender: "男性",

    job: "地方の準社員",
    hourly: 1040,

    money: 30000,
    saving: 0,
    investment: 0,

    portfolio: {
        VTI: 0,
        ORLC: 0,
        SII: 0,
        SIC: 0,
        SIJ: 0,
        hospitality: 0
    },

    hp: 100,
    happy: 50,
    knowledge: 1
};

// ====================
// ゲームデータ
// ====================
const game = {
    year: 1,
    month: 4,
    day: 1,
    week: 0,
    season: "春"
};

// ====================
// ユーティリティ
// ====================
function get(id) {
    return document.getElementById(id);
}

// ====================
// 初期化
// ====================
document.addEventListener("DOMContentLoaded", () => {

    console.log("GAME LOADED SUCCESS");

    loadPlayer();
    updateSeason();

    updateAllUI();

    bindButtons();

    setQuest("人生の始まり", "今日から人生が始まる。");

    addLog("ゲーム開始");

    const tag = get("versionTag");
    if (tag) tag.textContent = "Version 1.0 Stable";
});

// ====================
// ロード
// ====================
function loadPlayer() {

    // まずセーブデータを読む
    const saveData = localStorage.getItem("saveData");

    if (saveData) {

        const data = JSON.parse(saveData);

        if (data.player) {
            Object.assign(player, data.player);
        }

        if (data.game) {
            Object.assign(game, data.game);
        }

        console.log("セーブデータ読込成功");
        return;
    }

    // セーブが無い場合だけ名前を読む
    const name = localStorage.getItem("playerName");

    if (name) {
        player.name = name;
    }
}

// ====================
// UI更新まとめ
// ====================
function updateAllUI() {
    updateStatus();
    updateDate();
}

// ====================
// ステータス
// ====================
function updateStatus() {

    const set = (id, val) => {
        const el = get(id);
        if (el) el.textContent = val;
    };

    set("playerName", player.name);
    set("age", player.age + "歳");
    set("job", player.job);
    set("hourly", player.hourly + "円");

    set("money", player.money.toLocaleString() + "円");
    set("saving", player.saving.toLocaleString() + "円");

    player.investment =
        player.portfolio.VTI +
        player.portfolio.ORLC +
        player.portfolio.SII +
        player.portfolio.SIC +
        player.portfolio.SIJ +
        player.portfolio.hospitality;

    set("investmentMoney", player.investment.toLocaleString() + "円");

    set("hp", player.hp);
    set("happy", player.happy);
    set("knowledge", player.knowledge);
}

// ====================
// 日付
// ====================
function updateDate() {

    const weekList = ["月", "火", "水", "木", "金", "土", "日"];

    const set = (id, val) => {
        const el = get(id);
        if (el) el.textContent = val;
    };

    set("year", "第" + game.year + "年");
    set("month", game.month + "月");
    set("day", game.day + "日");
    set("week", weekList[game.week]);
    set("season", game.season);
}

// ====================
// 季節
// ====================
function updateSeason() {
    if (game.month <= 2 || game.month === 12) game.season = "冬";
    else if (game.month <= 5) game.season = "春";
    else if (game.month <= 8) game.season = "夏";
    else game.season = "秋";
}

// ====================
// ボタン紐付け（超安定版）
// ====================
function bindButtons() {

    console.log("bindButtons開始");

    const bind = (id, fn) => {

        const el = get(id);

        if (!el) {
            console.error(id + " が見つかりません");
            return;
        }

        console.log(id + " 接続完了");

        el.addEventListener("click", fn);
    };

    bind("work", work);
    bind("study", study);
    bind("rest", rest);
    bind("shopping", shopping);
    bind("investment", investment);
    bind("skill", skill);
    bind("save", saveGame);
    bind("nextDay", nextDay);

    console.log("bindButtons終了");
}
// ====================
// ログ
// ====================
function addLog(text) {

    const log = get("log");
    if (!log) return;

    const now = `【${game.year}年 ${game.month}/${game.day}】`;

    log.innerHTML = now + " " + text + "<br>" + log.innerHTML;
}

// ====================
// イベント
// ====================
function setQuest(title, text) {

    const el = get("eventText");
    if (!el) return;

    el.innerHTML = `<strong>${title}</strong><br><br>${text}`;
}

// ====================
// 行動
// ====================
function work() {
    const income = player.hourly * 8;
    player.money += income;
    player.hp -= 10;

    addLog("仕事 +" + income.toLocaleString() + "円");
    setQuest("仕事", "働いた一日。");
    updateStatus();
}

function study() {
    player.knowledge += 1;
    player.hp -= 5;

    addLog("勉強 +知識1");
    setQuest("勉強", "知識を得た。");
    updateStatus();
}

function rest() {
    player.hp = Math.min(100, player.hp + 20);

    addLog("休息 HP回復");
    setQuest("休息", "回復した。");
    updateStatus();
}

function shopping() {
    const cost = Math.floor(Math.random() * 5000) + 1000;
    player.money -= cost;

    addLog("買い物 -" + cost.toLocaleString() + "円");
    setQuest("買い物", "出費した。");
    updateStatus();
}

function investment() {
    const gain = Math.floor(Math.random() * 3000);
    player.investment += gain;
    player.knowledge += 1;

    addLog("投資 +" + gain);
    setQuest("投資", "学習した。");
    updateStatus();
}

function skill() {
    player.knowledge += 2;

    addLog("資格 +知識2");
    setQuest("資格", "成長した。");
    updateStatus();
}

// ====================
// セーブ
// ====================
function saveGame() {
    localStorage.setItem("saveData", JSON.stringify({ player, game }));
    addLog("セーブ完了");
    alert("セーブ完了");
}

// ====================
// 次の日
// ====================
function nextDay() {

    game.day++;
    game.week = (game.week + 1) % 7;

    if (game.day > 30) {
        game.day = 1;
        game.month++;
    }

    if (game.month > 12) {
        game.month = 1;
        game.year++;
        player.age++;
    }

    updateSeason();
    updateDate();
    updateStatus();

    addLog("新しい日");
}
