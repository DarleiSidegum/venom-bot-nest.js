import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('user')
export class UserEntity {
    @PrimaryGeneratedColumn({ type: 'int', name: 'user_id' })
    user_id: number;

    @Column('varchar', { name: 'name', length: 255 })
    name: string;

    @Column('varchar', { name: 'email', unique: true, length: 255 })
    email: string;

    @Column('varchar', { name: 'phone', nullable: true, length: 45 })
    phone: string;

    @Column('varchar', { name: 'password', length: 255 })
    password: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn({ default: null })
    deletedAt: Date;
}
