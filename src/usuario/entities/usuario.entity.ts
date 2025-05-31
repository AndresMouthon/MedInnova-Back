import { Administrador } from "src/administrador/entities/administrador.entity";
import { Medico } from "src/medico/entities/medico.entity";
import { Paciente } from "src/paciente/entities/paciente.entity";
import { Recepcionista } from "src/recepcionista/entities/recepcionista.entity";
import { Column, CreateDateColumn, Entity, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: 'usuarios' })
export class Usuario {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    documento: string;

    @Column({ nullable: false })
    password: string;

    @Column({ nullable: false })
    rol: string;

    @OneToOne(() => Administrador, (administrador) => administrador.usuario_id, { eager: true })
    administrador: Administrador;

    @OneToOne(() => Medico, (medico) => medico.usuario_id, { eager: true })
    medico: Medico;

    @OneToOne(() => Paciente, (paciente) => paciente.usuario_id, { eager: true })
    paciente: Paciente;

    @OneToOne(() => Recepcionista, (recepcionista) => recepcionista.usuario_id, { eager: true })
    recepcionista: Recepcionista;

    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updated_at: Date;

}
