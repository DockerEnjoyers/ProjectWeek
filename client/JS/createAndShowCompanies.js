function createNewCompanyWindow() {
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
        <input id="name" maxlength="30" class="w-[100%] h-[100%] text-[1.2rem] m-0 bg-[rgba(0,0,0,0)] mt-[1rem] rounded-[2px] border-2" >
        <label class="absolute left-[0.75rem] top-0 text-[1rem] font-normal text-[rgb(112,117,121)] px-[0.25rem] bg-white">Name</label>
    </div>
    <div class="relative mb-[1rem] h-[2rem] cursor-pointer">
        <input id="street" maxlength="30" class="w-[100%] h-[100%] text-[1.2rem] m-0 bg-[rgba(0,0,0,0)] mt-[1rem] rounded-[2px] border-2" >
        <label class="absolute left-[0.75rem] top-0 text-[1rem] font-normal text-[rgb(112,117,121)] px-[0.25rem] bg-white">Street</label>
    </div>
    <div class="relative mb-[1rem] h-[2rem] cursor-pointer">
        <input id="city" maxlength="30" class="w-[100%] h-[100%] text-[1.2rem] m-0 bg-[rgba(0,0,0,0)] mt-[1rem] rounded-[2px] border-2" >
        <label class="absolute left-[0.75rem] top-0 text-[1rem] font-normal text-[rgb(112,117,121)] px-[0.25rem] bg-white">City</label>
    </div>
    <div class="relative mb-[1rem] h-[2rem] cursor-pointer">
        <input id="email" maxlength="30" class="w-[100%] h-[100%] text-[1.2rem] m-0 bg-[rgba(0,0,0,0)] mt-[1rem] rounded-[2px] border-2" >
        <label class="absolute left-[0.75rem] top-0 text-[1rem] font-normal text-[rgb(112,117,121)] px-[0.25rem] bg-white">E-mail</label>
    </div>
    <div class="relative mb-[1rem] h-[2rem] cursor-pointer">
        <input id="telNum" onkeypress="valid()" type="tel" pattern="[0-9]{11,13}" class="w-[100%] h-[100%] text-[1.2rem] m-0 bg-[rgba(0,0,0,0)] mt-[1rem] rounded-[2px] border-2" placeholder="Telephone number">
        <label class="absolute left-[0.75rem] top-0 text-[1rem] font-normal text-[rgb(112,117,121)] px-[0.25rem] bg-white">Telephon number</label>
        <label id="validTel" class="absolute right-[0.75rem] top-0 text-[1rem] font-normal text-red-500 px-[0.25rem] bg-white">X</label>
    </div>
    `;
    contactDataPerson.innerHTML = `
    <div class="text-center">Responsible person data</div>
    <div class="relative mb-[1rem] h-[2rem] cursor-pointer">
        <input id="pName" maxlength="30" class="w-[100%] h-[100%] text-[1.2rem] m-0 bg-[rgba(0,0,0,0)] mt-[1rem] rounded-[2px] border-2" >
        <label class="absolute left-[0.75rem] top-0 text-[1rem] font-normal text-[rgb(112,117,121)] px-[0.25rem] bg-white">Name</label>
    </div>
    <div class="relative mb-[1rem] h-[2rem] cursor-pointer">
        <input id="pSurname" maxlength="30" class="w-[100%] h-[100%] text-[1.2rem] m-0 bg-[rgba(0,0,0,0)] mt-[1rem] rounded-[2px] border-2" >
        <label class="absolute left-[0.75rem] top-0 text-[1rem] font-normal text-[rgb(112,117,121)] px-[0.25rem] bg-white">Surname</label>
    </div>
    <div class="relative mb-[1rem] h-[2rem] cursor-pointer">
        <input id="pEmail" maxlength="30" class="w-[100%] h-[100%] text-[1.2rem] m-0 bg-[rgba(0,0,0,0)] mt-[1rem] rounded-[2px] border-2" >
        <label class="absolute left-[0.75rem] top-0 text-[1rem] font-normal text-[rgb(112,117,121)] px-[0.25rem] bg-white">E-mail</label>
    </div>
    <div class="relative mb-[1rem] h-[2rem] cursor-pointer">
        <input id="pTelNum" maxlength="30" class="w-[100%] h-[100%] text-[1.2rem] m-0 bg-[rgba(0,0,0,0)] mt-[1rem] rounded-[2px] border-2" >
        <label class="absolute left-[0.75rem] top-0 text-[1rem] font-normal text-[rgb(112,117,121)] px-[0.25rem] bg-white">Telephon number</label>
    </div>
    `;
    contactDataContract.innerHTML = `
    <div class="relative mb-[1rem] h-[2rem] cursor-pointer">
        <input id="contract" type="file" class="w-[100%] h-[100%] text-[1.2rem] m-0 bg-[rgba(0,0,0,0)] mt-[1rem] rounded-[2px] border-2">
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

function createNewCompany() {   
    const name = document.getElementById("name"); 
    const city = document.getElementById("city"); 
    const street = document.getElementById("street"); 
    const email = document.getElementById("email"); 
    const telNum = document.getElementById("telNum"); 
    const pName = document.getElementById("pName");
    const pSurname = document.getElementById("pSurname");  
    const pEmail = document.getElementById("pEmail");
    const pTelNum = document.getElementById("pTelNum");  
    const contract = document.getElementById("contract"); 

    if (name.value.length === undefined || name.value.length < 3) {
        customAlert(1, "Name is too short or empty");
    } else if (city.value.length === undefined || city.value.length < 3) {
        customAlert(1, "City name is too short or empty");
    } else if (street.value.length === undefined || street.value.length < 3) {
        customAlert(1, "Street name is too short or empty");
    } else if (email.value.length === undefined || email.value.length < 3) {
        customAlert(1, "E-mail is too short or empty");
    } else if (!email.value.includes("@")) {
        customAlert(1, "False e-mail format");
    } else if (telNum.value.length === undefined || telNum.value.length < 11) {
        customAlert(1, "Telephone number is too short or empty");
    } else if (!telNum.checkValidity()) {
        customAlert(1, "Telephone have false format. The length must be 11-13 numbers.");
    } if (pName.value.length === undefined || pName.value.length < 3) {
        customAlert(1, "Name is too short or empty");
    }  else if (pSurname.value.length === undefined || pSurname.value.length < 3) {
        customAlert(1, "Surname is too short or empty");
    } else if (pEmail.value.length === undefined || pEmail.value.length < 3) {
        customAlert(1, "E-mail is too short or empty");
    } else if (!pEmail.value.includes("@")) {
        customAlert(1, "False e-mail format");
    } else if (pTelNum.value.length === undefined || pTelNum.value.length < 11) {
        customAlert(1, "Telephone number is too short or empty");
    } else if (!contract.files[0].name.includes("pdf")) {
        customAlert(1, "Contract has a false file format");
    } else {
        
    }
}