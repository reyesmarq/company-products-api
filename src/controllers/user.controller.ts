import {Request, Response} from "express"

const createUser = (req: Request, res: Response) => {
  console.log(req, res)

  res.status(200).json({message: "createing the user"})
}


export default {createUser}