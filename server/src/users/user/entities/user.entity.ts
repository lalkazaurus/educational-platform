import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Token } from "../../../token/entities/tokens.entity";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    username: string

    @Column({ type: 'text' })
    password: string

    @OneToMany(() => Token, (token) => token.user)
    tokens: Token[];
}