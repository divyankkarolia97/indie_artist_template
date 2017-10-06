const DB ={

    // DATABASE:"<databaseName>",
    // USERNAME:"<databaseUsername>",
    // PASSWORD:"<databasePassword>"
    DATABASE: "practiceDB",
    USERNAME: "divyank",
    PASSWORD: "dkarolia"

}
process.env.PWD = process.cwd();

const EMAIL_CRED={
    USERNAME:'<username>',
    PASSWORD:'<password>'
}

const CONFIG ={
    //DATABASE_URL: process.env.DATABASE_URL || `postgres://${DB.USERNAME}:${DB.PASSWORD}@localhost:5432/${DB.DATABASE}`,
    //SERVER_PORT: process.env.PORT || 1234,
    EMAIL_CRED
}
console.log(CONFIG);



module.exports = CONFIG;