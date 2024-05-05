import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { LoginResponse, RegisterResponse } from './types';
import { BadRequestException, UseFilters } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './dto';
import { Response, Request } from 'express';
import { GraphQLErrorFilter } from 'src/filters/custom-exception.filter';

@UseFilters(GraphQLErrorFilter)
@Resolver()
export class AuthResolver {
    constructor(private readonly authService: AuthService) {}
    
    @Mutation(() => RegisterResponse)
    async register(
        @Args('registerInput') registerDto: RegisterDto,
        @Context() context: {res: Response},
    ) {
        if(registerDto.password !== registerDto.confirmPassword) {
            throw new BadRequestException({
                confirmPassword: 'Passwords do not match',
            });
        }
        const {user} = await this.authService.register(
            registerDto,
            context.res,
        );
        return {user};
    }

    @Mutation(() => LoginResponse)
    async login(
        @Args('loginInput') loginDto: LoginDto,
        @Context() context: {res: Response},
    ) {
        const {user} = await this.authService.login(loginDto, context.res);
        return {user};
    }

    @Mutation(() => String)
    async logout(@Context() context: {res: Response}) {
        return this.authService.logout(context.res);
    }

    @Query(() => String)
    async hello() {
        return 'Hello World!';
    }

    @Mutation(() => String)
    async refreshToken(@Context() context: {req: Request, res: Response}) {
        try {
            return this.authService.refreshToken(context.req, context.res);
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }

}
