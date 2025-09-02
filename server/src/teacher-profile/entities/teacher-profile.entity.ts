import { Column, Entity, ManyToMany, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Subject } from "src/subject/entities/subject.entity"

@Entity()
export class TeacherProfile {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: 'text' })
    fullName: string

    @Column({ type: 'text' })
    bio: string

    @Column({ type: "text" })
    degree: string

    @Column({ type: "text" })
    experience: string

    @Column({ type: 'decimal' })
    pricePerHour: number;

    @ManyToMany(() => Subject, (subject) => subject.teachers)
    subject: Subject[]

    @Column({ type: 'json', nullable: true })
    availableTimes: string[];

    @Column()
    userId: number;
    
}