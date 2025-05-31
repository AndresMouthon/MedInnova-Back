import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { Medico } from './entities/medico.entity';
import { UsuarioService } from 'src/usuario/usuario.service';
import { ValidationsService } from 'src/utils/validations/validations.service';
import { CreateMedicoDto } from './dto/create-medico.dto';
import { UpdateMedicoDto } from './dto/update-medico.dto';
@Injectable()
export class MedicoGuard implements CanActivate {
    constructor(
        @InjectRepository(Medico) private readonly repository: Repository<Medico>,
        private readonly userService: UsuarioService,
        private readonly validationService: ValidationsService
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const { method, body, params } = request;

        if (method === 'POST') {
            const { documento } = body;
            await this.validationService.validateDto(CreateMedicoDto, body);
            const exist = await this.userService.findByDocumento(documento);

            if (exist) {
                throw new HttpException(
                    { status: false, errors: ['Ya existe un usuario con este documento.'] },
                    HttpStatus.OK,
                );
            }
        } else if (method === 'PUT') {
            const { id } = params;
            const { documento } = body;
            await this.validationService.validateDto(UpdateMedicoDto, body);

            const roleToUpdate = await this.repository.findOne({ where: { id } });
            if (!roleToUpdate) {
                throw new HttpException(
                    { status: false, errors: 'Medico no encontrado.' },
                    HttpStatus.NOT_FOUND,
                );
            }

            const exist = await this.repository
                .createQueryBuilder('medico')
                .innerJoin('medico.usuario', 'usuario')
                .where('usuario.documento = :documento', { documento: body.documento })
                .andWhere('medico.id != :id', { id })
                .getOne();
                
            if (exist) {
                throw new HttpException(
                    { status: false, errors: ['Ya existe un medico con este documento.'] },
                    HttpStatus.OK,
                );
            }
        } else if (method === 'DELETE') {
            const { id } = params;
            const empleado = await this.repository.findOne({ where: { id } });
            if (!empleado) {
                throw new HttpException({ status: false, errors: 'Medico no encontrado' }, HttpStatus.NOT_FOUND)
            };
        }

        return true;
    }
}
