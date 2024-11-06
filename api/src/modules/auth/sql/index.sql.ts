export class SqlAuth {

  static readonly buscarUsuario = `
    SELECT
      id,
      username
    FROM
      "talentoHumano".accounts
    WHERE
      username = $1 AND
      convert_from("talentoHumano".decrypt_text(password)::BYTEA, 'UTF8') = $2;  
  
  `;

}
