import jwt from 'jsonwebtoken';
import { DeleteResult } from 'typeorm';

import { config } from '../configs';
import { ITokenPair, IUserPayload } from '../interfaces';
import { tokenRepository } from '../repositories';
import { ITokens } from '../entity';

class TokenService {
    public async generateActionToken(payload:IUserPayload): Promise<string> {
        const actionToken = jwt.sign(
            payload,
            config.SECRET_FORGOT_KEY,
            { expiresIn: config.FORGOT_TOKEN_LIFE },
        );
        return actionToken;
    }

    public async generateTokensPair(payload:IUserPayload):Promise<ITokenPair> {
        const accessToken = jwt.sign(
            payload,
            config.SECRET_ACCESS_KEY as string,
            { expiresIn: config.ACCESS_TOKEN_LIFE },
        );
        const refreshToken = jwt.sign(
            payload,
            config.SECRET_REFRESH_KEY as string,
            { expiresIn: config.REFRESH_TOKEN_LIFE },
        );

        return { accessToken, refreshToken };
    }

    public async saveToken(token:ITokens): Promise<ITokens> {
        const { userId, refreshToken, accessToken } = token;
        const tokenFromDb = await tokenRepository.findTokensByParams({ refreshToken });
        if (tokenFromDb) {
            tokenFromDb.refreshToken = refreshToken;
            tokenFromDb.accessToken = accessToken;
            return tokenRepository.createToken(tokenFromDb);
        }
        return tokenRepository.createToken({ userId, refreshToken, accessToken });
    }

    public async deleteTokens(userId:number):Promise<DeleteResult> {
        const deletedToken = await tokenRepository.deleteTokensByUserId(userId);
        return deletedToken;
    }

    public async verifyToken(authToken: string, type = 'access'): Promise<IUserPayload> {
        let secretWord = config.SECRET_ACCESS_KEY;
        if (type === 'refresh') {
            secretWord = config.SECRET_REFRESH_KEY;
        }
        if (type === 'action') {
            secretWord = config.SECRET_FORGOT_KEY;
        }
        return jwt.verify(authToken, secretWord as string) as IUserPayload;
    }
}

export const tokenService = new TokenService();
