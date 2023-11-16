let cardPlace;
let cardInfo;

function getGitHubUserInfo(username) {
  const apiUrl = `https://api.github.com/users/${username}`;

  if (cardPlace) {
    cardPlace.innerHTML = "";
  }

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);

      if (data.login == undefined) {
        alert("foydalanuvchi topilmadi!");
        return;
      }

      const createdTime = new Date(data.created_at);
      const dataCreate = String(createdTime).slice(4, 15);

      cardPlace = document.querySelector(".cardPlace");
      cardInfo = `
            <div class="card_info">
                <div class="img_place">
                    <img id="avatar" src="${data.avatar_url}" alt="naruto">
                </div>
                <div class="card_right">
                    <div class="user_info">
                    <div class="user_names">
                        <h2 id="user_name">${
                          data.name ? data.name : "No name"
                        }</h2>
                        <a id="login" href="#">@${data.login}</a>
                    </div>
                    <h2 id="user_joined">Joined ${dataCreate}</h2>
                    <p id="user_bio">${data.bio ? data.bio : "This profile has no bio"}</p>
                    </div>
                    <div class="user_followers">
                    <div class="user_repos u_f">
                        <h2>repos</h2>
                        <p id="repos">${data.public_repos}</p>
                    </div>
                    <div class="user_follow u_f">
                        <h2>Followers</h2>
                        <p id="follow">${data.followers}</p>
                    </div>
                    <div class="user_following u_f">
                        <h2>following</h2>
                        <p id="following">${data.following}</p>
                    </div>
                    </div>
                    <div class="card_bottom">

                    <div class="c_t_left ccc">
                        <div class="location c_t">
                        <img src="assets/icon-location.svg" alt="location">
                        <p id="location">${
                          data.location
                            ? data.location
                            : "Location is undefined"
                        }</p>
                        </div>
            
                        <div class="link c_t">
                        <img src="assets/icon-website.svg" alt="icon-website">
                        <a id="blog" href="#">${
                          data.blog ? data.blog : "Blog is undefined"
                        }</a>
                        </div>
                    </div>


                    <div class="c_t_right ccc">
                        <div class="twitter c_t">
                        <img src="assets/icon-twitter.svg" alt="twitter">
                        <a id="twitter" href="#">${
                          data.twitter_username
                            ? data.twitter_username
                            : "Not Available"
                        }</a>
                        </div>
            
                        <div class="company c_t">
                        <img src="assets/icon-company.svg" alt="company">
                        <a id="company" href="#">@${
                          data.company ? data.company : "Undefined"
                        }</a>
                        </div>
                    </div>

                    </div>
                </div>
            </div>
          `;
      cardPlace.insertAdjacentHTML("beforeend", cardInfo);
    })
    .catch((error) => {
      console.error("GitHub API dan ma'lumot olishda xato yuz berdi:", error);
    });
}

const sButton = document.querySelector(".btn");
sButton.addEventListener("click", function (e) {
  e.preventDefault();
  const input = document.querySelector(".input").value;
  console.log(input);
  getGitHubUserInfo(input);
});
