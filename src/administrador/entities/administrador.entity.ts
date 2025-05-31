import { Usuario } from "src/usuario/entities/usuario.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: 'administradores' })
export class Administrador {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    nombres: string;

    @Column({ nullable: false })
    apellidos: string;

    @Column({ nullable: false, default: true })
    estado: boolean;

    @OneToOne(() => Usuario, { onDelete: 'CASCADE', nullable: false })
    @JoinColumn({ name: 'usuario_id' })
    usuario_id: Usuario;

    @Column({ nullable: false })
    cargo: string;

    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updated_at: Date;

}
