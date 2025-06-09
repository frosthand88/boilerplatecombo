// src/utils/loadSecrets.ts
import dotenv from 'dotenv';
import { STS, SecretsManager } from 'aws-sdk';

// Load base .env config first
dotenv.config();

export async function injectSecretsFromAWS() {
    const region = process.env.AWS_REGION;
    const roleArn = 'arn:aws:iam::022499021574:role/fh-read-secret-role';
    const secretName = 'MyAppSecret';

    if (!region) throw new Error('Missing AWS_REGION in .env');

    // STS AssumeRole
    const sts = new STS({
        region,
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    });

    const { Credentials } = await sts
        .assumeRole({
            RoleArn: roleArn,
            RoleSessionName: 'node-session',
        })
        .promise();

    if (!Credentials) throw new Error('Failed to assume role');

    // Create SecretsManager client with assumed credentials
    const secretsManager = new SecretsManager({
        region,
        accessKeyId: Credentials.AccessKeyId,
        secretAccessKey: Credentials.SecretAccessKey,
        sessionToken: Credentials.SessionToken,
    });

    const secretResponse = await secretsManager
        .getSecretValue({ SecretId: secretName })
        .promise();

    if (!secretResponse.SecretString) throw new Error('Empty secret string');

    const secretJson = JSON.parse(secretResponse.SecretString);

    console.log(secretJson);

    // Inject specific secrets into process.env
    process.env.MYSQL_PASSWORD = secretJson.mysql;
    process.env.POSTGRES_PASSWORD = secretJson.postgresql;
    process.env.MSSQL_PASSWORD = secretJson.mssql;
    process.env.ORACLE_PASSWORD = secretJson.oracle;
    process.env.TIMESCALE_PASSWORD = secretJson.timescaledb;
    process.env.COCKROACH_PASSWORD = secretJson.cockroachdb;
    process.env.MARIA_PASSWORD = secretJson.mariadb;
    process.env.CASSANDRA_PASSWORD = secretJson.cassandra;
    process.env.REDIS_PASSWORD = secretJson.redis;
    process.env.MONGO_PASSWORD = secretJson.mongodb;
    process.env.INFLUX_TOKEN = secretJson.influxdb;
    process.env.NEO4J_PASSWORD = secretJson.neo4j;
    process.env.ELASTIC_PASSWORD = secretJson.elasticsearch;
}
