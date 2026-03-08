// const loadingPart = () => {
//     fetch("https://phi-lab-server.vercel.app/api/v1/lab/partOns")
//     .then((res) => res.json())
//     .then((json) => displayPart(json.data))
// };

// const displayPart = (part) =>{
//     // console.log(part);

//     const levelContainer = document.getElementById("level-container");
//     levelContainer.innerHTML = "";
//     for(let partOn of part){
//         // console.log(partOn);
//         const thisDiv = document.createElement("div");
//         thisDiv.innerHTML = `
//                   <button class="btn btn-outline btn-primary w-[120px] h-[40px] text-[20px]">All - ${partOn.id}</button>
//         `;

//         levelContainer.append(thisDiv)
//     }
// }
// loadingPart()



let thisData = [];


const loadingPart = () => {
    fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
    .then((res) => res.json())
    .then((json) => {
        thisData = json.data; 
        displayCards(thisData); 
    })
};


const displayCards = (part) => {
    const cardContainer = document.getElementById("card-container");
    cardContainer.innerHTML = ""; 

    part.forEach(partOn => {
        const borderColor = partOn.status === 'open' ? 'border-emerald-500' : 'border-red-500';
        
        const cardDiv = document.createElement("div");
        cardDiv.className = `card bg-white shadow rounded p-4 space-y-2 border-t-4 ${borderColor}`;
        cardDiv.innerHTML = `
            <div class="flex justify-between items-center ">
                <img src="../assets/Open-Status.png" alt="">
                <h1 class="bg-[#FEECEC] rounded font-semibold px-2 text-center text-sm">${partOn.priority}</h1>
            </div>
            <div>
                <h1 class="font-semibold text-[20px]">${partOn.title}</h1>
                <p class="text-[#64748B] text-sm">${partOn.description || 'No description available'}</p>
            </div>
            <div class="flex gap-2">
                 <h1 class="text-[#EF4444] bg-[#FEECEC] rounded font-semibold px-2 text-xs text-center">Bug</h1>
                 <h1 class="text-[#D97706] bg-[#FEECEC] rounded font-semibold px-2 text-xs text-center">help wanted</h1>
            </div>
            <hr>
            <div>
                <h1 class="text-[#64748B] text-xs">#${partOn.id} by ${partOn.author}</h1>
                <p class="text-[#64748B] text-xs">${partOn.updatedAt}</p>
            </div>
        `;
        cardContainer.append(cardDiv);
    });
}

// ৩. Button filtering logic
document.getElementById('allBtn').addEventListener('click', () => {
    displayCards(thisData); // Shob dekhabe
});

document.getElementById('openBtn').addEventListener('click', () => {
    const openData = thisData.filter(item => item.status === 'open');
    displayCards(openData); // Shudhu open gulo
});

document.getElementById('close-Btn').addEventListener('click', () => {
    const closedData = thisData.filter(item => item.status === 'closed');
    displayCards(closedData); // Shudhu closed gulo
});

// App start hole function call kora
loadingPart();