import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { Request } from 'express';


@Injectable()
export class GraphqlAuthGuard implements CanActivate {
    constructor(
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const ctx = context.getArgByIndex(2);
        const request: Request = ctx.req;
        const accessToken = this.extractTokenFromCookie(request);

        if(!accessToken) {
            throw new UnauthorizedException('No access token provided');
        }
        try {
            const payload = await this.jwtService.verifyAsync(accessToken, {
                secret: this.configService.get<string>('ACCESS_TOKEN_SECRET'),
            });
            request['user'] = payload;
        } catch (error) {
            throw new UnauthorizedException('Invalid or expired access token');
        }

        return true;
    }

    private extractTokenFromCookie(request: Request): string | undefined {
        return request.cookies?.access_token;
    }
}