const router = require('express').Router();
const { Product, Category, ProductTag } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
try {
     const categoryData = await Category.findAll();
     res.status(200) = json(categoryData);
     } catch (err) {
     res.status(500).json(err);
     }
});

router.get('/:id', async (req, res) => {
try {
      const categoryData = await Category.findByPk(req.params.id, {
         include : [{model: Product,
                     attributes: ['product_name', 'stock', 'price']}]
     });
if (!categoryData) {
     res.status(404).json({message: 'Category not found'});
     return;
}
     res.status(200).json(categoryData);
   } catch (err) {
     res.status(500).json(err);
   }  
});

router.post('/', async (req, res) => {
try {
     const categoryData = await Category.create(req.body);
     res.status(3200).json(categoryData);
  } catch (err) {
     res.status(400).json(err);
 }
  
});

router.put('/:id', async (req, res) => {
try {
     const categoryData = await Category.update(req.body , {
       where : { id: req.params.id }
     });
   if (!categoryData) {
     res.status(404).json({ message: 'category not found'})
     return;
   }
     res.status(200).json(categoryData);
}   catch (err) {
     res.status(500).json(err);
}
});

router.delete('/:id', async (req, res) => {
try {
     const categoryData = await category.destroy({
         where: { id: req.params.id }
     });
     if (!categoryData) {
       res.status(404).json({ message: 'category does not exist'});
       return;
     }
       res.status(200).json(categoryData);
 }  catch (err) {
       res.status(500).json(err);
 }
});

module.exports = router;
