
let thisData = [];
const loadingPart = () => {
    fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
    .then((res) => res.json())
    .then((json) => {
        thisData = json.data; 
        displayCards(thisData); 
    })
};

const datailsPart = async(id) =>{
    const url = (`https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`)
    console.log(url);
    const res = await fetch(url)
    const datails = await res.json();
    displayInfo(datails.data)
}

const displayInfo = (parts) => {
    console.log(parts)
    const datailsBox = document.getElementById("datails-container")
    // datailsBox.innerHTML="Hi i am labib"
    document.getElementById("parts_modal").showModal();
}


const displayCards = (part) => {
    const cardContainer = document.getElementById("card-container");
    cardContainer.innerHTML = ""; 

    part.forEach(partOn => {
        const borderColor = partOn.status === 'open' ? 'border-emerald-500' : 'border-red-500';
        
        const cardDiv = document.createElement("div");
        cardDiv.className = `card bg-white shadow rounded p-4 space-y-2 border-t-4 ${borderColor}`;
        cardDiv.innerHTML = `
           <div onclick="datailsPart(${partOn.id}) " class="space-y-4">
            <div class="flex justify-between items-center ">
                <img src="../assets/Open-Status.png" alt="">
                <h1 class="bg-[#FEECEC] rounded font-semibold px-2 text-center text-[12px]">${partOn.priority}</h1>
            </div>
            <div>
                <h1 class="font-semibold text-[22px]">${partOn.title}</h1>
                <p class="text-[#64748B] text-sm">${partOn.description || 'No data found'}</p>
            </div>
            <div class="flex gap-2">
                 <h1 class="text-[#EF4444] bg-[#FEECEC] rounded font-semibold px-2 text-[16px] text-center">Bug</h1>
                 <h1 class="text-[#D97706] bg-[#FEECEC] rounded font-semibold px-2 text-[16px] text-center">help wanted</h1>
            </div>
            <hr class="text-[#64748B] >
            <div>
                <h1 class="text-[#64748B] text-xs">#${partOn.id} by ${partOn.author}</h1>
                <p class="text-[#64748B] text-xs">${partOn.createdAt}</p>
            </div>
           </div>
        `;
        cardContainer.append(cardDiv);
    });
}


document.getElementById('allBtn').addEventListener('click', () => {
    displayCards(thisData); 
});

document.getElementById('openBtn').addEventListener('click', () => {
    const openData = thisData.filter(item => item.status === 'open');
    displayCards(openData); 
});

document.getElementById('close-Btn').addEventListener('click', () => {
    const closedData = thisData.filter(item => item.status === 'closed');
    displayCards(closedData); 
});


loadingPart();

//remove and active btn
function removeActive(){
    const buttons = document.querySelectorAll(".filter-btn");

    for(let btn of buttons){
        btn.classList.remove("bg-blue-500");
        btn.classList.remove("text-white");
    }
};

document.getElementById('allBtn').addEventListener('click', function () {
    removeActive();
    this.classList.add("bg-blue-500","text-white");

    displayCards(thisData); 
});

document.getElementById('openBtn').addEventListener('click', function () {
    removeActive();
    this.classList.add("bg-blue-500","text-white");

    const openData = thisData.filter(item => item.status === 'open');
    displayCards(openData); 
});

document.getElementById('close-Btn').addEventListener('click', function () {
    removeActive();
    this.classList.add("bg-blue-500","text-white");

    const closedData = thisData.filter(item => item.status === 'closed');
    displayCards(closedData); 
});

