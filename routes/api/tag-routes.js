const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

  // find all tags
  // be sure to include its associated Product data
  router.get('/', (req, res) => {
    Tag.findAll(
    {
      include: [
        {
          model: Product,
          attributes: [ 'id', 'product_name', 'price', 'stock' ],
        }]
    })
    .then(tagData => res.json(tagData))
    .catch(err => {
      conesole.log(err);
      res.status(500).json(err);
       });
    });
    
    router.get('/:id', (req, res) => {
      Tag.findOne(
        {
        where: {
          id: req.params.id
        },
        include: [
          {
          model: Product,
          attributes: [ 'id', 'product_name', 'price', 'stock' ],
        }]
      })
      .then(tagData => res.json(tagData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
    });

    router.post('/', (req, res) => {
      Tag.create(req.body)
      .then(tagData => res.status(200).json(tagData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
      });

  // update a tag's name by its `id` value
  router.put('/:id', (req, res) => {
    Tag.update(req.body, {
      where: {
        id: req.params.id
      }
    }) .then(tagData => {
      if(!tagData) {
        res.status(404).json({ message: 'category does not exist'});
        return;
      }
      res.json(tagData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
  });
  
// delete on tag by its `id` value
router.delete('/:id', (req, res) => {
  Tag.destroy ({
    where: {
      id: req.params.id
    }
  })
  .then(tagData => {
    if(!tagData) {
      res.status(404).json({ message: 'category does not exist'});
      return;
    }
    res.json(tagData);
  })
.catch(err => {
  console.log(err);
  res.status(500).json(err);
  
});
});
 
module.exports = router;
