const router = require('express').Router();
const { Tag, Product, ProductTag, Category } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  try {
    const tags = await Tag.findAll({
      include: [Product],
    });
    
    res.json(tags)
  } 
  catch (err) {
    console.log(err)
  }
 
});

router.get('/:id', async (req, res) => {
  try {
    const tags = await Tag.findByPk(req.params.id,{
      include: [],
    });
    if(!tags) {
      res.status(404).json({ message: "Not found"})
    }
    res.status(200).json(tags);
   } 
   catch (err) {
    console.log(err)
   }
});

router.post('/', async (req, res) => {
  try{
    const tags = await Tag.create(req.body);
    res.status(200).json(tags);
  } catch (err) {
    console.log(err)
  }
});

router.put('/:id', async (req, res) => {
  try{
    const tags = await Tag.update(req.body,{
      where: {
        id:req.params.id
      }
    });
  res.status(200).json(tags);
} 
catch (err) {
  console.log(err)
}
});

router.delete('/:id', async (req, res) => {
  try{
    const categoryData = await Category.destroy({
      where:{
        id: req.params.id
      }
    });

    if(!categoryData){
      res.status(400).json({message:"Not found"});
      return;
    }
    res.status(200).joson(categoryData);
  } 
  catch (err){
    console.log(err)
  }
});

module.exports = router;
