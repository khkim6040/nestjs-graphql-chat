import { Resolver, Context, Mutation, Args } from '@nestjs/graphql';
import { User } from './user.types';
import { UserService } from './user.service';
import {Request} from 'express';
import * as GraphQLUpload from 'graphql-upload/GraphQLUpload.js';
import { GraphqlAuthGuard } from 'src/auth/graphql-auth.guard';
import { UseGuards } from '@nestjs/common';
import {v4 as uuidv4} from 'uuid';
import { join } from 'path';
import { createWriteStream } from 'fs';

@Resolver()
export class UserResolver {
    constructor(private readonly userService: UserService) {}

    @UseGuards(GraphqlAuthGuard)
    @Mutation(() => User)
    async updateProfile(
        @Args('fullname') fullname: string,
        @Args('file', {type: () => GraphQLUpload, nullable: true}) file: GraphQLUpload.FileUpload,
        @Context() context: {req: Request},
    ) {
        const imageUrl = file ? await this.storeImageAndGetUrl(file) : null;
        const userId = context.req.user.sub;
        return this.userService.updateProfile(userId, fullname, imageUrl);
    }

    private async storeImageAndGetUrl(file: GraphQLUpload.FileUpload) {
        const {createReadStream, filename} = await file;
        const uniqueFilename = `${uuidv4()}_${filename}`;
        const imagePath = join(process.cwd(), 'public', uniqueFilename);
        const readStream = createReadStream();
        readStream.pipe(createWriteStream(imagePath));
        const imageUrl = `${process.env.APP_URL}/${uniqueFilename}`;
        return imageUrl;
    }
}
