const loadingPart = () => {
    fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
    .then((res) => res.json())
    .then((json) => displayPart(json.data))
};

const displayPart = (part) =>{
    // console.log(part);

    const levelContainer = document.getElementById("level-container");
    levelContainer.innerHTML = "";
    for(let partOn of part){
        // console.log(partOn);
        const thisDiv = document.createElement("div");
        thisDiv.innerHTML = `
                  <button class="btn btn-outline btn-primary w-[120px] h-[40px] text-[20px]">All - ${partOn.id}</button>
        `;

        levelContainer.append(thisDiv)
    }
}
loadingPart()