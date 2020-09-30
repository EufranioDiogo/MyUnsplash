const addNewPhotoButton = document.querySelector('.add-photo')
const cancelButton = document.querySelector('.cancel')


function getImages() {
    fetch('/photo/').then(res => res.json()).then(data => {
        app.imgs = []
        for (let i = 0; i < data.length; i++) {
            app.imgs.push({
                id: String(data[i]['id']),
                imgURL: data[i]['imgURL'],
                label: data[i]['label']
            })
        }
        app.possibleImgs = app.imgs;
    }).catch(err => {
        console.log(err)
    })
}

function openAddNewPhotoConteiner() {
    const filter = document.querySelector('.filter')

    filter.style.opacity = '0'
    
    setTimeout(() => {
        filter.style.display = 'block'
    }, 600)
    setTimeout(() => {
        filter.style.opacity = '1'
    })
    
}

function closeAddNewPhotoConteiner() {
    const filter = document.querySelector('.filter')

    filter.style.display = 'none'
}

let headerComponent = {
    template: `
    <header class="unsplash-header">
        <div class="left-side">
            <img src="IMG/my_unsplash_logo.svg" alt="My unsplash logo" class="my-unsplash-logo">
            <div class="input-field-conteiner">
                <i class="fas fa-search"></i>
                <input type="text" class="input-field" placeholder="Search by label" @input.trim="searchByLabel" v-model="searchingLabel">
            </div>
        </div>
        <button class="add-photo">Add a photo</button>
    </header>
    `,
    data(){
        return {
            searchingLabel: ''
        }
    },
    methods: {
        searchByLabel(){
            this.$emit('search-by-label', this.searchingLabel)
        }
    }
}



let app = new Vue({
    el: '#app',
    data: {
        imgs: [],
        possibleImgs: [],
        actualPhoto: ''
    },
    methods: {
        deletePhoto(id) {
            fetch('/photo/' + id, {
                method: 'DELETE',
            })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                this.possibleImgs.filter(img => img.id != id);
                this.imgs = this.possibleImgs;
            })
            .catch(err => console.log(err))
        },
        searchByLabel(searchingLabel) {
            if (searchingLabel) {
                let aux = []
                let re = new RegExp(searchingLabel, 'ig')

                console.log(searchingLabel)
                for (let i = 0; i < this.imgs.length; i++) {
                    if (re.test(this.imgs[i].label)) {
                        aux.push(this.imgs[i])
                    }
                }

                this.possibleImgs = aux;

            } else {
                this.possibleImgs = this.imgs
            }
        }
    },
    components: {
        'header-component': headerComponent
    }
})

document.querySelector('.cancel').addEventListener('click', closeAddNewPhotoConteiner);
document.querySelector('.add-photo').addEventListener('click', openAddNewPhotoConteiner)
getImages();
