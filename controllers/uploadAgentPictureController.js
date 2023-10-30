
export const uploadAgentPictureController = async (req, res) => {
    console.log(req.file);
    try {
        res.status(200).json({ message: "agent's picture added succesfully..." });
        
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}