import { TeacherProfile } from "src/teacher-profile/entities/teacher-profile.entity";
import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Categories } from "../types/categories";
import { Levels } from "../types/levels";

@Entity()
export class Subject {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: "text", unique: true })
    name: string

    @Column({ type: "text" })
    description: string

    @Column({ type: "text" })
    icon: string

    @Column({
        type: "enum",
        enum: Categories,
        array: true, 
    })
    category: Categories[]

    @Column({
        type: "enum",
        enum: Levels,
        array: true, 
    })
    level: Levels[]

    @ManyToMany(() => TeacherProfile, (teacher) => teacher.subjects)
    teachers: TeacherProfile[];
}