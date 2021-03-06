const router = require('express').Router();
const Promotions = require('../models/promotionsModel')
const authenticate = require('../authenticate')

// no ID
router.get('/',(req,res)=>{
    Promotions.find({})
    .then((promotions) =>{
        res.status(200).json(promotions)
    }).catch((err) =>{
        res.status(500).json({msg: 'Error',err})
    })
})
router.post('/',authenticate.verifyUser,authenticate.isAdmin,(req,res)=>{
    Promotions.create(req.body)
    .then((promotion)=>{
        res.status(200).json(promotion)
    })
    .catch((err)=>{
        res.status(500).json({msg: 'Error',err})
    })
})
router.delete('/',authenticate.verifyUser,authenticate.isAdmin,(req,res)=>{
    Promotions.remove({})
    .then((rsp)=>{
        res.status(200).json(rsp)
    })
    .catch((err)=>{
        res.status(500).json({msg: 'Error',err})
    })
})
router.put('/',(req,res)=>{
    res.status(403).send('PUT operation not supported on /promotions');
})

// with ID

router.get('/:promoId',(req,res)=>{
    Promotions.findById(req.params.promoId)
    .then((promotions) =>{
        res.status(200).json(promotions)
    }).catch((err) =>{
        res.status(500).json({msg: 'Error',err})
    })
})

router.post('/:promoId',authenticate.verifyUser,authenticate.isAdmin,(req,res)=>{
    res.status(403).send('POST operation not supported on /promotions/'+ req.params.promoId);
})

router.delete('/:promoId',authenticate.verifyUser,authenticate.isAdmin,(req,res)=>{
    Promotions.findByIdAndRemove(req.params.promoId)
    .then((rsp)=>{
        res.status(200).json(rsp)
    })
    .catch((err)=>{
        res.status(500).json({msg: 'Error',err})
    })
})

router.put('/:promoId',authenticate.verifyUser,authenticate.isAdmin,(req,res)=>{
    Promotions.findByIdAndUpdate(req.params.promoId,{$set: req.body},{new:true})
    .then((promotion)=>{
        res.status(200).json(promotion)
    })
    .catch((err)=>{
        res.status(500).json({msg: 'Error',err})
    })
})

module.exports = router