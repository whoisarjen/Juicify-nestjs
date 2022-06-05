import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import mongoose from 'mongoose';
import { Daily } from '../entities/daily.entity';

@InputType()
export class UpdateDailyInput extends PartialType(Daily) {
	@Field(() => String, { description: 'id' })
	id: mongoose.Schema.Types.ObjectId;
}
