const router = require('express').Router();
const Dishes = require('../models/dishes')

// no ID
router.get('/',(req,res)=>{
    Dishes.find({})
    .then((dishes) =>{
        res.status(200).json(dishes)
    }).catch((err) =>{
        res.status(500).json({msg: 'Error',err})
    })
})
router.post('/',(req,res)=>{
    Dishes.create(req.body)
    .then((dish)=>{
        res.status(200).json(dish)
    })
    .catch((err)=>{
        res.status(500).json({msg: 'Error',err})
    })
})
router.delete('/',(req,res)=>{
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
    .then((dishes) =>{
        res.status(200).json(dishes)
    }).catch((err) =>{
        res.status(500).json({msg: 'Error',err})
    })
})

router.post('/:dishId',(req,res)=>{
    res.status(403).send('POST operation not supported on /dishes/'+ req.params.dishId);
})

router.delete('/:dishId',(req,res)=>{
    Dishes.findByIdAndRemove(req.params.dishId)
    .then((rsp)=>{
        res.status(200).json(rsp)
    })
    .catch((err)=>{
        res.status(500).json({msg: 'Error',err})
    })
})

router.put('/:dishId',(req,res)=>{
    Dishes.findByIdAndUpdate(req.params.dishId,{$set: req.body},{new:true})
    .then((dish)=>{
        res.status(200).json(dish)
    })
    .catch((err)=>{
        res.status(500).json({msg: 'Error',err})
    })
})

module.exports = router