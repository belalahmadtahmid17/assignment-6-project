let currentPets = [];

let countdownInterval = null;

const loadCategories = () => {
    fetch('https://openapi.programming-hero.com/api/peddy/categories')
    .then(res => res.json())
    .then(data => displayCategories(data.categories))
    .catch(error => console.log(error))
} 

const displayCategories = (categories) => {
    categories.forEach(item => {
        const btnContainer = document.createElement('div')
        const categoryContainer = document.getElementById('category-container');
        btnContainer.innerHTML = `
        <div id="btn-${item.category}" class="space-x-2 category-btn flex items-center justify-center text-2xl font-bold border-gray-200 border-2 rounded-4xl px-16 py-2 hover:bg-[#0E7A81] hover:text-white" onclick="loadPetsByCategory('${item.category}')">
        <img src="${item.category_icon}" class="lg:min-h-[50px] lg:max-w-[50px]" alt="">
        <span>${item.category}</span> 
         </div>
        `;
        categoryContainer.appendChild(btnContainer)
    })
}

loadCategories()

const loadPets = () => {
    const petsContainer =  document.getElementById('pets-container');
    petsContainer.innerHTML = `
    <div class="flex justify-center items-center col-span-full min-h-[500px]">
    <span class="loading loading-bars loading-xl lg:w-1/7"></span>
    </div>
    `
    fetch("https://openapi.programming-hero.com/api/peddy/pets")
    .then(res => res.json())
    .then(data => setTimeout(() => {
        currentPets = data.pets || data.data || [];
        displayPets(currentPets)
    }, 2000))
    .catch(error => console.log(error))
}

const sortByPrice = () => {
  if(currentPets.length === 0) return;

  currentPets.sort((a, b) => {
    const priceA = a.price ? parseFloat(a.price) : 0;
    const priceB = b.price ? parseFloat(b.price) : 0;
    return priceB - priceA;
  });
  displayPets(currentPets);
}

const openModal = (item) => {
    const modalContainer = document.getElementById("modal-container")
    const modal = document.createElement("div")
    modalContainer.innerHTML = ''
    modal.innerHTML =`
  <dialog id="modal" class="modal">
  <div class="modal-box w-11/12 max-w-5xl space-y-3 text-[#0E7A81] rounded-xl p-5">
      <img src="${item.image}" class="w-full rounded-xl">
      <h1 class="text-3xl font-bold ">${item.pet_name || 'Not Available'}</h1> <br>
      <div class="lg:flex gap-x-20 text-lg font-medium text-[#0E7A81]">
      <div>
      <h4>Breed: ${item.breed || 'Not Available'}</h4>
      <h4>Gender: ${item.gender || 'Not Available'}</h4>
      <h4>Vaccinated Status: ${item.vaccinated_status || 'Not Available'}</h4>
      </div>
      <div>
        <h4>Birth: ${item.date_of_birth || 'Not Available'}</h4>
        <h4>Price: ${item.price || 'Not Available'}</h4>
      </div>
      </div>
        <h1 class="text-3xl font-bold text-[#0E7A81]">Detailed Information</h1>
        <p class="text-xl font-medium">${item.pet_details || 'Not Available'}</p>
      <div class="modal-action">
      <form method="dialog" class="w-full">
        <button class="btn w-full text-[#0E7A81]">Cancel</button>
      </form>
    </div>
  </div>
  </dialog>
    `
    modalContainer.appendChild(modal);
    const detailsModal = document.getElementById("modal")
    detailsModal.addEventListener("close", () => {
      modalContainer.innerHTML = "";
    }, { once: true });
    detailsModal.showModal();
}

const openModal2 = () => {

    if(countdownInterval){
      clearInterval(countdownInterval)
    }

    const modalContainer = document.getElementById("modal-container")
    modalContainer.innerHTML = ""
    const modal2Element = document.createElement("div")
    modal2Element.innerHTML = `
    <dialog id="modal2" class="modal">
    <div class="modal-box lg:w-1/4 max-w-2xl min-h-[300px] bg-blue-900 text-white text-center space-y-10">

      <h1 class="text-3xl font-bold">Congrats! 🎉</h1>
      <h1 class="text-xl font-semibold">Adoption Process For Your Pet Is Starting In...</h1>
      <!-- countdown -->
      <span class="font-mono text-6xl">
      <span id="countdown-timer">3</span>
      </span>
    </div>
    </dialog>
    `
    modalContainer.appendChild(modal2Element)
    const modal2 = document.getElementById("modal2")
    modal2.showModal();
    let timeLeft = 3;
    const timerElement = document.getElementById("countdown-timer");

    const cleanupModal = () => {
      if(countdownInterval){
      clearInterval(countdownInterval)
      countdownInterval = null;
      }
      modalContainer.innerHTML = ""
    }
    modal2.addEventListener('close', cleanupModal, {once: true});

    countdownInterval = setInterval(() => {
      timeLeft--;
      timerElement.textContent = timeLeft;
      if(timeLeft === 0){
        clearInterval(countdownInterval)
        modal2.close();
      }
    }, 1000)
}

