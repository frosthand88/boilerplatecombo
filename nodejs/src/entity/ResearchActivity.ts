import { EntitySchema } from 'typeorm';

export interface ResearchActivity {
    time: Date;
    researcher: string;
    paper: string;
    topic: string;
    conference: string;
    organization: string;
    citations?: number;
}

export const ResearchActivitySchema = new EntitySchema<ResearchActivity>({
    name: "ResearchActivity",
    tableName: "research_activity",
    columns: {
        time: {
            type: Date,
            primary: true,
        },
        researcher: {
            type: String,
            length: 255,
        },
        paper: {
            type: String,
            length: 255,
        },
        topic: {
            type: String,
            length: 255,
        },
        conference: {
            type: String,
            length: 255,
        },
        organization: {
            type: String,
            length: 255,
        },
        citations: {
            type: Number,
            nullable: true,
        },
    },
});
