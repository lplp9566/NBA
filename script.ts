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
    Players.forEach((Current,index)=>{
        const tableRow = document.createElement("tr")as HTMLTableRowElement
        const player = document.createElement("td")
        const points = document.createElement("td")
        const fg = document.createElement("td")
        const threePercent = document.createElement("td")
        const action = document.createElement("td")

        const AddBtn = document.createElement("button")
       
        AddBtn.textContent = `add ${Current.playerName} to Current Team`

        action.appendChild(AddBtn)
        tableRow.appendChild(action)
        table?.appendChild(tableRow)
       



    })
}

// fetch(BASEURL, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({
//       position: "PG",
//       twoPercent: 10,
//       threePercent: 0,
//       points: 20,
//     })
//   })
//   .then(response => response.json())
//   .then(data => console.log(data))
//   .catch(error => console.error('Error:', error));