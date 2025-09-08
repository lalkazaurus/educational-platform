import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Subject } from "src/subject/entities/subject.entity"

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

    @ManyToMany(() => Subject, (subject) => subject.teachers)
    @JoinTable()
    subjects: Subject[]

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
}