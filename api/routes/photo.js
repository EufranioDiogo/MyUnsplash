const express = require('express');
const router = express.Router();
const Photo = require('../../models/photo')


router.get('/', (req, res) => {
    Photo.find().sort({ createdAt: -1 }).then((result) => {
        let aux = []

        for (let i = 0; i < result.length; i++) {
            aux.push(
                {
                    id: result[i]._id.toString(),
                    imgURL: result[i]['imgURL'],
                    label: result[i]['label']
                }
            )
        }
        res.json(aux)
    }).catch(err => {
        res.status(500).json({
            error: 'Sorry we can\'t fetch the result ' + err.message
        })
    })
})

router.post('/', (req, res) => {
    const newPicture = new Photo({
        imgURL: req.body.imgURL,
        label: req.body.label,
    })

    newPicture.save((error) => {
        if (error) {
            res.status(500).json({
                error: 'An error ocurred while uploading the img ' + err.message
            })
            return
        }
        res.redirect('/')
    })
})


router.delete('/:id', (req, res) => {
    const id = req.params.id
    Photo.findByIdAndRemove(id).exec().then(result => {
        res.json({
            message: 'Photo Deleted',
            product: result
        })
        res.redirect('/')
    }).catch(err => {
        res.status(500).json({
            message: err.message
        })
    })
})


router.use((req, res, next) => {
    res.status(404).json({ error: 'Page not found' })
})

module.exports = router