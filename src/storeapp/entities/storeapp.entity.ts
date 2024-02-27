/* eslint-disable prettier/prettier */
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Storeapp {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nameApp: string

    @Column()
    urlStorage: string;

    @Column()
    userId: string;
}
