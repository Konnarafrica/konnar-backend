import propertyListingModel from "../models/propertyListingModel.js";
import agentModel from "../models/agentModel.js";
import multer from "multer";

// add single propertyListing...
export const addPropertyListing = async (req, res) => {
  const {
    title,
    description,
    key_features,
    amenities,
    property_media,
    cost,
    agent_id,
    location,
    availability_status,
  } = req.body;

  const newPropertyListing = new propertyListingModel({
    title,
    description,
    key_features,
    amenities,
    property_media,
    cost,
    agent_id,
    location,
    availability_status,
  });

  try {
    console.log(newPropertyListing._id.toString());

    const agent_has_propertyListing = await agentModel.findById(agent_id);

    if (agent_has_propertyListing) {
      const newPropertyListing_id = newPropertyListing._id.toString();

      if (
        agent_has_propertyListing.no_of_properties.includes(
          newPropertyListing_id
        )
      )
        return res.status(404).json({
          message:
            "cannot add this property for agent, because it already for this particular agent ...",
        });

      await agent_has_propertyListing.updateOne({
        $push: { no_of_properties: newPropertyListing._id },
      });

      await newPropertyListing.save();

      res.status(200).json({
        message: "property added successfully...",
        newPropertyListing,
      });
    } else
      res
        .status(404)
        .json({
          message:
            "sorry could not continue with this process, it looks like this agent does not exist...",
        });
  } catch (error) {
    res.status(500).json({ error: error.message, code: error.code });
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
  try {
    const allpropertyListings = await propertyListingModel.find();
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
  const { id } = req.params;

  try {
    const propertylisting = await propertyListingModel.findById(id);
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
  const { id } = req.params;

  try {
    const propertyListing_to_be_updated =
      await propertyListingModel.findByIdAndUpdate(id, req.body, { new: true });

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
  const { id } = req.params;

  try {
    const propertyListing_to_be_deleted =
      await propertyListingModel.findByIdAndDelete(id);

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
