const config = {
  user: "sa",
  password: "ed308",
  server: "localhost",
  database: "VeterinaryClinicDB",
  options: {
    cryptoCredentialsDetails: {
      minVersion: "TLSv1",
    },
    trustedconnection: true,
    enableArithAort: true,
    trustServerCertificate: true,
    instancename: "SQLEXPRESS",
  },
  port: 1433,
};

module.exports = config;
