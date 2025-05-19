import { DataTypes, Model, Sequelize } from 'sequelize';

export class Researcher extends Model {
    public id!: number;
    public name!: string;
    public age!: number;
    public created_at!: Date;
}

export function initResearcherModel(sequelize: Sequelize) {
    Researcher.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            age: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            created_at: {
                type: DataTypes.DATE,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
            },
        },
        {
            sequelize,
            modelName: 'Researcher',
            tableName: 'researcher',
            timestamps: false,
        }
    );
}