const displayPets = (pets) => {
        const petsContainer = document.getElementById('pets-container')
        petsContainer.innerHTML = ""
         if(!pets || pets.length === 0){
          petsContainer.innerHTML = `
              <div class="flex flex-col col-span-full justify-center items-center space-y-5 p-20">
              <img src="images/error.webp" alt="" class="w-[200px]">
              <h1 class="text-3xl font-bold">No Information Available</h1>
              <h1 class="text-xl font-semibold">Sorry! Currently we don't have pets from this category.</h1>
              </div>
          `
          return;
        }
        pets.forEach(item => {
        const petDetailsModal = document.getElementById("modal")
        const petCard = document.createElement('div');
        petCard.innerHTML = `
        <div class="border border-gray-300 py-2 space-y-3 rounded-xl" id="${item.category || 'Not Available'}">
        <div class="min-h-[100px]"><img class="w-full px-2 rounded-xl" src="${item.image || 'Not Available'}" alt=""></div>
        <div class="text-2xl font-bold text-left px-5"><h4>${item.pet_name || 'Not Available'}</h4></div>
        <div>
          <div class="flex justify-start gap-x-10 px-5"><img class="min-h-[20px] max-w-[20px]" src="images/icons8-grid-16.png" alt=""><h4>Breed: ${item.breed || 'Not Available'}</h4></div>
          <div class="flex justify-start gap-x-10 px-5"><img class="min-h-[20px] max-w-[20px]" src="images/icons8-calender-85.png" alt=""><h4>Birth: ${item.date_of_birth || 'Not Available'}</h4></div>
          <div class="flex justify-start gap-x-10 px-5"><img class="min-h-[20px] max-w-[20px]" src="images/icons8-gender-64.png" alt=""><h4>Gender: ${item.gender || 'Not Available'}</h4></div>
          <div class="flex justify-start gap-x-10 px-5"><img class="min-h-[20px] max-w-[20px]" src="images/icons8-money-24.png" alt=""><h4>Price: ${item.price || 'Not Available'}</h4></div>
        </div>
        <div class="space-x-7"><button class="btn hover:bg-[#0E7A81]" onclick="likeBTN('${item.image || 'Not Available'}')"><img src="images/icons8-like-24.png" alt=""></button><button class="btn hover:bg-[#0E7A81] hover:text-white adopt-btn">Adopt</button><button class="details-btn btn hover:bg-[#0E7A81] hover:text-white">Details</button></div>
      </div>
        `
        const detailsBTN = petCard.querySelector(".details-btn")
        detailsBTN.addEventListener("click", () => {
            openModal(item)
        })
        

        const adoptBTN = petCard.querySelector(".adopt-btn")
        adoptBTN.addEventListener("click", () => {
        openModal2()
        })


        petsContainer.appendChild(petCard);
    })
}

loadPets()

const likeBTN = (image) => {
        const img = document.createElement('img');
        img.src = image;
        img.classList.add('w-full', 'h-36', 'rounded-xl', 'object-cover')
        const likedImgContainer = document.getElementById("liked-img-container")
        likedImgContainer.appendChild(img);
}

const loadPetsByCategory = (category) => {
    const petsContainer =  document.getElementById('pets-container');
    const allBTN = document.querySelectorAll('.category-btn');
    allBTN.forEach(btn => {
      btn.classList.remove('bg-[#0E7A81]', 'text-white', 'border-[#0E7A81]')
    })

    const activeBTN = document.getElementById(`btn-${category}`)
    if(activeBTN){
      activeBTN.classList.add('bg-[#0E7A81]', 'text-white', 'border-[#0E7A81]')
    }
    petsContainer.innerHTML = `
    <div class="flex justify-center items-center col-span-full min-h-[500px]">
    <span class="loading loading-bars loading-xl lg:w-1/7"></span>
    </div>
    `
    fetch(`https://openapi.programming-hero.com/api/peddy/category/${category}`)
    .then(res => res.json())
    .then(data => setTimeout(() => {
        currentPets = data.pets || data.data || [];
        displayPets(currentPets)
    }, 2000))
    .catch(error => console.log(error))
}
