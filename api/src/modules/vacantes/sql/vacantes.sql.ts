export class SqlVacantes {
    
  static readonly listarVacantes = `
    SELECT 
      offers.id,
      jobs.name as job,
      jobs.description,
      jobs.salary,
      jobs.city,
      company.name as company, 
      start_date, 
      end_date, 
      vacancies 
    FROM "talentoHumano".offers
    LEFT JOIN "talentoHumano".jobs ON offers.job_id = jobs.id
    LEFT JOIN "talentoHumano".company ON jobs.company_id = company.id

    WHERE state = 1 AND vacancies > 0  
  `;

  static readonly listarTrabajos = `
    SELECT
      jobs.id,
      jobs.name,
      jobs.description,
      jobs.salary,
      jobs.city,
      company.name as company 
    FROM "talentoHumano".jobs 
    LEFT JOIN "talentoHumano".company ON jobs.company_id = company.id

  `;

  static readonly listarAspirantes = `
    SELECT DISTINCT
    enrolled.id as enrolled_id,
    enrolled.enrollment_date,
    persons.id AS person_id,
    persons.identification_document,
    persons.identification_type_id,
    persons.first_name,
    persons.second_name,
    persons.first_surname,
    persons.second_surname,
    persons.birth_date,
    persons.birth_city,
    persons.birth_department,
    persons.birth_country,
    persons.residence_city,
    persons.residence_address,
    persons.email,
    persons.phone,
    persons.blood_type_id
FROM "talentoHumano".enrolled
LEFT JOIN "talentoHumano".persons ON enrolled.person_id = persons.id
WHERE offer_id = $1 AND state = 1;

  
  `;

}