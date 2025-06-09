import { EntitySchema } from 'typeorm';

export interface CockroachResearcher {
    id: number;
    created_at: Date;
    name: string;
}

export const CockroachResearcherSchema = new EntitySchema<CockroachResearcher>({
    name: "CockroachResearcher",
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
        }
    },
});
