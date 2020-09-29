const addNewPhotoButton = document.querySelector('.add-photo')
const cancelButton = document.querySelector('.cancel')

window.onload = () => {
    const mainConteiner = document.querySelector('.main-conteiner');

    const mansory = new Masonry(mainConteiner, {
        itemSelector: '.img-item',
        gutter: 20,
        originTop: false,
    })
}



let app = new Vue({
    el: '.main-conteiner',
    data: {
        imgs: []
    },
    methods: {
        deletePhoto(id){
            fetch('https://evening-fjord-55618.herokuapp.com/'+id, {
                method: 'DELETE'
            }).then(res => res.json())
            .then(data => console.log(data))
            .catch(err => console.log(err))
        }
    }
})

function getImages() {
    fetch('https://evening-fjord-55618.herokuapp.com/', { method: 'GET' })
        .then(res => res.json())
        .then(data => {
            app.imgs = data
        })
}

function openAddNewPhotoConteiner() {
    const filter = document.querySelector('.filter')

    filter.style.display = 'block'
}

function closeAddNewPhotoConteiner() {
    const filter = document.querySelector('.filter')

    filter.style.display = 'block'
}



addNewPhotoButton.addEventListener('click', openAddNewPhotoConteiner)
cancelButton.addEventListener('click', closeAddNewPhotoConteiner)
getImages()