export class SqlContratacion {
  static readonly guardarInfoPersonal = `
    INSERT INTO "talentoHumano".persons
    (identification_document, identification_type_id, first_name, second_name, 
    first_surname, second_surname, birth_date, birth_city, 
    birth_department, birth_country, residence_city, 
    residence_address, email, phone, blood_type_id) 
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)`;

  static readonly getTiposDocumento = `
    SELECT
      id,
      name
    FROM
      "talentoHumano".valueType
    WHERE
      nameType_id = 2

  `;

  static readonly getTiposSangre = `
    SELECT
      id,
      name
    FROM
      "talentoHumano".valueType
    WHERE
      nameType_id = 1
  `;
}
