export class SqlContratacion {
  static readonly guardarInfoPersonal = `
    INSERT INTO "talentoHumano".persons
      (identification_document, identification_type_id, first_name, second_name, 
      first_surname, second_surname, birth_date, birth_city, 
      birth_department, birth_country, residence_city, 
      residence_address, email, phone, blood_type_id) 
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)
    ON CONFLICT (identification_document) 
    DO UPDATE SET
        identification_type_id = EXCLUDED.identification_type_id,
        first_name = EXCLUDED.first_name,
        second_name = EXCLUDED.second_name,
        first_surname = EXCLUDED.first_surname,
        second_surname = EXCLUDED.second_surname,
        birth_date = EXCLUDED.birth_date,
        birth_city = EXCLUDED.birth_city,
        birth_department = EXCLUDED.birth_department,
        birth_country = EXCLUDED.birth_country,
        residence_city = EXCLUDED.residence_city,
        residence_address = EXCLUDED.residence_address,
        email = EXCLUDED.email,
        phone = EXCLUDED.phone,
        blood_type_id = EXCLUDED.blood_type_id
        
    RETURNING "talentoHumano".persons.id      
        `;

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

  static readonly guardarInscripcion = `
    INSERT INTO "talentoHumano".enrolled (
      person_id,
      offer_id,
      period
    ) VALUES (
      $1,
      $2,
      $3
    )

    RETURNING id;
  `;

  static readonly generarCertificado = `
    SELECT
      hiring_date,
      jobs.name as job,
      company.name as company
    FROM "talentoHumano".employees
    LEFT JOIN "talentoHumano".enrolled ON employees.person_id = enrolled.person_id
    left join "talentoHumano".offers ON enrolled.offer_id = offers.id
    LEFT JOIN "talentoHumano".jobs ON offers.job_id = jobs.id
    LEFT JOIN "talentoHumano".company ON offers.company_id = company.id
    WHERE id = $1
  `;

  static readonly generarDocumentos = `
    INSERT INTO "talentoHumano".enrolleddocs (enrolled_id, requireddoc_id)
    SELECT $1, id
    FROM "talentoHumano".requireddocs;
  `;

  static readonly listarDocumentos = `
    SELECT
      enrolleddocs.id,
      requireddocs.name,
      requireddocs.description
    FROM
      "talentoHumano".enrolleddocs
    LEFT JOIN "talentoHumano".requireddocs ON enrolleddocs.requireddoc_id = requireddocs.id
    WHERE
      enrolleddocs.enrolled_id = $1
  
  `;

  static readonly guardarDocumento = `
    UPDATE "talentoHumano".enrolleddocs
    SET file_data = $2, filename = $3
    WHERE id = $1
  
  `;

  static readonly traerDocumentos = `
    SELECT *
    FROM "talentoHumano".enrolleddocs
    WHERE enrolled_id = $1
  
  `;
}
