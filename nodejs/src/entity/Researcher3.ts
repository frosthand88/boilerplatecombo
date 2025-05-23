import { EntitySchema } from 'typeorm';

export interface Researcher3 {
    id: number;
    created_at: Date;
    name: string;
}

export const ResearcherSchema3 = new EntitySchema<Researcher3>({
    name: "Researcher",
    tableName: "RESEARCHER",
    columns: {
        id: {
            name: "ID", // uppercase to match Oracle
            type: Number,
            primary: true,
            generated: true,
        },
        created_at: {
            name: "CREATED_AT", // uppercase
            type: Date,
            createDate: true,
        },
        name: {
            name: "NAME", // uppercase
            type: String,
            length: 255,
        },
    },
});
