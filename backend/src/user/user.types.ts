import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class User {
    @Field()
    id?: number;

    @Field()
    fullname: string;

    @Field()
    email?: string;

    @Field({nullable: true})
    avataUrl? : string;

    @Field({nullable: true})
    password?: string;

    @Field({nullable: true})
    createdAt?: Date;

    @Field({nullable: true})
    updatedAt?: Date;
}