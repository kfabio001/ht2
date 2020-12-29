import { Request, Response } from 'express'
import OracleDB from 'oracledb';
import { connection } from '../oracle' 


export async function login(req: Request, res: Response) {
    let email = req.body.email;
    let pass = req.body.password;
    let query = `SELECT * FROM Estudiante WHERE email = '${email}' AND contrasena = '${pass}'`;
    let result: OracleDB.Result<any> = await connection.execute(query);
    try {
        if (result.rows) {
            if(result.rows.length==1){
                let response = {
                    auth: true
                    
                }
                res.json(response);
            }else{
                let response = {
                    auth: false
                    
                }
                res.json(response);
            }
            
            
        }
    } catch (err) {
        res.send(null);
    }
}

export async function register(req: Request, res: Response) {
    let nombre = req.body.nombre;
    let email = req.body.email;
    let pass = req.body.password;
    
    
    let query = `INSERT INTO Estudiante (nombre, email, contrasena) values ('${nombre}','${email}','${pass}')`;
    console.log(query);
    try {
        let result: OracleDB.Result<any> = await connection.execute(query, [], { autoCommit: true });
        if (result.rowsAffected) {
            res.send(result);
        } else {
            res.status(400).send('Bad Request')
        }
    } catch (error) {
        res.status(400).send("Ese usuario ya existe");
    }
}
export async function getUser(req: Request, res: Response) {
    
   // console.log("nose")
    
    let query = `select * from Estudiante`;
    let result: OracleDB.Result<any> = await connection.execute(query);
    try {
        let response=[]
        if (result.rows) {
            
            for (let i = 0; i < result.rows.length; i++) {
            let responses = {
                nombre: result.rows[i],
                email: result.rows[i],
                contrasena: result.rows[i],
               
            }
            response.push(responses);
        }
            res.json(response);
        }
    } catch (err) {
        res.send("null");
    }
    
}




