document.addEventListener('DOMContentLoaded', () => {
    //Add an event listener to the form
    const formInput = document.querySelector('#github-form')
    formInput.addEventListener('submit', (e) => {
        e.preventDefault()

        //Get the input value
        const searchInput = document.querySelector('#search').value

        //Fetch data from the API
        fetch(`https://api.github.com/search/users?q=${searchInput}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/vnd.github.v3+json'
            },
        })
        .then(res => res.json())
        .then(data => displayUsers(data.items))

        .catch((error) => {
            console.log(error.message)
        })
    })

    function displayUsers(users){
        const userList = document.querySelector('#user-list')  

        users.forEach((user) => {
            const li = document.createElement('li')
            li.classList.add('user-item')
            li.dataset.username = user.login

            const avatar = document.createElement('img')
            avatar.src = user.avatar_url

            const username = document.createElement('a')
            username.href = user.html_url
            username.textContent = user.login
            username.target = '_blank'

            li.appendChild(avatar)
            li.appendChild(username)

            userList.appendChild(li)
        });
    }

    
})