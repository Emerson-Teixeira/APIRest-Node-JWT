const router = require('express').Router();

// no ID
router.get('/',(req,res)=>{
    res.send('Will send all the leaders to you!');
})
router.post('/',(req,res)=>{
    res.send('Will add the leader: ' + req.body.name + ' with details: ' + req.body.description);
})
router.delete('/',(req,res)=>{
    res.send('Deleting all leaders');
})
router.put('/',(req,res)=>{
    res.status(403).send('PUT operation not supported on /leaders');
})

// with ID

router.get('/:leaderId',(req,res)=>{
    res.send('Will send details of the leader: ' + req.params.leaderId +' to you!');
})

router.post('/:leaderId',(req,res)=>{
    res.status(403).send('POST operation not supported on /leaders/'+ req.params.leaderId);
})

router.delete('/:leaderId',(req,res)=>{
    res.end('Deleting leader: ' + req.params.leaderId);
})

router.put('/:leaderId',(req,res)=>{
    res.send('Updating the leader: ' + req.params.leaderId + '\n' + 'Will update the leader: ' + req.body.name +
        ' with details: ' + req.body.description);
})

module.exports = router