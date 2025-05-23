import { EntitySchema } from 'typeorm';

export interface Researcher2 {
    id: number;
    created_at: Date;
    name: string;
}

export const ResearcherSchema2 = new EntitySchema<Researcher2>({
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
    },
});
