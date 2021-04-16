const router = require('express').Router();

// no ID
router.get('/',(req,res)=>{
    res.send('Will send all the dishes to you!');
})
router.post('/',(req,res)=>{
    res.send('Will add the dish: ' + req.body.name + ' with details: ' + req.body.description);
})
router.delete('/',(req,res)=>{
    res.send('Deleting all dishes');
})
router.put('/',(req,res)=>{
    res.status(403).send('PUT operation not supported on /dishes');
})

// with ID

router.get('/:dishId',(req,res)=>{
    res.send('Will send details of the dish: ' + req.params.dishId +' to you!');
})

router.post('/:dishId',(req,res)=>{
    res.status(403).send('POST operation not supported on /dishes/'+ req.params.dishId);
})

router.delete('/:dishId',(req,res)=>{
    res.end('Deleting dish: ' + req.params.dishId);
})

router.put('/:dishId',(req,res)=>{
    res.send('Updating the dish: ' + req.params.dishId + '\n' + 'Will update the dish: ' + req.body.name +
        ' with details: ' + req.body.description);
})

module.exports = router