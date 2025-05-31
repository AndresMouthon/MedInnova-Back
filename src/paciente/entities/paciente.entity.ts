import { Usuario } from "src/usuario/entities/usuario.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: 'pacientes' })
export class Paciente {

    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(() => Usuario, { onDelete: 'CASCADE', nullable: false })
    @JoinColumn({ name: 'usuario_id' })
    usuario_id: Usuario;

    @Column({ nullable: false })
    fecha_nacimiento: string;

    @Column({ nullable: false })
    telefono: string;

    @Column({ nullable: false })
    direccion: string;

    @Column({ nullable: false })
    historial_medico: string;

    @Column({ nullable: false })
    alergias: string;

    @Column({ nullable: false })
    seguro_medico: string;

    @Column({ nullable: false })
    numero_poliza: string;
    
    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updated_at: Date;

}
