import { TeacherProfile } from "src/teacher-profile/entities/teacher-profile.entity";
import { Column, Entity, ManyToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Student {
    @PrimaryGeneratedColumn()
    id: number

    @Column({type: "text"})
    fullName: string

    @Column({type: "timestamp"})
    dateOfBirth: string

    @Column({ type: "text" })
    learningGoal: string

    @Column({
        type: "float",
        default: 0
    })
    balance: number

    @ManyToMany(() => TeacherProfile, (teacher) => teacher.subjects)
    teachers: TeacherProfile[];

    @Column({ unique: true })
    userId: number;
}