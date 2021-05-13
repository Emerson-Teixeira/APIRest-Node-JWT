const router = require('express').Router();
const Leaders = require('../models/leaderModel')
const authenticate = require('../authenticate')
// no ID

router.get('/',(req,res)=>{
    Leaders.find({})
    .then((leaders) =>{
        res.status(200).json(leaders)
    }).catch((err) =>{
        res.status(500).json({msg: 'Error',err})
    })
})
router.post('/',authenticate.verifyUser,authenticate.isAdmin,(req,res)=>{
    Leaders.create(req.body)
    .then((leader)=>{
        res.status(200).json(leader)
    })
    .catch((err)=>{
        res.status(500).json({msg: 'Error',err})
    })
})
router.delete('/',authenticate.verifyUser,authenticate.isAdmin,(req,res)=>{
    Leaders.remove({})
    .then((rsp)=>{
        res.status(200).json(rsp)
    })
    .catch((err)=>{
        res.status(500).json({msg: 'Error',err})
    })
})
router.put('/',(req,res)=>{
    res.status(403).send('PUT operation not supported on /leaders');
})

// with ID

router.get('/:leaderId',(req,res)=>{
    Leaders.findById(req.params.leaderId)
    .then((leaders) =>{
        res.status(200).json(leaders)
    }).catch((err) =>{
        res.status(500).json({msg: 'Error',err})
    })
})

router.post('/:leaderId',(req,res)=>{
    res.status(403).send('POST operation not supported on /leaders/'+ req.params.leaderId);
})

router.delete('/:leaderId',authenticate.verifyUser,authenticate.isAdmin,(req,res)=>{
    Leaders.findByIdAndRemove(req.params.leaderId)
    .then((rsp)=>{
        res.status(200).json(rsp)
    })
    .catch((err)=>{
        res.status(500).json({msg: 'Error',err})
    })
})

router.put('/:leaderId',authenticate.verifyUser,authenticate.isAdmin,(req,res)=>{
    Leaders.findByIdAndUpdate(req.params.leaderId,{$set: req.body},{new:true})
    .then((leader)=>{
        res.status(200).json(leader)
    })
    .catch((err)=>{
        res.status(500).json({msg: 'Error',err})
    })
})

module.exports = router