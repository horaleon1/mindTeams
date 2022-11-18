import Client from '../models/Clients';

export const createClient = async (req, res) => {
  const { name, account, manager } = req.body;

  const newClient = new Client({
    name,
    account,
    manager,
    team: [],
  });

  const savedClient = await newClient.save();

  res.status(201).json(savedClient);
};

export const getClients = async (req, res) => {
  const clients = await Client.find();
  res.json(clients);
};

export const getClientById = async (req, res) => {
  const { clientId } = req.params;
  const findClient = await Client.findById(clientId);
  res.status(200).json(findClient);
};

export const updateClientById = async (req, res) => {
  const { clientId } = req.params;
  const updateClient = await Client.findByIdAndUpdate(clientId, req.body, {
    new: true,
  });
  res.status(204).json(updateClient);
};

export const deleteClient = async (req, res) => {
  const { clientId } = req.params;
  const deletedClient = await Client.findByIdAndDelete(clientId);
  res.status(204).json(deletedClient);
};
