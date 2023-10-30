import agentModel from "../models/agentModel.js";

export const getAgents = async (req, res) => {
  try {
    const agents = await agentModel.find({});
    res.status(201).json(agents);
  } catch (error) {
    res.status(501).json({ message: error.message });
  }
};

export const getAgent = async (req, res) => {
  const id = req.params.id;
  // console.log(id)

  try {
    const agent = await agentModel.findById(id);

    if (agent) {
      res.status(201).json(agent);
    } else {
      res
        .status(401)
        .json({ message: "Agent with this id not found. Try again" });
    }
  } catch (error) {
    res.status(501).json({ message: error.message });
  }
};

export const updateAgent = async (req, res) => {
  const id = req.params.id;
  const newData = req.body;

  if (!req.user.isAdmin)
    return res
      .status(403)
      .json({ message: "only admins can perform this operation..." });

  try {
    const agentName = await agentModel.findById(id);
    const agent = await agentModel.findByIdAndUpdate(id, newData);

    if (agent) {
      res.status(201).json({
        message: `Successfully updated Agent ${agentName.full_name} `,
      });
    } else {
      res
        .status(401)
        .json({ message: "Agent with this id not found. Try again" });
    }
  } catch (error) {
    res.status(501).json({ error: error.message });
  }
};

export const deleteAgent = async (req, res) => {
  if (!req.user.isAdmin)
    return res
      .status(403)
      .json({ message: "only admins can perform this operation..." });

  const id = req.params.id;

  try {
    const agent = await agentModel.deleteOne({ _id: id });
    if (agent) {
      res.json({ message: "Successfully deleted this Agent" }).status(201);
    } else {
      res
        .json({ message: "Agent with this id not found. Try again" })
        .status(401);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const addAgent = async (req, res) => {
  if (!req.user.isAdmin)
    return res
      .status(403)
      .json({ message: "only admins can perform this operation..." });

  const { email, phone_number, full_name, bio, picture } = req.body;

  if (
    !full_name ||
    !email ||
    !phone_number ||
    !bio ||
    !picture
  )
    return res.status(403).json({ message: "fields cannot be empty" });

  const checkEmail = await agentModel.findOne({ email: email });
  const checkPhoneNumber = await agentModel.findOne({
    phone_number: phone_number,
  });

  // CHECK IF EMAIL EXIST
  if (checkEmail)
    return res
      .status(405)
      .json({ message: "Agent with this email already exist" });

  // CHECK IF PHONE NUMBER ALREADY EXIST
  if (checkPhoneNumber)
    return res.status(405).json({
      message: "Agent with this phone number already exist already exist",
    });

  // console.log(data)

  const data = req.body;

  const newAgent = new agentModel(data);

  try {
    await newAgent.save();
    res.status(201).json({
      message: "Agent has been successfully created!!",
    });
  } catch (error) {
    if (error.code === 11000)
      return res.status(403).json({
        error:
          "sorry an agent with this email or phone number already exists...",
      });
    res.status(501).json({ error: error.message });
  }
};

// module.exports = {
//     getAgents
// }
