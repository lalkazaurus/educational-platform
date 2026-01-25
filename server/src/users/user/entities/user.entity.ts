import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Token } from "../../../token/entities/tokens.entity";
import { IsEmail, IsNotEmpty, IsPhoneNumber } from "class-validator";
import { Roles } from "../types/roles";
import { Status } from "../types/status";
import { Exclude, Expose } from "class-transformer";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    @Expose()
    id: number

    @Column({
        unique: true
    })
    @IsNotEmpty({ message: "Name is required" })
    @Expose()
    username: string

    @Column({ type: 'text' })
    @Exclude()
    password: string

    @Column({ 
        type: 'text',
        unique: true
    })
    @IsEmail()
    @Expose()
    email: string

    @Column({ 
        type: 'text',
        array: true,
        default: [ Roles.USER ]
    })
    @Expose()
    roles: Roles[]

    @Column({ 
        type: 'text', 
        default: Status.ACTIVE
    })
    @Expose()
    status: Status

    @Column({ 
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP'
    })
    @Expose()
    lastLogin: Date

    @Column({ type: "text" })
    @IsPhoneNumber()
    @Expose()
    phoneNumber: string

    @OneToMany(() => Token, (token) => token.user)
    @Exclude()
    tokens: Token[];
}
