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

    @Column({ type: "text" })
    category: Categories

    @Column({ type: "text" })
    level: Levels

    @ManyToMany(() => TeacherProfile, (teacher) => teacher.subjects)
    teachers: TeacherProfile[];
}