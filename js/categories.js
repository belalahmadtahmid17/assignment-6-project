// categories
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
        <div class="flex items-center justify-center text-2xl font-bold border-gray-200 border-2 rounded-4xl px-16 py-2" onclick="loadPetsByCategory('${item.category}')">
        <img src="${item.category_icon}" class="lg:min-h-[50px] lg:max-w-[50px]" alt="">
        <span>${item.category}</span> 
         </div>
        `;
        categoryContainer.appendChild(btnContainer)
    })
}

loadCategories()

const loadPets = () => {
    fetch("https://openapi.programming-hero.com/api/peddy/pets")
    .then(res => res.json())
    .then(data => displayPets(data.pets))
    .catch(error => console.log(error))
}

const displayPets = (pets) => {
    pets.forEach(item => {
        const petsContainer = document.getElementById('pets-container')
        const petCard = document.createElement('div');
        petCard.innerHTML = `
        <div class="border border-gray-300 py-2 space-y-3 rounded-xl" id="${item.category}">
        <div class="min-h-[100px]"><img class="w-full px-2 rounded-xl" src="${item.image}" alt=""></div>
        <div class="text-2xl font-bold text-left px-5"><h4>${item.pet_name}</h4></div>
        <div>
          <div class="flex justify-start gap-x-10 px-5"><img class="min-h-[20px] max-w-[20px]" src="images/icons8-grid-16.png" alt=""><h4>Breed: ${item.breed}</h4></div>
          <div class="flex justify-start gap-x-10 px-5"><img class="min-h-[20px] max-w-[20px]" src="images/icons8-calender-85.png" alt=""><h4>Birth: ${item.date_of_birth}</h4></div>
          <div class="flex justify-start gap-x-10 px-5"><img class="min-h-[20px] max-w-[20px]" src="images/icons8-gender-64.png" alt=""><h4>Gender: ${item.gender}</h4></div>
          <div class="flex justify-start gap-x-10 px-5"><img class="min-h-[20px] max-w-[20px]" src="images/icons8-money-24.png" alt=""><h4>Price: ${item.price}</h4></div>
        </div>
        <div class="space-x-7"><button class="btn hover:bg-[#0E7A81]" onclick="likeBTN('${item.image}')"><img src="images/icons8-like-24.png" alt=""></button><button class="btn hover:bg-[#0E7A81] hover:text-white">Adopt</button><button class="btn hover:bg-[#0E7A81] hover:text-white">Details</button></div>
      </div>
        `
        petsContainer.appendChild(petCard);
    })
}
loadPets()

const likeBTN = (image) => {
        const img = document.createElement('img');
        img.src = image;
        img.classList.add('w-[240px]', 'h-[130px]')
        const likedImgContainer = document.getElementById("liked-img-container")
        likedImgContainer.appendChild(img);
}

const loadPetsByCategory = (category) => {
    fetch(`https://openapi.programming-hero.com/api/peddy/category/${category}`)
    .then(res => res.json())
    .then(data => displayPetsByCategory(data.data))
    .catch(error => console.log(error))
}

const displayPetsByCategory = (pet) => {
    const petsContainer = document.getElementById('pets-container')
    petsContainer.innerHTML = ""
    displayPets(pet)
}

