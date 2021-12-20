const handleError = require("../functions/handleError")
const loadProduct = require("../functions/loadProduct")
const loadExercise = require("../functions/loadExercise")

module.exports = async function (req) {
    return new Promise(resolve => {
        const Model = require('../models/daily_measurement')
        Model.findOne({
            user_ID: req.body.user._id,
            whenAdded: req.body.uniqueKey
        })
            .then(async function (response) {
                let dataObject = JSON.parse(JSON.stringify(response))
                if (dataObject && dataObject.nutrition_diary && dataObject.nutrition_diary.length > 0) {
                    for (let i = 0; i < dataObject.nutrition_diary.length; i++) {
                        dataObject.nutrition_diary[i] = await loadProduct(response.nutrition_diary[i])
                    }
                }
                if (dataObject && dataObject.workout_result && dataObject.workout_result.length > 0) {
                    for (let a = 0; a < dataObject.workout_result.length; a++) {
                        for (let b = 0; b < dataObject.workout_result[a].results.length; b++) {
                            dataObject.workout_result[a].results[b] = await loadExercise(response.workout_result[a].results[b])
                        }
                    }
                }
                resolve(dataObject)
            }).catch(err => handleError(err, '/guest/daily_measurement'))
    })
}