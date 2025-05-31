import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: 'consultorios' })
export class Consultorio {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false, unique: true })
    numero: string;

    @Column({ nullable: false, default: true })
    estado: boolean;

    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updated_at: Date;

}