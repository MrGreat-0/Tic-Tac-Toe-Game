var restartButton = document.querySelector("#restart-btn");
// var boxes = document.querySelectorAll(".box");

var boxes;

var turnX = true;
var moves = 0;

// this is only for winning pattern
// var winPattern = [
//     [0, 1, 2],
//     [3, 4, 5],
//     [6, 7, 8],
//     [0, 3, 6],
//     [1, 4, 7],
//     [2, 5, 8],
//     [0, 4, 8],
//     [2, 4, 6],
// ];


//  this is for winning pattern and also for line over winning one's 
//  [0][1][2] = store winning pattern , 
//  [3][4][5] = store line pattern over winning one's {transform: translate(0, 0) rotate(45deg);}....

var winPattern = [
    // [0, 1, 2, 3, 4, 5] = example from above
    [0, 1, 2, 0, -8.9, 0],
    [3, 4, 5, 0, 0, 0],
    [6, 7, 8, 0, 8.6, 0],
    [0, 3, 6, -8.3, 0, 90],
    [1, 4, 7, 0, 0, 90],
    [2, 5, 8, 8.35, 0, 90],
    [0, 4, 8, 0, 0, 45],
    [2, 4, 6, 0, 0, -45],
];


// function restartGame() {
//     turnX = true;
//     document.querySelector("#big-box").innerHTML = ""; // Clear the container
//     document.getElementById('#container')?.querySelector('h1')?.remove();
//     // Recreate the boxes inside the container
//     for (let i = 0; i < 9; i++) {
//         const box = document.createElement('button');
//         box.classList.add('box');
//         document.querySelector("#big-box").appendChild(box);
//             box.addEventListener("click", () => {
//                 if (turnX) {
//                     // PlayerX
//                     box.innerText = "X";
//                     turnX = false;
//                 } else {
//                     // PlayerO
//                     box.innerText = "O";
//                     turnX = "true"
//                 }
//                 box.disabled = true;
//                 checkWinner();
//             });
//     }
//     // boxes = document.querySelectorAll(".box"); // Update the boxes NodeList
// }


// function restartGame() {
//     turnX = true;
//     moves = 0;
//     document.querySelector("#container").innerHTML =
//         `
//     <div id="big-box">
//     <button class="box"></button>
//     <button class="box"></button>
//     <button class="box"></button>
//     <button class="box"></button>
//     <button class="box"></button>
//     <button class="box"></button>
//     <button class="box"></button>
//     <button class="box"></button>
//     <button class="box"></button>
//     </div>
//     ` ;
//     boxes = document.querySelectorAll(".box");
//     playerTurn();
// }



function restartGame() {
    turnX = true;
    moves = 0;
    makeBox();
}
restartButton.addEventListener('click', restartGame);



// function startGame() {
//     var startBtn = document.createElement("button");
//     startBtn.id = "start-btn";
//     startBtn.textContent = "Start";
//     document.querySelector("#container").appendChild(startBtn);

//     startBtn.addEventListener('click', function() {
//         document.querySelector("#container").removeChild(startBtn); // Remove the start button
//         makeBox(); // Start the game
//     });
// }



function startGame() {
    document.getElementById("restart-btn").style.display = 'block';
    makeBox();
}
document.getElementById("start-btn").addEventListener("click", startGame);



// function checkWinner() {
//     for (var pattern of winPattern) {
//         var symbols = pattern.map(index => boxes[index].innerText);
//         if (symbols.every(symbol => symbol === "X") || symbols.every(symbol => symbol === "O")) {
//             alert("Player " + (turnX ? "X" : "O") + " wins!");
//             // You can add additional logic here for game reset or further actions
//         }
//     }
// }



function checkWinner() {
    for (var pattern of winPattern) {

        var pos1Val = boxes[pattern[0]].innerText;
        var pos2Val = boxes[pattern[1]].innerText;
        var pos3Val = boxes[pattern[2]].innerText;

        if (pos1Val !== "" && pos2Val !== "" && pos3Val !== "") {

            if (pos1Val === pos2Val && pos2Val === pos3Val) {

                // document.getElementById("line").style.width = "23vw";
                document.getElementById("line").style.transform = `translate(${pattern[3]}vw,${pattern[4]}vw) rotate(${pattern[5]}deg)`;
                document.getElementById("line").style.display = "block"; // Display the line when a winning pattern is found

                boxes.forEach((box) => {
                    box.disabled = true;
                });

                setTimeout(() => {

                    document.querySelector("#container").innerHTML = `<h1>The Winner is ${pos1Val}</h1>`;
                    document.getElementById("line").style.display = "none"; // Hide the line after displaying the winner message

                }, 300);
                
                return true;
            }
        }
    }
    // document.getElementById("line").style.display = "none"; // Hide the line if no winning pattern is found
    return false;
}



function makeBox() {

    // Clear the game status message
    document.querySelector("#container").innerHTML = "";

    // Create a new div element
    var newDiv = document.createElement("div");

    // Set the id attribute of the new div to "big-box"
    newDiv.id = "big-box";

    // Append the new div to the container
    container.appendChild(newDiv);

    var numBox = 9;
    var clutter = "";

    for (var i = 0; i < numBox; i++) {
        clutter += `<button class="box"></button>`;
    }

    document.querySelector("#big-box").innerHTML = clutter;
    boxes = document.querySelectorAll(".box");

    playerTurn();

}


function playerTurn() {

    boxes.forEach((box) => {
        box.addEventListener("click", () => {

            if (box.innerText === "") {

                if (turnX) {
                    box.innerText = "X";
                    turnX = false;
                } else {
                    box.innerText = "O";
                    turnX = true;
                }

                box.disabled = true;
                moves++;

                if (checkWinner()) {
                    return;
                }

                setTimeout(() => {
                    if (moves === 9) {
                        document.querySelector("#container").innerHTML = `<h1>It's a Draw!</h1>`;
                    }
                }, 300);

            }
        });
    });
}