import { EntitySchema } from 'typeorm';

export interface Researcher {
    id: number;
    created_at: Date;
    name: string;
    age?: number;
}

export const ResearcherSchema = new EntitySchema<Researcher>({
    name: "Researcher",
    tableName: "researcher",
    columns: {
        id: {
            type: Number,
            primary: true,
            generated: true,
        },
        created_at: {
            type: Date,
            createDate: true,
        },
        name: {
            type: String,
            length: 255,
        },
        age: {
            type: Number,
            nullable: true,
        },
    },
});
