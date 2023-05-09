function createNewCompany() {
    //Get elements from mainPage.html and hidde or show their
    const userFunctions = document.getElementById("userFunctions");
    const mainWindow = document.getElementById("showMain");
    const showWindow = document.getElementById("showAll");
    const createUser = document.getElementById("createUser");
    userFunctions.style.display = "none";
    mainWindow.style.display = "none";
    showWindow.style.display = "block";
    createUser.style.display = "block";
    createUser.innerHTML = "";
    //Create DOM elements 
    const header = document.createElement("div");
    const backArrow = document.createElement("div");
    const titel = document.createElement("div");
    const form = document.createElement("div");
    const contactDataContact = document.createElement("div");
    const contactDataPerson = document.createElement("div");
    const contactDataContract = document.createElement("div");
    contactDataContact.innerHTML = `
    <div class="text-center">Company data</div>
    <div class="relative mb-[1rem] h-[2rem] cursor-pointer">
        <input id="" maxlength="30" class="w-[100%] h-[100%] text-[1.2rem] m-0 bg-[rgba(0,0,0,0)] mt-[1rem] rounded-[2px] border-2" >
        <label class="absolute left-[0.75rem] top-0 text-[1rem] font-normal text-[rgb(112,117,121)] px-[0.25rem] bg-white">Name</label>
    </div>
    <div class="relative mb-[1rem] h-[2rem] cursor-pointer">
        <input id="" maxlength="30" class="w-[100%] h-[100%] text-[1.2rem] m-0 bg-[rgba(0,0,0,0)] mt-[1rem] rounded-[2px] border-2" >
        <label class="absolute left-[0.75rem] top-0 text-[1rem] font-normal text-[rgb(112,117,121)] px-[0.25rem] bg-white">Street</label>
    </div>
    <div class="relative mb-[1rem] h-[2rem] cursor-pointer">
        <input id="" maxlength="30" class="w-[100%] h-[100%] text-[1.2rem] m-0 bg-[rgba(0,0,0,0)] mt-[1rem] rounded-[2px] border-2" >
        <label class="absolute left-[0.75rem] top-0 text-[1rem] font-normal text-[rgb(112,117,121)] px-[0.25rem] bg-white">City</label>
    </div>
    <div class="relative mb-[1rem] h-[2rem] cursor-pointer">
        <input id="" maxlength="30" class="w-[100%] h-[100%] text-[1.2rem] m-0 bg-[rgba(0,0,0,0)] mt-[1rem] rounded-[2px] border-2" >
        <label class="absolute left-[0.75rem] top-0 text-[1rem] font-normal text-[rgb(112,117,121)] px-[0.25rem] bg-white">E-mail</label>
    </div>
    <div class="relative mb-[1rem] h-[2rem] cursor-pointer">
        <input id="" maxlength="30" class="w-[100%] h-[100%] text-[1.2rem] m-0 bg-[rgba(0,0,0,0)] mt-[1rem] rounded-[2px] border-2" >
        <label class="absolute left-[0.75rem] top-0 text-[1rem] font-normal text-[rgb(112,117,121)] px-[0.25rem] bg-white">Telephon number</label>
    </div>
    `;
    contactDataPerson.innerHTML = `
    <div class="text-center">Responsible person data</div>
    <div class="relative mb-[1rem] h-[2rem] cursor-pointer">
        <input id="" maxlength="30" class="w-[100%] h-[100%] text-[1.2rem] m-0 bg-[rgba(0,0,0,0)] mt-[1rem] rounded-[2px] border-2" >
        <label class="absolute left-[0.75rem] top-0 text-[1rem] font-normal text-[rgb(112,117,121)] px-[0.25rem] bg-white">Name</label>
    </div>
    <div class="relative mb-[1rem] h-[2rem] cursor-pointer">
        <input id="" maxlength="30" class="w-[100%] h-[100%] text-[1.2rem] m-0 bg-[rgba(0,0,0,0)] mt-[1rem] rounded-[2px] border-2" >
        <label class="absolute left-[0.75rem] top-0 text-[1rem] font-normal text-[rgb(112,117,121)] px-[0.25rem] bg-white">Surname</label>
    </div>
    <div class="relative mb-[1rem] h-[2rem] cursor-pointer">
        <input id="" maxlength="30" class="w-[100%] h-[100%] text-[1.2rem] m-0 bg-[rgba(0,0,0,0)] mt-[1rem] rounded-[2px] border-2" >
        <label class="absolute left-[0.75rem] top-0 text-[1rem] font-normal text-[rgb(112,117,121)] px-[0.25rem] bg-white">E-mail</label>
    </div>
    <div class="relative mb-[1rem] h-[2rem] cursor-pointer">
        <input id="" maxlength="30" class="w-[100%] h-[100%] text-[1.2rem] m-0 bg-[rgba(0,0,0,0)] mt-[1rem] rounded-[2px] border-2" >
        <label class="absolute left-[0.75rem] top-0 text-[1rem] font-normal text-[rgb(112,117,121)] px-[0.25rem] bg-white">Telephon number</label>
    </div>
    `;
    contactDataContract.innerHTML = `
    <div class="relative mb-[1rem] h-[2rem] cursor-pointer">
        <input id="" type="file" class="w-[100%] h-[100%] text-[1.2rem] m-0 bg-[rgba(0,0,0,0)] mt-[1rem] rounded-[2px] border-2">
        <label class="absolute left-[0.2rem] top-0 text-[1rem] font-normal text-[rgb(112,117,121)] px-[0.25rem] bg-[rgba(255,255,255,0.2)]">Contract</label>
    </div>
    <button type="button" onclick="" class="w-[100%] h-[3.5rem] mt-[0.5rem] mb-[0.25rem] bg-[rgba(0,0,0,0)] text-[1.5rem] hover:bg-[rgba(87,87,87,0.4)] rounded">
        Create new company
    </button>
    `;
    //Styles
    const blockStyle = "pb-2 border-b-4 border-black";
    header.className = "border-b-2 flex flex-row";
    titel.className = "ml-6 text-[1.5rem]"
    backArrow.className = "bg-[url('../Materials/arrow.png')] mb-2 bg-cover w-[2rem] h-[2rem] cursor-pointer hover:rounded-[2rem] hover:bg-[rgba(87,87,87,0.4)]";
    contactDataContact.className = blockStyle;
    contactDataPerson.className = blockStyle;
    contactDataContract.className = blockStyle;
    form.className = "w-[95%] max-h-[26rem] overflow-y-auto";
    //Text
    titel.innerText = "Create company";
    //Functions
    //Return
    backArrow.addEventListener("click", function() {
        userFunctions.style.display = "block";
        mainWindow.style.display = "flex";
        showWindow.style.display = "none";
        createUser.style.display = "none";
    });
    
    //Appends
    header.appendChild(backArrow);
    header.appendChild(titel);
    createUser.appendChild(header);
    form.appendChild(contactDataContact);
    form.appendChild(contactDataPerson);
    form.appendChild(contactDataContract);
    createUser.appendChild(form);
}