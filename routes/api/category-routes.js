const router = require('express').Router();
const req = require('express/lib/request');
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
Category.findAll(
{
  include: [
    {
      model: Product,
      attributes: [ 'id', 'product_name', 'price', 'stock', 'category_id' ],
    }]
})
.then(catData => res.json(catData))
.catch(err => {
  res.status(500).json(err);
});
});

router.get('/:id', (req, res) => {
  Category.findOne(
    {
    where: {
      id: req.params.id
    },
    include: [
      {
      model: Product,
      attributes: [ 'id', 'product_name', 'price','stock','category_id' ],
    }]
  })
  .then(catData => res.json(catData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.post('/', (req, res) => {
Category.create(req.body)
.then(catData => res.status(200).json(catData))
.catch(err => {
  console.log(err);
  res.status(500).json(err);
});
});

router.put('/:id', (req, res) => {
  Category.update(req.body, {
    where: {
      id: req.params.id
    }
  }) .then(catData => {
    if(!catData) {
      res.status(404).json({ message: 'category does not exist'});
      return;
    }
    res.json(catData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});


  router.delete('/:id', (req, res) => {
    Category.destroy ({
      where: {
        id: req.params.id
      }
    })
    .then(catData => {
      if(!catData) {
        res.status(404).json({ message: 'category does not exist'});
        return;
      }
      res.json(catData);
    })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
    
  });
  });
module.exports = router;
