//constants
const p1 = "X";
const p2 = "O";
const abc=["a","b","c",];
//variables

//player1 grid and player2 grid
let grid1 = [[],[],[]];
let grid2 = [[],[],[]];

//current player's letter
let cLet;

//click count
let cClick = 0;

//global ints
let intA = 0;
let intB = 0;

//current player
let curP = grid1;

//current letter
let curL = abc[intB];

//cached element references

//start button
let btnS = document.getElementById('start');
btnS.addEventListener('click',function(){init();},{once:true});

//sets the title and rules
let titleT = document.getElementById("title");
titleT.innerText="Tic-Tac-Toe!";

let ruleT = document.getElementById("rules");
ruleT.innerText="Press start to begin!";
ruleT.style.color="green";

//functions 

//build gameboard
function init()
{
    //hides the title
    titleT.style.display="none";
    //hides the win text
    //document.getElementById('win').className="hiddenWin";
    //hides start button
    btnS.style.display= "none";
    //reset button
    let btnR = document.getElementById('restart');
    btnR.style.visibility="visible";
    btnR.className="btn btn-danger";
    let curI = intA+1;
    //showing who's turn it is
    document.getElementById("rules").innerText=`It's now X's turn`;
    document.getElementById("rules").style.color="blue";
    //creating the game board and assigning each it's own ID    
    do{ 
        //changes updates array num each run
        curL=abc[intB];

        //left
        let pL=`<div id="${curL+curI}" class="gridPartL animate__animated animate__wobble"><h2 id="${curL+curL+curI}" class="h2H">X</h2></div>`;

        //center
        let pC=`<div id="${curL+(curI+1)}" class="gridPartC animate__animated animate__wobble"><h2 id="${curL+curL+(curI+1)}" class="h2H">X</h2></div>`;

        //right
        let pR=`<div id="${curL+(curI+2)}" class="gridPartR animate__animated animate__wobble"><h2 id="${curL+curL+(curI+2)}" class="h2H">X</h2></div>`;

        //bottom left
        let bL=`<div id="${curL+curI}" class="gridPartBL animate__animated animate__wobble"><h2 id="${curL+curL+curI}" class="h2H">X</h2></div>`;

        //bottom center
        let bC=`<div id="${curL+(curI+1)}" class="gridPartBC animate__animated animate__wobble"><h2 id="${curL+curL+(curI+1)}" class="h2H">X</h2></div>`;

        //bottom right
        let bR=`<div id="${curL+(curI+2)}" class="gridPartBR animate__animated animate__wobble"><h2 id="${curL+curL+(curI+2)}" class="h2H">X</h2></div>`;

        let sBlock = document.createElement("span");
        sBlock.className="gridBlock";
        
        //creating each row inside of a span to keep it organized and make the right shape
        switch(intB)
        {
            //row 1
            case 0:document.getElementById("gameboard").appendChild(sBlock);
            sBlock.innerHTML=pL+pC+pR;
            intB++;
            break;
            //row 2
            case 1:document.getElementById("gameboard").appendChild(sBlock);
            sBlock.innerHTML=pL+pC+pR;
            intB++;
            break;
            //row 3
            case 2:document.getElementById("gameboard").appendChild(sBlock);
            sBlock.innerHTML=bL+bC+bR;
            intB++;
            break;
        }
    }while(intB<3);
    //moving on to adding the event listeners
    addListeners();
}
//adds the eventListeners
function addListeners()
{
    //reseting global ints
    intA=0;
    intB=0;
    //event listeners being added to all divs. each event listener only fires once
    let gDiv = document.querySelectorAll("div");
    gDiv.forEach(function(a) 
    {
        //adds eventlistener to each div
        a.addEventListener("click",function(){getPos(this.id);},{once:true});
        intA++;
        //checks if intA value needs to be reset(only has 3 values) and intB has more value added
        if(intA>2)
        {
            intA=0;
            intB++;
        }
    });
}
//gets position of click and converts to grid format.
//does so by converting first object from array into appropriate number
function getPos(m)
{
    //ID number
    let num = m[1];
    //ID letter
    let m2 = m[0];
    //switches between players each turn(odd = X and even=O with 9 clicks = tie)
    let i = cClick;
    if(i == 0 ||i==2||i==4||i==6||i==8)
    {
        cLet=p1;
        curP=grid1;
        document.getElementById("rules").innerText=`It's now O's turn`;
        document.getElementById("rules").style.color="red";
        cClick++;
    }
    else if(i<10)
    {
        cLet=p2;
        curP=grid2;
        document.getElementById("rules").innerText=`It's now X's turn`;
        document.getElementById("rules").style.color="blue";
        cClick++;
    }//generic error
    else{console.log("ref line 140");}
    //logs clicks
    switch(m[0])
    {
        //first row
        case "a":curP[0].push(num);
        break;
        //second row
        case "b":curP[1].push(num);
        break;
        //third row
        case "c":curP[2].push(num);
        break;
    }
    /*debugging info
    console.log(m2+m);
    console.log(m);
    console.log(curP);
    console.log(grid1);
    console.log('click');
    */

    //calls the h2 for the clicked box
    let playL = document.getElementById(m2+m);
    //changes hidden letter to visible with a wobble animation
    playL.className="h2V animate__animated animate__tada";
    //changes clicked box to X or O
    playL.innerText=cLet;
    if(cLet==p1)
    {
        //changes X to blue
        playL.style.color="blue";
    }
    else
    {
        //changes O to red
        playL.style.color = "red";
    }
    //moves on to check for a win
    checkWin(curP);
}

