const validate = (req,res) => {
    console.log("In validate!");

    let action = req.query["action"];
    if(action) {
        if(action != 'today' && action != 'tomorrow') {
            res.status(400).send("Invalid query parameters!");
        } else {
            res.status(200).send();
        }
    } else {
        res.status(200).send();
    }

}

module.exports = {
    validate
}