const cardModel = require('../Model/card.model.js');

const createCard = async (req, res) => {
  try {
    const { title, desc } = req.body;
    const imagePath = req.file ? req.file.path : '';

    const newCard = new cardModel({
      title,
      desc,
      image: imagePath,
    });

    await newCard.save();
    res.status(201).send('Note created successfully');
  } catch (err) {
    console.error('❌ Error saving card:', err);
    res.status(500).send('Something went wrong');
  }
};

const getCard = async (req, res) => {
  try {
    const cards = await cardModel.find();
    res.status(200).json(cards);
  } catch (err) {
    console.error('❌ Error fetching cards:', err);
    res.status(500).send('Something went wrong');
  }
};

const getSingleCard = async (req, res) => {
  try {
    const id = req.params.id;
    const card = await cardModel.findById(id);
    res.status(200).json(card);
  } catch (err) {
    console.error('❌ Error fetching single card:', err);
    res.status(500).send('Something went wrong');
  }
};

const updateCard = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedCard = await cardModel.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(updatedCard);
  } catch (err) {
    console.error('❌ Error updating card:', err);
    res.status(500).send('Something went wrong');
  }
};

const deleteCard = async (req, res) => {
  try {
    const id = req.params.id;
    const deletedCard = await cardModel.findByIdAndDelete(id);
    res.status(200).json(deletedCard);
  } catch (err) {
    console.error('❌ Error deleting card:', err);
    res.status(500).send('Something went wrong');
  }
};

module.exports = {
  createCard,
  getCard,
  getSingleCard,
  updateCard,
  deleteCard
};
