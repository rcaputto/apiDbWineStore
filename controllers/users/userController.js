const db = require ('../../database/models');

const userController = {
    listUser: function (req, res){
        db.Usuarios.findAll()
        .then(user =>{
            if(user){
            res.json({
                total: user.lenght,
                data: user.map((user) => ({
                    id:user.id_usuario,
                    name: user.first_name,
                    lastName: user.last_name,
                    tipo: user.tipo,
                    direccion: user.direccion,
                    codigoPostal: user.codigoPostal,
                    ciudad: user.ciudad,
                    email: user.email,
                    password: user.password,
                    admin: user.admin,
                })),
        status: 200
            })
        }else{res.json('usuario inexistente')}
        })
    },
    userDetail: function (req, res){
        db.Usuarios.findByPk(req.params.id)
        .then((user) =>{
            if(!user){
                res.json('El usero no existe')
            }else{
                res.json({
                    data: {
                        id: user.id_usuario,
                        name: user.name,
                        last_name: user.last_name
                    }
                })
            }
        }
        )
    }
}

module.exports= userController