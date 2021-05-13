const router = require('express').Router();
const Dishes = require('../models/dishes')
const authenticate = require('../authenticate');
// no ID
router.get('/',(req,res)=>{
    Dishes.find({})
    .populate('comments.author')
    .then((dishes) =>{
        res.status(200).json(dishes)
    }).catch((err) =>{
        res.status(500).json({msg: 'Error',err})
    })
})

router.post('/',authenticate.verifyUser,authenticate.isAdmin,(req,res)=>{
    Dishes.create(req.body)
    .then((dish)=>{
        res.status(200).json(dish)
    })
    .catch((err)=>{
        res.status(500).json({msg: 'Error',err})
    })
})

router.delete('/',authenticate.verifyUser,authenticate.isAdmin,(req,res)=>{
    Dishes.remove({})
    .then((rsp)=>{
        res.status(200).json(rsp)
    })
    .catch((err)=>{
        res.status(500).json({msg: 'Error',err})
    })
})

router.put('/',(req,res)=>{
    res.status(403).send('PUT operation not supported on /dishes');
})

// with ID

router.get('/:dishId',(req,res)=>{
    Dishes.findById(req.params.dishId)
    .populate('comments.author')
    .then((dishes) =>{
        res.status(200).json(dishes)
    }).catch((err) =>{
        res.status(500).json({msg: 'Error',err})
    })
})

router.post('/:dishId',(req,res)=>{
    res.status(403).send('POST operation not supported on /dishes/'+ req.params.dishId);
})

router.delete('/:dishId',authenticate.verifyUser,authenticate.isAdmin,(req,res)=>{
    Dishes.findByIdAndRemove(req.params.dishId)
    .then((rsp)=>{
        res.status(200).json(rsp)
    })
    .catch((err)=>{
        res.status(500).json({msg: 'Error',err})
    })
})

router.put('/:dishId',authenticate.verifyUser,authenticate.isAdmin,(req,res)=>{
    Dishes.findByIdAndUpdate(req.params.dishId,{$set: req.body},{new:true})
    .then((dish)=>{
        res.status(200).json(dish)
    })
    .catch((err)=>{
        res.status(500).json({msg: 'Error',err})
    })
})

// comments

router.get('/:dishId/comments',(req,res)=>{
    Dishes.findById(req.params.dishId)
    .populate('comments.author')
    .then((dishes) =>{
        if(!dishes){
            return res.status(404).json({msg:`Dish ${req.params.dishId} not found`})
        }
        res.status(200).json(dishes.comments)
    }).catch((err) =>{
        res.status(500).json({msg: 'Error',err})
    })
})

router.post('/:dishId/comments',authenticate.verifyUser,(req,res)=>{
    Dishes.findById(req.params.dishId)
    .then((dishes) =>{
        if(!dishes){
            return res.status(404).json({msg:`Dish ${req.params.dishId} not found`})
        }
        req.body.author = req.user._id;
        dishes.comments.push(req.body)
        dishes.save()
        .then((dish)=>{
            Dishes.findById(dish)
            .populate('comments.author')
            .then((dishers) => { res.status(200).json(dishers)})
        },(err) => res.status(500).json({msg: 'Error',err}))
    }).catch((err) =>{
        res.status(500).json({msg: 'Error',err})
    })
})

router.delete('/:dishId/comments',authenticate.verifyUser,authenticate.isAdmin,(req,res)=>{
    Dishes.findById(req.params.dishId)
    .then((dish) =>{
        if(!dish){
            return res.status(404).json({msg:`Dish ${req.params.dishId} not found`})
        }
        for (var i = (dish.comments.length -1); i >= 0; i--) {
            dish.comments.id(dish.comments[i]._id).remove();
        }
        dish.save()
        .then((dish)=>{
            res.status(200).json(dish)
        },(err) => res.status(500).json({msg: 'Error',err}))
    }).catch((err) =>{
        res.status(500).json({msg: 'Error',err})
    })
})

router.put('/:dishId/comments',(req,res)=>{
    res.status(403).send('PUT operation not supported on /dishes/' + req.params.dishId + '/comments');
})

//comments ID

router.get('/:dishId/comments/:commentId',authenticate.verifyUser,(req,res)=>{
    Dishes.findById(req.params.dishId)
    .populate('comments.author')
    .then((dish) =>{
        if (dish != null && dish.comments.id(req.params.commentId) != null) {
            res.status(200).json(dish.comments.id(req.params.commentId));
        }
        else if(dish == null){
            return res.status(404).json({msg:`Dish ${req.params.dishId} not found`})
        }
        else{
            return res.status(404).json({msg:`Comment ${req.params.commentId} not found`})
        }
    },(err) => res.status(500).json({msg: 'Error',err})).catch((err) =>{
        res.status(500).json({msg: 'Error',err})
    })
})

router.post('/:dishId/comments/:commentId',(req,res)=>{
    res.status(403).send('POST operation not supported on /dishes/'+ req.params.dishId + '/comments/' + req.params.commentId);
})

router.delete('/:dishId/comments/:commentId',authenticate.verifyUser,(req,res)=>{
    Dishes.findById(req.params.dishId)
    .then((dish) => {
        if (dish != null && dish.comments.id(req.params.commentId) != null) {
            console.log(dish.comments.id(req.params.commentId).author,req.user._id)
            if((dish.comments.id(req.params.commentId).author).toString() != (req.user._id).toString()){
                return res.status(403).json({msg: 'This is not your comment'})
            }
            else{
                dish.comments.id(req.params.commentId).remove();
                dish.save()
                .then((dish) => {
                Dishes.findById(dish._id)
                .populate('comments.author')
                .then((dishers) => {res.status(200).json(dishers)})                
            }, (err) => res.status(500).json({msg: 'Error',err}));
            }
        }
        else if (dish == null) {
            return res.status(404).json({msg:`Dish ${req.params.dishId} not found`})
        }
        else {
            return res.status(404).json({msg:`Comment ${req.params.commentId} not found`})            
        }
    }, (err) => res.status(500).json({msg: 'Error',err}))
    .catch((err)=>{
        console.log(err)
        res.status(500).json({msg: 'Error',err})
    })
})

router.put('/:dishId/comments/:commentId',authenticate.verifyUser,(req,res)=>{
    Dishes.findById(req.params.dishId)
    .then((dish)=>{
        if (dish != null && dish.comments.id(req.params.commentId) != null) {
            if((dish.comments.id(req.params.commentId).author).toString() != (req.user._id).toString()){
                return res.status(403).json({msg: 'This is not your comment'})
            }
            else{
                if (req.body.rating) {
                    dish.comments.id(req.params.commentId).rating = req.body.rating;
                }
                if (req.body.comment) {
                    dish.comments.id(req.params.commentId).comment = req.body.comment;
                }
                dish.save()
                .then((dish) => {
                    Dishes.findById(dish._id)
                    .populate('comments.author')
                    .then((dishers) => {res.status(200).json(dishers)})
                }, (err) => res.status(500).json({msg: 'Error',err}));
            }
        }
        else if (dish == null) {
            return res.status(404).json({msg:`Dish ${req.params.dishId} not found`})
        }
        else {
            return res.status(404).json({msg:`Comment ${req.params.commentId} not found`});
        }
    }, (err) => res.status(500).json({msg: 'Error',err}))
    .catch((err)=>{
        res.status(500).json({msg: 'Error',err})
    })
})


module.exports = router