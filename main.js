```javascript
/* =====================================
   人生というゲーム
   ～君の選択が人生をつくる～
   main.js
===================================== */

document.addEventListener("DOMContentLoaded", () => {

    console.log("人生というゲーム 起動");

    fadeIn();

    continueCheck();

    randomSecret();

    keyboardControl();

});


/* ------------------------------
   フェードイン
------------------------------ */

function fadeIn(){

    const container = document.querySelector(".container");

    if(!container) return;

    container.style.opacity = "0";
    container.style.transform = "translateY(15px)";

    setTimeout(()=>{

        container.style.transition="1.2s";

        container.style.opacity="1";

        container.style.transform="translateY(0px)";

    },100);

}


/* ------------------------------
   Continue判定
------------------------------ */

function continueCheck(){

    const buttons = document.querySelectorAll(".menu button");

    if(buttons.length < 2) return;

    const continueButton = buttons[1];

    const saveData = localStorage.getItem("saveData");

    if(saveData===null){

        continueButton.disabled=true;

        continueButton.style.opacity=".4";

        continueButton.style.cursor="not-allowed";

    }

}


/* ------------------------------
   ボタン効果
------------------------------ */

document.querySelectorAll(".menu button").forEach(button=>{

    button.addEventListener("mouseenter",()=>{

        button.style.transform="scale(1.03)";

    });

    button.addEventListener("mouseleave",()=>{

        button.style.transform="scale(1)";

    });

});


/* ------------------------------
   ARG演出
------------------------------ */

function randomSecret(){

    const secret=document.getElementById("secretMessage");

    if(!secret) return;

    const chance=Math.random();

    if(chance<0.03){

        secret.style.opacity="1";

        setTimeout(()=>{

            secret.style.opacity="0";

        },3500);

    }

}


/* ------------------------------
   キーボード操作
------------------------------ */

function keyboardControl(){

    const buttons=document.querySelectorAll(".menu button");

    let selected=0;

    if(buttons.length===0) return;

    highlight();

    document.addEventListener("keydown",(e)=>{

        if(e.key==="ArrowDown"){

            selected++;

            if(selected>=buttons.length){

                selected=0;

            }

            highlight();

        }

        if(e.key==="ArrowUp"){

            selected--;

            if(selected<0){

                selected=buttons.length-1;

            }

            highlight();

        }

        if(e.key==="Enter"){

            buttons[selected].click();

        }

    });

    function highlight(){

        buttons.forEach(button=>{

            button.style.outline="none";

        });

        buttons[selected].style.outline="2px solid #8ec8ff";

    }

}


/* ------------------------------
   今後追加予定

   ・タイトルBGM
   ・ロード画面
   ・日付取得
   ・隠しイベント
   ・実績確認
   ・バージョンチェック
------------------------------ */
```
