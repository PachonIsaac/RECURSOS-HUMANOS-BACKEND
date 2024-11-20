import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../../database/database.service';
import { EmailService } from './email.service';
import { PoolClient } from 'pg';
import { SqlAuth } from './sql/index.sql';
import { GenerarEmpleadoDto, IniciarSesionDto } from './dto/index';
import * as jwt from 'jsonwebtoken';
import * as crypto from 'crypto';
import { last } from 'rxjs';

@Injectable()
export class AuthService {

    constructor(private readonly databaseService: DatabaseService, 
        private readonly emailService: EmailService) {}

    private async getClient(): Promise<PoolClient> {
        return this.databaseService.getClient();
    }

    public async buscarUsuario(data: IniciarSesionDto) {
        const client = await this.getClient();
        try {
            console.log(data);
            const { username, password } = data;
            const result = await client.query(SqlAuth.validarCredenciales, [username, password]);

            if (result.rows.length > 0) {
                const user = result.rows[0];
                const token = await this.generarToken(user);

                return {
                    statusCode: 200,      
                    message: 'Usuario autenticado exitosamente',  
                    token: token          
                };
            } else {

                return {
                    statusCode: 401,      
                    message: 'Credenciales incorrectas',  
                    token: null           
                };
            }
        } catch (error) {
            throw error;
        } finally {
            client.release();
        }
    }

    private async generarToken(user: any): Promise<string> {
        const payload = {
            name: user.first_name,
            lastName: user.first_surname,
            id: user.id, 
            rol: user.rol
        };

        const secretKey = process.env.JWT_SECRET_KEY || 'mi_clave_s ecreta';
        const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });

        return token;
    }

    public async generarEmpleado(data: GenerarEmpleadoDto) {
        const client = await this.getClient();
        try {
           
            const result = await client.query(SqlAuth.generarEmpleado, [data.id]);
            console.log(result);
            const empleadoId = result.rows[0].id;

            data.id = empleadoId;
            const credenciales = await this.generarCuenta(data);

            await this.emailService.sendCredentials(data.email, credenciales.username, credenciales.password);
    
            return {
                message: 'Empleado generado exitosamente',
                credenciales
            };
        } catch (error) {
            throw error;
        } finally {
            client.release();
        }
    }

    private async generarCuenta(data: GenerarEmpleadoDto) {
        const client = await this.getClient();
        try {
            const { firstName, firstSurname, identification } = data;
    
            let username: string;
            let password: string;
            let isUsernameUnique = false;
    
            while (!isUsernameUnique) {
                username = this.generateUsername(firstName, firstSurname, identification);
                const result = await client.query(SqlAuth.buscarUsuario, [username]);
                if (result.rows[0].count == 0) {
                    isUsernameUnique = true;
                }
            }
    
            password = this.generatePassword();
    
            await client.query(SqlAuth.generarCuenta, [username, password, data.id]);
    
            return {
                username,
                password
            };
        } catch (error) {
            throw error;
        } finally {
            client.release();
        }
    }
    
    private generateUsername(firstName: string, firstSurname: string, identification: string): string {
        const randomString = crypto.randomBytes(3).toString('hex'); // Genera una cadena aleatoria de 6 caracteres
        return `${firstName.charAt(0)}${firstSurname}${identification.slice(-4)}${randomString}`.toLowerCase();
    }
    
    private generatePassword(): string {
        return crypto.randomBytes(5).toString('hex'); 
    }

    public async listarEmpleados() {
        const client = await this.getClient();
        try {
            const result = await client.query(SqlAuth.listarEmpleados);

            return result.rows;
        } catch (error) {
            throw error;
        } finally {
            client.release();
        }
    }
}
