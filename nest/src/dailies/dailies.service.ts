import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Ctx } from 'src/types/context.type';
import { CreateDailyInput } from './dto/create-daily.input';
import { FindOneDailyInput } from './dto/find-one-daily.input';
import { UpdateDailyInput } from './dto/update-daily.input';
import { Daily, DailyDocument } from './entities/daily.entity';
import { get } from 'lodash'
import { User, UserDocument } from 'src/users/entities/user.entity';

@Injectable()
export class DailiesService {
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>,
        @InjectModel(Daily.name) private dailyModel: Model<DailyDocument>,
    ) {}

    async create(createDailyInput: CreateDailyInput, context: Ctx) {
        const user = get(context.req.user, '_id')

        const isAlreadyExisting = await this.dailyModel.findOne({
            user,
            whenAdded: createDailyInput.whenAdded,
        })

        // might be marge with new value later
        if (isAlreadyExisting) {
            throw new ConflictException()
        }

        return await (await this.dailyModel.create({
            user,
            ...createDailyInput,
        })).populate('user')
    }

    async findAll() {
        return await this.dailyModel.find().populate('user');
    }

    async findOne({ login, whenAdded }: FindOneDailyInput) {
        const user = await this.userModel.findOne({ login })

        if (!user) {
            throw new NotFoundException()
        }

        return await this.dailyModel.findOne({
            whenAdded,
            user: user._id,
        }).populate('user');
    }

    update(_id: mongoose.Schema.Types.ObjectId, updateDailyInput: UpdateDailyInput) {
        return `This action updates a #${_id} daily`;
    }
}
