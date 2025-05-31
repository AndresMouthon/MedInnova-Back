import { Usuario } from "src/usuario/entities/usuario.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: 'medicos' })
export class Medico {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    nombres: string;

    @Column({ nullable: false })
    apellidos: string;

    @Column({ nullable: false, default: true })
    estado: boolean;

    @Column({ nullable: false })
    genero: string;

    @OneToOne(() => Usuario, { onDelete: 'CASCADE', nullable: false })
    @JoinColumn({ name: 'usuario_id' })
    usuario_id: Usuario;

    @Column({ nullable: false })
    especialidad: string;

    @Column({ nullable: false })
    numero_colegiatura: string;

    @Column({ nullable: false })
    telefono: string;

    @Column({ nullable: false, default: true })
    disponibilidad: boolean;

    @Column({ nullable: false })
    horario_atencion: string;

    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updated_at: Date;

}
