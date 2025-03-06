import Player from "../model/Player.js";

export const getAllPlayers = async (req, res) => {
  try {
    const players = await Player.find().exec();
    if (!players) {
      res.status(204).json({ message: "No players found" });
    }
    res.json(players);
  } catch (error) {
    console.log("Could not get players", error);
    res.status(400).json({ message: error.message });
  }
};

export const getPlayer = async (req, res) => {
  try {
    if (!req?.params?.id) {
      res.status(400).json({ message: "Player id required" });
    }
    const player = await Player.findById(req.params.id).exec();
    if (!player) {
      res.status(404).json({ message: "Player not found" });
    }
    res.json(player);
  } catch (error) {
    console.log(`Could not get player with id: ${req.params.id}`, error);
    res.status(400).json({ message: "Bad request" });
  }
};

export const addPlayer = async (req, res) => {
  try {
    if (!req.body.firstName || !req.body.lastName) {
      res.status(400).json({ message: "First and last name required" });
    }
    const player = await Player.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
    });
    console.log(`Player added: ${player.lastName}`);
    res.json(player);
  } catch (error) {
    console.log("Could not add player", error);
    res.status(400).json({ message: "Couldn't add player" });
  }
};

export const updatePlayer = async (req, res) => {
  try {
    if (!req?.body?.id) {
      res.status(400).json({ message: "Player id required" });
    }
    const updates = {};
    if (req.body.firstName?.trim()) updates.firstName = req.body.firstName;
    if (req.body.lastName?.trim()) updates.lastName = req.body.lastName;

    const player = await Player.findByIdAndUpdate(req.params.id, updates, {
      new: true,
    }).exec();
    if (!player) {
      res.status(404).json({ message: "Player not found" });
    }
    res.json(player);
  } catch (error) {
    console.log(`Could not update player with id: ${req.params.id}`, error);
    res.status(400).json({ message: "Bad request" });
  }
};

export const deletePlayer = async (req, res) => {
  try {
    if (!req?.body?.id) {
      res.status(400).json({ message: "Player id required" });
    }
    const player = await Player.findByIdAndDelete(req.body.id).exec();

    if (!player) {
      res.status(404).json({ message: "Player not found" });
    }

    console.log(`Player deleted: ${player._id}`);
    res.json({ player, message: "Player deleted" });
  } catch (error) {
    console.log(`Could not delete player with id: ${req.body.id}`, error);
    res.status(400).json({ message: "Bad request" });
  }
};
