import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Token } from "../../../token/entities/tokens.entity";
import { IsEmail } from "class-validator";
import { Roles } from "../types/roles";
import { Status } from "../types/status";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column({
        unique: true
    })
    username: string

    @Column({ type: 'text' })
    password: string

    @Column({ 
        type: 'text',
        unique: true
    })
    @IsEmail()
    email: string

    @Column({ 
        type: 'text',
        array: true,
        default: [ Roles.USER ]
    })
    roles: Roles[]

    @Column({ 
        type: 'text', 
        default: Status.ACTIVE
    })
    status: Status

    @Column({ 
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP'
    })
    lastLogin: Date

    @OneToMany(() => Token, (token) => token.user)
    tokens: Token[];
}
