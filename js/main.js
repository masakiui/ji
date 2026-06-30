
/*=========================================
 人生というゲーム
 main.js Ver.1.0
=========================================*/

document.addEventListener("DOMContentLoaded", () => {

    fadeIn();

    setupContinue();

});


/*=============================
 フェードイン
=============================*/

function fadeIn(){

    const container=document.querySelector(".container");

    container.style.opacity=0;
    container.style.transform="translateY(20px)";

    setTimeout(()=>{

        container.style.transition="1s";

        container.style.opacity=1;

        container.style.transform="translateY(0px)";

    },100);

}


/*=============================
 CONTINUE
=============================*/

function setupContinue(){

    const button=document.getElementById("continueButton");

    const saveData=localStorage.getItem("saveData");

    if(!button) return;

    if(saveData){

        button.onclick=function(){

            location.href="game.html";

        };

    }

    else{

        button.style.opacity=".5";

        button.onclick=function(){

            alert("セーブデータがありません。");

        };

    }

}

