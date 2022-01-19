import { Express } from 'express'
import { createUserHandler, getUsersByLoginHandler } from '../mongoDB/controller/user.controller';
import { createUserSessionHandler, deleteUserSessionHandler, getUserSessionHandler } from '../mongoDB/controller/session.controller';
import validateResource from '../mongoDB/middleware/validateResource'
import { createUserSchema } from '../mongoDB/schema/user.schema';
import { createSessionSchema } from '../mongoDB/schema/session.schema';
import requireUser from '../mongoDB/middleware/requireUser'
import { createProductSchema } from '../mongoDB/schema/product.schema';
import { createProductHandler, deleteManyProductHandler, getProductByNameHandler } from '../mongoDB/controller/product.controller';
import { createExerciseSchema } from '../mongoDB/schema/exercise.schema';
import { createExerciseHandler, deleteManyExerciseHandler, getExerciseByNameHandler } from '../mongoDB/controller/exercise.controller';
import { createWorkoutPlanSchema } from '../mongoDB/schema/workoutPlan.schema';
import { createWorkoutPlanHandler, deleteManyWorkoutPlanHandler } from '../mongoDB/controller/workoutPlan.controller';
import { createDailyMeasurementSchema } from '../mongoDB/schema/dailyMeasurement.schema'
import { createDailyMeasurementHandler, changeDailyMeasurementHandler } from '../mongoDB/controller/dailyMeasurement.controller'

const routes = (app: Express) => {
    // app.post('/register', validateResource(createUserSchema), createUserHandler)
    app.post('/find/users', getUsersByLoginHandler)
    app.post('/auth/login', validateResource(createSessionSchema), createUserSessionHandler)
    // app.get('/login', requireUser, getUserSessionHandler)
    // app.delete('/login', requireUser, deleteUserSessionHandler)

    app.post('/find/products', getProductByNameHandler)
    app.post('/insert/product', requireUser, validateResource(createProductSchema), createProductHandler)
    app.post('/delete/product', requireUser, deleteManyProductHandler)

    app.post('/find/exercises', getExerciseByNameHandler)
    app.post('/insert/exercise', requireUser, validateResource(createExerciseSchema), createExerciseHandler)
    app.post('/delete/exercise', requireUser, deleteManyExerciseHandler)

    app.post('/insert/workout_plan', requireUser, validateResource(createWorkoutPlanSchema), createWorkoutPlanHandler)
    app.post('/delete/workout_plan', requireUser, deleteManyWorkoutPlanHandler)

    app.post('/insert/daily_measurement', requireUser, validateResource(createDailyMeasurementSchema), createDailyMeasurementHandler)
    app.post('/change/daily_measurement', requireUser, validateResource(createDailyMeasurementSchema), changeDailyMeasurementHandler)
}

export default routes;