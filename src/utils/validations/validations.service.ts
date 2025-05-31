import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

@Injectable()
export class ValidationsService {

    async validateDto(dtoClass: any, body: any): Promise<any> {
        const dtoObject = plainToInstance(dtoClass, body);
        const errors = await validate(dtoObject);

        if (errors.length > 0) {
            throw new HttpException(
                { status: false, errors: errors.map(err => err.constraints ? Object.values(err.constraints)[0] : '') },
                HttpStatus.OK,
            );
        }

        return true;
    }
}
