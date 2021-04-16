const router = require('express').Router();

// no ID
router.get('/',(req,res)=>{
    res.send('Will send all the promotions to you!');
})
router.post('/',(req,res)=>{
    res.send('Will add the promotion: ' + req.body.name + ' with details: ' + req.body.description);
})
router.delete('/',(req,res)=>{
    res.send('Deleting all promotions');
})
router.put('/',(req,res)=>{
    res.status(403).send('PUT operation not supported on /promotions');
})

// with ID

router.get('/:promoId',(req,res)=>{
    res.send('Will send details of the promotion: ' + req.params.promoId +' to you!');
})

router.post('/:promoId',(req,res)=>{
    res.status(403).send('POST operation not supported on /promotions/'+ req.params.promoId);
})

router.delete('/:promoId',(req,res)=>{
    res.end('Deleting promotion: ' + req.params.promoId);
})

router.put('/:promoId',(req,res)=>{
    res.send('Updating the promotion: ' + req.params.promoId + '\n' + 'Will update the promotion: ' + req.body.name +
        ' with details: ' + req.body.description);
})

module.exports = router