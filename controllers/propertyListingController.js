import propertyListingModel from "../models/propertyListingModel.js";

// add post...
export const addPropertyListing = async (req, res) => {
  const {
    title,
    description,
    key_features,
    amenities,
    property_media,
    cost,
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
    location,
    availability_status,
  });

  try {
    const existingPropertyListing = await propertyListingModel.findOne({
      description,
    });

    console.log(existingPropertyListing);

    if (existingPropertyListing) {
      res.status(404).json({
        message:
          "sorry you cannot added this property because it already exists...",
      });
    } else {
      await newPropertyListing.save();

      res.status(200).json({
        message: "property added successfully...",
        newPropertyListing,
      });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

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
      message: "property successfully deleted..."
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
