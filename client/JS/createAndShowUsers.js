function createNewUserWindow() {
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
    const chooseImage = document.createElement("div");
    const contactDataPerson = document.createElement("div");
    const contactDataPlace = document.createElement("div");
    const contactDataAnother = document.createElement("div");
    const contactDataFiles = document.createElement("div");
    chooseImage.innerHTML = `
    <div class="relative mb-[1rem] h-[2rem] cursor-pointer">
        <input id="image" type="file" class="w-[100%] h-[100%] text-[1.2rem] m-0 bg-[rgba(0,0,0,0)] mt-[1rem] rounded-[2px] border-2">
        <label class="absolute left-[0.2rem] top-0 text-[1rem] font-normal text-[rgb(112,117,121)] px-[0.25rem] bg-[rgba(255,255,255,0.2)]">Choose foto</label>
    </div>
    `;
    contactDataPerson.innerHTML = `
    <div class="relative mb-[1rem] h-[2rem] cursor-pointer">
        <input id="" maxlength="30" class="w-[100%] h-[100%] text-[1.2rem] m-0 bg-[rgba(0,0,0,0)] mt-[1rem] rounded-[2px] border-2" placeholder="Student name">
        <label class="absolute left-[0.75rem] top-0 text-[1rem] font-normal text-[rgb(112,117,121)] px-[0.25rem] bg-white">Name</label>
    </div>
    <div class="relative mb-[1rem] h-[2rem] cursor-pointer">
        <input id="" maxlength="30" class="w-[100%] h-[100%] text-[1.2rem] m-0 bg-[rgba(0,0,0,0)] mt-[1rem] rounded-[2px] border-2" placeholder="Student surname">
        <label class="absolute left-[0.75rem] top-0 text-[1rem] font-normal text-[rgb(112,117,121)] px-[0.25rem] bg-white">Surname</label>
    </div>
    <div class="relative mb-[1rem] h-[2rem] cursor-pointer">
        <select id="" class="w-[100%] h-[100%] text-[1.2rem] m-0 bg-[rgba(0,0,0,0)] mt-[1rem] rounded-[2px] border-2">
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
        </select>
        <label class="absolute left-[0.75rem] top-0 text-[1rem] font-normal text-[rgb(112,117,121)] px-[0.25rem] bg-white">Gender</label>
    </div>
    `;
    contactDataPlace.innerHTML = `
    <div class="relative mb-[1rem] h-[2rem] cursor-pointer">
        <input id="" type="date" class="w-[100%] h-[100%] text-[1.2rem] m-0 bg-[rgba(0,0,0,0)] mt-[1rem] rounded-[2px] border-2">
        <label class="absolute left-[0.2rem] top-0 text-[1rem] font-normal text-[rgb(112,117,121)] px-[0.25rem] bg-[rgba(255,255,255,0.2)]">Birthday</label>
    </div>
    <div class="relative mb-[1rem] h-[2rem] cursor-pointer">
        <input id="" maxlength="40" class="w-[100%] h-[100%] text-[1.2rem] m-0 bg-[rgba(0,0,0,0)] mt-[1rem] rounded-[2px] border-2" placeholder="City">
        <label class="absolute left-[0.75rem] top-0 text-[1rem] font-normal text-[rgb(112,117,121)] px-[0.25rem] bg-white">City</label>
    </div>
    <div class="relative mb-[1rem] h-[2rem] cursor-pointer">
        <input id="" maxlength="30" class="w-[100%] h-[100%] text-[1.2rem] m-0 bg-[rgba(0,0,0,0)] mt-[1rem] rounded-[2px] border-2" placeholder="Street address">
        <label class="absolute left-[0.75rem] top-0 text-[1rem] font-normal text-[rgb(112,117,121)] px-[0.25rem] bg-white">Street</label>
    </div>
    <div class="relative mb-[1rem] h-[2rem] cursor-pointer">
        <input id="" maxlength="30" class="w-[100%] h-[100%] text-[1.2rem] m-0 bg-[rgba(0,0,0,0)] mt-[1rem] rounded-[2px] border-2" placeholder="Post code">
        <label class="absolute left-[0.75rem] top-0 text-[1rem] font-normal text-[rgb(112,117,121)] px-[0.25rem] bg-white">Post code</label>
    </div>
    <div class="relative mb-[1rem] h-[2rem] cursor-pointer">
        <input id="" maxlength="30" class="w-[100%] h-[100%] text-[1.2rem] m-0 bg-[rgba(0,0,0,0)] mt-[1rem] rounded-[2px] border-2" placeholder="Post code">
        <label class="absolute left-[0.75rem] top-0 text-[1rem] font-normal text-[rgb(112,117,121)] px-[0.25rem] bg-white">E-mail</label>
    </div>
    <div class="relative mb-[1rem] h-[2rem] cursor-pointer">
        <input id="" maxlength="30" class="w-[100%] h-[100%] text-[1.2rem] m-0 bg-[rgba(0,0,0,0)] mt-[1rem] rounded-[2px] border-2" placeholder="Post code">
        <label class="absolute left-[0.75rem] top-0 text-[1rem] font-normal text-[rgb(112,117,121)] px-[0.25rem] bg-white">Telephon number</label>
    </div>
    <div class="relative mb-[1rem] h-[2rem] cursor-pointer">
        <input id="" maxlength="30" class="w-[100%] h-[100%] text-[1.2rem] m-0 bg-[rgba(0,0,0,0)] mt-[1rem] rounded-[2px] border-2" placeholder="Social security number">
        <label class="absolute left-[0.75rem] top-0 text-[1rem] font-normal text-[rgb(112,117,121)] px-[0.25rem] bg-white">AHV</label>
    </div>
    `;
    contactDataAnother.innerHTML = `
    <div class="relative mb-[1rem] h-[2rem] cursor-pointer">
        <select id="" class="w-[100%] h-[100%] text-[1.2rem] m-0 bg-[rgba(0,0,0,0)] mt-[1rem] rounded-[2px] border-2">
            <option>Self</option>
            <option>Parents</option>
        </select>
        <label class="absolute left-[0.75rem] top-0 text-[1rem] font-normal text-[rgb(112,117,121)] px-[0.25rem] bg-white">Guardian</label>
    </div>
    <div class="relative mb-[1rem] h-[2rem] cursor-pointer">
        <select id="" class="w-[100%] h-[100%] text-[1.2rem] m-0 bg-[rgba(0,0,0,0)] mt-[1rem] rounded-[2px] border-2">
            <option>Application developer</option>
            <option>Software developer</option>
        </select>
        <label class="absolute left-[0.75rem] top-0 text-[1rem] font-normal text-[rgb(112,117,121)] px-[0.25rem] bg-white">Specialisation</label>
    </div>
    <div class="relative mb-[1rem] h-[2rem] cursor-pointer">
        <select id="" class="w-[100%] h-[100%] text-[1.2rem] m-0 bg-[rgba(0,0,0,0)] mt-[1rem] rounded-[2px] border-2">
            <option>inf-21</option>
            <option>inf-22</option>
            <option>inf-23</option>
        </select>
        <label class="absolute left-[0.75rem] top-0 text-[1rem] font-normal text-[rgb(112,117,121)] px-[0.25rem] bg-white">Class</label>
    </div>
    <div class="relative mb-[1rem] h-[2rem] cursor-pointer">
        <input id="" type="number" maxlength="4" min="2023" max="2027" step="1" value="2023" class="w-[100%] h-[100%] text-[1.2rem] m-0 bg-[rgba(0,0,0,0)] mt-[1rem] rounded-[2px] border-2">
        <label class="absolute left-[0.2rem] top-0 text-[1rem] font-normal text-[rgb(112,117,121)] px-[0.25rem] bg-[rgba(255,255,255,0.2)]">Year QV</label>
    </div>
    `;
    contactDataFiles.innerHTML = `
    <div class="relative mb-[1rem] h-[2rem] cursor-pointer">
        <input id="" type="file" class="w-[100%] h-[100%] text-[1.2rem] m-0 bg-[rgba(0,0,0,0)] mt-[1rem] rounded-[2px] border-2">
        <label class="absolute left-[0.2rem] top-0 text-[1rem] font-normal text-[rgb(112,117,121)] px-[0.25rem] bg-[rgba(255,255,255,0.2)]">Internship contract</label>
    </div>
    <div class="relative mb-[1rem] h-[2rem] cursor-pointer">
        <input id="" type="file" class="w-[100%] h-[100%] text-[1.2rem] m-0 bg-[rgba(0,0,0,0)] mt-[1rem] rounded-[2px] border-2">
        <label class="absolute left-[0.2rem] top-0 text-[1rem] font-normal text-[rgb(112,117,121)] px-[0.25rem] bg-[rgba(255,255,255,0.2)]">EFZ copy</label>
    </div>
    <button type="button" onclick="createNewUser()" id="create" class="w-[100%] h-[3.5rem] mt-[0.5rem] mb-[0.25rem] bg-[rgba(0,0,0,0)] text-[1.5rem] hover:bg-[rgba(87,87,87,0.4)] rounded">
        Create new student
    </button>
    `;
    //Styles
    const blockStyle = "pb-2 border-b-4 border-black";
    header.className = "border-b-2 flex flex-row";
    titel.className = "ml-6 text-[1.5rem]"
    backArrow.className = "bg-[url('../Materials/arrow.png')] mb-2 bg-cover w-[2rem] h-[2rem] cursor-pointer hover:rounded-[2rem] hover:bg-[rgba(87,87,87,0.4)]";
    chooseImage.className = blockStyle;
    contactDataPerson.className = blockStyle;
    contactDataPlace.className = blockStyle;
    contactDataAnother.className = blockStyle;
    form.className = "w-[95%] max-h-[26rem] overflow-y-auto";
    //Text
    titel.innerText = "Create user";
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
    form.appendChild(chooseImage);
    form.appendChild(contactDataPerson);
    form.appendChild(contactDataPlace);
    form.appendChild(contactDataAnother);
    form.appendChild(contactDataFiles);
    createUser.appendChild(form);
}

function createNewUser() {
    //Create user
    document.getElementById("create").addEventListener("click", function() {
    const image = document.getElementById("image");
    const reader = new FileReader();
    reader.addEventListener("load", () => {
        console.log(reader.result);
    })
    if (image) {
        
        reader.readAsDataURL(image.files[0]);
    } else {

    } 
});
}