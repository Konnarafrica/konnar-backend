import propertyListingModel from "../models/propertyListingModel.js";
import agentModel from "../models/agentModel.js";
import multer from "multer";

// add single propertyListing...
export const addPropertyListing = async (req, res) => {
  if (!req.user.isAdmin)
    return res
      .status(403)
      .json({ message: "only admins can perform this operation..." });

  // get data from he client...
  const {
    title,
    description,
    key_features,
    amenities,
    property_media,
    cost,
    area,
    agent,
    location,
    availability_status,
  } = req.body;

  const rent = cost;
  const legal_fee = (5 / 100) * parseInt(rent);
  const agent_fee = (10 / 100) * parseInt(rent);
  const security_deposit = rent / 12;
  console.log(legal_fee, rent, agent_fee, security_deposit.toFixed(2));

  const computed_cost = {
    rent: rent,
    agent_fee: agent_fee,
    legal_fee: legal_fee,
    security_deposit: security_deposit.toFixed(2),
  };

  //create a new instance of the property to be saved...
  const newPropertyListing = new propertyListingModel({
    title,
    description,
    key_features,
    amenities,
    property_media,
    cost: computed_cost,
    area,
    agent,
    location,
    availability_status,
  });

  try {
    const agent_has_propertyListing = await agentModel.findById(agent); //get the agent with property for showcase...
    // console.log(agent_has_propertyListing)
    if (agent_has_propertyListing) {
      const newPropertyListing_id = newPropertyListing._id.toString(); //convert the mongodb objectId to plain string...

      //check if the agent has this particular property for showcase already... if false then add...
      if (
        agent_has_propertyListing.no_of_properties.includes(
          newPropertyListing_id
        )
      )
        return res.status(404).json({
          message:
            "cannot add this property for agent, because it already exist for this particular agent ...",
        });
      // add the property for the agent ...
      await agent_has_propertyListing.updateOne({
        $push: { no_of_properties: newPropertyListing_id },
      });

      await newPropertyListing.save(); //if false then add...

      res.status(200).json({
        message: "property added successfully...",
        newPropertyListing,
      });
    } else
      res.status(404).json({
        message:
          "sorry could not continue with this process, it looks like this agent does not exist...",
      });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// upload property media...
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "./public/images");
//   },
//   filename: (req, file, cb) => {
//     cb(null, req.body);
//   },
// });

// export const upload = multer({ storage: storage });

// export const uploadPropertyListingMedia = (req, res) => {
//   try {
//     return res.status(200).json("File uploaded successfully");
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json("File uploaded failed");
//   }
// };

// {
//   rent, agent_fee, legal_fee, security_deposit;
// }

// title: title,
// description: description,
// key_features: key_features,
// amenities: amenities,
// property_media: property_media,
// cost: cost,
// location: location,
// availability_status: availability_status,

// get all PropertyListings...
export const getPropertyListings = async (req, res) => {
  // const { _page } = req.query;
  // const page = _page || 0;
  // const propertyPerPage = 15;
  //       .skip(page * propertyPerPage)
  //     .limit(propertyPerPage);

  try {
    const allpropertyListings = await propertyListingModel
      .find()
      .sort({ createdAt: -1 });

    //find all properties from the database...

    if (!allpropertyListings)
      return res
        .status(404)
        .json({ message: "no property was found in record..." });

    res.status(200).json({
      message: "all properties retrieved successfully...",
      allpropertyListings,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// get single propertyListing...
export const getPropertyListing = async (req, res) => {
  const { id } = req.params; //get id parameter

  try {
    const propertylisting = await propertyListingModel
      .findById(id)
      .populate("agent", {}); //find property with this id...
    if (!propertylisting)
      return res
        .status(404)
        .json({ message: "sorry this property does not exist..." });

    res
      .status(200)
      .json({ message: "property retrieved successfully...", propertylisting });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// update single propertyListing...
export const updatePropertyListing = async (req, res) => {
  if (!req.user.isAdmin)
    return res
      .status(403)
      .json({ message: "only admins can perform this operation..." });

  const { id } = req.params; //get id parameter...

  try {
    const propertyListing_to_be_updated =
      await propertyListingModel.findByIdAndUpdate(id, req.body, { new: true }); //find and update property

    if (!propertyListing_to_be_updated)
      return res
        .status(404)
        .json({ message: "failed to update this property..." });

    res.status(200).json({
      message: "property successfully updated...",
      propertyListing_to_be_updated,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// delete single PropertyListing
export const deletePropertyListing = async (req, res) => {
  if (!req.user.isAdmin)
    return res
      .status(403)
      .json({ message: "only admins can perform this operation..." });

  const { id } = req.params; //get id params...

  try {
    const propertyListing_to_be_deleted =
      await propertyListingModel.findByIdAndDelete(id); //find property and delete it...

    if (!propertyListing_to_be_deleted)
      return res
        .status(404)
        .json({ message: "failed to delete this property..." });

    res.status(200).json({
      message: "property successfully deleted...",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// upload a property media...

export const uploadPropertyListingMedia = (req, res) => {
  res.status(200).json({ maessage: "file uploaded successfully" });
};
