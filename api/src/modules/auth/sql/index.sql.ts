export class SqlAuth {

  static readonly validarCredenciales = `
    SELECT
      persons.first_name,
      first_surname,
      employees.rol,
      employees.id  
    FROM
      "talentoHumano".accounts
    LEFT JOIN "talentoHumano".employees ON accounts.employee_id = employees.id
    LEFT JOIN "talentoHumano".persons ON employees.person_id = persons.id
    WHERE
      username = $1 AND
      convert_from("talentoHumano".decrypt_text(password)::BYTEA, 'UTF8') = $2;  
  
  `;

  static readonly buscarUsuario = `
    SELECT
     COUNT(*) 
    FROM 
      "talentoHumano".accounts 
    WHERE username = $1
  
  `;

  static readonly generarEmpleado = `
    INSERT INTO "talentoHumano".employees (
      person_id,
      state,
      rol
      
      ) VALUES (
       $1,
       1,
       15
       
    )
    RETURNING "talentoHumano".employees.id

  `;

  static readonly generarCuenta = `
    INSERT INTO "talentoHumano".accounts (
      username, 
      password,
      employee_id,
      state
    ) VALUES (
      $1, 
      $2,
      $3,
      1
      )

  `;
  static readonly listarEmpleados = `
    SELECT
      persons.identification_document,
      persons.first_name,
      persons.second_name,
      persons.first_surname,
      persons.second_surname,
      valuetype.name as rol,
      employees.hiring_date

      
    FROM
      "talentoHumano".employees
    LEFT JOIN "talentoHumano".persons ON employees.person_id = persons.id
    left join "talentoHumano".valueType ON employees.rol = valueType.id

  `;

}
