"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const allPosition = document.getElementById("allposition");
const pointGuardDiv = document.getElementById("point");
const ShootingGuardDiv = document.getElementById("shooting");
const SmallForwardDiv = document.getElementById("small");
const PowerForwardDiv = document.getElementById("power");
const CenterDiv = document.getElementById("center");
const BASEURL = 'https://nbaserver-q21u.onrender.com/api/filter';
const searchFrom = document.getElementById("searchFrom");
const selectOptiond = document.getElementById("selectOption");
const points = document.getElementById("points");
const fieldGoal = document.getElementById("fg");
const point3 = document.getElementById("3p");
const table = document.getElementById("tbody");
const searchPlayerBtn = document.getElementById("submitBtn");
searchFrom.addEventListener("submit", (e) => {
    e.preventDefault();
    searchPlayer();
});
function searchPlayer() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch(BASEURL, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    position: selectOptiond.value,
                    points: points.value,
                    twoPercent: fieldGoal.value,
                    threePercent: point3.value,
                })
            });
            if (!response.ok) {
                throw new Error("NetworkError");
            }
            const thePlayer = yield response.json();
            playertoTable(thePlayer);
            console.log(thePlayer);
        }
        catch (error) {
            console.log(error);
        }
    });
}
function playertoTable(Players) {
    table.innerText = "";
    Players.forEach((Current, index) => {
        const tableRow = document.createElement("tr");
        tableRow.classList.add("tableRow");
        const player = document.createElement("td");
        const position = document.createElement("td");
        const points = document.createElement("td");
        const fg = document.createElement("td");
        const threePercent = document.createElement("td");
        const action = document.createElement("td");
        action.classList.add("action");
        player.textContent = Current.playerName;
        position.textContent = Current.position;
        points.textContent = Current.points.toString();
        fg.textContent = Current.twoPercent.toString();
        threePercent.textContent = Current.threePercent.toString();
        const AddBtn = document.createElement("button");
        AddBtn.classList.add("addBtn");
        AddBtn.textContent = `add ${Current.playerName} to Current Team`;
        AddBtn.addEventListener("click", () => {
            addToCard(Current);
        });
        action.appendChild(AddBtn);
        tableRow.appendChild(player);
        tableRow.appendChild(position);
        tableRow.appendChild(points);
        tableRow.appendChild(fg);
        tableRow.appendChild(threePercent);
        tableRow.appendChild(action);
        table === null || table === void 0 ? void 0 : table.appendChild(tableRow);
    });
}
function addToCard(player) {
    const divtoadd = document.createElement("div");
    divtoadd.classList.add("divtoadd");
    const playerName = document.createElement("p");
    playerName.innerText = player.playerName;
    playerName.classList.add("fullName");
    const threePercent = document.createElement("p");
    threePercent.innerText = `threePercent:${player.threePercent.toString()}%`;
    const twoPercent = document.createElement("p");
    twoPercent.innerText = `twoPercent:${player.twoPercent.toString()}% `;
    const points = document.createElement("p");
    points.innerText = `points:${player.points.toString()}`;
    divtoadd.appendChild(playerName);
    divtoadd.appendChild(threePercent);
    divtoadd.appendChild(twoPercent);
    divtoadd.appendChild(points);
    switch (player.position) {
        case "PG":
            pointGuardDiv.innerText = "";
            pointGuardDiv.appendChild(divtoadd);
            break;
        case "SG":
            ShootingGuardDiv.innerText = "";
            ShootingGuardDiv.appendChild(divtoadd);
            break;
        case "SF":
            SmallForwardDiv.innerText = "";
            SmallForwardDiv.appendChild(divtoadd);
            break;
        case "PF":
            PowerForwardDiv.innerText = "";
            PowerForwardDiv.appendChild(divtoadd);
            break;
        case "C":
            CenterDiv.innerText = "";
            CenterDiv.appendChild(divtoadd);
            break;
        default:
            break;
    }
}
