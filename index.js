// Let’s Discuss section  js
function loadPosts(category) {
  fetch(`https://openapi.programming-hero.com/api/retro-forum/posts?category=${category}`)
    .then((res) => res.json())
    .then((data) => displayPosts(data.posts))
    .catch((error) => {
      console.error("Error fetching posts:", error);
    });
}

function displayPosts(data) {
  const postContainer = document.getElementById("post-container");
  const favDiv = document.getElementById("fav-div");
  let read = document.getElementById("read");
  const textConvert = parseInt(read);

  let readCount = 0;

  postContainer.innerHTML = '';
  for (const post of data) {
    
    const postDiv = document.createElement("div");
    postDiv.classList.add("sort-post");
      
             
    postDiv.innerHTML = `

          <div class="flex gap-5 w-full lg:w-4/5 bg-gray-200 p-2 md:p-5 my-5 rounded-xl">


      <div class="avatar online placeholder">
           <div class="bg-natural h-14 text-neutral-content rounded-full w-14">
       
          <img class="rounded-xl" src="${post.image}" alt="">
             </div>
        </div> 

      
              <div class="post-content space-y-4 w-auto md:w-full ">
                  <div class="flex gap-4 md:gap-10 flex-wrap md:flex-nowrap">
                      <p id="${post.category}" class="category">#${post.category}</p>
                      <p>Author: ${post.author.name}</p>
                  </div>

                  <h1 class="text-2xl font-bold">${post.title}</h1>
                  <p>${post.description}</p>

                  <hr class="border-black border-dashed">

                  <div class="flex justify-between gap-4 flex-wrap md:flex-nowrap">
                      <div class="post-info flex gap-4 flex-wrap md:flex-nowrap">
                          <div class="flex items-center gap-2">
                              <i class="fa-solid fa-message"></i>
                              <p>${post.comment_count}</p>
                          </div>

                          <div class="flex items-center gap-2">
                              <i class="fa-solid fa-eye"></i>
                              <p>${post.view_count}</p>
                          </div>

                          <div class="flex items-center gap-2">
                              <i class="fa-solid fa-clock"></i>
                              <p>${post.posted_time}</p>
                          </div>
                      </div>

                      <div class="bg-green-500 p-2 rounded-full add-fav-btn" id="fav-${post.id}">
                          <i class="fa-solid fa-envelope"></i>
                      </div>
                  </div>
              </div>
          </div>`;

    postContainer.appendChild(postDiv);


       
    
    //hide loading spinner
    // toggleLoadingSpinner(false);
    
    
    
    const addToFavBtn = document.getElementById(`fav-${post.id}`);
    addToFavBtn.onclick = function () {
      readCount++;
      read.innerText = readCount ;
     

      const addFav = document.createElement("div");
      addFav.innerHTML = `
              <div class="flex justify-between bg-white p-2 my-3 rounded-xl">
                  <h3 class="font-bold">${post.title}</h3>
                  <div class="flex items-center gap-2">
                      <i class="fa-solid fa-eye"></i>
                      <p>${post.view_count}</p>
                  </div>
              </div>`;
      favDiv.appendChild(addFav);
    };
  }
};

const handleSearch = () => {
  // toggleLoadingSpinner(true);
  const inputField = document.getElementById('search-field').value;
  console.log(inputField);
  loadPosts(inputField);
};

//spinner js
// const toggleLoadingSpinner = (isLoading) =>{
//   const loadingSpinner = document.getElementById('loading-spinner');
//   if(isLoading){
//     loadingSpinner.classList.remove('hidden')
//   }
//   else{
//     loadingSpinner.classList.add('hidden')

//   }
// }
// toggleLoadingSpinner();
loadPosts('music');




// Latest Posts section js
const latestPost = async () => {
  const res = await fetch('https://openapi.programming-hero.com/api/retro-forum/latest-posts');
  const posts = await res.json();
  // console.log(posts);
  displayPost(posts);
}

const displayPost = posts => {
  // console.log(posts);
  //step 1
  const postContainer = document.getElementById('post-container-two');
  posts.forEach(post => {
    // console.log(post);
    // step 2 create a div
    const postBox = document.createElement('div');
    postBox.classList = `card p-4 bg-purple-50 shadow-xl border-2 border-purple-200`;
    //step 3 set innerHtml
    postBox.innerHTML = ` 
        <figure>
              <img src="${post.cover_image}" alt="Shoes" />
        </figure>
     <div class="card-body">
              <p>${post?.author?.posted_date || 'No publish date'}</p>
             <h2 class="card-title">${post.title}</h2>
             <p>${post.description}</p>
             <div class="flex  my-6 gap-4">
               <img class="rounded-full w-10" src="${post.profile_image}" alt="Shoes" />
               <p class= "text-xl font-semibold">${post?.author?.name}</p>
             </div>
             <p>${post?.author?.designation || 'Unknown'}</p>
     </div> `;
    //step 4 append child
    postContainer.appendChild(postBox);
  })
};
latestPost();