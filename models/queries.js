const queries = {
    "createUser":"INSERT INTO users (email,password,name,image,preferences,whiteList) VALUES ($1,$2,$3,$4,$5,$6)",
    "getUserByEmail": "SELECT * FROM users WHERE email=$1",
    "getPreferences":"SELECT * FROM users WHERE email=$1",
    "setPreferences":"UPDATE users SET preferences=$1 WHERE email=$2"
}

module.exports = queries;