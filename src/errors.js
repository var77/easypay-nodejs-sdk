exports.invalidIpError = ip => {
    const error = new Error(`Unauthorized ip ${ip}`);
    error.code = 1;

    return error;
}

exports.invalidChecksumError = checksum => {
    const error = new Error(`Invalid checksum ${checksum}`);
    error.code = 2;

    return error;
}