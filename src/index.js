let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

function renderToys(toy) {
  let card = document.createElement('div')
  card.className = "card"

  let h2 = document.createElement("h2");
  h2.innerText = toy.name;

  let img = document.createElement("img");
  img.src = toy.image;
  img.className = "toy-avatar";
  
  let p = document.createElement("p");
  p.innerText = toy.likes + " likes";

  let btn = document.createElement("button");
  btn.className = "like-btn";
  btn.id = toy.id;
  btn.textContent = "Like";

  card.append(h2, img, p, btn);

  btn.addEventListener("click", (e) => {
   const toyID = e.target.id
   console.log(toyID);
   newNumberOfLikes = ++ toy.likes
   console.log(e.target.previousSibling)

   fetch(`http://localhost:3000/toys/${toyID}`,{
    method: `PATCH`,
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      "likes": newNumberOfLikes
    })
  })
  .then(resp => resp.json())
  .then(toyInfo => e.target.previousSibling.innerText = toyInfo.likes + " likes")
})

  document.getElementById("toy-collection").append(card);
}

fetch("http://localhost:3000/toys")
.then(resp => resp.json())
.then(data => {
  data.forEach(toy => renderToys(toy))
})

const createBtn = document.querySelector(".container");

createBtn.addEventListener("submit", (e) => {
  // e.preventDefault();
  console.log(e.target)
  postToy(e.target);
})

function postToy(toyData) {
  fetch("http://localhost:3000/toys",{
    method: `POST`,
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      "name":toyData.name.value,
      "image":toyData.image.value,
      "likes":0
    })
  })
  .then(resp => resp.json)
  .then(data => {
    let newToy = renderToys(data);
    document.getElementById("toy-collection").append(newToy);
  })
}

function likeToy(toy) {
  let newNumberOfLikes = e.target.id ++;
  console.log(e.target.id)
  console.log(newNumberOfLikes)
  fetch(`http://localhost:3000/toys/${toy.id}`,{
    method: `PATCH`,
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      "likes": newNumberOfLikes
    })
  })
}