// //checks for wins using array
function checkWin(player)
{
    //player's first row in a sorted string format
    let row1 = player[0].sort();
    row1.toString();
    //player's second row in a sorted string format
    let row2 = player[1].sort();
    row2.toString();
    //player's third row in a sorted string format
    let row3 = player[2].sort();
    row3.toString();
    //winning combo for horizontal
    let winAH = [1,2,3,].toString();
    //debug info for the array
    console.log(`row1:${row1},answer:${winAH}, row2:${row2}, row3:${row3}`);
    
    //checks for horizontal win
    if(row1 == winAH || row2 == winAH || row3 == winAH)
    {
        render(1);
    }
    //checks for vertical win
    else if(row1.includes("1") && row2.includes("1") && row3.includes("1")||row1.includes("2") && row2.includes("2") && row3.includes("2")||row1.includes("3") && row2.includes("3") && row3.includes("3"))
    {
        render(1);
    }
    //checks for diagonal wins
    else if(row1.includes("1") && row2.includes("2") && row3.includes("3")||row1.includes("3") && row2.includes("2") && row3.includes("1"))
    {
        render(1);
    }
    //checks for a tie
    else if(cClick>8)
    {
        render(2);
    }
}

//renders winning message
function render(w)
{

    let winM = document.createElement("h1");
    winM.className="resultText animate__animated animate__fadeInUp";
    
    //console.log("game over!");
    //player 1 winning message
    if(cLet == p1 && w == 1)
    {
        winM.innerText="Player X Won!";
        winM.style.color="blue";
        document.getElementById("win").appendChild(winM);
        document.getElementById("win").style.left="33%";
    }
    //player 2 winning message
    else if(cLet == p2 && w == 1)
    {
        winM.innerText="Player O Won!";
        winM.style.color="red";
        document.getElementById("win").appendChild(winM);
        document.getElementById("win").style.left="33`%";
    }
    //tie message
    else if(w == 2)
    {
        winM.innerText="It is a Tie!";
        winM.style.color="yellow";
        document.getElementById("win").appendChild(winM);
        document.getElementById("win").style.left="38%";
    }
}

//resets the game and all world variables
function resetGame()
{
    //hides the board
    let hideit = document.getElementsByClassName("h2V");
    Array.from(hideit).forEach(function(a){a.className="h2H";});

    //player1 grid and player2 grid
    grid1 = [[],[],[]];
    grid2 = [[],[],[]];

    //click count
    cClick = 0;

    //global ints
    intA = 0;
    intB = 0;

    //current player
    curP = grid1;
    curL = p1;
    document.getElementById("gameboard").innerHTML="<br>";
    document.getElementById("win").innerHTML="";
    init();
}