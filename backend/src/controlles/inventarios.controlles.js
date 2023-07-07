import getConnection from "../db/database.js";

const añadir_o_actualizar_inventario = async (req,res)=>{
    try{
        let {id_producto,id_bodega,cantidad} = req.body;
        const connection = await getConnection();
        const result = await connection.query("SELECT id, id_producto,id_bodega,cantidad FROM inventarios");
        async function buscarCoincidencia() {
            const result2 = result.find(val => (val.id_bodega== id_bodega && val.id_producto == id_producto));  
            if(result2 !== undefined){
                const idInventario = result2.id;
                cantidad = result2.cantidad + cantidad; 
                const inventario = {cantidad}
                const result3 = await connection.query("UPDATE inventarios SET ? WHERE id = ?", [inventario, idInventario])
                res.json(result3)
            } else {
                const inventario = {id_producto,id_bodega,cantidad}
                const result3 = await connection.query("INSERT INTO inventarios SET ?", inventario);
                res.json(result3)
            }
        }
        buscarCoincidencia()
    } catch (error){
        res.status(500);
        res.send(error.message);
    }
}



export const consultasInventarios ={
    añadir_o_actualizar_inventario
} 