
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryColumn } from "typeorm";
import { v4 as uuid } from 'uuid';
import { Survey } from "./Survey";
import { Users } from "./Users";

@Entity("surveys_user")
class SurveyUser {
    @PrimaryColumn()
    readonly id: string; //readonly Não permite mudar o Id

    @Column()
    user_id: string;

    @ManyToOne(() => Users)
    @JoinColumn({ name: "user_id" })
    user: Users

    @Column()
    survey_id: string;
    @ManyToOne(() => Survey)
    @JoinColumn({ name: "survey_id" })
    survey: Survey

    @Column()
    value: number;

    @CreateDateColumn()
    created_at: Date;

    constructor() {
        if (!this.id) {
            this.id = uuid();
        }
    }
}

export { SurveyUser }