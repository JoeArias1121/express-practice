import data from "../model/players.json" assert { type: "json" };

export const getAllPlayers = (req, res) => {
  res.json(data);
};

export const getPlayer = (req, res) => {
  const player = data.find((player) => player.id === Number(req.params.id));
  if (!player) {
    res.status(400).json({ message: "Player not found" });
  }
  res.json(player);
};

export const addPlayer = (req, res) => {
  console.log(`Data before operation: ${print(data)}`);
  data.push(req.body);
  console.log(`Data after operation: ${print(data)}`);
  res.json(data);
};

export const updatePlayer = (req, res) => {
  console.log(`Data before operation: ${print(data)}`);
  data = data.map((player) => {
    if (player.id === req.body.id) {
      player.firstName = req.body.firstName;
      player.lastName = req.body.lastName;
    }
    return player;
  });
  console.log(`Data after operation: ${print(data)}`);
  res.json(data);
};

export const deletePlayer = (req, res) => {
  console.log(`Data before operation: ${print(data)}`);
  data = data.filter((player) => player.id !== req.body.id);
  console.log(`Data after operation: ${print(data)}`);
  res.json(data);
};

function print(data) {
  data.forEach((player) => {
    console.log(player);
  });
}
