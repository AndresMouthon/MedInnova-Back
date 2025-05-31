import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ValidationsService } from 'src/utils/validations/validations.service';
import { Not, Repository } from 'typeorm';
import { CreateConsultorioDto } from './dto/create-consultorio.dto';
import { UpdateConsultorioDto } from './dto/update-consultorio.dto';
import { Consultorio } from './entities/consultorio.entity';

@Injectable()
export class ConsultorioGuard implements CanActivate {
    constructor(
        @InjectRepository(Consultorio) private readonly repository: Repository<Consultorio>,
        private readonly validationService: ValidationsService
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const { method, body, params } = request;

        if (method === 'POST') {
            const { numero } = body;
            await this.validationService.validateDto(CreateConsultorioDto, body);
            const exist = await this.repository.findOne({ where: { numero } });

            if (exist) {
                throw new HttpException(
                    { status: false, errors: ['Ya existe un consultorio con este numero.'] },
                    HttpStatus.OK,
                );
            }
        } else if (method === 'PUT') {
            const { id } = params;
            const { numero } = body;
            await this.validationService.validateDto(UpdateConsultorioDto, body);

            const consultorioToUpdate = await this.repository.findOne({ where: { id } });
            if (!consultorioToUpdate) {
                throw new HttpException(
                    { status: false, errors: 'Consultorio no encontrado.' },
                    HttpStatus.NOT_FOUND,
                );
            }

            const exist = await this.repository.findOne({ where: { numero, id: Not(id) } });

            if (exist) {
                throw new HttpException(
                    { status: false, errors: ['Ya existe un consultorio con este numero.'] },
                    HttpStatus.OK,
                );
            }
        } else if (method === 'DELETE') {
            const { id } = params;
            const consultorio = await this.repository.findOne({ where: { id } });
            if (!consultorio) {
                throw new HttpException({ status: false, errors: 'Consultorio no encontrado' }, HttpStatus.NOT_FOUND)
            };
        }

        return true;
    }
}
