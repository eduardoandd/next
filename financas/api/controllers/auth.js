import {db} from '../connect.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const register = (req,res) => {
    const {username, email, password, confirmPassword} = req.body

    if(!username){
        return res.status(422).json({msg:"Nome é obrigatório!"})
    }
    if(!email){
        return res.status(422).json({msg:"email é obrigatório!"})
    }
    if(!password){
        return res.status(422).json({msg:"Senha é obrigatório!"})
    }
    if(password !== confirmPassword){
        return res.status(422).json({msg:"Senhas devem sem iguais"})
    }

    db.query('SELECT email from user WHERE email = ?',[email], async(error,data) => {
        if(error){
            console.log(error)
            return res.status(500).json({msg:"Aconteceu algum erro no servidor, tente novamente mais tarde"})
        }
        if(data.length > 0){
            return res.status(500).json({msg:"Esse email já esta sendo utilizado"})
        }
        else{
            const passwordHash = await bcrypt.hash(password, 8)
            db.query(
                "INSERT INTO user SET ?",{username,email,password:passwordHash},
                (error) =>{
                    if(error){
                        console.log(error)
                        return res.status(500).json({msg: "Aconteceu algum erro no servidor, tente novamente mais tarde!"})
                    }
                    else{
                        return res.status(200).json({msg:"Cadastro realizado com sucesso!"})
                    }
                }
            )
        }
    })
}
 

export const login = (req,res) => {
    const {email, password} = req.body

    db.query(
        "SELECT * FROM user WHERE email = ?",[email], async(error,data) =>{
            if(error){
                console.log(error)
                return res.status(500).json({msg:"Aconteceu algum erro no servidor, tente novamente mais tarde"})
            }
            if(data.length === 0){
                return res.status(404).json({msg:'Usuário não encontrado!'})
            }
            else{
                const user = data[0]

                const checkPassowrd = await bcrypt.compare(password, user.password)

                if(!checkPassowrd){
                    console.log("oi")
                    return res.status(422).json({msg:'Senha incorreta'})
                }   
                
                try {
                    const refreshToken = jwt.sign({
                        exp: Math.floor(Date.now()/1000) + 24 * 60 * 60,
                        id: user.password
                    },
                        process.env.REFRESH,
                        {algorithm:"HS256"}
                    )
                    const token = jwt.sign({
                        exp: Math.floor(Date.now()/1000) + 3600,
                        id: user.password
                    },
                        process.env.TOKEN,
                        {algorithm:"HS256"}
                    )
                    res.status(200).json({msg:"Usuário logado com sucesso!", token, refreshToken})
                } catch (error) {
                    console.log(error)
                    return res.status().json({msg:"Aconteceu algum erro no servidor, tente novamente mais tarde"})
                }
            }
        }
    )

}