const allPosition = document.getElementById("allposition") as HTMLDivElement
const pointGuardDiv = document.getElementById("point")as HTMLDivElement
const ShootingGuardDiv = document.getElementById("shooting")as HTMLDivElement
const SmallForwardDiv = document.getElementById("small")as HTMLDivElement
const PowerForwardDiv = document.getElementById("power")as HTMLDivElement
const CenterDiv = document.getElementById("center")as HTMLDivElement
const BASEURL:string = 'https://nbaserver-q21u.onrender.com/api/filter'
const searchFrom = document.getElementById("searchFrom") as HTMLFormElement
const selectOptiond  =  document.getElementById("selectOption") as HTMLSelectElement
const points =  document.getElementById("points") as HTMLInputElement
const fieldGoal =  document.getElementById("fg") as HTMLInputElement
const point3 =  document.getElementById("3p") as HTMLInputElement
const table = document.getElementById("tbody") 

interface Players {
    playerName:string,
    position: string,
      twoPercent: number
      threePercent: number
      points: number
}
const searchPlayerBtn = document.getElementById("submitBtn") as HTMLButtonElement

searchFrom.addEventListener("submit",(e:Event)=>{
    e.preventDefault()
     searchPlayer()})

 async function searchPlayer():Promise<void>{
    try{
        const response = await fetch(BASEURL,{
            method:"POST",
            headers :{
            'Content-Type':'application/json'
            },
            body:JSON.stringify({
                position: selectOptiond.value,
                points: points.value,
                twoPercent: fieldGoal.value,
                threePercent: point3.value,
            })
        });
        if(!response.ok){
            throw new Error("NetworkError")
        }
        const thePlayer:Players[] = await response.json()
        playertoTable(thePlayer)
        console.log(thePlayer)
    }catch(error){
        console.log(error)
    }
    
}
function playertoTable (Players:Players[]){
    table!.innerText = "" ;
    Players.forEach((Current,index)=>{
        const tableRow = document.createElement("tr")as HTMLTableRowElement
        tableRow.classList.add("tableRow")
        const player = document.createElement("td")
        const position = document.createElement("td")
        const points = document.createElement("td")
        const fg = document.createElement("td")
        const threePercent = document.createElement("td")
        const action = document.createElement("td")
        action.classList.add("action")

        player.textContent = Current.playerName
        position.textContent = Current.position
        points.textContent = Current.points.toString()
        fg.textContent = Current.twoPercent.toString()
        threePercent.textContent = Current.threePercent.toString()
        const AddBtn = document.createElement("button")
        AddBtn.classList.add("addBtn")
     AddBtn.textContent = `add ${Current.playerName} to Current Team`
     AddBtn.addEventListener("click",()=>{
        addToCard(Current)
     })
        action.appendChild(AddBtn)
        tableRow.appendChild(player)
        tableRow.appendChild(position)
        tableRow.appendChild(points)
        tableRow.appendChild(fg)
        tableRow.appendChild(threePercent)
        tableRow.appendChild(action)
        table?.appendChild(tableRow)
    })
}

function addToCard(player:Players){
     const divtoadd = document.createElement("div")
     divtoadd.classList.add("divtoadd")
            const playerName = document.createElement("p")
            playerName.innerText = player.playerName 
            playerName.classList.add("fullName")
            const threePercent = document.createElement("p")
            threePercent.innerText =`threePercent:${player.threePercent.toString()}%`
            const twoPercent = document.createElement("p")
            twoPercent.innerText = `twoPercent:${player.twoPercent.toString()}% `
            const points = document.createElement("p")
            points.innerText =`points:${player.points.toString()}` 
            divtoadd.appendChild(playerName)
            divtoadd.appendChild(threePercent)
            divtoadd.appendChild(twoPercent)
            divtoadd.appendChild(points)
    switch (player.position) {
        case "PG":
            pointGuardDiv.innerText = ""
            pointGuardDiv.appendChild(divtoadd)
            break;
        case "SG":
            ShootingGuardDiv.innerText =""
            ShootingGuardDiv.appendChild(divtoadd)
            break;
        case"SF":
            SmallForwardDiv.innerText= ""
            SmallForwardDiv.appendChild(divtoadd)
            break;
        case"PF":
            PowerForwardDiv.innerText = ""
            PowerForwardDiv.appendChild(divtoadd)
            break;
        case"C":
        CenterDiv.innerText = ""
        CenterDiv.appendChild(divtoadd)
        break;
        default:
            break;
    }
}
