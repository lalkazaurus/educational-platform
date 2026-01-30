import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Subject } from "src/subject/entities/subject.entity"
import { Student } from "src/students/entities/student.entity";

@Entity()
export class TeacherProfile {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: 'text', unique: true })
    fullName: string

    @Column({ type: 'text' })
    bio: string

    @Column({ type: "text" })
    degree: string

    @Column({ type: "text" })
    experience: string

    @Column({ type: 'float' })
    pricePerHour: number;

    @ManyToMany(() => Subject, subject => subject.teachers, { eager: false })
    @JoinTable()
    subjects: Subject[];

    @ManyToMany(() => Student, (student) => student.teachers)
    @JoinTable()
    students: Student[]

    @Column(
        { type: 'json', nullable: true , default: []},
    )
    availableTimes: string[];

    @Column({ unique: true })
    userId: number;

    @Column({ type: "float", default: 0 })
    rating: number

    @Column({ type: 'json', nullable: true, default: ['Ukrainian']})
    languages: string[]

    @Column({ type: 'json', nullable: true, default: []})
    levels: string[]

    @Column({ type: 'text', nullable: true })
    imageUrl: string
}