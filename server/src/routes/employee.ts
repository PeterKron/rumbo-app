import express, { Request, Response} from 'express';
import { getEmployees } from "../db/employee";

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
  const employees = await getEmployees();
  res.status(200).json(employees);
})

export default router;