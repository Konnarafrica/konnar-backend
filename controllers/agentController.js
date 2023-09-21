import agentModel from "../models/agentModel.js";


export const getAgents = async(req,res) => {
    
    try {
        const agents = await agentModel.find({});
        res.status(201).json(agents)
    } catch (error) {
        res.json({message: error.message}).status(501)
    }
    


}

export const getAgent = async (req,res) => {
    const id = req.params.id
    // console.log(id)

    try {
        const agent = await agentModel.findById(id)
        
        if(agent){
            res.json(agent).status(201)
        }else{
            res.json({message: "Agent with this id not found. Try again"}).status(401)
        }


        
    } catch (error) {
        res.json({message: error.message}).status(501)

    }



}

export const updateAgent = async (req,res) => {
    
    const id = req.params.id
    const newData = req.body

    try {
        const agentName = await agentModel.findById(id)
        const agent = await agentModel.findByIdAndUpdate(id, newData )
        
        if(agent){
            res.json({message: `Successfully updated Agent ${agentName.full_name} `}).status(201)
        }else{
            res.json({message: "Agent with this id not found. Try again"}).status(401)
        }
        
    } catch (error) {
        res.json({error: error.message}).status(501)
    }


}

export const deleteAgent = async (req,res) => {
    
    const id = req.params.id

    try {
        const agent = await agentModel.deleteOne({_id:id})
        if(agent){
            res.json({message: "Successfully deleted this Agent"}).status(201)
        }else{
            res.json({message: "Agent with this id not found. Try again"}).status(401)
        }
    }catch(error){
        res.json({error: error.message}).status(501)
    }

}




export const addAgent = async (req,res) => {
    
    const data = req.body

    console.log(data)

    const newAgent = new agentModel(data)

    try{
        
        await newAgent.save();
          res
            .status(201)
            .json({
              message:
                "Agent has been successfully created!!",
            });
    }catch(error){
        res.status(501).json({ error: error.message });
    }

}


// module.exports = {
//     getAgents
// }