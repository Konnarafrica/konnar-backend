import propertyListingsModel from "../models/propertyListingsModel.js";

export const addProperty = (req, res) => {
    const { title, description, key_features, amenities, property_media, cost_name, amount, agent, location, availability_status } = req.body;
    
    


  console.log("new Property");
};
