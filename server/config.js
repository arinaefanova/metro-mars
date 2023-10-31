module.exports = {
    allowedFrontendOrigin: 'http://localhost:8080',
    jwtConfig: {
        secret: 'viv99vfd9vdf09',
        algorithms: ['HS256']
    },
    passwordConfig: {
        salt: 'faacdcojirj90990',
        iterations: 1000,
        keylen: 64,
        digest: 'sha512',
    },
    tokenSalt: 'my-super-secret-salt-jf-4949g9r-fg0rej',
};