
let thisData = [];
const loadingPart = () => {
    manageSpinner(true);
    fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
    .then((res) => res.json())
    .then((json) => {
        thisData = json.data; 
        displayCards(thisData); 
        manageSpinner(false); 
    })
};


const manageSpinner = (status) => {
    if(status==true){
        document.getElementById("spinner").classList.remove("hidden");
        document.getElementById("card-container").classList.add("hidden");
    }else{
        document.getElementById("card-container").classList.remove("hidden");
        document.getElementById("spinner").classList.add("hidden");
    }
    
}

const datailsPart = async(id) =>{
    const url = (`https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`)
    // console.log(url);
    const res = await fetch(url)
    const datails = await res.json();
    displayInfo(datails.data)
}

const displayInfo = (parts) => {
    // console.log(parts)
    manageSpinner(true);
    const datailsBox = document.getElementById("datails-container")
    datailsBox.innerHTML=`
    <div class="card bg-white  rounded p-4 space-y-4">
        <div>
            <h1 class="font-semibold text-[20px]">${parts.title}</h1>
            <div class="flex gap-6">
              <h1 class="text-white bg-[#00A96E] rounded font-semibold w-[65px] text-center">${parts.status}</h1>
            <li class="text-gray-500">${parts.author}</li>
            <li class="text-gray-500">${parts.updatedAt.split("T")[0]}</li>
            </div>
        </div>
        <div class="flex gap-2">
            <h1 class="text-[#EF4444] bg-[#FEECEC] rounded font-semibold w-[56px] text-center"><i class="fa-solid fa-bug w-[8px]"></i>Bug</h1>
            <h1 class="text-[#D97706] bg-[#FEECEC] rounded font-semibold w-[112px] text-center"><i class="fa-solid fa-face-smile w-[8px]"></i>help wanted</h1>
            
        </div>
        <div>
          <p class="text-gray-500">${parts.description}</p>
        </div>
     <div class="grid grid-cols-2 gap-6 text-center">

  <div>
    <p class="text-gray-500">Assignee:</p>
    <p class="font-semibold">${parts.assignee}</p>
  </div>

  <div class="">
    <p class="text-gray-500">Priority</p>
    <p class="font-semibold shadow bg-amber-500 w-[60px] rounded ">${parts.priority}</p>
  </div>

  </div>
        <!-- <div>
            <h1 class="text-[#64748B]">#1 by john_doe</h1>
            <p class="text-[#64748B]">${parts.updatedAt}</p>
        </div> -->
    </div>
    
    `;
    document.getElementById("parts_modal").showModal();
}


const displayCards = (part) => {
   
    const cardContainer = document.getElementById("card-container");
    const btnCount = document.getElementById("btnCount");
    cardContainer.innerHTML = ""; 

    if(btnCount){
        btnCount.innerText =`${part.length} Issues`;
    }

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
                 <h1 class="text-[#EF4444] bg-[#FEECEC] rounded font-semibold px-2 text-[16px] text-center"><i class="fa-solid fa-bug w-[8px]"></i>Bug</h1>
                 <h1 class="text-[#D97706] bg-[#FEECEC] rounded font-semibold px-2 text-[16px] text-center"><i class="fa-solid fa-face-smile w-[8px]"></i>help wanted</h1>
            </div>
            <hr class="text-[#64748B]" >
            <div>
                <h1 class="text-[#64748B] text-xs">#${partOn.id} by ${partOn.author}</h1>
                <p class="text-[#64748B] text-xs">${partOn.updatedAt.split("T")[0]}</p>
            </div>
           </div>
        `;
        cardContainer.append(cardDiv);
       
    });
      manageSpinner(false)
}


// document.getElementById('allBtn').addEventListener('click', () => {
//     displayCards(thisData); 
// });

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



document.getElementById("btn-search").addEventListener("click", () =>{
    const input = document.getElementById("input-search");
    const searchValue = input.value.trim().toLowerCase();
    console.log(searchValue);

    fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${searchValue}`)
    .then((res) => res.json())
    .then((data) => {
        const allCard = data.data;
        // console.log(allCard);

        const cardFilter = allCard.filter(part =>
            part.title.toLowerCase().includes(searchValue)
        );
        // console.log(cardFilter);
        displayCards(cardFilter);
    });
});


