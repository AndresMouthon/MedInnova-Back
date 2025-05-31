import { Usuario } from "src/usuario/entities/usuario.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: 'recepcionistas' })
export class Recepcionista {

    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(() => Usuario, { onDelete: 'CASCADE', nullable: false })
    @JoinColumn({ name: 'usuario_id' })
    usuario_id: Usuario;

    @Column({ nullable: false })
    telefono: string;

    @Column({ nullable: false })
    turno: string;

    @Column({ nullable: false })
    oficina: string;
        
    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updated_at: Date;

}
