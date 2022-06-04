import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Observable } from 'rxjs';
import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);

@Injectable()
export class AuthGuard implements CanActivate {
	constructor(private reflector: Reflector) {}

	canActivate(ctx: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
		const context = GqlExecutionContext.create(ctx);
		const { req } = context.getContext()

		const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
		  context.getHandler(),
		  context.getClass(),
		]);

		if (isPublic) {
		  return true;
		}

		return req?.user;
	}
}